import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './FootballGame.css';

const WHO_WILL_GOAL = [
  { name: 'Cristiano Ronaldo', bOdds: 6.64, bStk: 100000, lOdds: 7.49, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Lionel Messi',      bOdds: 6.98, bStk: 100000, lOdds: 7.88, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Robert Lewandowski',bOdds: 7.94, bStk: 100000, lOdds: 8.96, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Karim Benzema',     bOdds: 8.80, bStk: 100000, lOdds: 9.93, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Edinson Cavani',    bOdds: 9.87, bStk: 100000, lOdds:11.15, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Luis Suarez',       bOdds:11.01, bStk: 100000, lOdds:12.43, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Neymar',            bOdds:12.65, bStk: 100000, lOdds:14.28, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Sergio Aguero',     bOdds:14.23, bStk: 100000, lOdds:16.06, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Olivier Giroud',    bOdds:16.26, bStk: 100000, lOdds:18.36, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Mohamed Salah',     bOdds:16.86, bStk: 100000, lOdds:19.04, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Kylian Mbappe',     bOdds:18.21, bStk: 100000, lOdds:20.56, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'No Goal',           bOdds:24.91, bStk:  50000, lOdds:27.53, lStk:  50000, min: '100.00', max: '25K' },
];

const METHOD_OF_GOAL = [
  { name: 'Shot Goal',     bOdds: 1.97, bStk: 100000, lOdds: 2.17, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Header Goal',   bOdds: 4.24, bStk: 100000, lOdds: 4.69, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Penalty Goal',  bOdds: 6.27, bStk: 100000, lOdds: 6.93, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'Free Kick Goal',bOdds: 8.84, bStk: 100000, lOdds: 9.77, lStk: 100000, min: '100.00', max: '50K' },
  { name: 'No Goal',       bOdds:24.91, bStk:  50000, lOdds:27.53, lStk:  50000, min: '100.00', max: '25K' },
];

