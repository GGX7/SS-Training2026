// App shell — sections by number
function useStoredLoc(){
  const read = () => { try { const r = localStorage.getItem("ss-training.loc"); if (r) return JSON.parse(r); } catch{} return { sec:"s1", sub:null }; };
  const [loc,setLoc] = React.useState(read);
  React.useEffect(()=>{ try { localStorage.setItem("ss-training.loc", JSON.stringify(loc)); } catch{} }, [loc]);
  return [loc,setLoc];
}

function SecNav({ sec, onGo }){
  const avail = window.AVAILABLE_SECTIONS;
  const all = window.SECTIONS;
  const i = all.findIndex(s => s.id === sec);
  const prev = i > 0 ? all[i-1] : null;
  const next = i >= 0 && i < all.length-1 ? all[i+1] : null;
  const prevOk = prev && avail.includes(prev.id);
  const nextOk = next && avail.includes(next.id);
  return (
    <div className="day-nav">
      {prevOk ? <a onClick={()=>onGo(prev.id)}><span className="lbl">← 前</span>{prev.label}</a>
              : <a className="disabled"><span className="lbl">—</span>{prev ? "準備中" : "最初の節"}</a>}
      {nextOk ? <a className="next" onClick={()=>onGo(next.id)}><span className="lbl">次 →</span>{next.label}</a>
              : <a className="disabled next"><span className="lbl">—</span>{next ? "準備中" : "最後の節"}</a>}
    </div>
  );
}

function App(){
  const [loc,setLoc] = useStoredLoc();
  const mainRef = React.useRef(null);

  const onPick = (node) => {
    if (node.kind === "SECTION"){
      setLoc({ sec: node.id, sub: null });
      requestAnimationFrame(() => mainRef.current && mainRef.current.scrollTo({ top: 0, behavior: "smooth" }));
    } else if (node.kind === "SUB"){
      setLoc({ sec: node.parentId, sub: node.id });
      requestAnimationFrame(() => {
        const el = document.getElementById(node.id);
        if (el && mainRef.current) mainRef.current.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
      });
    }
  };

  React.useEffect(() => {
    const root = mainRef.current; if (!root) return;
    const onScroll = () => {
      const blocks = root.querySelectorAll("h2");
      let current = null;
      for (const b of blocks){ if (root.scrollTop >= b.offsetTop - 80) current = b.id; }
      if (current && current !== loc.sub) setLoc(p => ({ ...p, sub: current }));
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => root.removeEventListener("scroll", onScroll);
  }, [loc.sec]); // eslint-disable-line

  React.useEffect(() => { if (mainRef.current) mainRef.current.scrollTo({ top: 0 }); }, [loc.sec]);

  const go = (id) => { if (window.AVAILABLE_SECTIONS.includes(id)) setLoc({ sec: id, sub: null }); };

  return (
    <div className="app">
      <window.Rail active={loc.sec} activeSub={loc.sub} onPick={onPick} />
      <main className="main" ref={mainRef}>
        <div className="content">
          {loc.sec === "s1" && <window.S1 />}
          {loc.sec === "s2" && <window.S2 />}
          <SecNav sec={loc.sec} onGo={go} />
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
