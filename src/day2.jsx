// §2 — Python の導入と仮想環境
function S2(){
  return (
    <article>
      <div className="day-meta">§2 / 32</div>
      <h1>Python の導入と仮想環境</h1>
      <p className="lede">
        世界に Python は一つではない。プロジェクトごとに「部屋」を分ける感覚を持つことが、後の RLlib × Gymnasium のバージョン衝突を回避する最大の武器になる。
      </p>

      <h2 id="s2-goal">この節のゴール</h2>
      <ul>
        <li>自分のマシンで Python が実行できる</li>
        <li><code>venv</code> で隔離された環境を作り、そこから Hello World を出す</li>
        <li>なぜ隔離するのかを自分の言葉で説明できる</li>
      </ul>

      <h2 id="s2-whereispy">Python はどこにいるか</h2>
      <p>
        一台の PC には、システム付属の Python、Homebrew で入れた Python、<code>pyenv</code> で切り替えた Python…… と、<strong>複数の Python が同居している</strong>のが普通である。<code>python</code> コマンドが何を指すかは <code>PATH</code> の順序で決まる。
      </p>
      <pre><span className="p">$ </span><span className="o">which -a python3</span>
/usr/bin/python3
/opt/homebrew/bin/python3
/Users/you/.pyenv/shims/python3</pre>

      <h2 id="s2-install">Python をインストールする</h2>
      <p><strong>macOS</strong>: Homebrew 経由が無難。</p>
      <pre><span className="p">$ </span><span className="o">brew install python@3.12</span>
<span className="p">$ </span><span className="o">python3 --version</span>
Python 3.12.4</pre>
      <p>
        <strong>Windows</strong>: python.org の公式インストーラを使う。インストール時に <strong>「Add python.exe to PATH」にチェック</strong>を入れること。Microsoft Store 版は venv と噛み合わないことがあるため避ける。
      </p>
      <p>
        推奨バージョンは <strong>3.11 または 3.12</strong>。最新すぎると Ray/RLlib が追従していない場合がある。
      </p>

      <h2 id="s2-why-venv">なぜ仮想環境が必要か</h2>
      <p>
        プロジェクト A は <code>gymnasium 0.29</code> と <code>numpy 1.26</code>、プロジェクト B は <code>gymnasium 1.0</code> と <code>numpy 2.0</code> を要求する——このような状況はごく普通に起きる。<em>一つの Python に全部入れる</em>と、片方は必ず壊れる。
      </p>
      <p>
        仮想環境とは <strong>「このプロジェクト専用の Python とライブラリ群が入った箱」</strong>である。箱を切り替えるだけで依存関係が丸ごと入れ替わる。
      </p>
      <div className="note">
        <strong>Why</strong>
        再現性は研究の生命線である。他人（未来の自分を含む）が同じ環境を再現できなければ、その実験は確かめようがない。仮想環境は再現性を守る最小装置。
      </div>

      <h2 id="s2-venv">venv で部屋を作る</h2>
      <p>標準ライブラリの <code>venv</code> を使う。追加インストールは不要。</p>
      <pre><span className="c"># 1. プロジェクト用フォルダを作る</span>
<span className="p">$ </span><span className="o">mkdir rl-training && cd rl-training</span>

<span className="c"># 2. venv を作る（フォルダ名の慣習は .venv）</span>
<span className="p">$ </span><span className="o">python3 -m venv .venv</span>

<span className="c"># 3. 部屋に入る（activate）</span>
<span className="p">$ </span><span className="o">source .venv/bin/activate</span>
<span className="k">(.venv)</span> <span className="p">$ </span><span className="o">which python</span>
/Users/you/rl-training/.venv/bin/python

<span className="c"># 4. 部屋を出る</span>
<span className="k">(.venv)</span> <span className="p">$ </span><span className="o">deactivate</span></pre>
      <p>Windows (PowerShell) の場合：</p>
      <pre><span className="o">PS&gt; .venv\Scripts\Activate.ps1</span></pre>
      <p>
        VS Code には、コマンドパレットで <code>Python: Select Interpreter</code> を開き、<code>.venv</code> の Python を選ぶ。以後、実行ボタンやデバッガは必ずこの部屋を使う。
      </p>
      <div className="note">
        <strong>Caution</strong>
        activate せずに <code>pip install</code> してグローバル Python を汚すのは誰もが一度はやる失敗。プロンプトに <code>(.venv)</code> が付いているか毎回確認する。
      </div>

      <h2 id="s2-hello">Hello, World.</h2>
      <p><code>hello.py</code> を新規作成し、次を書く。</p>
      <pre><span className="c"># hello.py</span>
<span className="k">def</span> main():
    print(<span className="c">"Hello, World."</span>)

<span className="k">if</span> __name__ == <span className="c">"__main__"</span>:
    main()</pre>
      <p>ターミナルから実行：</p>
      <pre><span className="k">(.venv)</span> <span className="p">$ </span><span className="o">python hello.py</span>
Hello, World.</pre>
      <div className="note">
        <strong>Why</strong>
        <code>if __name__ == "__main__":</code> は「このファイルが直接実行されたときだけ <code>main()</code> を呼ぶ」という定石。いまは仕組みを深追いしなくてよい。§6 のモジュール回で回収する。
      </div>

      <h2 id="s2-errors">エラーが出たら</h2>
      <p>
        エラーメッセージをそのまま LLM（ChatGPT / Gemini / Claude）に貼り付け、<strong>答えではなく「意味と可能性のある原因を3つ」を聞く</strong>。LLM を先輩の代わりではなく <em>チューター</em>として使う習慣を今日から身につける。
      </p>

      <h2 id="s2-shell">ターミナルの最低限</h2>
      <ul>
        <li><code>pwd</code> — 今いるフォルダ</li>
        <li><code>ls</code> — 中身を一覧（<code>ls -la</code> で隠しファイルも）</li>
        <li><code>cd</code> — 移動（<code>cd ..</code> で一つ上へ）</li>
        <li><code>mkdir</code> — フォルダを作る</li>
        <li><code>Tab</code> キー — ファイル名の補完。手打ちせずに済むとタイポが減る</li>
      </ul>

      <h2 id="s2-check">チェック</h2>
      <ul>
        <li><code>python3 --version</code> が 3.11 または 3.12 を返す</li>
        <li><code>.venv</code> を activate するとプロンプトに <code>(.venv)</code> が付く</li>
        <li><code>which python</code> が <code>.venv</code> の中のパスを指す</li>
        <li><code>hello.py</code> が実行でき、<code>Hello, World.</code> が表示される</li>
        <li>なぜ仮想環境が必要かを1分で説明できる</li>
      </ul>

      <hr />
      <p><strong>次節</strong>: 変数・データ型。そして「変数は箱ではなく名札である」という、後の <code>step()</code> / <code>reset()</code> 理解に効いてくる概念を扱う。</p>
    </article>
  );
}
window.S2 = S2;
