import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const NAV_TABS = [
  'HOME', 'LOTTERY', 'CRICKET', 'TENNIS', 'FOOTBALL',
  'TABLE TENNIS', 'BACCARAT', '32 CARDS', 'TEENPATTI',
  'POKER', 'LUCKY 7', 'CRASH'
];

const DEMO_MENU_DESKTOP = [
  { label: 'Account Statement', path: '/account-statement' },
  { label: 'Current Bet', path: '/current-bet' },
  { label: 'Casino Results', path: '/casino-results' },
  { label: 'Set Button Values', path: null, action: 'setButtonValues' },
  { label: 'Sign Out', path: '/', isSignOut: true },
];

const DEMO_MENU_MOBILE = [
  { label: 'Account Statement', path: '/account-statement' },
  { label: 'Current Bet', path: '/current-bet' },
  { label: 'Casino Results', path: '/casino-results' },
  { label: 'Set Button Values', path: null, action: 'setButtonValues' },
  { label: 'Rules', path: null, action: 'rules' },
  { label: 'Balance', path: null, action: 'balance' },
  { label: 'Exposure', path: null, action: 'exposure' },
  { label: 'Sign Out', path: '/', isSignOut: true },
];

const RULES_SPORTS = [
  'Football', 'Horse Racing', 'E Games', 'Basketball', 'MotoGP', 'Chess',
  'Volleyball', 'Ice Hockey', 'Tennis', 'Badminton', 'Cycling',
  'Mixed Martial Arts', 'Motorbikes', 'Athletics', 'Basketball 3X3',
  'Sumo', 'Virtual sports', 'Handball', 'Cricket', 'Politics', 'Golf',
  'Motor Sports', 'Baseball', 'Rugby Union', 'Rugby League', 'Darts',
  'American Football', 'Snooker', 'Boxing', 'Soccer', 'Esports',
  'Greyhound Racing', 'Kabaddi', 'Boat Racing', 'Esoccer', 'Wrestling',
  'Beach Volleyball', 'Table Tennis', 'Futsal',
];

const RULES_BY_SPORT: Record<string, { title: string; items: string[]; redIdx: number[] }[]> = {
  Football: [
    {
      title: 'bookmaker',
      items: [
        'If the match will not take place within 48 hours of the original kick-off time bets will be void.',
        'If the selection is in a multiple bet or accumulator any refund must be requested before kick-off of the first leg of the multiple bet.',
        'Please note that games which have their kick-off altered well in advance to accommodate live TV, or to ease fixture congestion will not be classed as postponed.',
        'If a match is forfeited or a team is given a walkover victory without the match having kicked off, then all bets will be void. Any subsequently awarded scoreline will not count for settlement purposes.',
        'Where a confirmed postponed match features as part of a multiple bet, the bet will stand on the remaining selections in the multiple.',
      ],
      redIdx: [1, 3, 4],
    },
    {
      title: 'match',
      items: [
        "Match Odds :- All bets apply to the relevant full 'regular time' period including stoppage time. Any extra-time and/or penalty shoot-out is not included.",
        'Under_Over Goals :- In the event of a match starting but not being completed, all bets will be void, unless the specific market outcome is already determined.',
        '1st Period Winner :- Bets will be void if the match is abandoned before half-time.',
        'Next Goal :- Own goals count to the side credited with the goal.',
        'Draw No Bet :- Predict which team will be the winner. In case of a draw, all bets will be void.',
        '"In the event of a technical error or any unforeseen circumstance that leads to the suspension of any market during a sporting event, the outcome will be settled based on the current result at the time of suspension."',
        'For live streaming and animation :- This data may be subject to a time delay and/or be inaccurate.',
      ],
      redIdx: [],
    },
    {
      title: 'fancy',
      items: [
        '(1) Tournament Total Goals :- Goals scored in 90 minutes or in extra-time will count.',
        '(2) Player Tournament Total Goals :- Player must take some part in the tournament for bets to stand.',
        '(3) Tournament Total Corners :- Only corners taken in 90 minutes count.',
        '(4) Tournament Total Yellow / Red Cards :- Maximum one yellow and one red per player per match.',
        '(5) Tournament Total Converted / Missed Penalties :- Penalties taken in 90 minutes, extra-time and penalty shootouts all count.',
      ],
      redIdx: [],
    },
  ],
  Cricket: [
    {
      title: 'match odds',
      items: [
        'All bets apply to the relevant full match including any over-time.',
        'If a match is abandoned, bets will be void unless the outcome is already determined.',
        'DLS method applies if match is interrupted by weather.',
      ],
      redIdx: [1],
    },
    {
      title: 'fancy',
      items: [
        'Session bets are settled on the actual runs scored in that session.',
        'If a session is not completed, bets will be void.',
        'Player runs bets are void if the player does not bat.',
      ],
      redIdx: [],
    },
  ],
  Tennis: [
    {
      title: 'match',
      items: [
        'All bets apply to the completion of the match.',
        'If a player retires or is disqualified, bets will be void unless the outcome is determined.',
        'Tie-breaks are included in game totals unless otherwise stated.',
      ],
      redIdx: [1],
    },
  ],
  Basketball: [
    {
      title: 'general',
      items: [
        'All bets apply to the result after regulation time including any overtime, unless stated otherwise.',
        'If a match is abandoned, all unsettled bets will be void unless the specific market outcome is already determined.',
      ],
      redIdx: [],
    },
  ],
  'Horse Racing': [
    {
      title: 'general',
      items: [
        'All bets are settled according to the official result declared by the relevant racing authority.',
        'If a race is declared void or abandoned, all bets on that race will be void.',
        'Non-runners: stakes are returned for non-runner bets.',
      ],
      redIdx: [1],
    },
  ],
  'E Games': [
    {
      title: 'general',
      items: [
        'All E-Games bets are settled based on the official result published by the game publisher.',
        'If a fixture is abandoned before completion, all bets will be void unless the market outcome is already determined.',
      ],
      redIdx: [],
    },
  ],
};

