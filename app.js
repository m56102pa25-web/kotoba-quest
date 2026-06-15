const builtInTerms = [
  {
    term: "ROI",
    category: "business",
    level: "よく出る",
    simple: "使ったお金に対して、どれくらい得をしたかを見る数字。",
    example: "10万円の広告で30万円の利益が出たら、投資に見合ったかをROIで考えます。",
    memory: "ROIは「Return On Investment」。投資したお金が帰ってくるイメージ。"
  },
  {
    term: "KPI",
    category: "business",
    level: "よく出る",
    simple: "目標に近づいているかを見るための途中の数字。",
    example: "売上アップがゴールなら、問い合わせ数や成約率をKPIにします。",
    memory: "ゴールまでの道に置くチェックポイント、と覚えるとラクです。"
  },
  {
    term: "PDCA",
    category: "business",
    level: "基本",
    simple: "計画して、やって、見直して、改善する流れ。",
    example: "新しい投稿を試し、結果を見て、次の投稿を良くしていくのがPDCAです。",
    memory: "Plan Do Check Action。小さく回す改善の輪です。"
  },
  {
    term: "アジャイル",
    category: "business",
    level: "実務",
    simple: "最初から完璧を狙わず、小さく作って直しながら進める方法。",
    example: "まず使える試作品を出して、反応を見ながら機能を増やします。",
    memory: "アジャイルは「身軽」。大きな荷物を持たず、素早く動く感じ。"
  },
  {
    term: "ペルソナ",
    category: "business",
    level: "基本",
    simple: "商品やサービスを届けたい相手を、具体的な一人として描いたもの。",
    example: "30代で忙しい個人店オーナー、という人物像を作って考えます。",
    memory: "ぼんやりした「お客様」を、顔が浮かぶ一人にする言葉です。"
  },
  {
    term: "リード",
    category: "business",
    level: "営業",
    simple: "これからお客様になるかもしれない見込み客。",
    example: "資料請求をしてくれた人は、営業にとって大切なリードです。",
    memory: "未来のお客様につながる糸口、と覚えましょう。"
  },
  {
    term: "生成AI",
    category: "ai",
    level: "基本",
    simple: "文章・画像・音声などを新しく作れるAI。",
    example: "メール文を作ったり、企画案を出したり、画像を生成したりできます。",
    memory: "生成は「作る」。AIが材料から新しい形を作るイメージです。"
  },
  {
    term: "プロンプト",
    category: "ai",
    level: "基本",
    simple: "AIに出すお願いや指示の文章。",
    example: "「初心者向けに短く説明して」と書くと、それがプロンプトです。",
    memory: "AIへの注文票。何を、どんな形で欲しいかを書くほど伝わります。"
  },
  {
    term: "LLM",
    category: "ai",
    level: "よく出る",
    simple: "たくさんの文章を学び、言葉を扱うのが得意なAIモデル。",
    example: "ChatGPTのように会話や文章作成ができるAIの中心技術です。",
    memory: "Large Language Model。大きな言葉のモデル、とそのまま覚えてOKです。"
  },
  {
    term: "機械学習",
    category: "ai",
    level: "基本",
    simple: "データからパターンを学んで、予測や判断をする技術。",
    example: "過去の売上データから、来月の売上を予測する時に使われます。",
    memory: "人が全部ルールを書く代わりに、機械が例からコツを学びます。"
  },
  {
    term: "ハルシネーション",
    category: "ai",
    level: "注意",
    simple: "AIがもっともらしいけれど間違ったことを言ってしまうこと。",
    example: "存在しない本や数字を、まるで本当のように答える場合があります。",
    memory: "AIの見間違い。大事な内容は確認する、がセットです。"
  },
  {
    term: "ファインチューニング",
    category: "ai",
    level: "応用",
    simple: "既に学んだAIに、追加のデータで専門的な調整をすること。",
    example: "会社独自の文章スタイルを学ばせて、回答の雰囲気を近づけます。",
    memory: "楽器のチューニングと同じで、目的に合わせて細かく整えます。"
  },
  {
    term: "DX",
    category: "business",
    level: "よく出る",
    simple: "デジタル技術で仕事やサービスの形を変える取り組み。",
    example: "紙の申込書をなくして、予約から会計までスマホで完結させるのもDXです。",
    memory: "単なるIT化ではなく、仕事のやり方そのものを変える言葉です。"
  },
  {
    term: "SaaS",
    category: "business",
    level: "よく出る",
    simple: "インターネット経由で使うソフトウェアサービス。",
    example: "会計ソフトや予約管理ツールを月額で使う場合、SaaSと呼ばれます。",
    memory: "Software as a Service。ソフトを買うより、サービスとして借りる感覚です。"
  },
  {
    term: "CRM",
    category: "business",
    level: "営業",
    simple: "お客様との関係や情報を管理する考え方や仕組み。",
    example: "来店履歴や問い合わせ内容を残して、次の提案に活かします。",
    memory: "Customer Relationship Management。お客様との関係メモ帳です。"
  },
  {
    term: "BtoB",
    category: "business",
    level: "基本",
    simple: "会社が会社に商品やサービスを売る取引。",
    example: "企業向けの勤怠管理システムを販売するのはBtoBです。",
    memory: "Business to Business。会社から会社へ。"
  },
  {
    term: "BtoC",
    category: "business",
    level: "基本",
    simple: "会社が個人のお客様に商品やサービスを売る取引。",
    example: "ネットショップで個人に服を売るのはBtoCです。",
    memory: "Business to Consumer。会社から消費者へ。"
  },
  {
    term: "LTV",
    category: "business",
    level: "実務",
    simple: "一人のお客様が長い期間でどれくらい利益を生むかを見る数字。",
    example: "毎月買ってくれる常連さんはLTVが高いお客様です。",
    memory: "Lifetime Value。お客様との長い付き合いの価値です。"
  },
  {
    term: "CAC",
    category: "business",
    level: "実務",
    simple: "新しいお客様を一人獲得するためにかかった費用。",
    example: "広告費10万円で20人が契約したら、CACは一人あたり5千円です。",
    memory: "Customer Acquisition Cost。お客様を迎えるための費用です。"
  },
  {
    term: "サブスクリプション",
    category: "business",
    level: "基本",
    simple: "月額などで継続して使う料金モデル。",
    example: "動画配信サービスやクラウド会計の月額プランが代表例です。",
    memory: "買い切りではなく、使い続ける契約と覚えます。"
  },
  {
    term: "オンボーディング",
    category: "business",
    level: "実務",
    simple: "新しい利用者や社員が早く慣れるための導入支援。",
    example: "初回チュートリアルや新人研修はオンボーディングです。",
    memory: "船に乗る onboard から。新しい場所に乗り込む手助けです。"
  },
  {
    term: "エンゲージメント",
    category: "business",
    level: "実務",
    simple: "お客様や社員がどれくらい関心や愛着を持っているか。",
    example: "投稿への反応が多いSNSアカウントはエンゲージメントが高いです。",
    memory: "ただ見ているだけでなく、関わってくれている度合いです。"
  },
  {
    term: "チャーン",
    category: "business",
    level: "注意",
    simple: "契約や利用をやめてしまうこと。",
    example: "月額サービスで退会者が増えると、チャーン率が高いと言います。",
    memory: "穴の空いたバケツから水が抜けるイメージです。"
  },
  {
    term: "ABテスト",
    category: "business",
    level: "実務",
    simple: "2つの案を比べて、どちらが良い結果か確かめる方法。",
    example: "ボタンの文言をA案とB案で出し分けて、クリック率を比べます。",
    memory: "迷ったら小さく比べるテストです。"
  },
  {
    term: "マルチモーダルAI",
    category: "ai",
    level: "よく出る",
    simple: "文章だけでなく、画像・音声・動画なども扱えるAI。",
    example: "写真を見せて内容を説明してもらうAIはマルチモーダルです。",
    memory: "モードが複数。見る、聞く、読むをまとめて扱うイメージです。"
  },
  {
    term: "AIエージェント",
    category: "ai",
    level: "新しめ",
    simple: "目標に向かって、AIが手順を考えながら作業を進める仕組み。",
    example: "調査して、表にまとめて、メール案まで作るAIはエージェント的です。",
    memory: "エージェントは代理人。お願いを受けて動くAIです。"
  },
  {
    term: "RAG",
    category: "ai",
    level: "実務",
    simple: "外部資料を探してから、その内容をもとにAIが答える方法。",
    example: "社内マニュアルを検索してから回答するチャットボットに使われます。",
    memory: "AIにカンニングペーパーを渡してから答えさせる感じです。"
  },
  {
    term: "ベクトル検索",
    category: "ai",
    level: "応用",
    simple: "言葉の意味の近さで情報を探す検索方法。",
    example: "「売上を増やす方法」で検索して「集客施策」の資料を見つけられます。",
    memory: "文字が同じかではなく、意味が近いかで探します。"
  },
  {
    term: "埋め込み",
    category: "ai",
    level: "応用",
    simple: "文章や画像の意味を、AIが扱いやすい数字の並びに変えること。",
    example: "似た文章を探すために、資料を埋め込みに変換します。",
    memory: "意味を数字の住所に変える作業です。"
  },
  {
    term: "トークン",
    category: "ai",
    level: "基本",
    simple: "AIが文章を読む時の小さな単位。",
    example: "長い文章をAIに渡す時は、トークン数の上限を気にします。",
    memory: "文字そのものではなく、AI用に分けた言葉のかけらです。"
  },
  {
    term: "コンテキスト",
    category: "ai",
    level: "基本",
    simple: "AIが返答するときに参照できる会話や資料の範囲。",
    example: "前に話した内容を覚えて答えられるのは、コンテキストに入っているからです。",
    memory: "AIの作業机に広げられている情報です。"
  },
  {
    term: "推論",
    category: "ai",
    level: "よく出る",
    simple: "AIが入力をもとに答えや判断を出すこと。",
    example: "画像を見て商品名を判断する処理も推論です。",
    memory: "学習済みのAIが、実際に考えて答える場面です。"
  },
  {
    term: "温度",
    category: "ai",
    level: "応用",
    simple: "AIの答えの自由さやばらつきを調整する設定。",
    example: "温度を低くすると堅実に、高くすると発想が広がりやすくなります。",
    memory: "料理の火加減のように、答えの勢いを調整します。"
  }
];

