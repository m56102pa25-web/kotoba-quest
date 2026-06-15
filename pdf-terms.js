const fs = require("fs/promises");
const zlib = require("zlib");

const knownGlossary = [
  ["ROI", "使ったお金に対して、どれくらい得をしたかを見る数字。", "business"],
  ["KPI", "目標に近づいているかを見るための途中の数字。", "business"],
  ["PDCA", "計画して、やって、見直して、改善する流れ。", "business"],
  ["DX", "デジタル技術で仕事やサービスの形を変える取り組み。", "business"],
  ["SaaS", "インターネット経由で使うソフトウェアサービス。", "business"],
  ["CRM", "お客様との関係や情報を管理する考え方や仕組み。", "business"],
  ["LTV", "一人のお客様が長い期間でどれくらい利益を生むかを見る数字。", "business"],
  ["CAC", "新しいお客様を一人獲得するためにかかった費用。", "business"],
  ["LLM", "たくさんの文章を学び、言葉を扱うのが得意なAIモデル。", "ai"],
  ["RAG", "外部資料を探してから、その内容をもとにAIが答える方法。", "ai"],
  ["生成AI", "文章・画像・音声などを新しく作れるAI。", "ai"],
  ["機械学習", "データからパターンを学んで、予測や判断をする技術。", "ai"],
  ["プロンプト", "AIに出すお願いや指示の文章。", "ai"],
  ["ファインチューニング", "既に学んだAIに、追加のデータで専門的な調整をすること。", "ai"],
  ["ベクトル検索", "言葉の意味の近さで情報を探す検索方法。", "ai"],
  ["埋め込み", "文章や画像の意味を、AIが扱いやすい数字の並びに変えること。", "ai"],
  ["トークン", "AIが文章を読む時の小さな単位。", "ai"],
  ["コンテキスト", "AIが返答するときに参照できる会話や資料の範囲。", "ai"],
  ["推論", "AIが入力をもとに答えや判断を出すこと。", "ai"]
];

const stopWords = new Set([
  "こと",
  "もの",
  "ため",
  "よう",
  "これ",
  "それ",
  "ここ",
  "場合",
  "概要",
  "資料",
  "本文",
  "説明",
  "情報",
  "方法",
  "内容",
  "利用",
  "可能"
]);

function decodePdfString(value) {
  let output = "";
  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];
    if (char !== "\\") {
      output += char;
      continue;
    }

    index += 1;
    const escaped = value[index];
    if (escaped === "n") output += "\n";
    else if (escaped === "r") output += "\r";
    else if (escaped === "t") output += "\t";
    else if (escaped === "b") output += "\b";
    else if (escaped === "f") output += "\f";
    else if (/[0-7]/.test(escaped || "")) {
      let octal = escaped;
      for (let count = 0; count < 2 && /[0-7]/.test(value[index + 1] || ""); count += 1) {
        index += 1;
        octal += value[index];
      }
      output += String.fromCharCode(parseInt(octal, 8));
    } else if (escaped) {
      output += escaped;
    }
  }
  return output;
}

function decodeHexString(value) {
  const clean = value.replace(/\s+/g, "");
  const bytes = [];
  for (let index = 0; index < clean.length; index += 2) {
    bytes.push(parseInt(clean.slice(index, index + 2).padEnd(2, "0"), 16));
  }
  const buffer = Buffer.from(bytes);
  if (buffer.length >= 2 && buffer[0] === 0xfe && buffer[1] === 0xff) {
    let text = "";
    for (let index = 2; index + 1 < buffer.length; index += 2) {
      text += String.fromCharCode(buffer.readUInt16BE(index));
    }
    return text;
  }
  return buffer.toString("utf8");
}

function inflateStream(stream) {
  try {
    return zlib.inflateSync(stream);
  } catch {
    try {
      return zlib.inflateRawSync(stream);
    } catch {
      return stream;
    }
  }
}