const DEFAULT_RULES = [
  {
    title: 'general',
    items: [
      'All bets are settled based on the official result.',
      'If a match is abandoned, bets will be void unless the outcome is already determined.',
      'Please refer to specific market rules for more details.',
    ],
    redIdx: [],
  },
];

const DEFAULT_GAME_BUTTONS = [
  { label: '1k', value: '1000' },
  { label: '2k', value: '2000' },
  { label: '5k', value: '5000' },
  { label: '10k', value: '10000' },
  { label: '20k', value: '20000' },
  { label: '25k', value: '25000' },
  { label: '50k', value: '50000' },
  { label: '75k', value: '75000' },
  { label: '90k', value: '90000' },
  { label: '95k', value: '95000' },
];

const DEFAULT_CASINO_BUTTONS = [
  { label: '25', value: '25' },
  { label: '50', value: '50' },
  { label: '100', value: '100' },
  { label: '200', value: '200' },
  { label: '500', value: '500' },
  { label: '1000', value: '1000' },
];

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  balance?: number;
  exp?: number;
  username?: string;
}

const Header: React.FC<HeaderProps> = ({
  activeTab = 'HOME',
  onTabChange,
  balance = 1500,
  exp = 0,
  username = 'Demo',
}) => {
  const navigate = useNavigate();

  const [showRules, setShowRules] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedSport, setSelectedSport] = useState('Football');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBalance, setShowBalance] = useState(true);
  const [showExposure, setShowExposure] = useState(true);