const macShortcutTerms = [
  {
    term: "Command + C",
    category: "shortcut",
    level: "Mac基本",
    simple: "選択した文字やファイルをコピーするショートカット。",
    example: "文章を選択してCommand + Cを押すと、あとで別の場所に貼り付けられます。",
    memory: "CはCopyのC。コピーの基本操作です。"
  },
  {
    term: "Command + V",
    category: "shortcut",
    level: "Mac基本",
    simple: "コピーした内容を貼り付けるショートカット。",
    example: "コピーした文章やファイルを置きたい場所でCommand + Vを押します。",
    memory: "Cでコピー、Vで貼り付け。この2つはセットです。"
  },
  {
    term: "Command + X",
    category: "shortcut",
    level: "Mac基本",
    simple: "選択した文字やファイルを切り取るショートカット。",
    example: "文章を別の場所へ移したい時、Command + Xで切り取ってから貼り付けます。",
    memory: "Xはハサミの形に見える、と覚えると自然です。"
  },
  {
    term: "Command + Z",
    category: "shortcut",
    level: "Mac基本",
    simple: "直前の操作を取り消すショートカット。",
    example: "間違って消した時や移動した時にCommand + Zで一つ前に戻せます。",
    memory: "困ったらまずZ。作業の保険です。"
  },
  {
    term: "Command + Shift + Z",
    category: "shortcut",
    level: "Mac基本",
    simple: "取り消した操作をやり直すショートカット。",
    example: "Command + Zで戻しすぎた時、Command + Shift + Zで進めます。",
    memory: "ZにShiftを足すと、戻した道を進み直します。"
  },
  {
    term: "Command + A",
    category: "shortcut",
    level: "Mac基本",
    simple: "表示中の文章やファイルをまとめて選択するショートカット。",
    example: "メモの全文をコピーしたい時、Command + Aで全部選べます。",
    memory: "AはAllのA。全部選ぶ操作です。"
  },
  {
    term: "Command + S",
    category: "shortcut",
    level: "Mac基本",
    simple: "今の作業内容を保存するショートカット。",
    example: "書類や編集データを失いたくない時、Command + Sでこまめに保存します。",
    memory: "SはSaveのS。作業の一区切りで押す習慣にします。"
  },
  {
    term: "Command + F",
    category: "shortcut",
    level: "Mac基本",
    simple: "ページや書類の中から文字を検索するショートカット。",
    example: "長いPDFやWebページで目的の言葉を探す時に使います。",
    memory: "FはFindのF。探す時の入口です。"
  },
  {
    term: "Command + Tab",
    category: "shortcut",
    level: "Mac基本",
    simple: "開いているアプリを切り替えるショートカット。",
    example: "ブラウザからメモへ、メモからFinderへ素早く移動できます。",
    memory: "Tabでアプリの列を横移動するイメージです。"
  },
  {
    term: "Command + Space",
    category: "shortcut",
    level: "Mac基本",
    simple: "Spotlight検索を開くショートカット。",
    example: "アプリ名やファイル名を入力して、すぐ起動したい時に使います。",
    memory: "空白キーで検索窓を呼び出す、と覚えると自然です。"
  },
  {
    term: "Command + W",
    category: "shortcut",
    level: "Mac基本",
    simple: "今開いているウィンドウやタブを閉じるショートカット。",
    example: "ブラウザの今のタブだけ閉じたい時にCommand + Wを押します。",
    memory: "WはWindow。今の窓を閉じる操作です。"
  },
  {
    term: "Command + Q",
    category: "shortcut",
    level: "Mac基本",
    simple: "アプリを終了するショートカット。",
    example: "使い終わったアプリを完全に閉じたい時にCommand + Qを押します。",
    memory: "QはQuitのQ。タブではなくアプリ終了です。"
  },
  {
    term: "Command + N",
    category: "shortcut",
    level: "Mac基本",
    simple: "新しいウィンドウや書類を作るショートカット。",
    example: "Finderで新しいウィンドウ、メモで新しいメモを作る時に使います。",
    memory: "NはNewのN。新しく始めるキーです。"
  },
  {
    term: "Command + T",
    category: "shortcut",
    level: "Mac基本",
    simple: "ブラウザなどで新しいタブを開くショートカット。",
    example: "調べものを続けながら別ページを開きたい時に使います。",
    memory: "TはTabのT。新しいタブを足します。"
  },
  {
    term: "Command + Shift + 3",
    category: "shortcut",
    level: "スクリーンショット",
    simple: "画面全体のスクリーンショットを撮るショートカット。",
    example: "今の画面を丸ごと残したい時にCommand + Shift + 3を押します。",
    memory: "3は全画面スクショ、とまとめて覚えます。"
  },
  {
    term: "Command + Shift + 4",
    category: "shortcut",
    level: "スクリーンショット",
    simple: "範囲を選んでスクリーンショットを撮るショートカット。",
    example: "画面の一部だけを相手に見せたい時に便利です。",
    memory: "4は四角く範囲を切り取る、と覚えると使いやすいです。"
  },
  {
    term: "Command + Shift + 5",
    category: "shortcut",
    level: "スクリーンショット",
    simple: "スクリーンショットや画面収録のツールを開くショートカット。",
    example: "画面収録や保存先の変更をしたい時にCommand + Shift + 5を押します。",
    memory: "スクショ系の操作パネルは5です。"
  },
  {
    term: "Command + Option + Esc",
    category: "shortcut",
    level: "トラブル対応",
    simple: "反応しないアプリを強制終了する画面を開くショートカット。",
    example: "アプリが固まった時、強制終了ウィンドウから対象アプリを選びます。",
    memory: "EscにCommandとOptionを足すと、逃げ道を開く操作です。"
  }
];

