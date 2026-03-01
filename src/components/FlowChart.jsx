import { FLOWCHART_DEFS } from '../data/index.js';

export function FlowChart({ algoKey, activeKey, color, T }) {
  const def = FLOWCHART_DEFS[algoKey];
  const aid  = `arr-${algoKey}-${T.pageBg.replace('#','')}`;
  const aida = `arr-act-${algoKey}-${T.pageBg.replace('#','')}`;

  const isActive = (node) => {
    if (!node.key || !activeKey) return false;
    return Array.isArray(node.key) ? node.key.includes(activeKey) : node.key === activeKey;
  };
  const activeEdgeSet = new Set(def.activeEdges?.[activeKey] || []);

  const shapeEl = (node, active) => {
    const fill   = active ? `${color}20` : T.fcFill;
    const stroke = active ? color : T.fcStroke;
    const sw     = active ? 2 : 1;
    const filt   = active ? `drop-shadow(0 0 4px ${color})` : "none";
    if (node.shape==="oval")
      return <ellipse cx={node.cx} cy={node.cy} rx={node.rx} ry={node.ry} fill={fill} stroke={stroke} strokeWidth={sw} style={{filter:filt,transition:"all 0.2s"}}/>;
    if (node.shape==="rect")
      return <rect x={node.cx-node.w/2} y={node.cy-node.h/2} width={node.w} height={node.h} rx={3} fill={fill} stroke={stroke} strokeWidth={sw} style={{filter:filt,transition:"all 0.2s"}}/>;
    if (node.shape==="diamond") {
      const pts=`${node.cx},${node.cy-node.hh} ${node.cx+node.hw},${node.cy} ${node.cx},${node.cy+node.hh} ${node.cx-node.hw},${node.cy}`;
      return <polygon points={pts} fill={fill} stroke={stroke} strokeWidth={sw} style={{filter:filt,transition:"all 0.2s"}}/>;
    }
  };

  return (
    <svg viewBox={`0 0 ${def.vw} ${def.vh}`} width="100%" height="100%" style={{overflow:"visible"}}>
      <defs>
        <marker id={aid}  markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={T.fcArrow}/>
        </marker>
        <marker id={aida} markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <polygon points="0,0 7,3.5 0,7" fill={color}/>
        </marker>
      </defs>

      {def.edges.map((edge,i)=>{
        const act = activeEdgeSet.has(i);
        return (
          <g key={i}>
            <path d={edge.d} fill="none"
              stroke={act?color:T.fcEdge} strokeWidth={act?1.8:1.4}
              markerEnd={`url(#${act?aida:aid})`}
              style={{transition:"stroke 0.2s"}}/>
            {edge.label && (
              <text x={edge.lx} y={edge.ly} fill={act?color:T.fcLabelText}
                fontSize="8" fontFamily="'Courier New',monospace" textAnchor="middle"
                style={{transition:"fill 0.2s",userSelect:"none"}}>
                {edge.label.includes("\n")
                  ? edge.label.split("\n").map((l,li)=><tspan key={li} x={edge.lx} dy={li===0?0:9}>{l}</tspan>)
                  : edge.label}
              </text>
            )}
          </g>
        );
      })}

      {def.nodes.map(node=>{
        const active = isActive(node);
        const tc = active ? color : T.fcNodeText;
        return (
          <g key={node.id}>
            {shapeEl(node,active)}
            {node.label.map((line,li)=>(
              <text key={li} x={node.cx} y={node.cy+(li-(node.label.length-1)/2)*12}
                textAnchor="middle" dominantBaseline="central"
                fill={tc} fontSize="9" fontFamily="'Courier New',monospace"
                fontWeight={active?"600":"400"}
                style={{transition:"fill 0.2s",userSelect:"none",pointerEvents:"none"}}>
                {line}
              </text>
            ))}
            {active && (
              <circle cx={node.cx} cy={node.cy} r="3.5" fill={color} opacity="0.85">
                <animate attributeName="r"       values="2.5;5;2.5"     dur="0.85s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.85;0.3;0.85" dur="0.85s" repeatCount="indefinite"/>
              </circle>
            )}
          </g>
        );
      })}
    </svg>
  );
}