const [_isMobile, setIsMobile] = useState(false);

  const [showSetBtnValues, setShowSetBtnValues] = useState(false);
  const [activeTab2, setActiveTab2] = useState<'game' | 'casino'>('game');
  const [gameButtons, setGameButtons] = useState(DEFAULT_GAME_BUTTONS.map(b => ({ ...b })));
  const [casinoButtons, setCasinoButtons] = useState(DEFAULT_CASINO_BUTTONS.map(b => ({ ...b })));
  const [showToast, setShowToast] = useState(false);

  const demoRef = useRef<HTMLDivElement>(null);
  const mobileDemoRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) searchInputRef.current.focus();
  }, [showSearch]);

  useEffect(() => {
    if (mobileSearchOpen && mobileSearchRef.current) mobileSearchRef.current.focus();
  }, [mobileSearchOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const inDesktop = demoRef.current && demoRef.current.contains(target);
      const inMobile = mobileDemoRef.current && mobileDemoRef.current.contains(target);
      if (!inDesktop && !inMobile) setShowDemo(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleDemoItem = (item: any) => {
    if (item.action === 'rules') { setShowDemo(false); setShowRules(true); return; }
    if (item.action === 'balance') { setShowBalance(p => !p); return; }
    if (item.action === 'exposure') { setShowExposure(p => !p); return; }
    if (item.action === 'setButtonValues') { setShowDemo(false); setShowSetBtnValues(true); return; }
    setShowDemo(false);
    if (item.isSignOut) localStorage.removeItem('welcomePopupShown');
    if (item.path) navigate(item.path);
  };

  const handleGameButtonChange = (idx: number, field: 'label' | 'value', val: string) => {
    setGameButtons(prev => prev.map((b, i) => i === idx ? { ...b, [field]: val } : b));
  };

  const handleCasinoButtonChange = (idx: number, field: 'label' | 'value', val: string) => {
    setCasinoButtons(prev => prev.map((b, i) => i === idx ? { ...b, [field]: val } : b));
  };

  const currentRules = RULES_BY_SPORT[selectedSport] || DEFAULT_RULES;
  const currentButtons = activeTab2 === 'game' ? gameButtons : casinoButtons;

  const handleUpdate = () => {
    setShowSetBtnValues(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // ✅ FIX: Logo click - HOME tab reset karo (already /home pe hain)
  const handleLogoClick = () => {
    if (onTabChange) {
      onTabChange('HOME');
    } else {
      navigate('/home');
    }
  };

  return (
    <>
      <header className="ap-header">
        <div className="ap-header__blue">

          <div className="ap-header__row1">
            {/* ✅ FIX: Logo pe cursor pointer aur onClick added */}
            <div className="ap-header__logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
              <svg className="ap-header__home-icon mobile-only" width="26" height="26" viewBox="0 0 576 512" fill="white">
                <path d="M288 32a48 48 0 0 0-33.94 14.06L22.4 277.66a12 12 0 0 0 1.7 16.86l22.4 28.8a12 12 0 0 0 16.86-1.7L288 94.12l224.64 227.5a12 12 0 0 0 16.86 1.7l22.4-28.8a12 12 0 0 0-1.7-16.86L321.94 46.06A48 48 0 0 0 288 32zm176 181.56V44.05a12 12 0 0 0-12-12h-48a12 12 0 0 0-12 12v94.81zM112 312v152a16 16 0 0 0 16 16h112v-112a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v112h112a16 16 0 0 0 16-16V312L288 141.5z"/>
              </svg>
              <img
                src="/image/header-logo.png"
                alt="ALL"
                onClick={handleLogoClick}
                style={{ cursor: 'pointer' }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const span = document.createElement('span');
                  span.className = 'ap-header__logo-text';
                  span.textContent = 'ALL';
                  span.style.cursor = 'pointer';
                  span.onclick = () => navigate('/home');
                  img.parentElement?.appendChild(span);
                }}
              />
            </div>
            <div className="ap-header__spacer" />

            <div className="ap-header__right">

              <div className={`ap-header__search-wrap desktop-only${showSearch ? ' open' : ''}`}>
                <input
                  ref={searchInputRef}
                  className="ap-header__search-input"
                  type="text"
                  placeholder="Search here"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="ap-header__search-btn"
                  onClick={() => { setShowSearch(s => !s); if (showSearch) setSearchQuery(''); }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                    <circle cx="10.5" cy="10.5" r="7" stroke="white" strokeWidth="3" />
                    <line x1="16" y1="16" x2="22" y2="22" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                    <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="ap-header__rules-apk desktop-only">
                <button className="ap-header__rules-btn" onClick={() => setShowRules(true)}>Rules</button>
                <button className="ap-header__apk-btn">
                  Download Apk&nbsp;
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5S11 23.33 11 22.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zm-2.5-1C2.67 17 2 17.67 2 18.5v-9C2 8.67 2.67 8 3.5 8S5 8.67 5 9.5v9c0 .83-.67 1.5-1.5 1.5zm17 0c-.83 0-1.5-.67-1.5-1.5v-9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5-1.5zM15.53 2.16l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C7.14 3.07 6 4.66 6 6.5h12c0-1.84-1.14-3.43-2.47-4.34zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
                  </svg>
                </button>
              </div>

              <div className="ap-header__balance desktop-only">
                {showBalance && <span className="ap-header__bal">Balance:{balance}</span>}
                {showExposure && <span className="ap-header__exp">Exp:{exp}</span>}
              </div>

              <div className="mobile-only ap-header__mobile-topright">
                {showBalance && <div className="ap-header__mob-balance-line">Balance:{balance}</div>}
                <div className="ap-header__mob-exp-demo-line">
                  {showExposure && <span className="ap-header__exp">Exp:{exp}</span>}
                  <div className="ap-header__demo" ref={mobileDemoRef}>
                    <button className="ap-header__demo-btn" onClick={() => setShowDemo(s => !s)}>
                      {username} <i className="fa-solid fa-chevron-down"></i>
                    </button>
                    {showDemo && (
                      <div className="ap-header__demo-menu">
                        {DEMO_MENU_MOBILE.map((item) => (
                          <button
                            key={item.label}
                            className={`ap-header__demo-item${(item as any).isSignOut ? ' signout' : ''}`}
                            onClick={() => handleDemoItem(item)}
                          >
                            <span>{item.label}</span>
                            {item.action === 'balance' && (
                              <input type="checkbox" checked={showBalance} readOnly className="ap-header__demo-checkbox" />
                            )}
                            {item.action === 'exposure' && (
                              <input type="checkbox" checked={showExposure} readOnly className="ap-header__demo-checkbox" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="ap-header__demo desktop-only" ref={demoRef}>
                <button className="ap-header__demo-btn" onClick={() => setShowDemo(s => !s)}>
                  {username} <i className="fa-solid fa-chevron-down"></i>
                </button>
                {showDemo && (
                  <div className="ap-header__demo-menu">
                    {DEMO_MENU_DESKTOP.map((item) => (
                      <button
                        key={item.label}
                        className={`ap-header__demo-item${(item as any).isSignOut ? ' signout' : ''}`}
                        onClick={() => handleDemoItem(item)}
                      >
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          <div className="ap-header__mobile-row2 mobile-only">
            <div className={`ap-header__mob-search${mobileSearchOpen ? ' open' : ''}`}>
              <button
                className="ap-header__mob-search-icon"
                onClick={() => { setMobileSearchOpen(s => !s); if (mobileSearchOpen) setSearchQuery(''); }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <circle cx="10.5" cy="10.5" r="7" stroke="white" strokeWidth="3" />
                  <line x1="16" y1="16" x2="22" y2="22" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
                  <line x1="10.5" y1="7.5" x2="10.5" y2="13.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                  <line x1="7.5" y1="10.5" x2="13.5" y2="10.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </button>
              <input
                ref={mobileSearchRef}
                className="ap-header__mob-search-input"
                type="text"
                placeholder="Search here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ap-header__mob-marquee">
              <div className="ap-header__marquee-inner">
🎮🔥 The casino floor is buzzing with excitement! &nbsp;📱 Teen Patti &nbsp;·&nbsp; 🔷 Baccarat &nbsp;·&nbsp; ♠️ Poker &nbsp;·&nbsp; 🎰 Play Live. Win Big. Celebrate Bigger!              </div>
            </div>
          </div>

        </div>

        {/* ── Nav Tabs ── ✅ FIX: sirf 1200px+ pe dikhega */}
        <nav className="ap-header__nav">
          {NAV_TABS.map((tab) => (
            <button
              key={tab}
              className={`ap-header__nav-tab${activeTab === tab ? ' active' : ''}${tab === 'CRASH' ? ' ap-header__nav-tab--crash' : ''}`}
              onClick={() => {
                navigate('/home');
                onTabChange && onTabChange(tab);
              }}
            >
              {tab === 'CRASH' && (
                <svg className="ap-crash-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" width="35" height="40" fill="#c1121f">
                  <path d="M61.85,273.4c-1.8-3.5-2.3-3.9-4-3-3.2,1.7-5.5,1.1-9-2.5l-3.3-3.4,4.4-1.9c2.4-1.1,8-2.2,12.4-2.6,27.1-2.5,84.1-19.2,161-47.1,32.1-11.7,80.4-30.1,81.3-31,1.2-1.2-1-1.5-11.9-1.7-10.6-.2-11.7,0-16.5,2.4-13.1,6.8-74.6,31.2-92.8,36.7l-6.9,2.1-6.4-5-6.5-4.9-3.6,1.5c-21.3,9-88,36.4-89.2,36.6-1,.2-1.6-.6-1.8-2.3-.3-2.4.5-3,7.8-6.9,4.5-2.3,7.9-4.5,7.5-4.8-.3-.4-4.3-.9-8.9-1.3-9.7-.8-17.3-4-28.2-11.9-4.8-3.5-7.8-5-10-5-4.3,0-6.4.9-6.4,2.7,0,.8,6.8,8.7,15.1,17.6,13,13.7,14.9,16.2,13.3,16.8-3.7,1.5-4.8.8-16.3-10.3-6.4-6.2-14.6-14.2-18.3-17.7l-6.7-6.5-8.8,4.2-8.8,4.2-.3-3.4c-.2-2,.2-4.4.8-5.5s6.5-4.8,13.1-8.2c11.8-6,14.2-8,12.2-10-.7-.7-4.1.5-10.2,3.5l-9.1,4.6v-2.5c0-2,1.4-3.3,7.7-7,10.3-6,17.3-8.1,22.3-6.6,2.1.6,10.7,6.3,19.1,12.6,19,14.3,29.4,19.9,35.9,19.2,5.3-.5,34-13.7,61.9-28.5,18.3-9.7,21.6-12.1,19.5-14.2-.7-.7-7.1,1.8-21.4,8.5-14.7,7-20.5,9.3-21.1,8.4-1.2-2-.1-3.3,5.6-6.3,3-1.6,5.5-3.4,5.5-4,0-.7-1.3-2.5-2.8-4l-2.9-2.7-19.8,9.6c-10.9,5.2-20,9.3-20.2,9.1-.8-.7,2.5-12.8,3.8-14.1.8-.8,9.5-5.6,19.4-10.8,17.7-9.4,18-9.6,17.8-12.7,0-1.7-.4-3.4-.7-3.7s-3.9.9-8,2.7l-7.4,3.3-8.9-9.3c-4.8-5.1-8.9-9.6-9.1-10-.5-1.4,8.8-7.9,14.6-10.1,10.4-4,10.9-3.9,118.5,11.3,35.6,5,65.5,9.7,66.5,10.4,1.6,1.1,1.6,1.4-.1,4.8l-1.7,3.7,2.8,1c1.5.5,5.8,2.1,9.5,3.6l6.9,2.5,10.1-4.3c12.4-5.2,32.9-15.6,45.6-23.2l9.4-5.5,3.2,2.4c3.2,2.4,6.9,3.1,7.9,1.6.3-.5-2.5-6.9-6.3-14.3-3.7-7.4-8.7-18.4-11-24.4-2.4-6.1-4.8-11.6-5.4-12.4-.9-1-3.3-1.2-10.7-.8-10.8.5-18.1,2.6-42,12-15.4,6-67.7,31.5-70.6,34.4-1.3,1.4-3.4,1.4-19.2-.1-9.7-.9-18-1.6-18.4-1.6-1.4,0-.8-5.5,1.1-9.7,1.6-3.4,3.9-5.4,14-12.1,14.3-9.5,28.2-16.5,37.4-18.9l6.5-1.7,9.9,3.9c14.3,5.6,16.3,5.6,39.8-1,38.2-10.6,43.5-11.8,52.2-11.9,8-.1,8.3,0,11.6,3.3,2.6,2.5,5.7,8.3,12,23,4.7,10.8,9,21.3,9.7,23.5,1.7,5.4.8,11.9-2.4,16-6.7,8.8-38,25.2-82.1,42.8-22.8,9.1-61.8,21.9-162.5,53.3-31.1,9.7-64.7,20.3-74.6,23.6-10,3.2-18.9,5.9-19.8,5.9-.8,0-2.5-1.8-3.6-4Z M291.35,168.4c3.8-2.3,7.1-6.9,5.8-8-.6-.5-144.9-20.8-158.8-22.3-1.2-.1-2,.4-2,1.3,0,1.2,15.5,4.6,72,16.1,39.6,8.1,73.7,14.7,75.9,14.8,2.3.1,5.2-.7,7.1-1.9Z M247.65,122c4.2-2.3,11.2-5.8,15.4-7.7,4.3-1.9,7.8-3.7,7.8-4.1s-2.8-1.3-6.2-2c-7.7-1.7-13.7-.9-22.4,3.3-6.7,3.1-18.9,11.7-18.1,12.6.6.5,9.3,1.9,13.5,2.2,1.3,0,5.8-1.9,10-4.3Z M282.15,115.8c7.5-3.8,10.7-6,10.5-7.1-.4-2.1-18.3-9.2-23.4-9.3-2.2,0-4.9.6-6,1.4q-2.1,1.6,10.4,6.5c2.6,1,4.8,2.3,5,2.9s-1.9,2.2-4.7,3.6c-5.5,2.8-6.6,4-5.7,6.1.8,2.3,2.3,1.9,13.9-4.1Z"/>
                  <path d="M440.55,196.2c-6.8-10.1-13.5-20.3-14.9-22.8-1.5-2.5-5.5-14.1-9.1-25.7l-6.5-21.3,5.1-5c2.7-2.8,5.1-4.9,5.2-4.8.1.2,5.2,9.4,11.4,20.6,11.9,21.3,15.8,31,23.1,58,3.3,11.9,3.3,12.3,1.7,15.7-.9,1.9-2.1,3.5-2.6,3.5s-6.5-8.2-13.4-18.2Z M454.65,206.5c.2-1.9-.5-4.6-1.7-6.7-1.8-3.1-22-30.4-24.3-32.9-1.2-1.3-3,1.5-2.2,3.5,1.2,3.4,26,39.9,26.9,39.6.6-.1,1.1-1.7,1.3-3.5Z"/>
                  <path d="M295.35,148.3c-13.2-2.6-24.6-4.9-25.4-5.1-.8-.2,11.3-5.4,27-11.6l28.3-11.4,5.3,5.9c2.9,3.2,5.2,6.3,5.3,6.9,0,.6-2.3,5.5-5.1,10.8-4.8,9.1-5.2,9.6-8.2,9.5-1.8-.1-14-2.3-27.2-5Z"/>
                  <path d="M334.85,152.1c0-.2,1.6-3.6,3.6-7.5,1.9-4,4.1-9,4.9-11.1l1.3-3.8-5.3-6.9c-5.3-6.8-5.4-6.9-3.2-8.1,2-1.1,2.6-.8,6.2,3.2,2.2,2.5,4.3,4.5,4.6,4.5s1.7-3.9,3-8.7l2.4-8.8.3,4.9c.2,2.6-.2,8-.8,11.8l-1,7,5.1,6.4,5.1,6.4-2.7,1c-2.2.9-2.9.6-5-1.8-1.3-1.5-2.5-3-2.5-3.4-.1-2.3-1.9-.1-3.9,4.6-1.2,3-2.8,5.9-3.5,6.5-1.4,1.1-8.6,4.3-8.6,3.8Z"/>
                  <path d="M404.75,114.7c-7.2-16.1-7.3-16.4-5.8-17.5,1.5-1,21.2-.4,24.2.7.9.4,1.7,1.4,1.7,2.2,0,4.2-12.6,21.3-15.6,21.3-.9,0-2.8-2.9-4.5-6.7Z M414.15,104.7c4.8-2,8.7-4,8.7-4.4,0-1.2-4.4-1.9-13.2-1.9-8.2,0-8.8.1-8.8,2,0,2.4,2.7,8,3.8,8,.4,0,4.6-1.6,9.5-3.7Z"/>
                  <path d="M385.05,75.9c-10.7-19.1-14-27.3-20.7-51.6-4-14.3-4.3-18.7-1.6-22l1.9-2.3,14.8,22.3,14.8,22.3,7.6,24.2c4.2,13.2,7.4,24.2,7.1,24.3-.3.1-3.5.3-7.1.6l-6.5.4-10.3-18.2Z M391.85,46.5c0-1.5-23.2-37.5-26.1-40.6-1.3-1.3-2.9,1.2-2.9,4.7,0,2.5,8.8,15.4,22.3,32.7,4.6,6,6.7,7,6.7,3.2Z"/>
                </svg>
              )}
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* ══ RULES MODAL ══ */}
      {showRules && (
        <div className="ap-rules-overlay" onClick={() => setShowRules(false)}>
          <div className="ap-rules-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ap-rules-modal__header">
              <span className="ap-rules-modal__title">Rules</span>
              <div className="ap-rules-modal__lang">
                <img src="/image/flag_english.png" alt="EN" className="ap-rules-modal__flag" />
                English ▾
              </div>
              <button className="ap-rules-modal__close" onClick={() => setShowRules(false)}>✕</button>
            </div>
            <div className="ap-rules-modal__body">
              <div className="ap-rules-modal__sports-sidebar">
                {RULES_SPORTS.map((sport) => (
                  <button
                    key={sport}
                    className={`ap-rules-modal__sport-tab ${selectedSport === sport ? 'active' : ''}`}
                    onClick={() => setSelectedSport(sport)}
                  >
                    {sport}
                  </button>
                ))}
              </div>
              <div className="ap-rules-modal__content">
                {currentRules.map((section) => (
                  <div key={section.title}>
                    <div className="ap-rules-modal__sec-title">{section.title}</div>
                    {section.items.map((item, idx) => (
                      <p
                        key={idx}
                        className={`ap-rules-modal__rule ${section.redIdx.includes(idx) ? 'red' : ''}`}
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="ap-rules-modal__footer">
              <button className="ap-rules-modal__close-btn" onClick={() => setShowRules(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SET BUTTON VALUES MODAL ══ */}
      {showSetBtnValues && (
        <div className="ap-sbv-overlay" onClick={() => setShowSetBtnValues(false)}>
          <div className="ap-sbv-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ap-sbv-modal__header">
              <span className="ap-sbv-modal__title">Set Button Value</span>
              <button className="ap-sbv-modal__close" onClick={() => setShowSetBtnValues(false)}>✕</button>
            </div>
            <div className="ap-sbv-modal__tabs">
              <button
                className={`ap-sbv-tab${activeTab2 === 'game' ? ' active' : ''}`}
                onClick={() => setActiveTab2('game')}
              >
                Game Buttons
              </button>
              <button
                className={`ap-sbv-tab${activeTab2 === 'casino' ? ' active' : ''}`}
                onClick={() => setActiveTab2('casino')}
              >
                Casino Buttons
              </button>
            </div>
            <div className="ap-sbv-modal__body">
              <div className="ap-sbv-table">
                <div className="ap-sbv-table__head">
                  <span>Price Label:</span>
                  <span>Price Value:</span>
                </div>
                <div className="ap-sbv-table__rows">
                  {currentButtons.map((btn, idx) => (
                    <div className="ap-sbv-table__row" key={idx}>
                      <input
                        className="ap-sbv-input"
                        type="text"
                        value={btn.label}
                        onChange={(e) =>
                          activeTab2 === 'game'
                            ? handleGameButtonChange(idx, 'label', e.target.value)
                            : handleCasinoButtonChange(idx, 'label', e.target.value)
                        }
                      />
                      <input
                        className="ap-sbv-input"
                        type="text"
                        value={btn.value}
                        onChange={(e) =>
                          activeTab2 === 'game'
                            ? handleGameButtonChange(idx, 'value', e.target.value)
                            : handleCasinoButtonChange(idx, 'value', e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ap-sbv-modal__footer">
              <button className="ap-sbv-update-btn" onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ UPDATE TOAST ══ */}
      {showToast && (
        <div className="ap-toast">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#22c55e"/>
            <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Update Button Value</span>
        </div>
      )}
    </>
  );
};

export default Header;