const baseTerms = [...builtInTerms, ...macShortcutTerms];

let terms = [...baseTerms, ...loadWebTerms()];

const autoTermPack = [
  {
    term: "A",
    category: "shortcut",
    level: "Final Cut Pro",
    simple: "Final Cut Proで選択ツールに切り替えるキー。",
    example: "クリップを選んで移動したい時、Aで選択ツールに戻します。",
    memory: "Aは基本の矢印ツールに戻る、と覚えます。"
  },
  {
    term: "B",
    category: "shortcut",
    level: "Final Cut Pro",
    simple: "Final Cut Proでブレードツールに切り替えるキー。",
    example: "動画クリップを途中で切りたい時にBを押します。",
    memory: "BはBladeのB。切る道具です。"
  },
  {
    term: "Space",
    category: "shortcut",
    level: "Final Cut Pro",
    simple: "再生と停止を切り替えるキー。",
    example: "編集しながら確認したい時、Spaceで再生/停止します。",
    memory: "迷ったらSpace。動画編集の確認ボタンです。"
  },
  {
    term: "Command + B",
    category: "shortcut",
    level: "Final Cut Pro",
    simple: "再生ヘッド位置でクリップを分割するショートカット。",
    example: "タイムライン上の今の位置でクリップを切りたい時に使います。",
    memory: "Commandを足したBは、その場でカットです。"
  }
];

