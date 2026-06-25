import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './Games.css';

// ===================== DATA =====================
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
  { name: 'Cristiano Ronaldo and Shot Goal',  bOdds: 12.71, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Robert Lewandowski and Shot Goal', bOdds: 14.41, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Edinson Cavani and Shot Goal',     bOdds: 19.64, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Neymar and Shot Goal',             bOdds: 25.42, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Olivier Giroud and Shot Goal',     bOdds: 30.87, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Kylian Mbappe and Shot Goal',      bOdds: 36.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Lionel Messi and Header Goal',     bOdds: 28.81, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Karim Benzema and Header Goal',    bOdds: 33.24, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Luis Suarez and Header Goal',      bOdds: 43.22, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Sergio Aguero and Header Goal',    bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Mohamed Salah and Header Goal',    bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Cristiano Ronaldo and Penalty Goal',bOdds:36.01, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Robert Lewandowski and Penalty Goal',bOdds:61.74,bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Edinson Cavani and Penalty Goal',  bOdds: 54.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Neymar and Penalty Goal',          bOdds: 61.74, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Olivier Giroud and Penalty Goal',  bOdds: 86.43, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Lionel Messi and Shot Goal',       bOdds: 13.10, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Karim Benzema and Shot Goal',      bOdds: 14.90, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Luis Suarez and Shot Goal',        bOdds: 25.42, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Sergio Aguero and Shot Goal',      bOdds: 30.87, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Mohamed Salah and Shot Goal',      bOdds: 27.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Kylian Mbappe and Shot Goal',      bOdds: 36.01, bStk: 50000, min: '100.00', max: '25K' },
  { name: 'Cristiano Ronaldo and Header Goal',bOdds: 28.81, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Robert Lewandowski and Header Goal',bOdds:33.24, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Edinson Cavani and Header Goal',   bOdds: 43.22, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Neymar and Header Goal',           bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Olivier Giroud and Header Goal',   bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Kylian Mbappe and Header Goal',    bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Lionel Messi and Penalty Goal',    bOdds: 48.02, bStk: 20000, min: '100.00', max: '10K' },
  { name: 'Karim Benzema and Penalty Goal',   bOdds: 72.03, bStk: 20000, min: '100.00', max: '10K' },
];

interface BetSlip {
  runnerName: string;
  odds: number;
  type: 'back' | 'lay';
}

interface PlacedBet {
  name: string;
  odds: number;
  stake: number;
}

interface OddsRow {
  name: string;
  bOdds: number;
  bStk: number;
  lOdds?: number;
  lStk?: number;
  min: string;
  max: string;
}

