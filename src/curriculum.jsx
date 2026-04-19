// Numeric sections. Plan.md's 32 Days are flattened into Section 1..32.
// Months/Weeks still group them, but labels use §n numbering throughout.
const SECTIONS = [
  { id:"s1",  n:1,  label:"§1  導入と VS Code 構築",         available:true },
  { id:"s2",  n:2,  label:"§2  Python と仮想環境",            available:true },
  { id:"s3",  n:3,  label:"§3  変数・データ型・メモリ" },
  { id:"s4",  n:4,  label:"§4  制御構文とアルゴリズム" },
  { id:"s5",  n:5,  label:"§5  関数と DRY 原則" },
  { id:"s6",  n:6,  label:"§6  モジュールとパッケージ" },
  { id:"s7",  n:7,  label:"§7  Git のローカル運用" },
  { id:"s8",  n:8,  label:"§8  デバッグ基礎" },
  { id:"s9",  n:9,  label:"§9  クラスとインスタンス" },
  { id:"s10", n:10, label:"§10 メソッドと継承" },
  { id:"s11", n:11, label:"§11 GitHub とリモートリポジトリ" },
  { id:"s12", n:12, label:"§12 ブランチと Pull Request" },
  { id:"s13", n:13, label:"§13 NumPy による数値計算" },
  { id:"s14", n:14, label:"§14 Matplotlib による可視化" },
  { id:"s15", n:15, label:"§15 中間課題（シミュレータ開発）" },
  { id:"s16", n:16, label:"§16 コードレビューとリファクタリング" },
  { id:"s17", n:17, label:"§17 機械学習の分類と強化学習の位置づけ" },
  { id:"s18", n:18, label:"§18 マルコフ決定過程（MDP）" },
  { id:"s19", n:19, label:"§19 状態価値と行動価値（Q 値）" },
  { id:"s20", n:20, label:"§20 探索と利用のジレンマ" },
  { id:"s21", n:21, label:"§21 Gymnasium のインターフェース" },
  { id:"s22", n:22, label:"§22 ランダムエージェントの実装" },
  { id:"s23", n:23, label:"§23 ニューラルネットワークとは何か" },
  { id:"s24", n:24, label:"§24 代表的なアルゴリズムの概要" },
  { id:"s25", n:25, label:"§25 RLlib のアーキテクチャ" },
  { id:"s26", n:26, label:"§26 RLlib による既存環境の学習" },
  { id:"s27", n:27, label:"§27 カスタム環境の設計" },
  { id:"s28", n:28, label:"§28 カスタム環境の RLlib への登録" },
  { id:"s29", n:29, label:"§29 TensorBoard による可視化" },
  { id:"s30", n:30, label:"§30 報酬設計とパラメータ調整" },
  { id:"s31", n:31, label:"§31 最終課題（ミニプロジェクト）" },
  { id:"s32", n:32, label:"§32 研究を自律して進めるために" },
];

function subsections(id){
  if (id === "s1") return [
    { id:"s1-goal",       label:"ゴール" },
    { id:"s1-translate",  label:"コードは翻訳である" },
    { id:"s1-editor",     label:"エディタがしてくれること" },
    { id:"s1-why-vscode", label:"なぜ VS Code か" },
    { id:"s1-install",    label:"インストール" },
    { id:"s1-ext",        label:"拡張機能" },
    { id:"s1-keys",       label:"最低限覚えるキー" },
    { id:"s1-check",      label:"チェック" },
  ];
  if (id === "s2") return [
    { id:"s2-goal",       label:"ゴール" },
    { id:"s2-whereispy",  label:"Python はどこにいるか" },
    { id:"s2-install",    label:"Python をインストールする" },
    { id:"s2-why-venv",   label:"なぜ仮想環境が必要か" },
    { id:"s2-venv",       label:"venv で部屋を作る" },
    { id:"s2-hello",      label:"Hello, World." },
    { id:"s2-errors",     label:"エラーが出たら" },
    { id:"s2-shell",      label:"ターミナルの最低限" },
    { id:"s2-check",      label:"チェック" },
  ];
  return [];
}

const CURRICULUM = [
  { id:"p1", label:"第1部  開発の土台と Python の基礎", range:[1,8],
    groups:[
      { id:"g1", label:"§1–§2  開発環境",              range:[1,2] },
      { id:"g2", label:"§3–§4  データと制御",           range:[3,4], locked:true },
      { id:"g3", label:"§5–§6  関数・モジュール",       range:[5,6], locked:true },
      { id:"g4", label:"§7–§8  Git とデバッグ",         range:[7,8], locked:true },
    ]},
  { id:"p2", label:"第2部  構造化とデータ処理",         range:[9,16], locked:true,
    groups:[
      { id:"g5", label:"§9–§10  オブジェクト指向",      range:[9,10],  locked:true },
      { id:"g6", label:"§11–§12 GitHub コラボ",         range:[11,12], locked:true },
      { id:"g7", label:"§13–§14 NumPy・Matplotlib",    range:[13,14], locked:true },
      { id:"g8", label:"§15–§16 中間演習",              range:[15,16], locked:true },
    ]},
  { id:"p3", label:"第3部  強化学習の概念と基本実装",   range:[17,24], locked:true,
    groups:[
      { id:"g9",  label:"§17–§18 機械学習と MDP",       range:[17,18], locked:true },
      { id:"g10", label:"§19–§20 価値と方策",           range:[19,20], locked:true },
      { id:"g11", label:"§21–§22 Gymnasium",           range:[21,22], locked:true },
      { id:"g12", label:"§23–§24 DRL への橋渡し",       range:[23,24], locked:true },
    ]},
  { id:"p4", label:"第4部  RLlib の実践と自律",         range:[25,32], locked:true,
    groups:[
      { id:"g13", label:"§25–§26 Ray / RLlib 導入",    range:[25,26], locked:true },
      { id:"g14", label:"§27–§28 カスタム環境",         range:[27,28], locked:true },
      { id:"g15", label:"§29–§30 評価とチューニング",   range:[29,30], locked:true },
      { id:"g16", label:"§31–§32 自律への最終ステップ", range:[31,32], locked:true },
    ]},
];

window.SECTIONS = SECTIONS;
window.subsections = subsections;
window.CURRICULUM = CURRICULUM;
window.AVAILABLE_SECTIONS = ["s1","s2"];