const state = {
  view: "cards",
  category: "all",
  query: "",
  cardIndex: 0,
  quizTerm: null,
  quizAnswered: false,
  correct: 0,
  attempted: 0,
  streak: 0,
  known: new Set(JSON.parse(localStorage.getItem("knownTerms") || "[]")),
  review: new Set(JSON.parse(localStorage.getItem("reviewTerms") || "[]"))
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function saveProgress() {
  localStorage.setItem("knownTerms", JSON.stringify([...state.known]));
  localStorage.setItem("reviewTerms", JSON.stringify([...state.review]));
}

function loadWebTerms() {
  const savedTerms = JSON.parse(localStorage.getItem("webTerms") || "[]");
  const cleanedTerms = savedTerms.filter((item) => {
    return !(item.source === "pdf" && item.simple?.includes("準備用カード"));
  });
  if (cleanedTerms.length !== savedTerms.length) {
    saveWebTerms(cleanedTerms);
  }
  return cleanedTerms;
}

function saveWebTerms(webTerms) {
  localStorage.setItem("webTerms", JSON.stringify(webTerms));
}

function categoryLabel(category) {
  const labels = {
    ai: "AI",
    business: "Business",
    shortcut: "Shortcut",
    source: "Source"
  };
  return labels[category] || "Custom";
}

function filteredTerms() {
  return terms.filter((item) => {
    const matchesCategory = state.category === "all" || item.category === state.category;
    const text = `${item.term} ${item.simple} ${item.example}`.toLowerCase();
    return matchesCategory && text.includes(state.query.toLowerCase());
  });
}

function currentTerm() {
  const list = filteredTerms();
  if (!list.length) return null;
  state.cardIndex = Math.max(0, Math.min(state.cardIndex, list.length - 1));
  return list[state.cardIndex];
}

function advanceCard() {
  const list = filteredTerms();
  if (!list.length) return;
  state.cardIndex = (state.cardIndex + 1) % list.length;
}

function renderCard() {
  const item = currentTerm();
  const list = filteredTerms();
  if (!item) {
    $("#cardTerm").textContent = "見つかりません";
    $("#cardSimple").textContent = "検索条件を少し変えてみてください。";
    $("#cardExample").textContent = "";
    $("#cardMemory").textContent = "";
    $("#cardPosition").textContent = "0 / 0";
    return;
  }
  $("#cardCategory").textContent = categoryLabel(item.category);
  $("#cardLevel").textContent = item.level;
  $("#cardPosition").textContent = `${state.cardIndex + 1} / ${list.length}`;
  $("#cardTerm").textContent = item.term;
  $("#cardSimple").textContent = item.simple;
  $("#cardExample").textContent = item.example;
  $("#cardMemory").textContent = item.memory;
}

function renderProgress() {
  const known = state.known.size;
  const review = state.review.size;
  const percent = Math.round((known / terms.length) * 100);
  $("#knownMeter").style.width = `${percent}%`;
  $("#progressText").textContent = `${known}語を覚えました`;
  $("#knownCount").textContent = known;
  $("#reviewCount").textContent = review;
  $("#totalCount").textContent = terms.length;
  $("#headerKnown").textContent = known;
  $("#headerReview").textContent = review;
  $("#headerTotal").textContent = terms.length;
  $("#streakText").textContent = `連続正解 ${state.streak}`;
  $("#dailyMood").textContent = state.streak >= 3 ? "いい感じです" : "まず3問だけ";
}

function renderList(containerId, list) {
  const container = $(containerId);
  container.innerHTML = "";
  if (!list.length) {
    container.innerHTML = `<div class="empty">ここにはまだ用語がありません。</div>`;
    return;
  }
  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "term-item";
    card.innerHTML = `
      <span class="badge">${categoryLabel(item.category)}</span>
      <h3>${item.term}</h3>
      <p>${item.simple}</p>
    `;
    container.append(card);
  });
}

