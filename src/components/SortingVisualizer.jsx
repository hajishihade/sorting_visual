import { useState, useEffect, useRef } from 'react';
import { THEMES, ALGORITHMS, INITIAL_ARRAY, MAX_VAL } from '../data/index.js';
import { useSorting } from '../hooks/index.js';
import { getExplanation } from '../utils/index.js';
import { FlowChart } from './FlowChart.jsx';
import { ArrayTrace } from './ArrayTrace.jsx';

export function SortingVisualizer() {
  const [darkMode, setDarkMode] = useState(true);
  const codeRefs = useRef({});

  const {
    algo,
    setAlgo,
    stepIdx,
    playing,
    speed,
    setSpeed,
    algoData,
    cur,
    progress,
    reset,
    prev,
    next,
    togglePlay,
  } = useSorting();

  const T = THEMES[darkMode ? "dark" : "light"];
  const col = darkMode ? algoData.color : algoData.lightColor;

  // Scroll to active code line
  useEffect(() => {
    const el = codeRefs.current[cur.line];
    if (el) el.scrollIntoView({block:"nearest",behavior:"smooth"});
  }, [cur.line]);

  // Helper functions for bar chart styling
  const barBg = i => {
    if(cur.swapping?.includes(i))  return T.barSwap;
    if(cur.comparing?.includes(i)) return col;
    if(cur.sorted?.includes(i))    return `${col}60`;
    if(cur.minIdx===i)             return "#f0a500";
    return T.barUnsorted;
  };
  const barGlow = i => {
    if(cur.swapping?.includes(i))  return `0 0 12px ${col}`;
    if(cur.comparing?.includes(i)) return `0 0 7px ${col}88`;
    return "none";
  };

  // reusable styled panel wrapper
  const panel = (extra={}) => ({
    background:T.panelBg, border:`1px solid ${T.border}`,
    borderRadius:"8px", transition:"background 0.3s,border-color 0.3s",
    ...extra,
  });

  const btn = (bg, color, border) => ({
    padding:"7px 13px", borderRadius:"5px",
    border:`1px solid ${border||T.border}`,
    background:bg, color, cursor:"pointer",
    fontFamily:"'Courier New',monospace",
    fontSize:"11px", letterSpacing:"0.4px",
    transition:"all 0.15s",
  });

  return (
    <div style={{background:T.pageBg, minHeight:"100vh", fontFamily:"'Courier New',monospace",
      color:T.textCode, padding:"18px", boxSizing:"border-box", transition:"background 0.3s"}}>

      {/* ── Header ── */}
      <div style={{textAlign:"center",marginBottom:"18px",position:"relative"}}>
        <div style={{fontSize:"9px",letterSpacing:"5px",color:T.textDim,marginBottom:"4px"}}>ALGORITHM VISUALIZER</div>
        <h1 style={{margin:0,fontSize:"24px",fontWeight:700,color:col,
          textShadow: darkMode?`0 0 24px ${col}44`:"none",transition:"all 0.4s"}}>
          {algoData.name}
        </h1>
        <div style={{marginTop:"4px",fontSize:"10px",color:T.textMid}}>{algoData.description}</div>

        {/* Dark/Light Toggle */}
        <button
          onClick={()=>setDarkMode(d=>!d)}
          title={darkMode?"Switch to light mode":"Switch to dark mode"}
          style={{
            position:"absolute", right:0, top:"50%", transform:"translateY(-50%)",
            padding:"7px 14px", borderRadius:"20px",
            border:`1px solid ${T.border}`,
            background:T.panelBg,
            color:T.textMid, cursor:"pointer",
            fontFamily:"'Courier New',monospace",
            fontSize:"11px", letterSpacing:"0.5px",
            display:"flex", alignItems:"center", gap:"6px",
            transition:"all 0.25s",
            boxShadow: darkMode?"0 0 12px #00000066":"0 2px 8px #00000018",
          }}>
          <span style={{fontSize:"14px"}}>{darkMode ? "☀️" : "🌙"}</span>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>

      {/* ── Algorithm Tabs ── */}
      <div style={{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"18px"}}>
        {Object.entries(ALGORITHMS).map(([k,alg])=>{
          const c = darkMode ? alg.color : alg.lightColor;
          return (
            <button key={k} onClick={()=>setAlgo(k)} style={{
              padding:"6px 18px", borderRadius:"5px", cursor:"pointer",
              border: k===algo ? `1px solid ${c}` : `1px solid ${T.tabInactiveBorder}`,
              background: k===algo ? `${c}18` : T.tabInactiveBg,
              color: k===algo ? c : T.tabInactiveColor,
              fontFamily:"'Courier New',monospace", fontSize:"10px",
              fontWeight: k===algo?700:400, letterSpacing:"1px", transition:"all 0.2s",
            }}>{alg.name}</button>
          );
        })}
      </div>

      {/* ── 2-column layout ── */}
      <div style={{display:"flex",gap:"14px",maxWidth:"1400px",margin:"0 auto",alignItems:"flex-start"}}>

        {/* LEFT: Array State + Code */}
        <div style={{flex:"1 1 0",minWidth:0,display:"flex",flexDirection:"column",gap:"12px"}}>

          {/* Bar chart */}
          <div style={{...panel(),padding:"16px"}}>
            <div style={{fontSize:"8px",letterSpacing:"3px",color:T.labelDim,marginBottom:"12px"}}>ARRAY STATE</div>
            <div style={{display:"flex",alignItems:"flex-end",height:"150px",gap:"4px"}}>
              {cur.arr.map((val,i)=>(
                <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",height:"100%"}}>
                  <div style={{flex:1,display:"flex",alignItems:"flex-end",width:"100%"}}>
                    <div style={{
                      width:"100%", height:`${(val/MAX_VAL)*100}%`, minHeight:"4px",
                      background:barBg(i),
                      border:`1px solid ${cur.swapping?.includes(i)||cur.comparing?.includes(i)?col:T.barBorder}`,
                      borderRadius:"3px 3px 0 0",
                      transition:"height 0.14s,background 0.14s,border-color 0.14s",
                      boxShadow:barGlow(i),
                    }}/>
                  </div>
                  <div style={{fontSize:"9px",marginTop:"3px",transition:"color 0.14s",
                    color:cur.comparing?.includes(i)||cur.swapping?.includes(i)?col:T.labelDim}}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Array Trace: live moving cells ── */}
          <div style={{...panel(),padding:"14px 16px"}}>
            <div style={{fontSize:"8px",letterSpacing:"3px",color:T.labelDim,marginBottom:"12px"}}>
              ARRAY TRACE
              <span style={{fontSize:"7px",letterSpacing:"1px",color:T.textDim,marginLeft:"8px"}}>
                — live element movement
              </span>
            </div>
            <ArrayTrace cur={cur} col={col} T={T} algo={algo} darkMode={darkMode}/>
          </div>

          {/* Code panel */}
          <div style={{...panel({background:T.panelBg2}),overflow:"hidden",display:"flex",flexDirection:"column"}}>
            {/* title bar */}
            <div style={{padding:"9px 14px",background:T.panelHeader,
              borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:"7px",
              transition:"background 0.3s"}}>
              {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:"9px",height:"9px",borderRadius:"50%",background:c}}/>)}
              <span style={{fontSize:"8px",letterSpacing:"3px",color:T.textDim,marginLeft:"6px"}}>LIVE CODE EXECUTION</span>
            </div>

            {/* code lines */}
            <div style={{padding:"10px 0"}}>
              {algoData.code.map(({line,indent,key,type})=>{
                const active = cur.line===key;
                return (
                  <div key={key||line} ref={el=>{if(key) codeRefs.current[key]=el;}} style={{
                    paddingTop:"5px", paddingBottom:"5px",
                    paddingLeft:`${16+indent*22}px`, paddingRight:"16px",
                    background: active ? `${col}14` : "transparent",
                    borderLeft: active ? `3px solid ${col}` : `3px solid transparent`,
                    transition:"background 0.2s,border-color 0.2s",
                    display:"flex", alignItems:"center", gap:"9px",
                  }}>
                    {active
                      ? <div style={{width:"6px",height:"6px",borderRadius:"50%",background:col,
                          flexShrink:0,boxShadow:`0 0 7px ${col}`,animation:"pulse 0.9s infinite alternate"}}/>
                      : <div style={{width:"6px",height:"6px",flexShrink:0}}/>
                    }
                    <span style={{
                      fontSize:"13px", letterSpacing:"0.2px",
                      color: type==="def" ? T.textDef : active ? (darkMode?"#ffffff":T.textActive) : T.textCode,
                      fontFamily:"'Courier New',monospace", lineHeight:"1.8",
                      transition:"color 0.2s", whiteSpace:"pre",
                    }}>{line}</span>
                  </div>
                );
              })}
            </div>

            {/* complexity footer */}
            <div style={{padding:"9px 14px",background:T.panelHeader,
              borderTop:`1px solid ${T.border}`,display:"flex",gap:"20px",alignItems:"center",
              transition:"background 0.3s"}}>
              <span style={{fontSize:"8px",letterSpacing:"3px",color:T.labelDim}}>COMPLEXITY</span>
              <span style={{fontSize:"9px",color:T.textMid}}>Worst: <span style={{color:"#e05252"}}>{algoData.complexity}</span></span>
              <span style={{fontSize:"9px",color:T.textMid}}>Best: <span style={{color:"#38a878"}}>{algoData.best}</span></span>
              <span style={{fontSize:"9px",color:T.textMid}}>Space: <span style={{color:"#4488cc"}}>{`O(1)`}</span></span>
            </div>
          </div>
        </div>

        {/* RIGHT: Flowchart + panels + controls */}
        <div style={{width:"290px",flexShrink:0,display:"flex",flexDirection:"column",gap:"12px"}}>

          {/* Flowchart */}
          <div style={{...panel(),overflow:"hidden"}}>
            <div style={{padding:"9px 12px",background:T.panelHeader,
              borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",gap:"7px",
              transition:"background 0.3s"}}>
              <div style={{width:"7px",height:"7px",borderRadius:"50%",background:col,
                boxShadow: darkMode?`0 0 6px ${col}`:"none"}}/>
              <span style={{fontSize:"8px",letterSpacing:"3px",color:T.textDim}}>LIVE FLOWCHART</span>
            </div>
            <div style={{padding:"10px"}}>
              <FlowChart algoKey={algo} activeKey={cur.line} color={col} T={T}/>
            </div>
          </div>

          {/* What's happening */}
          <div style={{...panel(),padding:"12px 14px"}}>
            <div style={{fontSize:"8px",letterSpacing:"3px",color:T.labelDim,marginBottom:"7px"}}>WHAT'S HAPPENING</div>
            <div style={{fontSize:"10px",color:T.textBody,lineHeight:"1.65"}}>
              {getExplanation(cur.line,cur,algo)}
            </div>
          </div>

          {/* Legend */}
          <div style={{...panel(),padding:"10px 14px",display:"flex",gap:"10px",flexWrap:"wrap"}}>
            {[
              {bg:col,           label:"Comparing"},
              {bg:T.barSwap,     bd:T.border, label:"Swap/Shift"},
              {bg:"#f0a500",     label:"Min"},
              {bg:`${col}60`,    label:"Sorted"},
              {bg:T.barUnsorted, bd:T.barBorder, label:"Unsorted"},
            ].map(({bg,bd,label})=>(
              <div key={label} style={{display:"flex",alignItems:"center",gap:"5px"}}>
                <div style={{width:"10px",height:"10px",background:bg,
                  border:`1px solid ${bd||bg}`,borderRadius:"2px"}}/>
                <span style={{fontSize:"9px",color:T.legendText}}>{label}</span>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div style={{...panel(),padding:"12px 14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"8px"}}>
              <span style={{fontSize:"8px",letterSpacing:"3px",color:T.labelDim}}>PROGRESS</span>
              <span style={{fontSize:"9px",color:T.textMid}}>Step {stepIdx+1}/{cur.arr.length > 0 ? "..." : "..."}</span>
            </div>
            <div style={{height:"4px",background:T.progressTrack,borderRadius:"2px"}}>
              <div style={{height:"100%",width:`${progress}%`,background:col,borderRadius:"2px",
                transition:"width 0.14s",boxShadow:darkMode?`0 0 5px ${col}`:"none"}}/>
            </div>
          </div>

          {/* Controls */}
          <div style={{...panel(),padding:"12px 14px",display:"flex",flexDirection:"column",gap:"9px"}}>
            <div style={{display:"flex",gap:"6px",justifyContent:"center",flexWrap:"wrap"}}>
              <button onClick={reset} style={btn(T.btnBg,T.btnText)}>⏮ Reset</button>
              <button onClick={prev} style={btn(T.btnBg,T.btnText)}>⏪ Prev</button>
              <button onClick={togglePlay} style={btn(`${col}22`,col,col)}>
                {playing?"⏸ Pause":"▶  Play"}
              </button>
              <button onClick={next} style={btn(T.btnBg,T.btnText)}>Next ⏩</button>
            </div>
            <div style={{display:"flex",gap:"6px",justifyContent:"center"}}>
              <span style={{fontSize:"9px",color:T.textDim,alignSelf:"center"}}>Speed:</span>
              {["slow","normal","fast"].map(s=>(
                <button key={s} onClick={()=>setSpeed(s)}
                  style={btn(speed===s?`${col}20`:T.speedBg, speed===s?col:T.speedText, speed===s?col:T.border)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{from{opacity:0.35;transform:scale(0.65);}to{opacity:1;transform:scale(1.35);}}
        @keyframes swapFlash{0%{opacity:1;}30%{opacity:0.3;transform:scale(1.12);}60%{opacity:1;transform:scale(0.96);}100%{opacity:1;transform:scale(1);}}
        @keyframes swapBounce{0%{transform:translateY(0);}40%{transform:translateY(-5px);}70%{transform:translateY(2px);}100%{transform:translateY(0);}}
        @keyframes pointerBob{from{transform:translateY(0);}to{transform:translateY(3px);}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:${T.scrollTrack};}
        ::-webkit-scrollbar-thumb{background:${T.scrollThumb};border-radius:2px;}
      `}</style>
    </div>
  );
}