const COMBO_DATA = [
  { name: 'Cristiano Ronaldo and Shot Goal',   bOdds: 12.71, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Robert Lewandowski and Shot Goal',  bOdds: 14.41, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Edinson Cavani and Shot Goal',      bOdds: 19.64, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Neymar and Shot Goal',              bOdds: 25.42, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Olivier Giroud and Shot Goal',      bOdds: 30.87, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Kylian Mbappe and Shot Goal',       bOdds: 36.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Lionel Messi and Header Goal',      bOdds: 28.81, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Karim Benzema and Header Goal',     bOdds: 33.24, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Luis Suarez and Header Goal',       bOdds: 43.22, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Sergio Aguero and Header Goal',     bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Mohamed Salah and Header Goal',     bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Cristiano Ronaldo and Penalty Goal',bOdds: 36.01, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Robert Lewandowski and Penalty Goal',bOdds:61.74, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Edinson Cavani and Penalty Goal',   bOdds: 54.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Neymar and Penalty Goal',           bOdds: 61.74, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Olivier Giroud and Penalty Goal',   bOdds: 86.43, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Lionel Messi and Shot Goal',        bOdds: 13.10, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Karim Benzema and Shot Goal',       bOdds: 14.90, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Luis Suarez and Shot Goal',         bOdds: 25.42, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Sergio Aguero and Shot Goal',       bOdds: 30.87, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Mohamed Salah and Shot Goal',       bOdds: 27.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Kylian Mbappe and Shot Goal',       bOdds: 36.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Cristiano Ronaldo and Header Goal', bOdds: 28.81, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Robert Lewandowski and Header Goal',bOdds: 33.24, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Edinson Cavani and Header Goal',    bOdds: 43.22, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Neymar and Header Goal',            bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Olivier Giroud and Header Goal',    bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Kylian Mbappe and Header Goal',     bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Lionel Messi and Penalty Goal',     bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Karim Benzema and Penalty Goal',    bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
];

interface BetSlip { runnerName: string; odds: number; type: 'back' | 'lay'; }
interface PlacedBet { name: string; odds: number; stake: number; }
interface OddsRow { name: string; bOdds: number; bStk: number; lOdds?: number; lStk?: number; min: string; max: string; }

const RULES_CONTENT = (
  <div style={{padding:'50px',fontSize:16,lineHeight:1.8,color:'#333'}}>
    <h3 style={{color:'#0088cc',marginTop:0}}>1. Objective</h3>
    <p>The goal of this game is to predict which player or method will result in the next goal, providing players with exciting opportunities to win big.</p>
    <h3 style={{color:'#0088cc'}}>2. Betting Options</h3>
    <h4 style={{color:'#0088cc'}}>A. Who Will Goal Next?</h4>
    <ul>
      <li><b>Description:</b> Predict which player will score the next goal.</li>
      <li><b>Winning Criteria:</b> If the selected player scores the next goal, the bet is won.</li>
      <li><b>No Goal Condition:</b> If no goal is scored, the bet is considered a No Goal.</li>
    </ul>
    <h4 style={{color:'#0088cc'}}>B. Method of the Next Goal</h4>
    <ul>
      <li><b>Header Goal:</b> The goal scorer must use their head to score.</li>
      <li><b>Free-kick Goal:</b> Scored directly from a free-kick.</li>
      <li><b>Penalty Goal:</b> Scored from a penalty.</li>
      <li><b>Shot Goal:</b> All other types of goals including shots from open play.</li>
    </ul>
    <h3 style={{color:'#0088cc'}}>3. General Rules</h3>
    <p><b>No Goal Condition:</b> If no goal is scored, the bet will be marked as a No Goal.</p>
    <p><b>Goal Misses or Saved Shots:</b> Bets placed on that player or method will be settled as No Goal.</p>
    <p><b>Broadcast Delays:</b> The final result will be determined by official rules and video evidence.</p>
    <h3 style={{color:'#0088cc'}}>4. Disclaimers</h3>
    <p><b>Official Decision:</b> The casino's decision based on video reviews will be final.</p>
    <p><b>Video Evidence:</b> The casino reserves the right to use available video footage to confirm whether a goal was scored.</p>
    <h3 style={{color:'#0088cc'}}>5. Terms of Participation</h3>
    <p>All players must be aware of the potential delay in goal announcements due to broadcast lag.</p>
    <p>Players accept that the casino's decision is final in the event of any discrepancies.</p>
    <p style={{textAlign:'center',fontWeight:700}}>"Best of luck! Enjoy the excitement of the casino and win BIG!"</p>
    <h3 style={{color:'#0088cc'}}>C. Method Of Combination Goal</h3>
    <p><b>Description:</b> Predict the player who will score the next goal and the method by which the goal will be scored.</p>
    <p><b>Examples:</b></p>
    <ul>
      <li>Cristiano Ronaldo + Free-Kick Goal</li>
      <li>Lionel Messi + Header Goal</li>
      <li>Cristiano Ronaldo + Penalty Goal</li>
      <li>Lionel Messi + Shot Goal</li>
    </ul>
    <h4 style={{color:'#0088cc'}}>Winning Criteria</h4>
    <p>Both selections must be correct:</p>
    <ol>
      <li>The selected player must score the next goal; and</li>
      <li>The goal must be scored by the selected method.</li>
    </ol>
    <h4 style={{color:'#0088cc'}}>Settlement Rules</h4>
    <ul>
      <li>If the selected player scores using the selected method, the bet wins.</li>
      <li>If the selected player scores but by a different method, the bet loses.</li>
      <li>If a different player uses the selected method, the bet loses.</li>
    </ul>
  </div>
);

const OddsTable: React.FC<{
  title: string; data: OddsRow[]; hasLay: boolean; isLocked: boolean;
  onBetClick: (name: string, odds: number, type: 'back' | 'lay') => void;
}> = ({ title, data, hasLay, isLocked, onBetClick }) => (
  <div className="fg-market-card">
    <div className="fg-market-hdr">{title}</div>
    <table className="fg-table">
      <thead>
        <tr>
          <th className="fg-th-left"></th>
          <th className="fg-th-back">Back</th>
          {hasLay && <th className="fg-th-lay">Lay</th>}
          <th className="fg-th-limit">Limits</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="fg-tr">
            <td className="fg-runner">{row.name}</td>
            <td className="fg-odds-td">
              <button className={`fg-odds-btn fg-back${isLocked ? ' fg-locked' : ''}`}
                onClick={() => !isLocked && onBetClick(row.name, row.bOdds, 'back')}>
                {isLocked ? <span className="fg-lock-icon"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="locked" style={{width:14,height:14,filter:"brightness(0) invert(1)"}} /></span> : (
                  <><span className="fg-rate">{row.bOdds}</span><span className="fg-vol">{row.bStk}</span></>
                )}
              </button>
            </td>
            {hasLay && (
              <td className="fg-odds-td">
                <button className={`fg-odds-btn fg-lay${isLocked ? ' fg-locked' : ''}`}
                  onClick={() => !isLocked && row.lOdds && onBetClick(row.name, row.lOdds, 'lay')}>
                  {isLocked ? <span className="fg-lock-icon"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="locked" style={{width:14,height:14,filter:"brightness(0) invert(1)"}} /></span> : (
                    <><span className="fg-rate">{row.lOdds}</span><span className="fg-vol">{row.lStk}</span></>
                  )}
                </button>
              </td>
            )}
            <td className="fg-limit-td">
              <div>Min: {row.min}</div>
              <div className="fg-max">Max: {row.max}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ComboTable: React.FC<{
  data: OddsRow[]; isLocked: boolean;
  onBetClick: (name: string, odds: number, type: 'back' | 'lay') => void;
}> = ({ data, isLocked, onBetClick }) => {
  const left = data.filter((_, i) => i % 2 === 0);
  const right = data.filter((_, i) => i % 2 === 1);
  return (
    <div className="fg-market-card fg-combo-full">
      <div className="fg-market-hdr">Method Of Combination Goal</div>
      <div className="fg-combo-grid">
        {[left, right].map((half, hi) => (
          <table key={hi} className="fg-table">
            <thead><tr><th className="fg-th-left"></th><th className="fg-th-back">Back</th><th className="fg-th-limit">Limits</th></tr></thead>
            <tbody>
              {half.map((row, i) => (
                <tr key={i} className="fg-tr">
                  <td className="fg-runner">{row.name}</td>
                  <td className="fg-odds-td">
                    <button className={`fg-odds-btn fg-back${isLocked ? ' fg-locked' : ''}`}
                      onClick={() => !isLocked && onBetClick(row.name, row.bOdds, 'back')}>
                      {isLocked ? <span className="fg-lock-icon"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="locked" style={{width:14,height:14,filter:"brightness(0) invert(1)"}} /></span> : <><span className="fg-rate">{row.bOdds}</span><span className="fg-vol">{row.bStk}</span></>}
                    </button>
                  </td>
                  <td className="fg-limit-td"><div>Min: {row.min}</div><div className="fg-max">Max: {row.max}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

const FootballGame: React.FC = () => {
    const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [roundId, setRoundId] = useState(() => String(Math.floor(Math.random() * 100000) + 196260623210000));
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
    const names = ['CRISTIANO RONALDO', 'LIONEL MESSI', 'ROBERT LEWANDOWSKI', 'KYLIAN MBAPPE'];
    setResultMsg(`SHOT GOAL BY ${names[Math.floor(Math.random() * names.length)]}`);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false); setIsLocked(false);
      countdownRef.current = 30; setCountdown(30);
      setRoundId(String(Math.floor(Math.random() * 100000) + 196260623210000));
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
  const QUICK_STAKES = [1000,2000,5000,10000,20000,25000,50000,75000,90000,95000];

  return (
    <div className="home-root">

      {/* RULES MODAL */}
      {showRules && (
        <div className="fg-modal-overlay" onClick={() => setShowRules(false)}>
          <div className="fg-modal-box" onClick={e => e.stopPropagation()}>
            <div className="fg-modal-hdr">
              <span>Goal 2 Rules</span>
              <button onClick={() => setShowRules(false)}>✕</button>
            </div>
            <div className="fg-modal-body">{RULES_CONTENT}</div>
          </div>
        </div>
      )}

      {/* MOBILE BET POPUP — match-details style, slides from TOP */}
      {betSlip && isMobile && (
        <div className="fg-mob-overlay" onClick={() => { setBetSlip(null); setStake(''); }}>
          <div
            className={`fg-mob-betbox ${betSlip.type === 'back' ? 'fg-mob-back' : 'fg-mob-lay'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="fg-mob-hdr">
              <span className="fg-mob-sel">{betSlip.runnerName}</span>
              <span className="fg-mob-profit">Profit: <b>{getProfit()}</b></span>
              <button className="fg-mob-close" onClick={() => { setBetSlip(null); setStake(''); }}>✕</button>
            </div>
            <div className="fg-mob-fields">
              <div className="fg-mob-field">
                <label>Amount</label>
                <input type="number" value={stake} placeholder=""
                  onChange={e => setStake(e.target.value)} />
              </div>
              <div className="fg-mob-field">
                <label>Odds</label>
                <div className="fg-mob-odds-wrap">
                  <button onClick={() => changeOdds(-0.01)}>−</button>
                  <input type="number" value={betSlip.odds}
                    onChange={e => setBetSlip(b => b ? { ...b, odds: parseFloat(e.target.value) } : b)} />
                  <button onClick={() => changeOdds(0.01)}>+</button>
                </div>
              </div>
            </div>
            <div className="fg-mob-chips">
              {QUICK_STAKES.map(v => (
                <button key={v} onClick={() => addStake(v)}>
                  +{v >= 1000 ? (v/1000)+'k' : v}
                </button>
              ))}
            </div>
            <div className="fg-mob-actions">
              <button className="fg-mob-clear" onClick={() => setStake('')}>clear</button>
<button className="fg-mob-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
              <button className="fg-mob-reset" onClick={() => setStake('')}>Reset</button>
              <button className="fg-mob-submit" onClick={submitBet}>Place Bet</button>
            </div>
          </div>
        </div>
      )}

      <Header activeTab="FOOTBALL" balance={1500} exp={0} username="Demo" onTabChange={() => navigate('/home')} />
      <div className="home-wrap">
        <Sidebar activeSection={null} onSectionChange={() => {}} />
        <div className="home-content fg-page-wrap">

          <div className="fg-game-bar">
            <div className="fg-game-title">GOAL 2 <span className="fg-rules-lnk" onClick={() => setShowRules(true)}>Rules</span></div>
            <div className="fg-round-id">Round ID: {roundId}</div>
          </div>

          <div className="fg-main-layout">
            <div className="fg-center-col">

              <div className="fg-stream-frame">
                {showResult && (
                  <div className="fg-result-overlay">
                    <div className="fg-result-banner">{resultMsg}</div>
                  </div>
                )}
                <div className="fg-clock-wrap">
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[0]}</div>
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[1]}</div>
                </div>
              </div>

              <div className="fg-markets-grid">
                <OddsTable title="Who Will Goal Next?" data={WHO_WILL_GOAL} hasLay={true} isLocked={isLocked} onBetClick={handleBetClick} />
                <OddsTable title="Method Of Next Goal" data={METHOD_OF_GOAL} hasLay={true} isLocked={isLocked} onBetClick={handleBetClick} />
                <ComboTable data={COMBO_DATA} isLocked={isLocked} onBetClick={handleBetClick} />
              </div>

              <div className="fg-result-bar">
                <span>Last Result</span>
<span className="fg-view-all" onClick={() => navigate('/casino-results')}>View All</span>
              </div>
              <div className="fg-result-circles">
                {['R','R','R','R','R','R','R','R','R','R'].map((r, i) => (
                  <span key={i} className="fg-result-badge">{r}</span>
                ))}
              </div>

              <div className="">
                <div className="fg-secure-wrap">
                  <div>
                    <div className="fg-safe-bold"></div>
                    <div className="fg-safe-sub"></div>
                  </div>
                </div>
                <div className="fg-compliance-right">
                 
                </div>
              </div>
            </div>

            {/* DESKTOP RIGHT PANEL — match-details style */}
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
                      <input type="number" className="fg-bs-stake" placeholder="" value={stake}
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

export default FootballGame;