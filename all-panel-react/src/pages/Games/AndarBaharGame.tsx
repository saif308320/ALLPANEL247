import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import './AndarBaharGame.css';

const LOCK_ICON = 'https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg';

const SUITS = {
  hearts:   { symbol: '♥', color: 'red'   },
  diamonds: { symbol: '♦', color: 'red'   },
  clubs:    { symbol: '♣', color: 'black' },
  spades:   { symbol: '♠', color: 'black' },
};

type Suit = keyof typeof SUITS;
interface Card { value: string; suit: Suit; }

const CARD_VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const SLOT_ODDS   = [1, 1, 1, 0, 0, 1, 2, 1, 2, 0, 0, 2, 1];
const SUIT_CYCLE: Suit[] = ['clubs','hearts','clubs','diamonds','clubs','hearts','clubs','hearts','clubs','diamonds','clubs','clubs','hearts'];
const LOCKED_SLOTS = new Set([3, 4, 9, 10]);

const ANDAR_CARDS: Card[] = [
  { value: 'Q', suit: 'hearts' },
  { value: '5', suit: 'hearts' },
  { value: '6', suit: 'diamonds' },
];
const BAHAR_CARDS: Card[] = [
  { value: 'J', suit: 'spades' },
  { value: '5', suit: 'diamonds' },
  { value: '10', suit: 'spades' },
];

// Mobile: row1 = first 8 cards, row2 = last 5 cards
const ROW1 = CARD_VALUES.slice(0, 8);   // A 2 3 4 5 6 7 8
const ROW2 = CARD_VALUES.slice(8);      // 9 10 J Q K

const RULES = [
  'Andar Bahar is a fast paced Indian origin game.',
  'It is played with a regular deck of 52 cards.',
  'This game is played between two sides Andar and Bahar.',
  'The objective of the game is to place bet on cards of your choice whether they will be on the Andar side or the Bahar side and therefor win.',
  'The odds will be available on every card to place your bets upto 46th card.',
  'At the start of the game first card will be drawn on the Bahar side and the next card will be drawn on the Andar side and so on upto the 50th card.',
  'When the card is to be open on the Bahar side odds will be available for both the Andar side and the Bahar side.',
  '* If you place bets on the Bahar side and you win on that particular first card the payout will be 25% of your bet amount from 1st card to 31st card and from the 33rd card to 45th card the payout will be 20% of your bet amount.',
  '* Winning on all cards other than that particular first card payout will be 100%.',
  'When the card is to be open on the Andar side the odds will be available only for the Bahar side. The payout will be 100% of your bet amount on all the cards.',
  'The game will be considered over after the 50th card is drawn. The pending bets on remaining 2 cards will be cancelled (Pushed).',
];

interface BetSlip { runnerName: string; odds: number; type: 'back' | 'lay'; }
interface PlacedBet { name: string; odds: number; stake: number; }
const QUICK_STAKES = [1000,2000,5000,10000,20000,25000,50000,75000,90000,95000];

const MOBILE_STREAM_PAGE = 3;

const PlayingCard: React.FC<{ card: Card }> = ({ card }) => {
  const { symbol, color } = SUITS[card.suit];
  return (
    <div className="ab-card" style={{ color }}>
      <div className="ab-card-top">{card.value}</div>
      <div className="ab-card-suit">{symbol}</div>
      <div className="ab-card-suit-big">{symbol}</div>
    </div>
  );
};

const SlotCard: React.FC<{
  idx: number; value: string; suit: Suit; odds: number;
  isLocked: boolean; row: 'andar' | 'bahar';
  onClick: (name: string) => void;
}> = ({ idx, value, suit, odds, isLocked, row, onClick }) => {
  const locked = isLocked || LOCKED_SLOTS.has(idx);
  const { symbol, color } = SUITS[suit];
  return (
    <div className="ab-slot-wrap">
      <div className="ab-slot-odds">{odds}</div>
      <button
        className={`ab-slot-card${locked ? ' ab-slot-locked' : ''} ab-slot-${row}`}
        onClick={() => !locked && onClick(`${row.toUpperCase()} - ${value}${symbol}`)}
        disabled={locked}
      >
        {locked ? (
          <img src={LOCK_ICON} alt="locked"
            style={{ width: 18, height: 18, opacity: 0.7, filter: 'brightness(0) invert(1)' }} />
        ) : (
          <div className="ab-slot-inner" style={{ color }}>
            <span className="ab-slot-val">{value}</span>
            <span className="ab-slot-sym">{symbol}</span>
          </div>
        )}
      </button>
    </div>
  );
};