// ===================== ODDS TABLE =====================
const OddsTable: React.FC<{
  title: string;
  data: OddsRow[];
  hasLay: boolean;
  isLocked: boolean;
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
              <button
                className={`fg-odds-btn fg-back${isLocked ? ' fg-locked' : ''}`}
                onClick={() => !isLocked && onBetClick(row.name, row.bOdds, 'back')}
              >
                {isLocked ? <span className="fg-lock-icon">🔒</span> : (
                  <><span className="fg-rate">{row.bOdds}</span><span className="fg-vol">{row.bStk}</span></>
                )}
              </button>
            </td>
            {hasLay && (
              <td className="fg-odds-td">
                <button
                  className={`fg-odds-btn fg-lay${isLocked ? ' fg-locked' : ''}`}
                  onClick={() => !isLocked && row.lOdds && onBetClick(row.name, row.lOdds, 'lay')}
                >
                  {isLocked ? <span className="fg-lock-icon">🔒</span> : (
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

// ===================== COMBO TABLE =====================
const ComboTable: React.FC<{
  data: OddsRow[];
  isLocked: boolean;
  onBetClick: (name: string, odds: number, type: 'back' | 'lay') => void;
}> = ({ data, isLocked, onBetClick }) => {
  const left = data.filter((_, i) => i % 2 === 0);
  const right = data.filter((_, i) => i % 2 === 1);
  return (
    <div className="fg-market-card fg-combo-full">
      <div className="fg-market-hdr">Method Of Combination Goal</div>
      <div className="fg-combo-grid">
        <table className="fg-table">
          <thead><tr><th className="fg-th-left"></th><th className="fg-th-back">Back</th><th className="fg-th-limit">Limits</th></tr></thead>
          <tbody>
            {left.map((row, i) => (
              <tr key={i} className="fg-tr">
                <td className="fg-runner">{row.name}</td>
                <td className="fg-odds-td">
                  <button className={`fg-odds-btn fg-back${isLocked ? ' fg-locked' : ''}`} onClick={() => !isLocked && onBetClick(row.name, row.bOdds, 'back')}>
                    {isLocked ? <span className="fg-lock-icon">🔒</span> : <><span className="fg-rate">{row.bOdds}</span><span className="fg-vol">{row.bStk}</span></>}
                  </button>
                </td>
                <td className="fg-limit-td"><div>Min: {row.min}</div><div className="fg-max">Max: {row.max}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="fg-table">
          <thead><tr><th className="fg-th-left"></th><th className="fg-th-back">Back</th><th className="fg-th-limit">Limits</th></tr></thead>
          <tbody>
            {right.map((row, i) => (
              <tr key={i} className="fg-tr">
                <td className="fg-runner">{row.name}</td>
                <td className="fg-odds-td">
                  <button className={`fg-odds-btn fg-back${isLocked ? ' fg-locked' : ''}`} onClick={() => !isLocked && onBetClick(row.name, row.bOdds, 'back')}>
                    {isLocked ? <span className="fg-lock-icon">🔒</span> : <><span className="fg-rate">{row.bOdds}</span><span className="fg-vol">{row.bStk}</span></>}
                  </button>
                </td>
                <td className="fg-limit-td"><div>Min: {row.min}</div><div className="fg-max">Max: {row.max}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ===================== MAIN COMPONENT =====================
const FootballGame: React.FC = () => {
  const [countdown, setCountdown] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [roundId, setRoundId] = useState(() => String(Math.floor(Math.random() * 100000) + 196260623210000));
  const [betSlip, setBetSlip] = useState<BetSlip | null>(null);
  const [stake, setStake] = useState('');
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef(30);

  const triggerResult = useCallback(() => {
    setBetSlip(null);
    setStake('');
    const names = ['CRISTIANO RONALDO', 'LIONEL MESSI', 'ROBERT LEWANDOWSKI', 'KYLIAN MBAPPE'];
    const winner = names[Math.floor(Math.random() * names.length)];
    setResultMsg(`SHOT GOAL BY ${winner}`);
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setIsLocked(false);
      countdownRef.current = 30;
      setCountdown(30);
      setRoundId(String(Math.floor(Math.random() * 100000) + 196260623210000));
    }, 5000);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (showResult) return;
      countdownRef.current -= 1;
      setCountdown(countdownRef.current);
      if (countdownRef.current <= 3 && countdownRef.current > 0) setIsLocked(true);
      if (countdownRef.current <= 0) {
        setIsLocked(true);
        triggerResult();
      }
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [showResult, triggerResult]);

  const handleBetClick = (name: string, odds: number, type: 'back' | 'lay') => {
    setBetSlip({ runnerName: name, odds, type });
    setStake('');
  };

  const addStake = (amt: number) => {
    const cur = parseInt(stake) || 0;
    setStake(String(cur + amt));
  };

  const getProfit = () => {
    if (!betSlip || !stake) return 0;
    const s = parseFloat(stake) || 0;
    return Math.round((s * betSlip.odds) - s);
  };

  const submitBet = () => {
    if (!betSlip || !stake) return;
    setPlacedBets(prev => [...prev, {
      name: `${betSlip.runnerName} (${betSlip.type.toUpperCase()})`,
      odds: betSlip.odds,
      stake: parseFloat(stake),
    }]);
    setBetSlip(null);
    setStake('');
  };

  const displayTime = String(Math.max(0, countdown)).padStart(2, '0');

  return (
    <div className="home-root">
      <Header activeTab="FOOTBALL" balance={1500} exp={0} username="Demo" onTabChange={() => {}} />
      <div className="home-wrap">
        <Sidebar activeSection={null} onSectionChange={() => {}} />
        <div className="home-content fg-page-wrap">

          {/* GAME HEADER BAR */}
          <div className="fg-game-bar">
            <div className="fg-game-title">GOAL 2 <span className="fg-rules-lnk">Rules</span></div>
            <div className="fg-round-id">Round ID: {roundId}</div>
          </div>

          <div className="fg-main-layout">
            {/* CENTER CONTENT */}
            <div className="fg-center-col">

              {/* VIDEO / STREAM FRAME */}
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

              {/* MARKETS GRID */}
              <div className="fg-markets-grid">
                <OddsTable title="Who Will Goal Next?" data={WHO_WILL_GOAL} hasLay={true} isLocked={isLocked} onBetClick={handleBetClick} />
                <OddsTable title="Method Of Next Goal" data={METHOD_OF_GOAL} hasLay={true} isLocked={isLocked} onBetClick={handleBetClick} />
                <ComboTable data={COMBO_DATA} isLocked={isLocked} onBetClick={handleBetClick} />
              </div>

              {/* LAST RESULT */}
              <div className="fg-result-bar">
                <span>Last Result</span>
                <span className="fg-view-all">View All</span>
              </div>
              <div className="fg-result-circles">
                {['R','R','R','R','R','R','R','R','R','R'].map((r, i) => (
                  <span key={i} className="fg-result-badge">{r}</span>
                ))}
              </div>

              {/* FOOTER */}
              <div className="fg-compliance-row">
                <div className="fg-secure-wrap">
                  <span className="fg-secure-badge">✓ SECURE</span>
                  <div>
                    <div className="fg-safe-bold">100% SAFE</div>
                    <div className="fg-safe-sub">Protected connection and encrypted data.</div>
                  </div>
                </div>
                <div className="fg-compliance-right">
                  <span className="fg-age-pill">18+</span>
                  <span className="fg-gig-pill">GIG</span>
                  <span>© Copyright 2026. Powered by ALLPANEL247</span>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="fg-right-panel">

              {/* PLACE BET */}
              {betSlip && (
                <div className={`fg-place-bet-card fg-bet-${betSlip.type}`}>
                  <div className="fg-pb-hdr">Place Bet</div>
                  <div className="fg-pb-cols">
                    <span>(Bet for)</span><span>Odds</span><span>Stake</span><span>Profit</span>
                  </div>
                  <div className="fg-pb-inputs">
                    <span className="fg-pb-runner">{betSlip.runnerName}</span>
                    <input className="fg-pb-odds" type="number" value={betSlip.odds} readOnly />
                    <input className="fg-pb-stake" type="number" value={stake} onChange={e => setStake(e.target.value)} placeholder="0" />
                    <span className="fg-pb-profit">{getProfit()}</span>
                  </div>
                  <div className="fg-chips-row">
                    {[25, 50, 100, 200, 500, 1000].map(v => (
                      <button key={v} className="fg-chip" onClick={() => addStake(v)}>+{v}</button>
                    ))}
                    <button className="fg-chip fg-chip-clear" onClick={() => setStake('')}>clear</button>
                  </div>
                  <div className="fg-pb-actions">
                    <button className="fg-btn-edit" onClick={() => setBetSlip(null)}>Edit</button>
                    <button className="fg-btn-reset" onClick={() => setStake('')}>Reset</button>
                    <button className="fg-btn-submit" onClick={submitBet}>Submit</button>
                  </div>
                </div>
              )}

              {/* MY BET */}
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