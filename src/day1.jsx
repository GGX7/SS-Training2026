// §1 — 導入と VS Code 構築
function S1(){
  return (
    <article>
      <div className="day-meta">§1 / 32</div>
      <h1>導入と VS Code 構築</h1>
      <p className="lede">
        プログラミングとは、人間の言葉を機械の言葉に翻訳する作業である。今日はその翻訳を助ける道具——エディタ——を手元に用意する。
      </p>

      <h2 id="s1-goal">この節のゴール</h2>
      <ul>
        <li>エディタ・言語・実行環境が別物であることを理解する</li>
        <li>VS Code をインストールし、Python 関連の拡張機能を入れる</li>
        <li>ターミナルから <code>code --version</code> が応答する状態にする</li>
      </ul>

      <h2 id="s1-translate">コードは「翻訳」である</h2>
      <p>
        人間が書いた <code>.py</code> ファイルは、そのままでは CPU には通じない。Python インタプリタが中間表現（バイトコード）へ翻訳し、さらに実行時に機械語へ変換されて初めて動く。
      </p>
      <p>
        この授業の基本方針は、<strong>「おまじない」を禁じ手にすること</strong>である。裏で何が起きているのか、<em>層のイメージ</em>を毎回少しずつ増やしていく。
      </p>

      <h2 id="s1-editor">エディタがしてくれること</h2>
      <ul>
        <li>色付け（シンタックスハイライト）と整形</li>
        <li>タイポや型の不一致をリアルタイムに指摘</li>
        <li>Python・Git・ターミナルといった他のツールを一画面で指揮</li>
      </ul>

      <h2 id="s1-why-vscode">なぜ VS Code か</h2>
      <p>
        研究で使うツール（Python、Jupyter、Git、SSHリモート、LLM 補助プラグイン）が一つの画面で揃う。詰まったときの解説記事も最も多く、自己解決に向いている。
      </p>
      <div className="note">
        <strong>Note</strong>
        Cursor / Windsurf など VS Code 互換エディタは、操作体系がほぼ同じ。乗り換えは後からでも容易。
      </div>

      <h2 id="s1-install">インストール</h2>
      <ol>
        <li>公式サイト（code.visualstudio.com）からインストーラを入手</li>
        <li>自分の OS に合った版を選ぶ（Mac は Apple Silicon / Intel に注意）</li>
        <li>起動後、コマンドパレットで <code>Shell Command: Install 'code' command in PATH</code> を実行</li>
      </ol>
      <pre><span className="p">$ </span><span className="o">code --version</span>
<span className="c">1.95.2</span>
<span className="c">a23v9fg88...</span>
<span className="c">x64</span></pre>

      <h2 id="s1-ext">入れる拡張機能</h2>
      <p>最初は欲張らない。次の3つだけで十分。</p>
      <ul>
        <li><code>Python</code>（発行元: Microsoft）— 実行・デバッガ・仮想環境の自動認識</li>
        <li><code>Pylance</code> — 型推論と補完。定義ジャンプが効くようになる</li>
        <li><code>Jupyter</code> — <code>.ipynb</code> を VS Code 上で扱える</li>
      </ul>
      <div className="note">
        <strong>Caution</strong>
        同名の個人製作版・古い拡張が並ぶことがある。<strong>発行元が Microsoft</strong> のものを選ぶ。
      </div>

      <h2 id="s1-keys">最低限覚えるキー</h2>
      <ul>
        <li><code>⌘P / Ctrl+P</code> — ファイル名でジャンプ</li>
        <li><code>⌘⇧P / Ctrl+Shift+P</code> — コマンドパレット（困ったらこれ）</li>
        <li><code>⌃` / Ctrl+`</code> — ターミナルの表示／非表示</li>
      </ul>

      <h2 id="s1-check">チェック</h2>
      <ul>
        <li>VS Code を起動できる</li>
        <li>Python / Pylance / Jupyter 拡張が入っている</li>
        <li>ターミナルで <code>code --version</code> が応答する</li>
        <li>「エディタ・言語・実行環境は別物」を自分の言葉で説明できる</li>
      </ul>

      <hr />
      <p><strong>次節</strong>: Python 本体を導入し、<em>仮想環境</em>という「部屋を分ける」仕組みを作る。</p>
    </article>
  );
}
window.S1 = S1;
