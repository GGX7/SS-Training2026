// Reusable UI atoms for the lesson pages.

function Callout({ kind = "note", label, children }) {
  const labels = { why: "Why?", tip: "Tip", warn: "Caution", note: "Note" };
  return (
    <div className={"callout " + kind}>
      <div className="side">{label || labels[kind]}</div>
      <div className="body">{children}</div>
    </div>
  );
}

function Terminal({ title = "bash", children }) {
  return (
    <div className="term">
      <div className="term-head">
        <div className="lights"><span /><span /><span /></div>
        <span className="ttl">{title}</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}
// Helper line components for terminal rendering
const Prompt = ({ user = "you", host = "mac", cwd = "~" }) =>
  <span><span className="user">{user}@{host}</span>:<span className="prompt">{cwd}</span>$ </span>;
const Cmd = ({ children }) => <span className="cmd">{children}</span>;
const Out = ({ children }) => <span>{children}</span>;
const Cmt = ({ children }) => <span className="cmt"># {children}</span>;
const Ok  = ({ children }) => <span className="ok">{children}</span>;
const Err = ({ children }) => <span className="err">{children}</span>;

function Code({ children }) {
  return <pre className="code">{children}</pre>;
}

function Section({ num, id, title, sub, children }) {
  return (
    <section className="block" id={id} data-screen-label={id}>
      {num && <div className="block-num">{num}</div>}
      <h2 className="block-title">{title}</h2>
      {sub && <p className="block-sub">{sub}</p>}
      {children}
    </section>
  );
}

function Card({ tone = "yellow", tag, title, children }) {
  return (
    <div className="card">
      <h4>
        {tag && <span className={"ico " + (tone !== "yellow" ? tone : "")}>{tag}</span>}
        {title}
      </h4>
      <p>{children}</p>
    </div>
  );
}

function Steps({ items }) {
  return (
    <ol className="steps">
      {items.map((it, i) => (
        <li key={i}>
          <h4>{it.h}</h4>
          {it.p && <p>{it.p}</p>}
          {it.extra}
        </li>
      ))}
    </ol>
  );
}

function Check({ title, items }) {
  const [done, setDone] = React.useState(() => new Set());
  const toggle = (i) => setDone((p) => {
    const n = new Set(p);
    n.has(i) ? n.delete(i) : n.add(i);
    return n;
  });
  return (
    <div className="check">
      <h4>{title || "今日のチェックリスト"}</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i} className={done.has(i) ? "done" : ""} onClick={() => toggle(i)}>
            <span className="box" />
            <span className="lbl">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DayHeader({ chip, title, lede, objective }) {
  return (
    <header className="day-head">
      <div className="day-meta">
        {chip.map((c, i) => (
          <React.Fragment key={i}>
            {i > 0 && <span className="dot">·</span>}
            <span className={c.strong ? "chip" : ""}>{c.t}</span>
          </React.Fragment>
        ))}
      </div>
      <h1 className="day-title">{title}</h1>
      <p className="day-lede">{lede}</p>
      <div className="objective">
        <span className="lbl">Goal</span>
        <span className="txt">{objective}</span>
      </div>
    </header>
  );
}

function DayNav({ prev, next, onGo }) {
  return (
    <div className="day-nav">
      {prev ? (
        <a onClick={() => onGo(prev.id)}>
          <span className="lb">← 前の回</span>
          <span className="ti">{prev.label}</span>
        </a>
      ) : <a className="disabled"><span className="lb">—</span><span className="ti">最初の回です</span></a>}
      {next ? (
        <a className="next" onClick={() => onGo(next.id)}>
          <span className="lb">次の回 →</span>
          <span className="ti">{next.label}</span>
        </a>
      ) : <a className="disabled next"><span className="lb">—</span><span className="ti">続きは準備中</span></a>}
    </div>
  );
}

Object.assign(window, { Callout, Terminal, Prompt, Cmd, Out, Cmt, Ok, Err, Code, Section, Card, Steps, Check, DayHeader, DayNav });
