const sources = [
  {
    category: "ai",
    label: "AIニュース",
    url: "https://news.google.com/rss/search?q=AI%20%E7%94%9F%E6%88%90AI%20%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92&hl=ja&gl=JP&ceid=JP:ja"
  },
  {
    category: "business",
    label: "ビジネスニュース",
    url: "https://news.google.com/rss/search?q=%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%20DX%20%E3%83%9E%E3%83%BC%E3%82%B1%E3%83%86%E3%82%A3%E3%83%B3%E3%82%B0&hl=ja&gl=JP&ceid=JP:ja"
  }
];

const glossary = {
  ai: [
    ["生成AI", "文章・画像・音声などを新しく作れるAI。"],
    ["LLM", "たくさんの文章を学び、言葉を扱うのが得意なAIモデル。"],
    ["AIエージェント", "目標に向かって、AIが手順を考えながら作業を進める仕組み。"],
    ["マルチモーダルAI", "文章だけでなく、画像・音声・動画などもまとめて扱えるAI。"],
    ["RAG", "外部資料を探してから、その内容をもとにAIが答える方法。"],
    ["ファインチューニング", "既に学んだAIを、目的に合わせて追加調整すること。"],
    ["推論", "AIが入力をもとに答えや判断を出すこと。"],
    ["モデル", "AIの知識や判断の仕方が入った中核部分。"],
    ["プロンプト", "AIに出すお願いや指示の文章。"],
    ["ハルシネーション", "AIがもっともらしいけれど間違ったことを言うこと。"],
    ["ディープラーニング", "大量のデータから複雑な特徴を学ぶ機械学習の方法。"],
    ["自然言語処理", "人間の言葉をコンピューターで扱う技術。"]
  ],
  business: [
    ["DX", "デジタル技術で仕事やサービスの形を変える取り組み。"],
    ["SaaS", "インターネット経由で使うソフトウェアサービス。"],
    ["KPI", "目標に近づいているかを見るための途中の数字。"],
    ["ROI", "使ったお金に対して、どれくらい得をしたかを見る数字。"],
    ["CRM", "お客様との関係や情報を管理する考え方や仕組み。"],
    ["BtoB", "会社が会社に商品やサービスを売る取引。"],
    ["BtoC", "会社が個人のお客様に商品やサービスを売る取引。"],
    ["マーケティング", "欲しい人に商品やサービスを届けるための活動。"],
    ["ブランディング", "会社や商品の印象を育て、選ばれやすくする活動。"],
    ["サブスクリプション", "月額などで継続して使う料金モデル。"],
    ["オンボーディング", "新しい利用者や社員が早く慣れるための導入支援。"],
    ["エンゲージメント", "お客様や社員がどれくらい関心や愛着を持っているか。"]
  ]
};

function stripTags(value) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function readTitles(xml) {
  return [...xml.matchAll(/<item>[\s\S]*?<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>[\s\S]*?<\/item>/g)]
    .map((match) => stripTags(decodeEntities(match[1])));
}

function makeTerm([term, simple], category, sourceTitle) {
  const sourceHint = sourceTitle.replace(/\s-\s.*$/, "");
  return {
    term,
    category,
    level: "Web更新",
    simple,
    example: `最近のニュースで「${sourceHint}」のような話題が出た時、この用語を知っていると内容を追いやすくなります。`,
    memory: `${term}はニュースで見かけたら、その場で一文だけ自分の言葉に直すと覚えやすいです。`,
    source: "web"
  };
}

function extractTerms(titles, category) {
  const candidates = glossary[category];
  const found = [];
  const used = new Set();

  for (const title of titles) {
    for (const candidate of candidates) {
      if (used.has(candidate[0])) continue;
      if (title.toLowerCase().includes(candidate[0].toLowerCase())) {
        found.push(makeTerm(candidate, category, title));
        used.add(candidate[0]);
      }
    }
  }

  return found;
}

async function fetchFreshTerms() {
  const results = [];
  const errors = [];

  for (const source of sources) {
    try {
      const response = await fetch(source.url, {
        headers: {
          "User-Agent": "KotobaQuest/0.1"
        }
      });
      if (!response.ok) {
        throw new Error(`${source.label}: ${response.status}`);
      }
      const xml = await response.text();
      const titles = readTitles(xml);
      results.push(...extractTerms(titles, source.category));
    } catch (error) {
      errors.push(error.message);
    }
  }

  const unique = [...new Map(results.map((item) => [item.term, item])).values()].slice(0, 12);

  return {
    terms: unique,
    errors,
    fetchedAt: new Date().toISOString()
  };
}

module.exports = { fetchFreshTerms };