function renderDictionary() {
  const list = filteredTerms();
  $("#listCount").textContent = `${list.length}語`;
  renderList("#termList", list);
}

function renderReview() {
  const reviewTerms = terms.filter((item) => state.review.has(item.term));
  renderList("#reviewList", reviewTerms);
}

function pickQuizTerm() {
  const list = filteredTerms();
  state.quizTerm = list[Math.floor(Math.random() * list.length)] || terms[0];
  state.quizAnswered = false;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderQuiz() {
  if (!state.quizTerm) pickQuizTerm();
  const item = state.quizTerm;
  $("#quizCategory").textContent = categoryLabel(item.category);
  $("#quizScore").textContent = `${state.correct} / ${state.attempted}`;
  $("#quizPrompt").textContent = item.simple;
  $("#quizFeedback").textContent = "";
  const wrong = shuffle(terms.filter((term) => term.term !== item.term)).slice(0, 3);
  const options = shuffle([item, ...wrong]);
  const answerList = $("#answerList");
  answerList.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = option.term;
    button.addEventListener("click", () => answerQuiz(button, option.term));
    answerList.append(button);
  });
}

function answerQuiz(button, selectedTerm) {
  if (state.quizAnswered || !state.quizTerm) return;
  state.quizAnswered = true;
  state.attempted += 1;
  const isCorrect = selectedTerm === state.quizTerm.term;
  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.known.add(state.quizTerm.term);
    $("#quizFeedback").textContent = "正解です。今の説明と用語がつながりました。";
  } else {
    state.streak = 0;
    state.review.add(state.quizTerm.term);
    button.classList.add("wrong");
    $("#quizFeedback").textContent = `惜しいです。正解は「${state.quizTerm.term}」。復習ボックスに入れました。`;
  }
  $$(".answer").forEach((answer) => {
    if (answer.textContent === state.quizTerm.term) answer.classList.add("correct");
  });
  saveProgress();
  renderProgress();
  renderReview();
  $("#quizScore").textContent = `${state.correct} / ${state.attempted}`;
}

