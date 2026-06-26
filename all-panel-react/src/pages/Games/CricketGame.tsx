import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './CricketGame.css';

const LAST_RESULTS = ['E','I','E','E','I','I','E','E','T','I'];

const FANCY1_LEFT = [
  { name: '0.2 Over Wicket ENG', bOdds: 6.51, bStk: 100 },
  { name: '0.2 Over One ENG',    bOdds: 6.51, bStk: 100 },
  { name: '0.2 Over Three ENG',  bOdds: 6.51, bStk: 100 },
];
const FANCY1_RIGHT = [
  { name: '0.2 Over Zero ENG',   bOdds: 6.51, bStk: 100 },
  { name: '0.2 Over Two ENG',    bOdds: 6.51, bStk: 100 },
  { name: '0.2 Over Boundry ENG',bOdds: 3.64, bStk: 100 },
];

const RULES_CONTENT = (
  <div style={{padding:'32px 40px',fontSize:16,lineHeight:2,color:'#222'}}>
    <p>1. Two wickets are allowed for each batting team in the Super over. If the batting team loses both wickets, then their innings ends.</p>
    <p>2. If scores of the team are same, then the match will be considered as Tie (No Result), Difference of wickets between the team doesn't count.</p>
    <p>3. Session and fancy markets will be considered valid, though the match ends in Tie</p>
    <p>4. Team scoring maximum run in the allocated super over will be considered as winner</p>
    <p>5. Odds will be available for every ball</p>
    <p>6. Results are Based on Stream Only. Streams Played By RNG.</p>
  </div>
);

interface BetSlip { runnerName: string; odds: number; type: 'back' | 'lay'; }
interface PlacedBet { name: string; odds: number; stake: number; }
const QUICK_STAKES = [1000,2000,5000,10000,20000,25000,50000,75000,90000,95000];

