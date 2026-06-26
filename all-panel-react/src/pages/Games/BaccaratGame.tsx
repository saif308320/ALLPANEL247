import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './BaccaratGame.css';

const LOCK_ICON = (
  <img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg"
    alt="locked" style={{width:16,height:16,filter:'brightness(0) invert(1)'}} />
);

// ── RULES CONTENT ──
const RULES_CONTENT = (
  <div style={{padding:'20px',fontSize:14,lineHeight:1.8,color:'#333'}}>
    <p>In the Baccarat game two hands are dealt; once for the banker and another for the player. The player bets which will win or if they will tie. The winning hand has the closest value to nine. In case of Banker winning, if banker's point sum is equals to 6, then payout will be 50%.</p>
    <h3 style={{color:'#0088cc'}}>Rules for Players:</h3>
    <table style={{width:'100%',borderCollapse:'collapse',marginBottom:16}}>
      <tbody>
        {[['0-1-2-3-4-5','Draw a card'],['6-7','Stands'],['8-9','Natural-Neither hand draws']].map(([v,a],i)=>(
          <tr key={i} style={{background:i%2===0?'#f5f5f5':'#fff'}}>
            <td style={{padding:'8px',border:'1px solid #ddd'}}>{i===0?'When Player\'s first two cards total:':''}</td>
            <td style={{padding:'8px',border:'1px solid #ddd'}}>{v}</td>
            <td style={{padding:'8px',border:'1px solid #ddd'}}>{a}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <h3 style={{color:'#0088cc'}}>Rules for Banker:</h3>
    <p>When the PLAYER stands on 6 or 7, the BANKER will always draw on totals of 0-1-2-3-4 and 5, and stands on 6-7-8 and 9.</p>
    <table style={{width:'100%',borderCollapse:'collapse',marginBottom:16}}>
      <thead><tr style={{background:'#e0e0e0'}}>
        <th style={{padding:'8px',border:'1px solid #ddd'}}>When Banker's first two cards total:</th>
        <th style={{padding:'8px',border:'1px solid #ddd'}}>Draws when Player's third card is:</th>
        <th style={{padding:'8px',border:'1px solid #ddd'}}>Does not draw when:</th>
      </tr></thead>
      <tbody>
        {[['3','1-2-3-4-5-6-7-9-0','8'],['4','2-3-4-5-6-7','1-8-9-0'],['5','4-5-6-7','1-2-3-8-9-0'],
          ['6','6-7','1-2-3-4-5-8-9-0'],['7','STANDS',''],['8-9','NATURAL-NEITHER HAND DRAWS','']
        ].map(([a,b,c],i)=>(
          <tr key={i} style={{background:i%2===0?'#fafafa':'#fff'}}>
            <td style={{padding:'8px',border:'1px solid #ddd',textAlign:'center'}}>{a}</td>
            <td style={{padding:'8px',border:'1px solid #ddd',textAlign:'center'}}>{b}</td>
            <td style={{padding:'8px',border:'1px solid #ddd',textAlign:'center'}}>{c}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>If the PLAYER takes no third card BANKER stands on 6. The hand closest to 9 wins. All Winning bets are paid even money. TIE bets pay 8 for 1</p>
    <h3 style={{color:'#0088cc'}}>Side Bets:</h3>
    <ul>
      <li><b>Player Pair</b> - Bet on the chance that the first two cards dealt to the player, are a pair.</li>
      <li><b>Banker Pair</b> - Bet on the chance that the first two cards dealt to the banker, are a pair.</li>
      <li><b>Big</b> - Total number of cards dealt between Player and Banker is 5 or 6.</li>
      <li><b>Small</b> - Total number of cards dealt between Player and Banker is 4.</li>
      <li><b>Perfect Pair</b> - First two Player or Banker cards form a pair of the same suit.</li>
      <li><b>Either Pair</b> - Either the first two cards of the Banker hand or Player hand (or both) form a pair.</li>
    </ul>
  </div>
);

// ── SVG PIE CHART with % inside each slice ──
const StatCircle: React.FC<{player:number;banker:number;tie:number}> = ({player,banker,tie}) => {
  const total = player + banker + tie;
  const p = total ? Math.round((player/total)*100) : 36;
  const b = total ? Math.round((banker/total)*100) : 54;
  const t = 100 - p - b;

  const cx=80, cy=80, r=76;
  const toRad = (d:number) => (d*Math.PI)/180;
  const pt = (deg:number) => ({
    x: cx + r*Math.cos(toRad(deg-90)),
    y: cy + r*Math.sin(toRad(deg-90)),
  });
  const arc = (s:number,e:number,fill:string) => {
    const sv=pt(s), ev=pt(e);
    const large = e-s>180?1:0;
    return <path key={fill} d={`M${cx},${cy} L${sv.x},${sv.y} A${r},${r} 0 ${large},1 ${ev.x},${ev.y} Z`} fill={fill}/>;
  };
  const label = (s:number,e:number,txt:string) => {
    const mid=(s+e)/2, lr=r*0.6;
    const x=cx+lr*Math.cos(toRad(mid-90)), y=cy+lr*Math.sin(toRad(mid-90));
    return <text key={txt} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="13" fontWeight="700">{txt}</text>;
  };

  const e1=p*3.6, e2=e1+b*3.6;

  return (
    <div className="bc-stat-wrap">
      <svg width="160" height="160" viewBox="0 0 160 160">
        {arc(0, e1, '#2980b9')}
        {arc(e1, e2, '#c0392b')}
        {t>0 && arc(e2, 360, '#27ae60')}
        {p>4 && label(0, e1, `${p}%`)}
        {b>4 && label(e1, e2, `${b}%`)}
        {t>4 && label(e2, 360, `${t}%`)}
      </svg>
      <div className="bc-stat-legend">
        <div><span className="bc-dot" style={{background:'#2980b9'}}/> Player</div>
        <div><span className="bc-dot" style={{background:'#c0392b'}}/> Banker</div>
        <div><span className="bc-dot" style={{background:'#27ae60'}}/> Tie</div>
      </div>
    </div>
  );
};

// ── CARD ──
const Card = ({value,suit}:{value:string;suit:string}) => {
  const red = suit==='♥'||suit==='♦';
  return (
    <div className="bc-card">
      <span style={{fontSize:9,fontWeight:700,color:red?'#c0392b':'#333'}}>{value}</span>
      <span style={{fontSize:10,color:red?'#c0392b':'#333'}}>{suit}</span>
    </div>
  );
};

interface PlacedBet {name:string;odds:string;stake:number;}
interface BetSlip {name:string;odds:string;color:string;}

const SIDE_BETS = [
  {name:'Perfect Pair',odds:'25:1'},
  {name:'Big',odds:'0.54:1'},
  {name:'Small',odds:'1.5:1'},
  {name:'Either Pair',odds:'5:1'},
];
const MAIN_BETS = [
  {name:'Player Pair',odds:'11:1',color:'#1a4a8a'},
  {name:'Player',odds:'1:1',color:'#1565c0'},
  {name:'Tie',odds:'8:1',color:'#1b5e20'},
  {name:'Banker',odds:'1:1',color:'#8b1a1a'},
  {name:'Banker Pair',odds:'11:1',color:'#6b1a1a'},
];
const RESULT_HISTORY = ['B','B','P','P','B','P','B','B','B','P'];
const QUICK_STAKES = [1000,2000,5000,10000,20000,25000,50000,75000,90000,95000];

const BaccaratGame: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [roundId, setRoundId] = useState(()=>String(Math.floor(Math.random()*100000)+104260626000000));
  const [betSlip, setBetSlip] = useState<BetSlip|null>(null);
  const [stake, setStake] = useState('');
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [isMobile, setIsMobile] = useState(()=>window.innerWidth<=900);
  const [mobTab, setMobTab] = useState<'game'|'bet'>('game');
  const timerRef = useRef<ReturnType<typeof setInterval>|null>(null);
  const countdownRef = useRef(30);

  useEffect(()=>{
    const fn=()=>setIsMobile(window.innerWidth<=900);
    window.addEventListener('resize',fn);
    return ()=>window.removeEventListener('resize',fn);
  },[]);

  const triggerResult = useCallback(()=>{
    setBetSlip(null); setStake('');
    const outcomes=['PLAYER WINS!','BANKER WINS!','TIE!'];
    setResultMsg(outcomes[Math.floor(Math.random()*outcomes.length)]);
    setShowResult(true);
    setTimeout(()=>{
      setShowResult(false); setIsLocked(false);
      countdownRef.current=30; setCountdown(30);
      setRoundId(String(Math.floor(Math.random()*100000)+104260626000000));
    },5000);
  },[]);

  useEffect(()=>{
    timerRef.current=setInterval(()=>{
      if(showResult) return;
      countdownRef.current-=1;
      setCountdown(countdownRef.current);
      if(countdownRef.current<=3&&countdownRef.current>0) setIsLocked(true);
      if(countdownRef.current<=0){setIsLocked(true);triggerResult();}
    },1000);
    return ()=>{if(timerRef.current)clearInterval(timerRef.current);};
  },[showResult,triggerResult]);

  const handleBetClick=(name:string,odds:string,color:string)=>{
    if(isLocked) return;
    setBetSlip({name,odds,color}); setStake('');
  };
  const addStake=(amt:number)=>setStake(String((parseInt(stake)||0)+amt));
  const getProfit=()=>{
    if(!betSlip||!stake) return 0;
    const [num,den]=betSlip.odds.split(':').map(Number);
    return Math.round((parseFloat(stake)||0)*(num/(den||1)));
  };
  const submitBet=()=>{
    if(!betSlip||!stake) return;
    setPlacedBets(prev=>[...prev,{name:betSlip.name,odds:betSlip.odds,stake:parseFloat(stake)}]);
    setBetSlip(null); setStake('');
  };

  const displayTime=String(Math.max(0,countdown)).padStart(2,'0');

  return (
    <div className="home-root">

      {/* RULES MODAL */}
      {showRules&&(
        <div className="bc-modal-overlay" onClick={()=>setShowRules(false)}>
          <div className="bc-modal-box" onClick={e=>e.stopPropagation()}>
            <div className="bc-modal-hdr">
              <span>Baccarat Rules</span>
              <button onClick={()=>setShowRules(false)}>✕</button>
            </div>
            <div className="bc-modal-body">{RULES_CONTENT}</div>
          </div>
        </div>
      )}

      {/* MOBILE BET POPUP — white bg, #0088cc top bar */}
      {betSlip&&isMobile&&(
        <div className="bc-mob-overlay" onClick={()=>{setBetSlip(null);setStake('');}}>
          <div className="bc-mob-betbox" onClick={e=>e.stopPropagation()}>
            <div className="bc-mob-hdr">
              <span className="bc-mob-sel">{betSlip.name} ({betSlip.odds})</span>
              <span className="bc-mob-profit">Profit: <b>{getProfit()}</b></span>
              <button className="bc-mob-close" onClick={()=>{setBetSlip(null);setStake('');}}>✕</button>
            </div>
            <div className="bc-mob-body">
              <div className="bc-mob-fields">
                <div className="bc-mob-field">
                  <label>Amount</label>
                  <input type="number" value={stake} onChange={e=>setStake(e.target.value)} placeholder="0"/>
                </div>
                <div className="bc-mob-field">
                  <label>Odds</label>
                  <div className="bc-mob-odds-val">{betSlip.odds}</div>
                </div>
              </div>
              <div className="bc-mob-chips">
                {QUICK_STAKES.map(v=>(
                  <button key={v} onClick={()=>addStake(v)}>+{v>=1000?(v/1000)+'k':v}</button>
                ))}
              </div>
              <div className="bc-mob-actions">
                <button className="bc-mob-clear" onClick={()=>setStake('')}>clear</button>
<button className="bc-btn-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
                <button className="bc-mob-reset" onClick={()=>setStake('')}>Reset</button>
                <button className="bc-mob-submit" onClick={submitBet}>Place Bet</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Header activeTab="BACCARAT" balance={1500} exp={0} username="Demo" onTabChange={()=>navigate('/home')}/>
      <div className="home-wrap">
        <Sidebar activeSection={null} onSectionChange={()=>{}}/>
        <div className="home-content bc-page-wrap">

          {/* GAME BAR */}
          <div className="bc-game-bar">
            <div className="bc-game-title">BACCARAT <span className="bc-rules-lnk" onClick={()=>setShowRules(true)}>Rules</span></div>
            <div className="bc-round-id">Round ID: {roundId}</div>
          </div>

          {/* MOBILE TABS — below game bar */}
          <div className="bc-mob-tabs">
            <button className={`bc-mob-tab${mobTab==='game'?' active':''}`} onClick={()=>setMobTab('game')}>Game</button>
            <button className={`bc-mob-tab${mobTab==='bet'?' active':''}`} onClick={()=>setMobTab('bet')}>Placed bet ({placedBets.length})</button>
            <div className="bc-mob-roundid">Round ID: {roundId}</div>
          </div>

          <div className="bc-main-layout">

            {/* CENTER COLUMN */}
            <div className={`bc-center-col${isMobile&&mobTab==='bet'?' bc-hidden':''}`}>

              {/* VIDEO */}
              <div className="bc-stream-frame">
                {showResult&&(
                  <div className="bc-result-overlay">
                    <div className="bc-result-banner">{resultMsg}</div>
                  </div>
                )}
                <div className="bc-clock-wrap">
                  <div className={`bc-flip-box${countdown<=3?' bc-flip-orange':''}`}>{displayTime[0]}</div>
                  <div className={`bc-flip-box${countdown<=3?' bc-flip-orange':''}`}>{displayTime[1]}</div>
                </div>
              </div>

              {/* STATS + BETS */}
              <div className="bc-stats-sidebets">
                {/* STATISTICS — mobile: full block above; desktop: left sidebar */}
                <div className="bc-statistics">
                  <div className="bc-stat-title">Statistics</div>
                  <StatCircle player={36} banker={54} tie={10}/>
                </div>

                <div className="bc-sidebets-col">
                  {/* SIDE BETS */}
                  <div className="bc-sidebets-grid">
                    {SIDE_BETS.map(sb=>(
                      <button key={sb.name}
                        className={`bc-sidebet-btn${isLocked?' bc-locked':''}`}
                        onClick={()=>handleBetClick(sb.name,sb.odds,'#2c3e50')}>
                        <div className="bc-sb-name">{sb.name}</div>
                        {isLocked
                          ? <div className="bc-sb-lock">{LOCK_ICON}</div>
                          : null}
                        <div className="bc-sb-odds">{sb.odds}</div>
                      </button>
                    ))}
                  </div>

                  {/* MAIN BETS PILL ROW */}
                  <div className="bc-main-bets">
                    {MAIN_BETS.map((mb,i)=>(
                      <button key={mb.name}
                        className={`bc-main-btn${isLocked?' bc-locked':''}${i===0?' bc-pill-left':i===MAIN_BETS.length-1?' bc-pill-right':''}`}
                        style={{background:isLocked?'rgb(86,72,75)':mb.color}}
                        onClick={()=>handleBetClick(mb.name,mb.odds,mb.color)}>
                        <div className="bc-mb-name">{mb.name}</div>
                        {isLocked
                          ? <div className="bc-mb-lock">{LOCK_ICON}</div>
                          : <><div className="bc-mb-cards"><Card value="5" suit="♠"/><Card value="5" suit="♣"/></div>
                            <div className="bc-mb-odds">{mb.odds}</div></>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* LAST RESULT */}
              <div className="bc-result-bar">
                <span>Last Result</span>
<span className="bc-view-all" onClick={() => navigate('/casino-results')}>View All</span>
              </div>
              <div className="bc-result-circles">
                {RESULT_HISTORY.map((r,i)=>(
                  <span key={i} className={`bc-result-badge bc-badge-${r.toLowerCase()}`}>{r}</span>
                ))}
              </div>
            </div>

            {/* MOBILE: PLACED BET TAB */}
            {isMobile&&mobTab==='bet'&&(
              <div className="bc-mob-betlist">
                <div className="bc-mybet-hdr">My Bet</div>
                <div className="bc-mybet-cols"><span>Matched Bet</span><span>Odds</span><span>Stake</span></div>
                <div className="bc-mybet-list">
                  {placedBets.length===0
                    ?<div className="bc-mybet-empty">No bets placed yet.</div>
                    :placedBets.map((b,i)=>(
                      <div key={i} className="bc-bet-row">
                        <span className="bc-bet-name">{b.name}</span>
                        <span className="bc-bet-odds">{b.odds}</span>
                        <span className="bc-bet-stake">₹{b.stake}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* DESKTOP RIGHT PANEL */}
            <div className="bc-right-panel">
              {betSlip&&!isMobile&&(
                <div>
                  <div className="bc-rp-section">Place Bet</div>
                  <div className="bc-bs-header">
                    <span className="bc-bh-sel">(Bet for)</span>
                    <span className="bc-bh-col">Odds</span>
                    <span className="bc-bh-col">Stake</span>
                    <span className="bc-bh-profit">Profit</span>
                  </div>
                  <div className="bc-bs-body" style={{background:betSlip.color+'22',borderLeft:`4px solid ${betSlip.color}`}}>
                    <div className="bc-bs-row">
                      <span className="bc-bs-sel-name">{betSlip.name}</span>
                      <span className="bc-bs-odds-disp">{betSlip.odds}</span>
                      <input type="number" className="bc-bs-stake" value={stake} onChange={e=>setStake(e.target.value)}/>
                      <span className="bc-bs-profit">{getProfit()}</span>
                    </div>
                    <div className="bc-bs-btns">
                      {QUICK_STAKES.map(v=>(
                        <button key={v} className="bc-bs-btn" onClick={()=>addStake(v)}>
                          +{v>=1000?(v/1000)+'k':v}
                        </button>
                      ))}
                    </div>
                    <div className="bc-bs-actions">
                      <button className="bc-btn-clear" onClick={()=>{setBetSlip(null);setStake('');}}>clear</button>
<button className="bc-mob-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
                      <button className="bc-btn-reset" onClick={()=>setStake('')}>Reset</button>
                      <button className="bc-btn-submit" onClick={submitBet}>Submit</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="bc-mybet-hdr">My Bet</div>
              <div className="bc-mybet-cols"><span>Matched Bet</span><span>Odds</span><span>Stake</span></div>
              <div className="bc-mybet-list">
                {placedBets.length===0
                  ?<div className="bc-mybet-empty">No bets placed yet.</div>
                  :placedBets.map((b,i)=>(
                    <div key={i} className="bc-bet-row">
                      <span className="bc-bet-name">{b.name}</span>
                      <span className="bc-bet-odds">{b.odds}</span>
                      <span className="bc-bet-stake">₹{b.stake}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BaccaratGame;