function renderAll() {
  renderCard();
  renderProgress();
  renderDictionary();
  renderReview();
  if (state.view === "quiz") {
    pickQuizTerm();
    renderQuiz();
  }
}

function setWebStatus(message, tone = "normal") {
  const status = $("#webStatus");
  status.textContent = message;
  status.dataset.tone = tone;
}

function configurePwaMode() {
  const isElectron = Boolean(window.kotobaQuest);
  const isStandalone = Boolean(
    window.navigator.standalone || window.matchMedia?.("(display-mode: standalone)").matches
  );

  document.body.classList.toggle("pwa-mode", !isElectron);
  document.body.classList.toggle("standalone-mode", isStandalone);

  if (!isElectron) {
    closeAddMenu();
    setWebStatus("iPhone版では追加機能は準備中です", "normal");
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      setWebStatus("オフライン準備に失敗しました", "warn");
    });
  });
}

function mergeTerms(newTerms) {
  const savedWebTerms = loadWebTerms();
  const baseTermNames = new Set(baseTerms.map((item) => item.term));
  const customTerms = newTerms.filter((item) => !baseTermNames.has(item.term));
  const merged = new Map([...savedWebTerms, ...customTerms].map((item) => [item.term, item]));
  const webTerms = [...merged.values()];
  saveWebTerms(webTerms);
  terms = [...baseTerms, ...webTerms];
  return customTerms.filter((item) => !savedWebTerms.some((saved) => saved.term === item.term));
}