const CricketGame: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [roundId] = useState(() => String(Math.floor(Math.random() * 100000) + 48835117605));
  const [betSlip, setBetSlip] = useState<BetSlip | null>(null);
  const [stake, setStake] = useState('');
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef(30);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const triggerResult = useCallback(() => {
    setBetSlip(null); setStake('');
    const results = ['IND WINS', 'ENG WINS', 'MATCH TIED'];
    setResultMsg(results[Math.floor(Math.random() * results.length)]);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false); setIsLocked(false);
      countdownRef.current = 30; setCountdown(30);
    }, 5000);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (showResult) return;
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 3 && countdownRef.current > 0) setIsLocked(true);
      if (countdownRef.current <= 0) { setIsLocked(true); triggerResult(); }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [showResult, triggerResult]);

  const handleBetClick = (name: string, odds: number, type: 'back' | 'lay') => {
    if (isLocked) return;
    setBetSlip({ runnerName: name, odds, type }); setStake('');
  };
  const addStake = (amt: number) => setStake(String((parseInt(stake) || 0) + amt));
  const changeOdds = (d: number) => setBetSlip(b => b ? { ...b, odds: parseFloat((b.odds + d).toFixed(2)) } : b);
  const getProfit = () => {
    if (!betSlip || !stake) return 0;
    return Math.round((parseFloat(stake) || 0) * (betSlip.odds - 1));
  };
  const submitBet = () => {
    if (!betSlip || !stake) return;
    setPlacedBets(prev => [...prev, { name: `${betSlip.runnerName} (${betSlip.type.toUpperCase()})`, odds: betSlip.odds, stake: parseFloat(stake) }]);
    setBetSlip(null); setStake('');
  };

  const displayTime = String(Math.max(0, countdown)).padStart(2, '0');

  return (
    <div className="home-root">

      {/* RULES MODAL */}
      {showRules && (
        <div className="cg-modal-overlay" onClick={() => setShowRules(false)}>
          <div className="cg-modal-box" onClick={e => e.stopPropagation()}>
            <div className="cg-modal-hdr">
              <span>super over2 Rules</span>
              <button onClick={() => setShowRules(false)}>✕</button>
            </div>
            <div className="cg-modal-body">{RULES_CONTENT}</div>
          </div>
        </div>
      )}

      {/* MOBILE BET POPUP */}
      {betSlip && isMobile && (
        <div className="cg-mob-overlay" onClick={() => { setBetSlip(null); setStake(''); }}>
          <div className={`cg-mob-betbox ${betSlip.type === 'back' ? 'cg-mob-back' : 'cg-mob-lay'}`}
            onClick={e => e.stopPropagation()}>
            <div className="cg-mob-hdr">
              <span className="cg-mob-sel">{betSlip.runnerName}</span>
              <span className="cg-mob-profit">Profit: <b>{getProfit()}</b></span>
              <button className="cg-mob-close" onClick={() => { setBetSlip(null); setStake(''); }}>✕</button>
            </div>
            <div className="cg-mob-fields">
              <div className="cg-mob-field">
                <label>Amount</label>
                <input type="number" value={stake} onChange={e => setStake(e.target.value)} />
              </div>
              <div className="cg-mob-field">
                <label>Odds</label>
                <div className="cg-mob-odds-wrap">
                  <button onClick={() => changeOdds(-0.01)}>−</button>
                  <input type="number" value={betSlip.odds}
                    onChange={e => setBetSlip(b => b ? { ...b, odds: parseFloat(e.target.value) } : b)} />
                  <button onClick={() => changeOdds(0.01)}>+</button>
                </div>
              </div>
            </div>
            <div className="cg-mob-chips">
              {QUICK_STAKES.map(v => (
                <button key={v} onClick={() => addStake(v)}>+{v >= 1000 ? (v/1000)+'k' : v}</button>
              ))}
            </div>
            <div className="cg-mob-actions">
              <button className="cg-mob-clear" onClick={() => setStake('')}>clear</button>
<button className="cg-mob-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
              <button className="cg-mob-reset" onClick={() => setStake('')}>Reset</button>
              <button className="cg-mob-submit" onClick={submitBet}>Place Bet</button>
            </div>
          </div>
        </div>
      )}

      <Header activeTab="CRICKET" balance={1500} exp={0} username="Demo" onTabChange={() => navigate('/home')} />
      <div className="home-wrap">
        <Sidebar activeSection={null} onSectionChange={() => {}} />
        <div className="home-content fg-page-wrap">

          <div className="fg-game-bar">
            <div className="fg-game-title">SUPER OVER2 <span className="fg-rules-lnk" onClick={() => setShowRules(true)}>Rules</span></div>
            <div className="fg-round-id">Round ID: {roundId}</div>
          </div>

          <div className="cg-main-layout">
            <div className="cg-center-col">

              {/* STREAM */}
              <div className="cg-stream-frame">
                {showResult && (
                  <div className="fg-result-overlay">
                    <div className="fg-result-banner">{resultMsg}</div>
                  </div>
                )}
                <div className="cg-clock-wrap">
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[0]}</div>
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[1]}</div>
                </div>
              </div>

              {/* ── BOOKMAKER ── */}
              <div className="cg-section-card">
                <div className="cg-section-hdr">Bookmaker</div>
                <table className="cg-table">
                  <thead>
                    <tr>
                      <th className="cg-th-runner"><span className="cg-limit-text">Min: 100.00 Max: 3L</span></th>
                      <th className="cg-th-back">Back</th>
                      <th className="cg-th-lay">Lay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* IND — SUSPENDED */}
                    <tr className="cg-tr">
                      <td className="cg-runner">IND</td>
                      <td colSpan={2} className="cg-susp-td">
                        <button className="cg-suspended-btn" disabled>SUSPENDED</button>
                      </td>
                    </tr>
                    {/* ENG — active odds */}
                    <tr className="cg-tr">
                      <td className="cg-runner">ENG</td>
                      <td className="cg-odds-td">
                        <button
                          className={`cg-odds-btn cg-back${isLocked ? ' cg-locked' : ''}`}
                          onClick={() => handleBetClick('ENG', 1.04, 'back')}
                        >
                          <span className="cg-rate">1.04</span>
                          <span className="cg-vol">300000</span>
                        </button>
                      </td>
                      <td className="cg-odds-td">
                        <button
                          className={`cg-odds-btn cg-lay${isLocked ? ' cg-locked' : ''}`}
                          onClick={() => handleBetClick('ENG', 1.06, 'lay')}
                        >
                          <span className="cg-rate">1.06</span>
                          <span className="cg-vol">300000</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── FANCY1 ── */}
              <div className="cg-section-card">
                <div className="cg-section-hdr">Fancy1</div>
                <div className="cg-fancy1-grid">
                  {/* LEFT */}
                  <table className="cg-table">
                    <thead>
                      <tr>
                        <th className="cg-th-runner"></th>
                        <th className="cg-th-back">Back</th>
                        <th className="cg-th-lay">Lay</th>
                        <th className="cg-th-limit-col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {FANCY1_LEFT.map((r, i) => (
                        <tr key={i} className="cg-tr">
                          <td className="cg-runner">{r.name}</td>
                          <td className="cg-odds-td">
                            <button
                              className={`cg-odds-btn cg-back${isLocked ? ' cg-locked' : ''}`}
                              onClick={() => handleBetClick(r.name, r.bOdds, 'back')}
                            >
                              <span className="cg-rate">{r.bOdds}</span>
                              <span className="cg-vol">{r.bStk}</span>
                            </button>
                          </td>
                          <td className="cg-odds-td">
                            <button className="cg-dash-pink" disabled>-</button>
                          </td>
                          <td className="cg-limit-col">
                            <div>Min: 100.00</div>
                            <div>Max: 10K</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* RIGHT */}
                  <table className="cg-table">
                    <thead>
                      <tr>
                        <th className="cg-th-runner"></th>
                        <th className="cg-th-back">Back</th>
                        <th className="cg-th-lay">Lay</th>
                        <th className="cg-th-limit-col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {FANCY1_RIGHT.map((r, i) => (
                        <tr key={i} className="cg-tr">
                          <td className="cg-runner">{r.name}</td>
                          <td className="cg-odds-td">
                            <button
                              className={`cg-odds-btn cg-back${isLocked ? ' cg-locked' : ''}`}
                              onClick={() => handleBetClick(r.name, r.bOdds, 'back')}
                            >
                              <span className="cg-rate">{r.bOdds}</span>
                              <span className="cg-vol">{r.bStk}</span>
                            </button>
                          </td>
                          <td className="cg-odds-td">
                            <button className="cg-dash-pink" disabled>-</button>
                          </td>
                          <td className="cg-limit-col">
                            <div>Min: 100.00</div>
                            <div>Max: 10K</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* LAST RESULT */}
              <div className="fg-result-bar">
                <span>Last Result</span>
