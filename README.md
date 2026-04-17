# RL Onboarding — Website Prototype

強化学習研究室の後輩4人向け、4ヶ月オンボーディングプログラムの授業資料サイト（プロトタイプ）。

## 🎨 デザインコンセプト

**Lab Notebook × Code Editor** —
研究ノートの知的な雰囲気と、VS Code のような開発環境の精密さを融合したダークテーマ。

- **カラー**: 深い紺碧の背景に、ライムをメインアクセント、シアン・琥珀・マゼンタをサブアクセントとして使用
- **タイポグラフィ**:
  - 見出し: `Fraunces`（エディトリアルなセリフ体、イタリックが美しい）
  - 本文: `Noto Sans JP`
  - コード・ラベル: `JetBrains Mono`
- **テクスチャ**: ごく薄いグリッド背景とノイズオーバーレイで紙のような質感を演出

## 📁 ファイル構成

```
rl-tutorial/
├── index.html        # トップページ（サイトの顔）
├── month1.html       # Month 01 インデックス（週・日の一覧）
├── day03.html        # Day個別ページのサンプル
├── assets/
│   └── style.css     # 全ページ共通スタイル
└── README.md         # このファイル
```

現状プロトタイプとして作成済みのページは上記4ファイル。本番実装時は以下を追加予定:

- `month2.html` / `month3.html` / `month4.html`
- `day01.html` 〜 `day32.html`（全32日分）
- `appendix.html`（エラー集、ドキュメント集、LLM活用、環境構築、用語集）

## 🚀 GitHub Pages へのデプロイ

### 1. リポジトリ作成

```bash
cd rl-tutorial
git init
git add .
git commit -m "initial commit: site prototype"
git branch -M main
git remote add origin https://github.com/<your-org>/rl-onboarding.git
git push -u origin main
```

### 2. Pages 設定

GitHub のリポジトリページで **Settings → Pages** を開き:

- **Source**: `Deploy from a branch`
- **Branch**: `main` / `(root)`
- **Save** をクリック

数分後に `https://<your-org>.github.io/rl-onboarding/` で公開されます。

### 3. カスタムドメイン（任意）

研究室のドメインを使う場合は、リポジトリ直下に `CNAME` ファイルを置きます。

```
rl.your-lab.ac.jp
```

## 🧩 共通デザインシステム

### ページテンプレート

すべてのページは以下の共通要素で構成:

1. **背景レイヤー**: `.grid-bg` + `.noise-overlay`
2. **ヘッダー**: `<header class="site-header">` — ロゴ + ナビ + ステータス
3. **メイン**: ページ固有のコンテンツ
4. **フッター**: `<footer class="site-footer">`

### コードブロック

構文ハイライトは手動クラスで実装（外部ライブラリ不要）:

- `.code-kw` — キーワード（マゼンタ）
- `.code-str` — 文字列（ライム）
- `.code-num` — 数値（琥珀）
- `.code-fn` — 関数名（シアン）
- `.code-cmt` — コメント（グレー・イタリック）

```html
<div class="code-block">
  <div class="code-head">
    <span><span class="code-lang">python</span> · ファイル名</span>
    <button class="code-copy" onclick="copyCode(this)">copy</button>
  </div>
  <div class="code-body"><pre>...</pre></div>
</div>
```

### Callout（注釈）

3種類のバリエーションを用意:

```html
<div class="callout callout-info">     <!-- 情報（シアン） -->
<div class="callout callout-warn">     <!-- 警告・詰まりポイント（琥珀） -->
<div class="callout callout-tip">      <!-- ヒント（ライム） -->
```

## 🛠 今後の拡張候補

- **数式レンダリング**: MDPやベルマン方程式用に [KaTeX](https://katex.org/) を追加
- **ダイアグラム**: 第3・4ヶ月の概念図に [Mermaid](https://mermaid.js.org/) を組み込み
- **構文ハイライト**: コードが増えたら [highlight.js](https://highlightjs.org/) へ移行
- **検索機能**: [Pagefind](https://pagefind.app/) で静的サイト検索を追加
- **ダーク/ライト切り替え**: 現状ダーク固定。CSS変数を切り替えるだけで対応可能

## 📝 ライセンス

研究室内利用を想定。外部公開する場合はコンテンツのライセンスを明記すること。