function collectStreams(buffer) {
  const source = buffer.toString("latin1");
  const streams = [];
  const streamPattern = /<<(?:.|\n|\r)*?>>\s*stream\r?\n?/g;
  let match;

  while ((match = streamPattern.exec(source))) {
    const dictionary = match[0];
    const start = match.index + match[0].length;
    const endMarker = source.indexOf("endstream", start);
    if (endMarker === -1) break;

    let stream = buffer.subarray(start, endMarker);
    if (stream.length && stream[stream.length - 1] === 0x0a) stream = stream.subarray(0, -1);
    if (stream.length && stream[stream.length - 1] === 0x0d) stream = stream.subarray(0, -1);
    streams.push(dictionary.includes("/FlateDecode") ? inflateStream(stream) : stream);
    streamPattern.lastIndex = endMarker + "endstream".length;
  }

  return streams;
}

function extractReadableText(buffer) {
  const chunks = collectStreams(buffer);
  const source = Buffer.concat(chunks.length ? chunks : [buffer]).toString("latin1");
  const parts = [];

  for (const match of source.matchAll(/\((?:\\.|[^\\)])*\)|<([0-9a-fA-F\s]{4,})>/g)) {
    const token = match[0];
    const text = token.startsWith("(")
      ? decodePdfString(token.slice(1, -1))
      : decodeHexString(token.slice(1, -1));
    if (/[A-Za-z0-9\u3040-\u30ff\u3400-\u9fff]/.test(text)) {
      parts.push(text);
    }
  }

  return parts
    .join(" ")
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001f]+/g, " ")
    .trim();
}

function candidateScore(term, text) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(escaped, "gi")) || []).length;
}

function makeKnownTerm([term, simple, category], text, fileName) {
  const count = candidateScore(term, text);
  return {
    term,
    category,
    level: "PDF",
    simple,
    example: `${fileName} の本文で ${count}回見つかりました。資料を読む前に意味を押さえると追いやすくなります。`,
    memory: `${term}が出た段落で、何の目的や数字と結びついているかを一緒に見ると覚えやすいです。`,
    source: "pdf"
  };
}

function collectUnknownTerms(text) {
  const counts = new Map();
  const patterns = [
    /[A-Z][A-Z0-9+-]{1,12}/g,
    /[\u30a1-\u30ffー]{3,18}/g,
    /[\u4e00-\u9fff]{2,8}(?:AI|DX|化|率|性|管理|分析|学習|生成|検索|戦略|施策|指標|効果|顧客|市場)?/g
  ];

  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const term = match[0].trim();
      if (stopWords.has(term) || /^\d+$/.test(term)) continue;
      counts.set(term, (counts.get(term) || 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([term, count]) => count >= 2 && term.length <= 20)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([term, count]) => ({
      term,
      category: /AI|LLM|RAG|学習|生成|検索|モデル/.test(term) ? "ai" : "source",
      level: "PDF候補",
      simple: `このPDF内で何度も出てくる重要そうな言葉です。`,
      example: `本文中に ${count}回出てきます。前後の段落を見ながら、自分用の説明に直すと理解しやすくなります。`,
      memory: `まず「${term}は、この資料で何を説明するための言葉か」と一文で言い換えてみましょう。`,
      source: "pdf"
    }));
}

async function extractTermsFromPdf(filePath, fileName) {
  const buffer = await fs.readFile(filePath);
  const text = extractReadableText(buffer);

  if (text.length < 40) {
    return {
      terms: [],
      textLength: text.length,
      warning: "PDF本文を読み取れませんでした。画像だけのPDF、または特殊な文字埋め込みのPDFかもしれません。"
    };
  }

  const knownTerms = knownGlossary
    .filter((entry) => candidateScore(entry[0], text) > 0)
    .map((entry) => makeKnownTerm(entry, text, fileName));
  const knownNames = new Set(knownTerms.map((item) => item.term.toLowerCase()));
  const unknownTerms = collectUnknownTerms(text).filter((item) => !knownNames.has(item.term.toLowerCase()));

  return {
    terms: [...knownTerms, ...unknownTerms].slice(0, 12),
    textLength: text.length,
    warning: null
  };
}

module.exports = { extractTermsFromPdf };