<span className="cg-view-all" onClick={() => navigate('/casino-results')}>View All</span>
              </div>
              <div className="fg-result-circles">
                {LAST_RESULTS.map((r, i) => (
                  <span key={i} className={`cg-result-badge cg-badge-${r}`}>{r}</span>
                ))}
              </div>

            </div>

            {/* RIGHT PANEL */}
            <div className="fg-right-panel">
              {betSlip && !isMobile && (
                <div>
                  <div className="fg-rp-section">Place Bet</div>
                  <div className="fg-bs-header">
                    <span className="fg-bh-sel">(Bet for)</span>
                    <span className="fg-bh-col">Odds</span>
                    <span className="fg-bh-col">Stake</span>
                    <span className="fg-bh-profit">Profit</span>
                  </div>
                  <div className={betSlip.type === 'back' ? 'fg-bs-body-back' : 'fg-bs-body-lay'}>
                    <div className="fg-bs-row">
                      <span className="fg-bs-sel-name">{betSlip.runnerName}</span>
                      <div className="fg-bs-odds-wrap">
                        <input type="number" value={betSlip.odds} step="0.01"
                          onChange={e => setBetSlip(b => b ? { ...b, odds: parseFloat(e.target.value) } : b)} />
                        <div className="fg-bs-arrows">
                          <button onClick={() => changeOdds(0.01)}>▲</button>
                          <button onClick={() => changeOdds(-0.01)}>▼</button>
                        </div>
                      </div>
                      <input type="number" className="fg-bs-stake" value={stake}
                        onChange={e => setStake(e.target.value)} />
                      <span className="fg-bs-profit">{getProfit()}</span>
                    </div>
                    <div className="fg-bs-btns">
                      {QUICK_STAKES.map(v => (
                        <button key={v} className="fg-bs-btn" onClick={() => addStake(v)}>
                          +{v >= 1000 ? (v/1000)+'k' : v}
                        </button>
                      ))}
                    </div>
                    <div className="fg-bs-actions">
                      <button className="fg-btn-clear" onClick={() => { setBetSlip(null); setStake(''); }}>clear</button>
<button className="fg-btn-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
                      <button className="fg-btn-reset" onClick={() => setStake('')}>Reset</button>
                      <button className="fg-btn-submit" onClick={submitBet}>Submit</button>
                    </div>
                  </div>
                </div>
              )}
              <div className="fg-mybet-hdr">My Bet</div>
              <div className="fg-mybet-cols">
                <span>Matched Bet</span><span>Odds</span><span>Stake</span>
              </div>
              <div className="fg-mybet-list">
                {placedBets.length === 0
                  ? <div className="fg-mybet-empty">No bets placed yet.</div>
                  : placedBets.map((b, i) => (
                    <div key={i} className="fg-bet-row">
                      <span className="fg-bet-name">{b.name}</span>
                      <span className="fg-bet-odds">{b.odds}</span>
                      <span className="fg-bet-stake">₹{b.stake}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CricketGame;