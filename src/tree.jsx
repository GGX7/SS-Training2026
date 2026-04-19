// Tree — part / chapter / section / sub
function TreeRow({ node, openIds, toggle, active, activeSub, onPick }){
  const locked = !!node.locked;
  const isLeaf = !node.children || node.children.length === 0;
  const isActive = (node.kind === "SECTION" && active === node.id && !activeSub) ||
                   (node.kind === "SUB" && active === node.parentId && activeSub === node.id);
  const open = openIds.has(node.id);
  const k = (node.kind || "").toLowerCase();

  return (
    <li>
      <div
        className={["t-row", k && "t-"+k, isActive && "is-active", locked && "locked"].filter(Boolean).join(" ")}
        onClick={() => {
          if (locked) return;
          if (!isLeaf) toggle(node.id);
          if (node.kind === "SECTION" || node.kind === "SUB") onPick(node);
        }}
      >
        {!isLeaf
          ? <span className={"t-chevron" + (open ? " open" : "")}>▶</span>
          : <span className="t-leaf" aria-hidden="true" />
        }
        <span className="t-label">{node.label}</span>
      </div>
      {!isLeaf && open && (
        <ul className="t-children">
          {node.children.map(c => (
            <TreeRow key={c.id} node={c} openIds={openIds} toggle={toggle}
              active={active} activeSub={activeSub} onPick={onPick} />
          ))}
        </ul>
      )}
    </li>
  );
}

function buildTree(){
  const SECTIONS = window.SECTIONS, subs = window.subsections;
  return window.CURRICULUM.map(p => ({
    id:p.id, label:p.label, locked:p.locked, kind:"PART",
    children: (p.groups||[]).map(g => ({
      id:g.id, label:g.label, locked:g.locked, kind:"CHAPTER",
      children: SECTIONS.filter(s => s.n >= g.range[0] && s.n <= g.range[1]).map(s => ({
        id:s.id, label:s.label, kind:"SECTION", locked: !s.available,
        children: (subs(s.id)||[]).map(ss => ({ id:ss.id, label:ss.label, kind:"SUB", parentId:s.id })),
      })),
    })),
  }));
}

function Rail({ active, activeSub, onPick, dark, onToggleTheme }){
  const tree = React.useMemo(buildTree, []);
  const [openIds,setOpenIds] = React.useState(() => new Set(["p1","g1","s1","s2"]));
  React.useEffect(() => {
    if (!active) return;
    setOpenIds(prev => {
      const n = new Set(prev); n.add(active);
      for (const p of window.CURRICULUM)
        for (const g of (p.groups||[]))
          for (const s of window.SECTIONS)
            if (s.id === active && s.n >= g.range[0] && s.n <= g.range[1]){ n.add(g.id); n.add(p.id); }
      return n;
    });
  }, [active]);
  const toggle = (id) => setOpenIds(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <aside className="rail">
      <div className="rail-head">
        <div className="rail-head-row">
          <div className="rail-title">SS-Training 2026</div>
          <button className="theme-btn" onClick={onToggleTheme}
            title={dark ? "ライトモードへ" : "ダークモードへ"}>
            {dark ? "☀" : "☽"}
          </button>
        </div>
        <div className="rail-sub">強化学習研究 · 全4部 16章 32節</div>
      </div>
      <div className="rail-body">
        <ul className="tree">
          {tree.map(p => (
            <TreeRow key={p.id} node={p} openIds={openIds} toggle={toggle}
              active={active} activeSub={activeSub} onPick={onPick} />
          ))}
        </ul>
      </div>
    </aside>
  );
}
window.Rail = Rail;