// Renders one section (ANDAR or BAHAR) of the betting grid
// Desktop: single row of all 13 cards
// Mobile: two sub-rows (8 + 5) stacked inside the same label block
const GridSection: React.FC<{
  row: 'andar' | 'bahar';
  isMobile: boolean;
  isLocked: boolean;
  onSlotClick: (name: string) => void;
}> = ({ row, isMobile, isLocked, onSlotClick }) => {
  const colorClass = row === 'andar' ? 'ab-grid-andar' : 'ab-grid-bahar';

  if (!isMobile) {
    // Desktop: single flat row
    return (
      <div className={`ab-grid-row ${colorClass}`}>
        <div className="ab-grid-label">{row.toUpperCase()}</div>
        <div className="ab-grid-slots">
          {CARD_VALUES.map((val, idx) => (
            <SlotCard key={idx} idx={idx} value={val} suit={SUIT_CYCLE[idx]}
              odds={SLOT_ODDS[idx]} isLocked={isLocked} row={row}
              onClick={onSlotClick} />
          ))}
        </div>
      </div>
    );
  }

  // Mobile: two rows stacked
  return (
    <div className={`ab-grid-row ab-grid-row-mobile ${colorClass}`}>
      <div className="ab-grid-label">{row.toUpperCase()}</div>
      <div className="ab-grid-slots-mobile">
        {/* Row 1: A–8 */}
        <div className="ab-grid-subrow">
          {ROW1.map((val, i) => (
            <SlotCard key={i} idx={i} value={val} suit={SUIT_CYCLE[i]}
              odds={SLOT_ODDS[i]} isLocked={isLocked} row={row}
              onClick={onSlotClick} />
          ))}
        </div>
        {/* Row 2: 9–K */}
        <div className="ab-grid-subrow ab-grid-subrow2">
          {ROW2.map((val, i) => {
            const idx = 8 + i;
            return (
              <SlotCard key={idx} idx={idx} value={val} suit={SUIT_CYCLE[idx]}
                odds={SLOT_ODDS[idx]} isLocked={isLocked} row={row}
                onClick={onSlotClick} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Rules Modal
const RulesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="ab-rules-overlay" onClick={onClose}>
    <div className="ab-rules-modal" onClick={e => e.stopPropagation()}>
      <div className="ab-rules-header">
        <span>ANDAR BAHAR 50 CARDS Rules</span>
        <button className="ab-rules-close" onClick={onClose}>✕</button>
      </div>
      <div className="ab-rules-body">
        <ul>
          {RULES.map((r, i) => <li key={i}>{r.startsWith('*') ? r : `${i + 1 - RULES.slice(0,i).filter(x=>x.startsWith('*')).length}. ${r}`}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

const AndarBaharGame: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultMsg, setResultMsg] = useState('');
  const [roundId] = useState(() => String(Math.floor(Math.random() * 100000) + 4260626045711));
  const [betSlip, setBetSlip] = useState<BetSlip | null>(null);
  const [stake, setStake] = useState('');
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([]);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);
  const [showRules, setShowRules] = useState(false);

  // Stream card pagination
  const [andarStreamPage, setAndarStreamPage] = useState(0);
  const [baharStreamPage, setBaharStreamPage] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const countdownRef = useRef(30);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const triggerResult = useCallback(() => {
    setBetSlip(null); setStake('');
    setResultMsg(Math.random() > 0.5 ? 'ANDAR WINS!' : 'BAHAR WINS!');
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

  const handleSlotClick = (name: string) => {
    setBetSlip({ runnerName: name, odds: 1.98, type: 'back' });
    setStake('');
  };
  const addStake = (amt: number) => setStake(String((parseInt(stake) || 0) + amt));
  const changeOdds = (d: number) => setBetSlip(b => b ? { ...b, odds: parseFloat((b.odds + d).toFixed(2)) } : b);
  const getProfit = () => {
    if (!betSlip || !stake) return 0;
    return Math.round((parseFloat(stake) || 0) * (betSlip.odds - 1));
  };
  const submitBet = () => {
    if (!betSlip || !stake) return;
    setPlacedBets(prev => [...prev, { name: betSlip.runnerName, odds: betSlip.odds, stake: parseFloat(stake) }]);
    setBetSlip(null); setStake('');
  };

  const displayTime = String(Math.max(0, countdown)).padStart(2, '0');

  // Stream card slicing
  const streamPageSize = isMobile ? MOBILE_STREAM_PAGE : 99;
  const andarVisible = ANDAR_CARDS.slice(andarStreamPage * streamPageSize, andarStreamPage * streamPageSize + streamPageSize);
  const baharVisible = BAHAR_CARDS.slice(baharStreamPage * streamPageSize, baharStreamPage * streamPageSize + streamPageSize);
  const canPrevAndar = andarStreamPage > 0;
  const canNextAndar = (andarStreamPage + 1) * streamPageSize < ANDAR_CARDS.length;
  const canPrevBahar = baharStreamPage > 0;
  const canNextBahar = (baharStreamPage + 1) * streamPageSize < BAHAR_CARDS.length;

  return (
    <div className="home-root">

      {/* RULES MODAL */}
      {showRules && <RulesModal onClose={() => setShowRules(false)} />}

      {/* MOBILE BET POPUP */}
      {betSlip && isMobile && (
        <div className="ab-mob-overlay" onClick={() => { setBetSlip(null); setStake(''); }}>
          <div className="ab-mob-betbox ab-mob-back" onClick={e => e.stopPropagation()}>
            <div className="ab-mob-hdr">
              <span className="ab-mob-sel">{betSlip.runnerName}</span>
              <span className="ab-mob-profit">Profit: <b>{getProfit()}</b></span>
              <button className="ab-mob-close" onClick={() => { setBetSlip(null); setStake(''); }}>✕</button>
            </div>
            <div className="ab-mob-fields">
              <div className="ab-mob-field">
                <label>Amount</label>
                <input type="number" value={stake} onChange={e => setStake(e.target.value)} />
              </div>
              <div className="ab-mob-field">
                <label>Odds</label>
                <div className="ab-mob-odds-wrap">
                  <button onClick={() => changeOdds(-0.01)}>−</button>
                  <input type="number" value={betSlip.odds}
                    onChange={e => setBetSlip(b => b ? { ...b, odds: parseFloat(e.target.value) } : b)} />
                  <button onClick={() => changeOdds(0.01)}>+</button>
                </div>
              </div>
            </div>
            <div className="ab-mob-chips">
              {QUICK_STAKES.map(v => (
                <button key={v} onClick={() => addStake(v)}>+{v >= 1000 ? (v/1000)+'k' : v}</button>
              ))}
            </div>
            <div className="ab-mob-actions">
              <button className="ab-mob-clear" onClick={() => setStake('')}>clear</button>
<button className="ab-mob-edit" onClick={() => { setBetSlip(null); window.dispatchEvent(new CustomEvent('openSetBtnValues')); }}>Edit</button>
              <button className="ab-mob-reset" onClick={() => setStake('')}>Reset</button>
              <button className="ab-mob-submit" onClick={submitBet}>Place Bet</button>
            </div>
          </div>
        </div>
      )}

      <Header activeTab="ANDAR BAHAR" balance={1500} exp={0} username="Demo" onTabChange={() => navigate('/home')} />
      <div className="home-wrap">
        <Sidebar activeSection={null} onSectionChange={() => {}} />
        <div className="home-content fg-page-wrap">

          {/* GAME BAR */}
          <div className="fg-game-bar">
            <div className="fg-game-title">
              ANDAR BAHAR 50 CARDS{' '}
              <span className="fg-rules-lnk" onClick={() => setShowRules(true)}>Rules</span>
            </div>
            <div className="fg-round-id">Round ID: {roundId}</div>
          </div>

          <div className="ab-main-layout">
            <div className="ab-center-col">

              {/* ── STREAM FRAME ── */}
              <div className="ab-stream-frame">
                {showResult && (
                  <div className="fg-result-overlay">
                    <div className="fg-result-banner">{resultMsg}</div>
                  </div>
                )}

                <div className="ab-stream-content">
                  <div className="ab-next-card">
                    Next Card Count: <span className="ab-nc-num">40</span> / <span className="ab-nc-bahar">Bahar</span>
                  </div>

                  <div className="ab-stream-label">ANDAR</div>
                  <div className="ab-stream-cards">
                    <button className={`ab-arrow${!canPrevAndar ? ' ab-arrow-disabled' : ''}`}
                      onClick={() => setAndarStreamPage(p => Math.max(0, p - 1))} disabled={!canPrevAndar}>‹</button>
                    {andarVisible.map((c, i) => <PlayingCard key={i} card={c} />)}
                    <button className={`ab-arrow${!canNextAndar ? ' ab-arrow-disabled' : ''}`}
                      onClick={() => setAndarStreamPage(p => p + 1)} disabled={!canNextAndar}>›</button>
                  </div>

                  <div className="ab-stream-label">BAHAR</div>
                  <div className="ab-stream-cards">
                    <button className={`ab-arrow${!canPrevBahar ? ' ab-arrow-disabled' : ''}`}
                      onClick={() => setBaharStreamPage(p => Math.max(0, p - 1))} disabled={!canPrevBahar}>‹</button>
                    {baharVisible.map((c, i) => <PlayingCard key={i} card={c} />)}
                    <button className={`ab-arrow${!canNextBahar ? ' ab-arrow-disabled' : ''}`}
                      onClick={() => setBaharStreamPage(p => p + 1)} disabled={!canNextBahar}>›</button>
                  </div>
                </div>

                <div className="fg-clock-wrap" style={{ position:'absolute', bottom:10, right:12 }}>
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[0]}</div>
                  <div className={`fg-flip-box${countdown <= 3 ? ' fg-flip-orange' : ''}`}>{displayTime[1]}</div>
                </div>
              </div>

              {/* ── BETTING GRID ── */}
              <GridSection row="andar" isMobile={isMobile} isLocked={isLocked} onSlotClick={handleSlotClick} />
              <GridSection row="bahar" isMobile={isMobile} isLocked={isLocked} onSlotClick={handleSlotClick} />

              {/* LAST RESULT */}
              <div className="fg-result-bar">
                <span>Last Result</span>
<span className="fg-view-all" onClick={() => navigate('/casino-results')}>View All</span>
              </div>
              <div className="fg-result-circles">
                {Array(10).fill('R').map((r, i) => (
                  <span key={i} className="ab-result-badge">{r}</span>
                ))}
              </div>

            </div>

            {/* ── RIGHT PANEL ── */}
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
                  <div className="fg-bs-body-back">
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

export default AndarBaharGame;