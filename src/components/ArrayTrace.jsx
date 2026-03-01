import { useState, useEffect, useRef } from 'react';
import { getPointers } from '../utils/index.js';

export function ArrayTrace({ cur, col, T, algo, darkMode }) {
  const ptrs      = getPointers(cur, algo);
  const swapPair  = cur.swapping?.length === 2 ? `${cur.swapping[0]}-${cur.swapping[1]}` : "";
  const swapRef   = useRef("");
  const [swapAnim, setSwapAnim] = useState("");

  // trigger swap flash animation whenever the swap pair changes
  useEffect(() => {
    if (swapPair && swapPair !== swapRef.current) {
      swapRef.current = swapPair;
      setSwapAnim(swapPair);
      const t = setTimeout(() => setSwapAnim(""), 400);
      return () => clearTimeout(t);
    }
  }, [swapPair]);

  const isComparing = i => cur.comparing?.includes(i);
  const isSwapping  = i => cur.swapping?.includes(i);
  const isSorted    = i => cur.sorted?.includes(i);
  const isMin       = i => cur.minIdx === i;
  const isAnimating = i => swapAnim && (
    i === parseInt(swapAnim.split("-")[0]) || i === parseInt(swapAnim.split("-")[1])
  );

  const cellBg = i => {
    if (isSwapping(i))  return darkMode ? "#ffffff" : "#111133";
    if (isComparing(i)) return col;
    if (isMin(i))       return "#f0a500";
    if (isSorted(i))    return `${col}30`;
    return T.panelHeader;
  };
  const cellBorder = i => {
    if (isSwapping(i))  return darkMode ? "#ffffff" : "#111133";
    if (isComparing(i)) return col;
    if (isMin(i))       return "#f0a500";
    if (isSorted(i))    return `${col}80`;
    return T.border;
  };
  const cellTextColor = i => {
    if (isSwapping(i))  return darkMode ? "#0a0a20" : "#ffffff";
    if (isComparing(i)) return darkMode ? "#fff" : "#fff";
    if (isMin(i))       return "#fff";
    if (isSorted(i))    return col;
    return T.textBody;
  };
  const cellShadow = i => {
    if (isSwapping(i))  return darkMode ? `0 0 16px #ffffffaa, 0 0 6px ${col}` : `0 0 10px #33336688`;
    if (isComparing(i)) return `0 0 10px ${col}99`;
    if (isMin(i))       return `0 0 10px #f0a50099`;
    return "none";
  };

  return (
    <div style={{ position: "relative" }}>
      {/* swap connector arc between swapping cells */}
      {cur.swapping?.length === 2 && (
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          pointerEvents:"none", zIndex:2,
          display:"flex", alignItems:"center",
          justifyContent:"center",
        }}>
          {/* We render this via SVG overlay */}
        </div>
      )}

      <div style={{ display:"flex", gap:"4px", alignItems:"stretch" }}>
        {cur.arr.map((val, i) => {
          const comparing = isComparing(i);
          const swapping  = isSwapping(i);
          const sorted    = isSorted(i);
          const min       = isMin(i);
          const animating = isAnimating(i);
          const ptr       = ptrs[i];

          return (
            <div key={i} style={{
              flex:1, display:"flex", flexDirection:"column",
              alignItems:"center", minWidth:0,
            }}>
              {/* top pointer label */}
              <div style={{
                height:"22px", display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"flex-end",
                marginBottom:"3px",
              }}>
                {swapping && (
                  <span style={{
                    fontSize:"13px", lineHeight:1,
                    animation:"swapBounce 0.35s ease",
                    color: darkMode ? "#ffffff" : "#111133",
                  }}>⇅</span>
                )}
                {comparing && !swapping && (
                  <span style={{
                    fontSize:"11px", lineHeight:1, color:col,
                    animation:"pointerBob 0.6s ease infinite alternate",
                  }}>▼</span>
                )}
                {min && !swapping && !comparing && (
                  <span style={{ fontSize:"11px", lineHeight:1, color:"#f0a500" }}>★</span>
                )}
              </div>

              {/* the cell */}
              <div style={{
                width:"100%", borderRadius:"5px",
                border:`2px solid ${cellBorder(i)}`,
                background:cellBg(i),
                color:cellTextColor(i),
                display:"flex", alignItems:"center", justifyContent:"center",
                fontWeight:700, fontSize:"12px",
                padding:"7px 2px",
                transition:"background 0.15s, border-color 0.15s, color 0.15s",
                boxShadow:cellShadow(i),
                animation: animating ? "swapFlash 0.4s ease" : "none",
                position:"relative",
                fontFamily:"'Courier New',monospace",
              }}>
                {val}
                {/* sorted tick */}
                {sorted && !swapping && !comparing && !min && (
                  <span style={{
                    position:"absolute", top:"-6px", right:"-2px",
                    fontSize:"8px", color:col, lineHeight:1,
                  }}>✓</span>
                )}
              </div>

              {/* bottom: index + variable name */}
              <div style={{
                marginTop:"4px", display:"flex", flexDirection:"column",
                alignItems:"center", gap:"1px",
              }}>
                <div style={{
                  fontSize:"8px", color:T.textDim,
                  fontFamily:"'Courier New',monospace",
                }}>[{i}]</div>
                {ptr && (
                  <div style={{
                    fontSize:"9px", fontWeight:700,
                    color: swapping ? (darkMode?"#fff":"#111") : comparing ? col : min ? "#f0a500" : T.textMid,
                    fontFamily:"'Courier New',monospace",
                    animation: ptr ? "fadeIn 0.2s ease" : "none",
                    whiteSpace:"nowrap",
                  }}>{ptr}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Swap bridge line between swapping cells */}
      {cur.swapping?.length === 2 && (() => {
        const [a, b] = cur.swapping;
        return (
          <div style={{
            position:"absolute", bottom:"28px",
            left:`calc(${(a / cur.arr.length) * 100}% + ${100 / cur.arr.length / 2}%)`,
            right:`calc(${((cur.arr.length - 1 - b) / cur.arr.length) * 100}% + ${100 / cur.arr.length / 2}%)`,
            height:"2px",
            background: `linear-gradient(90deg, ${col}, #ffffff, ${col})`,
            opacity:0.6, borderRadius:"1px",
            animation:"swapFlash 0.4s ease",
            pointerEvents:"none",
          }}/>
        );
      })()}
    </div>
  );
}