async function refreshWebTerms() {
  const buttons = $$("[data-add-action]");
  if (!window.kotobaQuest?.refreshTerms) {
    setWebStatus("Web更新はElectron版で使えます", "warn");
    return;
  }

  buttons.forEach((button) => {
    button.disabled = true;
  });
  setWebStatus("ニュースから用語を探しています...", "normal");

  try {
    const result = await window.kotobaQuest.refreshTerms();
    const freshTerms = Array.isArray(result.terms) ? result.terms : [];
    if (!freshTerms.length) {
      setWebStatus("新しい用語は見つかりませんでした", result.errors?.length ? "warn" : "normal");
      return;
    }
    const added = mergeTerms(freshTerms);
    state.cardIndex = Math.max(0, terms.length - added.length);
    renderAll();
    setWebStatus(`${added.length}語を追加しました`, "success");
  } catch (error) {
    setWebStatus("Web更新に失敗しました", "warn");
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

async function choosePdfTerms() {
  if (!window.kotobaQuest?.choosePdf) {
    setWebStatus("PDF選択はElectron版で使えます", "warn");
    return;
  }

  const buttons = $$("[data-add-action]");
  buttons.forEach((button) => {
    button.disabled = true;
  });
  setWebStatus("PDF本文から用語を探しています...", "normal");

  try {
    const result = await window.kotobaQuest.choosePdf();
    if (!result) {
      setWebStatus("PDF選択をキャンセルしました", "normal");
      return;
    }

    const pdfTerms = Array.isArray(result.terms) ? result.terms : [];
    if (!pdfTerms.length) {
      setWebStatus(result.warning || "PDF本文から用語を見つけられませんでした", "warn");
      return;
    }

    const added = mergeTerms(pdfTerms);
    state.category = "all";
    state.cardIndex = Math.max(0, terms.length - added.length);
    $$(".chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.category === "all"));
    renderAll();
    const suffix = result.warning ? `（${result.warning}）` : "";
    setWebStatus(`${result.name} から ${added.length}語を追加しました${suffix}`, "success");
  } catch (error) {
    setWebStatus("PDF解析に失敗しました", "warn");
  } finally {
    buttons.forEach((button) => {
      button.disabled = false;
    });
  }
}

function addYoutubeSeed() {
  const url = window.prompt("YouTube動画のURLを入力してください");
  if (!url) {
    setWebStatus("YouTube追加をキャンセルしました", "normal");
    return;
  }

  const added = mergeTerms([
    {
      term: "YouTube動画メモ",
      category: "source",
      level: "YouTube",
      simple: "YouTube動画から学習カードを作る準備用カードです。",
      example: `登録したURL: ${url}`,
      memory: "次の段階で字幕や説明文を読み取り、用語候補を自動抽出できるようにします。",
      source: "youtube"
    }
  ]);
  state.cardIndex = Math.max(0, terms.length - added.length);
  renderAll();
  setWebStatus("YouTube URLを登録しました。解析機能は次に追加できます", "success");
}

function addAutoTerms() {
  const added = mergeTerms(autoTermPack);
  state.category = "shortcut";
  state.cardIndex = Math.max(0, filteredTerms().length - added.length);
  $$(".chip").forEach((chip) => chip.classList.toggle("active", chip.dataset.category === "shortcut"));
  renderAll();
  setWebStatus(`${added.length}個のショートカットを追加しました`, "success");
}

function closeAddMenu() {
  $("#addMenuPanel").hidden = true;
  $("#openAddMenu").setAttribute("aria-expanded", "false");
}

function handleAddAction(action) {
  closeAddMenu();
  if (action === "web") refreshWebTerms();
  if (action === "pdf") choosePdfTerms();
  if (action === "youtube") addYoutubeSeed();
  if (action === "auto") addAutoTerms();
}

$$(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    state.view = button.dataset.view;
    $$(".tab").forEach((tab) => tab.classList.toggle("active", tab === button));
    $$(".view").forEach((view) => view.classList.remove("active"));
    $(`#${state.view}View`).classList.add("active");
    if (state.view === "quiz") {
      pickQuizTerm();
      renderQuiz();
    }
  });
});

$$(".chip").forEach((button) => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    state.cardIndex = 0;
    state.quizTerm = null;
    $$(".chip").forEach((chip) => chip.classList.toggle("active", chip === button));
    renderAll();
  });
});

$("#searchInput").addEventListener("input", (event) => {
  state.query = event.target.value.trim();
  state.cardIndex = 0;
  state.quizTerm = null;
  renderAll();
});

$("#prevCard").addEventListener("click", () => {
  const list = filteredTerms();
  if (!list.length) return;
  state.cardIndex = (state.cardIndex - 1 + list.length) % list.length;
  renderCard();
});

$("#nextCard").addEventListener("click", () => {
  advanceCard();
  renderCard();
});

$("#markKnown").addEventListener("click", () => {
  const item = currentTerm();
  if (!item) return;
  state.known.add(item.term);
  state.review.delete(item.term);
  advanceCard();
  saveProgress();
  renderAll();
});

$("#markReview").addEventListener("click", () => {
  const item = currentTerm();
  if (!item) return;
  state.review.add(item.term);
  advanceCard();
  saveProgress();
  renderAll();
});

$("#nextQuiz").addEventListener("click", () => {
  pickQuizTerm();
  renderQuiz();
});

$("#clearReview").addEventListener("click", () => {
  state.review.clear();
  saveProgress();
  renderAll();
});

$("#openAddMenu").addEventListener("click", () => {
  const panel = $("#addMenuPanel");
  panel.hidden = !panel.hidden;
  $("#openAddMenu").setAttribute("aria-expanded", String(!panel.hidden));
});

$$("[data-add-action]").forEach((button) => {
  button.addEventListener("click", () => handleAddAction(button.dataset.addAction));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".add-menu")) {
    closeAddMenu();
  }
});

configurePwaMode();
registerServiceWorker();
renderAll();
