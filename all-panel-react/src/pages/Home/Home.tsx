import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import CasinoPage, { CasinoSection } from '../../components/Sidebar/CasinoPage';
import MatchDetailPage from '../Home/MatchDetailPage';
import './Home.css';

const IMG: Record<string, string> = {
  i01:'./image/clickfunnelimage01.gif', i02:'./image/clickfunnelimage02.gif',
  i03:'./image/clickfunnelimage03.gif', i04:'./image/clickfunnelimage04.jpg',
  i05:'./image/clickfunnelimage05.jpg', i06:'./image/clickfunnelimage06.jpg',
  i07:'./image/clickfunnelimage07.jpg', i08:'./image/clickfunnelimage08 (1).jpg',
  i09:'./image/clickfunnelimage09.jpg', i10:'./image/clickfunnelimage10.jpg',
  i11:'./image/clickfunnelimage11.jpg', i12:'./image/clickfunnelimage12.jpg',
  i13:'./image/clickfunnelimage13.jpg', i14:'./image/clickfunnelimage14.jpg',
  i15:'./image/clickfunnelimage15.jpg', i16:'./image/clickfunnelimage16.jpg',
  i17:'./image/clickfunnelimage17.jpg', i18:'./image/clickfunnelimage18.jpg',
  i19:'./image/clickfunnelimage19.jpg', i20:'./image/clickfunnelimage20.jpg',
  i21:'./image/clickfunnelimage21.jpg', i22:'./image/clickfunnelimage22.jpg',
  i23:'./image/clickfunnelimage23.jpg', i24:'./image/clickfunnelimage24.jpg',
  i25:'./image/clickfunnelimage25.jpg', i26:'./image/clickfunnelimage26.jpg',
  i27:'./image/clickfunnelimage27.jpg', i28:'./image/clickfunnelimage28.jpg',
  i29:'./image/clickfunnelimage29.jpg', i30:'./image/clickfunnelimage30.jpg',
  i31:'./image/clickfunnelimage31.jpg', i32:'./image/clickfunnelimage32.jpg',
  i33:'./image/clickfunnelimage33.jpg', i34:'./image/clickfunnelimage34.jpg',
  i35:'./image/clickfunnelimage35.jpg', i36:'./image/clickfunnelimage36.jpg',
  i37:'./image/clickfunnelimage37.jpg', i38:'./image/clickfunnelimage38.jpg',
  i39:'./image/clickfunnelimage39.jpg', i40:'./image/clickfunnelimage40.jpg',
  i41:'./image/clickfunnelimage41.jpg', i42:'./image/clickfunnelimage42.jpg',
  i43:'./image/clickfunnelimage43.jpg', i44:'./image/clickfunnelimage44.jpg',
  i45:'./image/clickfunnelimage45.jpg', i46:'./image/clickfunnelimage46.jpg',
  i47:'./image/clickfunnelimage47.jpg', i48:'./image/clickfunnelimage48.jpg',
  i49:'./image/clickfunnelimage49.jpg', i50:'./image/clickfunnelimage50.jpg',
  i51:'./image/clickfunnelimage51.jpg', i52:'./image/clickfunnelimage52.jpg',
  i53:'./image/clickfunnelimage53.jpg', i54:'./image/clickfunnelimage54.jpg',
  i55:'./image/clickfunnelimage55.jpg', i56:'./image/clickfunnelimage56.jpg',
  i57:'./image/clickfunnelimage57.jpg', i58:'./image/clickfunnelimage58.jpg',
  i59:'./image/clickfunnelimage59.jpg', i60:'./image/clickfunnelimage60.jpg',
  i61:'./image/clickfunnelimage61.jpg', i62:'./image/clickfunnelimage62.jpg',
  i63:'./image/clickfunnelimage63.jpg', i64:'./image/clickfunnelimage64.jpg',
  i65:'./image/clickfunnelimage65.jpg', i66:'./image/clickfunnelimage66.jpg',
  i67:'./image/clickfunnelimage67.jpg', i68:'./image/clickfunnelimage68.jpg',
  i69:'./image/clickfunnelimage69.jpg',
};
const FALLBACK = 'https://nd.sprintstaticdata.com/casino-icons/lc/roulette13.jpg';

type OddsVal = string | number;
type MatchType = 'odds' | 'locked' | 'partlocked' | 'partlocked2';

interface ExMatch {
  title: string; date?: string;
  live?: boolean; tv?: boolean; f?: boolean; bm?: boolean;
  cards?: boolean; ebadge?: boolean; controllerIcon?: boolean;
  type: MatchType; values?: OddsVal[];
}

// ===================== MOBILE QUICK NAV =====================
type MobileNavKey = 'CRASH' | 'LOTTERY' | 'SPORTS' | 'OUR_CASINO' | 'LIVE_CASINO' | 'SLOTS' | 'FANTASY';

const MOBILE_NAV_TABS: { key: MobileNavKey; label: string }[] = [
  { key: 'CRASH',       label: 'CRASH' },
  { key: 'LOTTERY',     label: 'LOTTERY' },
  { key: 'SPORTS',      label: 'SPORTS' },
  { key: 'OUR_CASINO',  label: 'OUR\nCASINO' },
  { key: 'LIVE_CASINO', label: 'LIVE\nCASINO' },
  { key: 'SLOTS',       label: 'SLOTS' },
  { key: 'FANTASY',     label: 'FANTASY' },
];

// ===================== CASINO NAV TABS DATA =====================
const CASINO_NAV_TABS = [
  { key:'all', label:'All Casino' },
  { key:'roulette', label:'Roulette' },
  { key:'teenpatti', label:'Teenpatti' },
  { key:'poker', label:'Poker' },
  { key:'baccarat', label:'Baccarat' },
  { key:'dragon-tiger', label:'Dragon Tiger' },
  { key:'32cards', label:'32 Cards' },
  { key:'andar-bahar', label:'Andar Bahar' },
  { key:'lucky7', label:'Lucky 7' },
  { key:'3card', label:'3 Card Judgement' },
  { key:'casino-war', label:'Casino War' },
  { key:'worli', label:'Worli' },
  { key:'sports', label:'Sports' },
  { key:'bollywood', label:'Bollywood' },
  { key:'lottery', label:'Lottery' },
  { key:'queen', label:'Queen' },
  { key:'race', label:'Race' },
  { key:'others', label:'Others' },
];

const CASINO_IMAGES: Record<string, {src:string; lbl:string}[]> = {
  teenpatti: [
    {src:IMG.i02, lbl:'VIP TEENPATTI 1DAY'}, {src:IMG.i31, lbl:'20-20 TEENPATTI'},
    {src:IMG.i10, lbl:'UNIQUE TEENPATTI'}, {src:IMG.i13, lbl:'TEENPATTI JOKER 20-20'},
    {src:IMG.i11, lbl:'POISON TP 20-20'}, {src:IMG.i12, lbl:'UNLIMITED JOKER 20-20'},
    {src:IMG.i14, lbl:'UNLIMITED JOKER ONEDAY'}, {src:IMG.i15, lbl:'20-20 TEENPATTI C'},
    {src:IMG.i23, lbl:'QUEEN TOP OPEN'}, {src:IMG.i24, lbl:'JACK TOP OPEN'},
    {src:IMG.i26, lbl:'INSTANT TP 3.0'}, {src:IMG.i29, lbl:'INSTANT TP 2.0'},
    {src:IMG.i30, lbl:'TEENPATTI 1 DAY'}, {src:IMG.i32, lbl:'TEENPATTI TEST'},
    {src:IMG.i33, lbl:'TEENPATTI OPEN'}, {src:IMG.i59, lbl:'TEENPATTI 2.0'},
    {src:IMG.i65, lbl:'2 CARDS TEENPATTI'}, {src:IMG.i67, lbl:'MUFLIS TEENPATTI'},
    {src:IMG.i69, lbl:'20-20 TEENPATTI B'}, {src:IMG.i03, lbl:'DOLI DANA LIVE'},
  ],
  roulette: [
    {src:IMG.i07, lbl:'BEACH ROULETTE'}, {src:IMG.i08, lbl:'GOLDEN ROULETTE'},
    {src:IMG.i09, lbl:'ROULETTE'}, {src:IMG.i17, lbl:'UNIQUE ROULETTE'},
  ],
  poker: [
    {src:IMG.i34, lbl:'POKER 1 DAY'}, {src:IMG.i35, lbl:'20-20 POKER'}, {src:IMG.i36, lbl:'POKER 6 PLAYERS'},
  ],
  baccarat: [
    {src:IMG.i37, lbl:'BACCARAT'}, {src:IMG.i38, lbl:'BACCARAT 2'}, {src:IMG.i66, lbl:'29 BACCARAT'},
  ],
  'dragon-tiger': [
    {src:IMG.i39, lbl:'20-20 DRAGON TIGER'}, {src:IMG.i40, lbl:'1 DAY DRAGON TIGER'},
    {src:IMG.i41, lbl:'20-20 DTL'}, {src:IMG.i42, lbl:'20-20 DT 2'},
  ],
  '32cards': [
    {src:IMG.i43, lbl:'32 CARDS A'}, {src:IMG.i44, lbl:'32 CARDS B'},
  ],
  'andar-bahar': [
    {src:IMG.i20, lbl:'ANDAR BAHAR 150'}, {src:IMG.i45, lbl:'ANDAR BAHAR'}, {src:IMG.i46, lbl:'ANDAR BAHAR 2'},
  ],
  lucky7: [
    {src:IMG.i06, lbl:'LUCKY 6'}, {src:IMG.i21, lbl:'LUCKY 15'},
    {src:IMG.i47, lbl:'7-A LUCKY'}, {src:IMG.i48, lbl:'7-B LUCKY'}, {src:IMG.i62, lbl:'LUCKY 7-C CASINO'},
  ],
  '3card': [{src:IMG.i49, lbl:'3 CARDS JUDGEMENT'}],
  'casino-war': [{src:IMG.i50, lbl:'CASINO WAR'}],
  worli: [
    {src:IMG.i51, lbl:'WORLI MATKA'}, {src:IMG.i52, lbl:'INSTANT WORLI'}, {src:IMG.i01, lbl:'MATKA MARKET'},
  ],
  sports: [
    {src:IMG.i56, lbl:'5 FIVE CRICKET'}, {src:IMG.i57, lbl:'CRICKET MATCH 20-20'},
    {src:IMG.i58, lbl:'CASINO METER'}, {src:IMG.i63, lbl:'SUPER OVER RSA ENG'},
    {src:IMG.i18, lbl:'MINI SUPER OVER'}, {src:IMG.i19, lbl:'GOAL'}, {src:IMG.i22, lbl:'SUPER OVER 2'},
  ],
  bollywood: [
    {src:IMG.i53, lbl:'AMAR AKBAR ANTHONY'}, {src:IMG.i54, lbl:'BOLLYWOOD CASINO'}, {src:IMG.i16, lbl:'2 BOLLYWOOD CASINO'},
  ],
  lottery: [{src:IMG.i55, lbl:'LOTTERY'}],
  queen: [{src:IMG.i60, lbl:'QUEEN'}],
  race: [{src:IMG.i61, lbl:'RACE 20'}, {src:IMG.i68, lbl:'RACE TO 17'}],
  others: [
    {src:IMG.i25, lbl:'SIC BO 2'}, {src:IMG.i27, lbl:'SIC BO'}, {src:IMG.i28, lbl:'BALL BY BALL'},
    {src:IMG.i64, lbl:'THE TRAP'}, {src:IMG.i04, lbl:'MOGAMBO'}, {src:IMG.i05, lbl:'20-20 TEEN PATTI'},
  ],
};
const _allSeen = new Set<string>();
const _allImgs: {src:string;lbl:string}[] = [];
Object.values(CASINO_IMAGES).forEach(arr => arr.forEach(item => {
  if (!_allSeen.has(item.src)) { _allSeen.add(item.src); _allImgs.push(item); }
}));
CASINO_IMAGES['all'] = _allImgs;

const CRASH_IMAGES = [
  {src:'https://sitethemedata.com/casino_icons/other/betcore/140511.jpg', lbl:'CRASH'},
  {src:'https://sitethemedata.com/casino_icons/other/betcore/154912.jpg', lbl:'CRASH 2'},
  {src:'https://sitethemedata.com/casino_icons/other/ssg/aviator/aviator.jpg', lbl:'AVIATOR'},
  {src:'https://sitethemedata.com/casino_icons/slot/TurboGames/TRB-aero.jpg', lbl:'AERO'},
  {src:'https://sitethemedata.com/casino_icons/slot/TurboGames/TRB-crashx.jpg', lbl:'CRASH X'},
  {src:'https://sitethemedata.com/casino_icons/slot/Jili/235.jpg', lbl:'JILI 235'},
  {src:'https://sitethemedata.com/casino_icons/slot/Jili/224.jpg', lbl:'JILI 224'},
  {src:'https://sitethemedata.com/casino_icons/slot/Jili/261.jpg', lbl:'JILI 261'},
  {src:'https://sitethemedata.com/casino_icons/other/gemini1/gemini/MultiPlayerAviator.jpg', lbl:'MULTI AVIATOR'},
  {src:'https://sitethemedata.com/casino_icons/other/darwin/darwin/CRAESP.jpg', lbl:'CRAESP'},
  {src:'https://sitethemedata.com/casino_icons/other/darwin/darwin/CRAE.jpg', lbl:'CRAE'},
  {src:'https://sitethemedata.com/casino_icons/other/darwin/darwin/AVIATSR.jpg', lbl:'AVIATSR'},
  {src:'https://sitethemedata.com/casino_icons/other/bcslot/creedroomz/141422.jpg', lbl:'CREEDROOMZ 1'},
  {src:'https://sitethemedata.com/casino_icons/other/bcslot/creedroomz/500000397.gif', lbl:'CREEDROOMZ 2'},
  {src:'https://sitethemedata.com/casino_icons/other/ssg/xgames/balloon.jpg', lbl:'BALLOON'},
  {src:'https://sitethemedata.com/casino_icons/other/ssg/xgames/cricketx.jpg', lbl:'CRICKET X'},
  {src:'https://sitethemedata.com/casino_icons/other/ssg/xgames/jetx.jpg', lbl:'JET X'},
  {src:'https://sitethemedata.com/casino_icons/other/bcslot/creedroomz/500000203.jpg', lbl:'CREEDROOMZ 3'},
  {src:'https://sitethemedata.com/casino_icons/other/bcslot/creedroomz/33060327.jpg', lbl:'CREEDROOMZ 4'},
  {src:'https://sitethemedata.com/casino_icons/other/bcslot/creedroomz/500000674.jpg', lbl:'CREEDROOMZ 5'},
  {src:'https://sitethemedata.com/casino_icons/other/betcore/168613.jpg', lbl:'BETCORE'},
];

// ===================== WELCOME POPUP =====================
const WELCOME_POPUP_KEY = 'welcomePopupShown';
const WELCOME_POPUP_IMG = 'https://sitethemedata.com/common/wel-banner/wel-1781730977040.png';

const WelcomePopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleClose = () => {
    localStorage.setItem(WELCOME_POPUP_KEY, 'true');
    onClose();
  };
  return (
    <div className="wlp-overlay" onClick={handleClose}>
      <div className="wlp-box" onClick={(e) => e.stopPropagation()}>
        <div className="wlp-heading">
          <span>Enable 2 Step Security Authentication To Secure Your Account.</span>
          <button className="wlp-close" onClick={handleClose} aria-label="close">&#10005;</button>
        </div>
        <img src={WELCOME_POPUP_IMG} alt="welcome" className="wlp-img" onClick={handleClose}/>
      </div>
    </div>
  );
};

// ===================== CASINO IMAGE PAGE =====================
const CasinoNavPage: React.FC<{ tabs: typeof CASINO_NAV_TABS; images: Record<string, {src:string;lbl:string}[]>; defaultTab?: string }> = ({ tabs, images, defaultTab }) => {
  const [activeKey, setActiveKey] = useState(defaultTab || tabs[0].key);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (defaultTab) setActiveKey(defaultTab); }, [defaultTab]);
  const imgs = images[activeKey] || [];
  return (
    <div>
      <div className="cn-tabs-bar">
        <button className="cn-arrow" onClick={() => scrollRef.current?.scrollBy({left:-200,behavior:'smooth'})}>&#8249;</button>
        <div className="cn-tabs-scroll" ref={scrollRef}>
          {tabs.map(t => (
            <div key={t.key} className={`cn-tab${activeKey === t.key ? ' on' : ''}`} onClick={() => setActiveKey(t.key)}>{t.label}</div>
          ))}
        </div>
        <button className="cn-arrow" onClick={() => scrollRef.current?.scrollBy({left:200,behavior:'smooth'})}>&#8250;</button>
      </div>
      <div className="cn-grid">
        {imgs.map((img, i) => (
          <div key={i} className="cn-item">
            <img src={img.src} alt={img.lbl} loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).src=FALLBACK;}}/>
            <div className="cn-lbl">{img.lbl}</div>
          </div>
        ))}
        {imgs.length === 0 && <div className="ex-no-record">No games found</div>}
      </div>
    </div>
  );
};

// ===================== TOP 5 HIGHLIGHT BOXES =====================
const TOP_CARDS = [
  { title:'France vs Senegal', icon:'soccer' },
  { title:'England W vs Ireland W', icon:'cricket' },
  { title:'Iraq vs Norway', icon:'soccer' },
  { title:'FIFA WORLD CUP - WINNER 2026', icon:'soccer' },
  { title:'FIFA WORLD CUP 2026- SPECIAL...', icon:'soccer' },
];

// ===================== 22 SPORT TABS =====================
const SPORT_TABS_22 = [
  { label:'Cricket',           icon:'./image/cricket.png' },
  { label:'Football',          icon:'./image/ball.png' },
  { label:'Tennis',            icon:'./image/ball 1.png' },
  { label:'Table Tennis',      icon:'./image/tennis ball.png' },
  { label:'Esoccer',           icon:'./image/Esoccer.png' },
  { label:'Horse Racing',      icon:'./image/horse.png' },
  { label:'Greyhound Racing',  icon:'./image/greyhound.png' },
  { label:'Basketball',        icon:'./image/basketball.png' },
  { label:'Wrestling',         icon:'./image/wrestling.png' },
  { label:'Volleyball',        icon:'./image/volleyball.png' },
  { label:'Badminton',         icon:'./image/badimantion.png' },
  { label:'Snooker',           icon:'./image/snooker.png' },
  { label:'Darts',             icon:'./image/darts.png' },
  { label:'Boxing',            icon:'./image/boxing.png' },
  { label:'Mixed Martial Arts',icon:'./image/player.png' },
  { label:'American Football', icon:'./image/american-football.png' },
  { label:'E Games',           icon:'./image/e-sports.png' },
  { label:'Ice Hockey',        icon:'./image/player.png' },
  { label:'Futsal',            icon:'./image/futsal.png' },
  { label:'Motor Sports',      icon:'./image/motor sports.png' },
  { label:'Politics',          icon:'./image/Politics.png' },
  { label:'Kabaddi',           icon:'./image/kabaddi.png' },
];

const NO_RECORD_TABS = [
  'Esoccer','Badminton','Darts','Boxing','Mixed Martial Arts',
  'American Football','E Games','Ice Hockey','Futsal','Motor Sports','Kabaddi',
];

// ===================== RACING DATA =====================
const RACING_DATA: Record<string, { subTabs: string[]; venues: Record<string, { name: string; times: string[] }[]> }> = {
  'Horse Racing': {
    subTabs: ['US','GB','FR','ZA'],
    venues: {
      US: [
        { name:'Presque Isle Downs', times:['00:30','00:57','01:24','01:51','02:18','02:45','03:12','03:39'] },
        { name:'Horseshoe Indianapolis', times:['23:10','23:41','00:12','00:43','01:14','01:45','02:16','02:47'] },
        { name:'Philadelphia', times:['21:40','22:07','22:34','23:01','23:28','23:55','00:22','00:49','01:16'] },
        { name:'Mountaineer Park', times:['04:00','04:25','04:50','05:15','05:40','06:05','06:30','06:55','07:20'] },
        { name:'Finger Lakes', times:['21:55','22:24','22:53','23:22','23:51','00:20','00:49','01:18'] },
        { name:'Louisiana Downs', times:['02:05','02:33','03:01','03:29','03:57','04:26','04:53'] },
      ],
      GB: [], FR: [], ZA: [],
    },
  },
  'Greyhound Racing': {
    subTabs: ['GB'],
    venues: {
      GB: [
        { name:'Central Park', times:['22:14','22:31','22:48','23:06','23:22','23:39','23:56','00:13','00:31','00:47','01:04','01:23'] },
        { name:'Towcester', times:['22:08','22:26','22:42','22:59','23:16','23:33','23:49','00:07','00:24','00:41','00:59','01:16'] },
        { name:'Monmore', times:['18:49','19:09','19:27','19:47','20:04','20:24','20:42','21:01','21:19','21:37','21:57'] },
        { name:'Romford', times:['19:01','19:19','19:38','19:57','20:16','20:34','20:53','21:12','21:31','21:49'] },
        { name:'Sunderland', times:['22:37','22:53','23:11','23:27','23:44','00:01','00:19','00:36','00:54','01:11','01:28','01:46'] },
        { name:'Valley', times:['19:03','19:22','19:41','19:59','20:18','20:37','20:56','21:14','21:29'] },
        { name:'Star Pelaw', times:['22:11','22:29','22:46','23:04','23:24','23:42','23:58','00:16','00:34','00:52'] },
      ],
    },
  },
};

// ===================== TABLE TENNIS EXTENDED DATA =====================
const TABLE_TENNIS_EXTENDED: ExMatch[] = [
  { title:'Serhii Prus - Mykchailo Styranets', date:'16/06/2026 18:25:00', live:true, tv:true, type:'odds', values:[10.07,15.31,'-','-',1.07,1.11] },
  { title:'Eduard Rubtsov - Ivan Demchenko', date:'16/06/2026 18:25:00', live:true, tv:true, type:'odds', values:[5.98,7.69,'-','-',1.15,1.2] },
  { title:'Serhey Kylo - Serhii Balabei', date:'16/06/2026 18:30:00', live:true, tv:true, type:'odds', values:[1.17,1.22,'-','-',5.53,6.9] },
  { title:'Pavel Hala - Petr Provaznik', date:'16/06/2026 18:30:00', live:true, tv:true, type:'odds', values:[1.25,1.3,'-','-',4.31,5.02] },
  { title:'Serhii Chelpanov - Aleksandr Kovalchuk', date:'16/06/2026 18:55:00', type:'locked' },
  { title:'Orest Melnik - Valerii Hel', date:'16/06/2026 18:55:00', type:'locked' },
  { title:'Michal Chalupa - Zbynek Pagac', date:'16/06/2026 19:30:00', type:'partlocked', values:[1.71,1.76,'-','-',2.26,2.43] },
  { title:'Oleksandr Shkurupii - Oleksandr Zhurba', date:'16/06/2026 22:00:00', type:'odds', values:[3.61,4.15,'-','-',1.32,1.38] },
  { title:'Oleksandr Kolisnyk - Radim Urbaniec', date:'17/06/2026 00:30:00', type:'odds', values:[2.04,2.18,'-','-',1.86,1.94] },
  { title:'Rostislav Hasmanda - Jaroslav Strnad 1964', date:'17/06/2026 01:30:00', type:'partlocked', values:[2.16,2.3,'-','-',1.78,1.85] },
  { title:'Rostislav Hasmanda - Jaroslav Strnad 1964', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Vladimir Havlicek - Miroslav Svedik', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Tomas Dousek - Michal Cabis', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Jiri Stary - Miloslav Hubka', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Jaroslav Schwan - David Heczko', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Lukas Veigl - Radovan Pisa', date:'18/06/2026 17:00:00', type:'locked' },
  { title:'Serhii Priadko - Roman Boklah', date:'18/06/2026 17:01:00', type:'locked' },
  { title:'Oleksii Kulbach - Pavlo Melnichuk', date:'18/06/2026 17:01:00', tv:true, type:'odds', values:[4.98,6.02,'-','-',1.2,1.25] },
  { title:'Vasyl Moroz - Bolnyh Oleksandr', date:'18/06/2026 17:25:00', type:'locked' },
  { title:'Vaclav Kosar - Vaclav Hruska snr', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Ihor Torgachov - Viktor Ziakun', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Jiri Jira - Jiri Koch', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Milan Fisera - Milan Kolar', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Oleksandr Levytskyi - Yurii Zvolinskyi', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Adrian Walek - Josef Cabak', date:'18/06/2026 17:30:00', type:'locked' },
  { title:'Michal Vavrecka - Radovan Polasek', date:'18/06/2026 17:30:00', type:'partlocked', values:[2.16,2.3,'-','-',1.78,1.85] },
  { title:'Andrii Kurtenko - Vasyl Kondratenko', date:'18/06/2026 17:50:00', type:'locked' },
  { title:'Viktor Sydorchuk - Mykhailo Senyk', date:'18/06/2026 17:55:00', type:'locked' },
  { title:'Vitalii Ananiev - Roman Boklah', date:'18/06/2026 18:00:00', type:'locked' },
  { title:'Dmytro Shchegelskyi - Viktor Slozka', date:'18/06/2026 18:05:00', type:'locked' },
  { title:'Vitaliy Sydorenko - Ivan Elfemov', date:'18/06/2026 18:05:00', type:'locked' },
  { title:'Oleksii Kulbach - Bolnyh Oleksandr', date:'18/06/2026 18:25:00', type:'locked' },
  { title:'Andrii Peretiatko - Us Danylo', date:'18/06/2026 18:25:00', type:'locked' },
  { title:'Michal Snizek - Martin Holub', date:'18/06/2026 18:30:00', type:'locked' },
  { title:'Serhii Priadko - Ihor Torgachov', date:'18/06/2026 18:30:00', type:'locked' },
  { title:'Bohdan Chaikovskyi - Vitaly Krohmal', date:'18/06/2026 18:35:00', type:'locked' },
  { title:'Pavlo Ishchyk - Serhii Khandetskyi', date:'18/06/2026 18:55:00', type:'locked' },
  { title:'Dubinin Ihor - Yurii Zvolinskyi', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Michal Vedmoch - Jaroslav Prokupek', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Jiri Grohsgott - Pavel Berdych', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Petr Danko - Jakub Levicky', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Vitalii Ananiev - Viktor Ziakun', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Matej Grundel - Martin Skotnica', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Tomas Postelt - Michal Jezek', date:'18/06/2026 19:00:00', type:'locked' },
  { title:'Valentyn Chumak - Ivan Elfemov', date:'18/06/2026 19:05:00', type:'locked' },
  { title:'Vasyl Moroz - Viktor Sydorchuk', date:'18/06/2026 19:25:00', type:'locked' },
  { title:'Jiri Dedek - Radim Pavelka', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Jakub Pilch - Prikasky L', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Michal Snizek - Lukas Krutina', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Pavel Chovanec - Vaclav Zidek', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Milan Chalupnicek - Miloslav Lubas', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Ihor Torgachov - Roman Boklah', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Jan Kanera - Jan Simecek', date:'18/06/2026 19:30:00', type:'locked' },
  { title:'Andrii Peretiatko - Serhii Khandetskyi', date:'18/06/2026 19:55:00', type:'locked' },
  { title:'Serhii Priadko - Viktor Ziakun', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Michal Jezek - Jan Kanera', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Jaroslav Prokupek - Jiri Dedek', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Martin Skotnica - Jakub Pilch', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Pavel Berdych - Milan Chalupnicek', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Jakub Levicky - Pavel Chovanec', date:'18/06/2026 20:00:00', type:'locked' },
  { title:'Vitaliy Sydorenko - Yevhen Bielokon', date:'18/06/2026 20:05:00', type:'locked' },
  { title:'Viktor Sydorchuk - Bolnyh Oleksandr', date:'18/06/2026 20:25:00', type:'locked' },
  { title:'Dubinin Ihor - Oleksandr Levytskyi', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Radim Pavelka - Michal Vedmoch', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Prikasky L - Matej Grundel', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Miloslav Lubas - Jiri Grohsgott', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Vaclav Zidek - Petr Danko', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Jan Simecek - Tomas Postelt', date:'18/06/2026 20:30:00', type:'locked' },
  { title:'Dmytro Shchegelskyi - Vitaly Krohmal', date:'18/06/2026 20:35:00', type:'locked' },
  { title:'Pavlo Ishchyk - Serhii Pitsyk', date:'18/06/2026 20:55:00', type:'locked' },
  { title:'Jiri Grohsgott - Milan Chalupnicek', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Viktor Ziakun - Roman Boklah', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Lukas Krutina - Martin Holub', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Tomas Postelt - Jan Kanera', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Matej Grundel - Jakub Pilch', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Petr Danko - Pavel Chovanec', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Michal Vedmoch - Jiri Dedek', date:'18/06/2026 21:00:00', type:'locked' },
  { title:'Andrii Peretiatko - Vitalii Kobets', date:'18/06/2026 21:25:00', type:'locked' },
  { title:'Oleksii Kulbach - Viktor Sydorchuk', date:'18/06/2026 21:25:00', type:'locked' },
  { title:'Jaroslav Prokupek - Radim Pavelka', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Jakub Levicky - Vaclav Zidek', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Martin Skotnica - Prikasky L', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Michal Jezek - Jan Simecek', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Pavel Berdych - Miloslav Lubas', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Vitalii Ananiev - Serhii Priadko', date:'18/06/2026 21:30:00', type:'locked' },
  { title:'Aleksandr Zhirnov - Oleksandr Seliuchenko', date:'18/06/2026 21:50:00', type:'locked' },
  { title:'Vasyl Moroz - Mykhailo Senyk', date:'18/06/2026 21:55:00', type:'locked' },
  { title:'Serhii Pitsyk - Serhii Khandetskyi', date:'18/06/2026 21:55:00', type:'locked' },
  { title:'Valentyn Chumak - Yevhen Bielokon', date:'18/06/2026 22:05:00', type:'locked' },
  { title:'Myroslav Loboda - Viktor Slozka', date:'18/06/2026 22:05:00', type:'locked' },
  { title:'Anatolii Nazarov - Anatolii Levshyn', date:'18/06/2026 22:20:00', type:'locked' },
  { title:'Bolnyh Oleksandr - Pavlo Melnichuk', date:'18/06/2026 22:25:00', type:'locked' },
  { title:'Pavlo Ishchyk - Us Danylo', date:'18/06/2026 22:25:00', type:'locked' },
  { title:'Frantisek Schmidtmayer - Jan Vasek', date:'18/06/2026 22:30:00', type:'locked' },
  { title:'Vitaliy Sydorenko - Ruslan Serhyenko', date:'18/06/2026 22:35:00', type:'locked' },
  { title:'Oleksii Kulbach - Vasyl Moroz', date:'18/06/2026 22:55:00', type:'locked' },
  { title:'Vladimir Adamczyk - Radomir Vavrecka', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Ladislav Tuma - Petr Maly', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Matous Klimenta - Jan Simecek', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Josef Medek - Jan Zajicek', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Martin Bittner - Vinter, Tomas', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Zdenek Babinec - Vitezslav Burdik', date:'18/06/2026 23:00:00', type:'locked' },
  { title:'Ivan Elfemov - Oleksii Korobov', date:'18/06/2026 23:05:00', type:'locked' },
  { title:'Viktor Sydorchuk - Pavlo Melnichuk', date:'18/06/2026 23:25:00', type:'locked' },
  { title:'Pavlo Ishchyk - Vitalii Kobets', date:'18/06/2026 23:25:00', type:'locked' },
  { title:'Jakub Vales - Erik Mares', date:'18/06/2026 23:30:00', type:'locked' },
  { title:'Vaclav Zidek - Jakub Levicky', date:'18/06/2026 23:30:00', type:'locked' },
  { title:'Matyas Navedla - Prikasky L', date:'18/06/2026 23:30:00', type:'locked' },
  { title:'Jakub Hradecky - Daniel Tuma', date:'18/06/2026 23:30:00', type:'locked' },
  { title:'Frantisek Schmidtmayer - Petr Maly', date:'18/06/2026 23:30:00', type:'locked' },
  { title:'Dmytro Shchegelskyi - Volodymyr Kaidakov', date:'18/06/2026 23:35:00', type:'locked' },
  { title:'Mykhailo Senyk - Bolnyh Oleksandr', date:'18/06/2026 23:55:00', type:'locked' },
  { title:'Vitezslav Burdik - Matyas Navedla', date:'19/06/2026 00:00:00', type:'locked' },
  { title:'Ladislav Tuma - Jan Vasek', date:'19/06/2026 00:00:00', type:'locked' },
  { title:'Jan Zajicek - Jakub Vales', date:'19/06/2026 00:00:00', type:'locked' },
  { title:'Vinter, Tomas - Jakub Hradecky', date:'19/06/2026 00:00:00', type:'locked' },
  { title:'Radomir Vavrecka - Vaclav Zidek', date:'19/06/2026 00:00:00', type:'locked' },
  { title:'Viktor Slozka - Vitaly Krohmal', date:'19/06/2026 00:05:00', type:'locked' },
  { title:'Yevhen Bielokon - Oleksii Korobov', date:'19/06/2026 00:05:00', type:'locked' },
  { title:'Andrii Peretiatko - Pavlo Ishchyk', date:'19/06/2026 00:25:00', type:'locked' },
  { title:'Prikasky L - Zdenek Babinec', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Daniel Tuma - Martin Bittner', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Frantisek Schmidtmayer - Ladislav Tuma', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Erik Mares - Josef Medek', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Jakub Levicky - Vladimir Adamczyk', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Radek Rose - Matous Klimenta', date:'19/06/2026 00:30:00', type:'locked' },
  { title:'Ruslan Serhyenko - Ivan Elfemov', date:'19/06/2026 00:35:00', type:'locked' },
  { title:'Serhii Pitsyk - Us Danylo', date:'19/06/2026 00:55:00', type:'locked' },
  { title:'Petr Maly - Jan Vasek', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Zdenek Babinec - Matyas Navedla', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Vladimir Adamczyk - Vaclav Zidek', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Martin Bittner - Jakub Hradecky', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Josef Medek - Jakub Vales', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Serhii Rak - Andrii Zeniuk', date:'19/06/2026 01:00:00', type:'locked' },
  { title:'Volodymyr Maksiuta - Oleksandr Seliuchenko', date:'19/06/2026 01:20:00', type:'locked' },
  { title:'Vitalii Kobets - Serhii Khandetskyi', date:'19/06/2026 01:25:00', type:'locked' },
  { title:'Vinter, Tomas - Daniel Tuma', date:'19/06/2026 01:30:00', type:'locked' },
  { title:'Vitezslav Burdik - Prikasky L', date:'19/06/2026 01:30:00', type:'locked' },
];

// ===================== MATCH DATA =====================
const MATCH_DATA: Record<string, ExMatch[]> = {
  Cricket: [
    { title:'Super Over2', live:true, f:true, bm:true, type:'locked' },
    { title:'England W v Ireland W', date:'16/06/2026 22:30:00', live:true, tv:true, f:true, bm:true, type:'odds', values:['-',1.01,'-','-',130,140] },
    { title:'Melbourne Renegades XI v Adelaide Strikers XI', date:'16/06/2026 23:55:00', live:true, f:true, cards:true, type:'locked' },
    { title:'JT XI v SNP XI', date:'17/06/2026 00:25:00', live:true, f:true, bm:true, cards:true, type:'locked' },
    { title:'Punjab Kings (e) - Sunrisers Hyderabad (e)', date:'17/06/2026 01:00:00', live:true, tv:true, ebadge:true, type:'locked' },
    { title:'Kolkata Knight Riders (e) - Punjab Kings (e)', date:'17/06/2026 01:00:00', live:true, tv:true, ebadge:true, type:'locked' },
    { title:'ICC Womens T20 World Cup', date:'12/06/2026 22:30:00', bm:true, type:'locked' },
    { title:'Kolkata Knight Riders (e) - Sunrisers Hyderabad (e)', date:'17/06/2026 01:03:00', tv:true, ebadge:true, type:'locked' },
    { title:'Lucknow Super Giants (e) - Delhi Capitals (e)', date:'17/06/2026 01:03:00', tv:true, ebadge:true, type:'locked' },
    { title:'New Zealand T10 v India T10', date:'17/06/2026 01:10:00', tv:true, f:true, controllerIcon:true, type:'locked' },
    { title:'Afghanistan A v India A', date:'17/06/2026 09:30:00', type:'odds', values:[4.7,5,'-','-',1.25,1.27] },
    { title:'India v Afghanistan', date:'17/06/2026 13:00:00', f:true, bm:true, type:'odds', values:[1.15,1.16,'-','-',7.4,7.6] },
    { title:'Bangladesh v Australia', date:'17/06/2026 13:00:00', f:true, bm:true, type:'odds', values:[2.72,2.74,'-','-',1.58,1.59] },
    { title:'Australia W v Bangladesh W', date:'17/06/2026 14:30:00', f:true, bm:true, type:'odds', values:[1.02,1.03,'-','-',34,40] },
    { title:'Durham W v Yorkshire W', date:'17/06/2026 14:30:00', type:'odds', values:[1.64,2.28,'-','-',1.79,2.56] },
    { title:'Bhopal Leopards v Malwa Stallions', date:'17/06/2026 14:30:00', f:true, type:'odds', values:[1.77,2.04,'-','-',1.97,2.3] },
    { title:'Lancashire Thunder W v The Blaze W', date:'17/06/2026 14:30:00', type:'odds', values:[2.48,2.68,'-','-',1.6,1.68] },
    { title:'Essex W v Hampshire W', date:'17/06/2026 14:30:00', type:'odds', values:[2.14,2.62,'-','-',1.61,1.88] },
    { title:'Somerset W v Warwickshire W', date:'17/06/2026 14:30:00', type:'odds', values:[1.6,2.76,'-','-',1.57,2.66] },
    { title:'Northern Knights v North-West Warriors', date:'17/06/2026 14:45:00', f:true, type:'odds', values:[2.32,2.58,'-','-',1.64,1.75] },
    { title:'England v New Zealand', date:'17/06/2026 15:00:00', tv:true, f:true, bm:true, type:'odds', values:[1.92,1.93,8.8,9,2.72,2.74] },
    { title:'Vijayawada Sunshiners v Tungabhadra Warriors', date:'17/06/2026 18:00:00', type:'odds', values:[1.77,2.44,'-','-',1.7,2.3] },
    { title:'India W v Netherlands W', date:'17/06/2026 18:30:00', f:true, bm:true, type:'odds', values:[1.02,1.03,'-','-',34,38] },
    { title:'Chambal Ghariyals v Bundelkhand Bulls', date:'17/06/2026 19:00:00', type:'odds', values:[1.61,2.04,'-','-',1.96,2.62] },
    { title:'Leinster Lightning v North-West Warriors', date:'17/06/2026 19:30:00', f:true, bm:true, type:'odds', values:[1.37,1.56,'-','-',2.78,3.75] },
    { title:'South Africa W v Pakistan W', date:'17/06/2026 22:30:00', f:true, bm:true, type:'odds', values:[1.23,1.24,'-','-',5.1,5.3] },
    { title:'West Indies W v Scotland W', date:'18/06/2026 22:30:00', type:'odds', values:[1.32,1.36,'-','-',3.8,4.2] },
    { title:'Texas Super Kings v Seattle Orcas', date:'19/06/2026 05:30:00', type:'odds', values:[1.84,1.99,'-','-',2.02,2.18] },
    { title:'Los Angeles Knight Riders v San Francisco Unicorns', date:'20/06/2026 01:30:00', type:'odds', values:[1.75,2.6,'-','-',1.63,2.32] },
  ],
  Football: [
    { title:'Goal', live:true, tv:true, type:'locked' },
    { title:'France v Senegal', date:'17/06/2026 00:00:00', live:true, tv:true, f:true, bm:true, type:'odds', values:[2.06,2.08,2.96,2.98,5.5,5.6] },
    { title:'FIFA WORLD CUP - WINNER 2026', date:'17/06/2026 00:10:00', live:true, f:true, bm:true, type:'locked' },
    { title:'FIFA WORLD CUP 2026- SPECIAL MARKET', date:'17/06/2026 00:15:00', live:true, bm:true, type:'locked' },
    { title:'FIFA WORLD CUP 2026 - DAILY COMBO', date:'17/06/2026 00:20:00', live:true, f:true, bm:true, type:'locked' },
    { title:'Al-Qadsia v Al Salmiyah', date:'17/06/2026 00:50:00', live:true, tv:true, type:'odds', values:[1.3,1.31,5.2,5.5,23,26] },
    { title:'IA Akranes v Valur', date:'17/06/2026 00:55:00', live:true, tv:true, type:'odds', values:[1.43,1.45,4.9,5.1,9.2,9.8] },
    { title:'Vikingur Reykjavik v KR Reykjavik', date:'17/06/2026 00:55:00', live:true, tv:true, type:'odds', values:[1.32,1.34,5.7,5.9,12.5,13.5] },
    { title:'Stjarnan v Breidablik', date:'17/06/2026 00:55:00', live:true, tv:true, type:'odds', values:[6.2,6.6,4.5,4.7,1.59,1.62] },
    { title:'Iraq v Norway', date:'17/06/2026 03:00:00', f:true, bm:true, type:'odds', values:[15,15.5,7.4,7.6,1.24,1.25] },
    { title:'Fortaleza EC v America MG', date:'17/06/2026 04:00:00', type:'odds', values:[1.58,1.59,4.2,4.3,7.6,7.8] },
    { title:'Argentina v Algeria', date:'17/06/2026 06:00:00', f:true, bm:true, type:'odds', values:[1.46,1.47,4.7,4.8,9,9.2] },
    { title:'Austria v Jordan', date:'17/06/2026 09:00:00', f:true, bm:true, type:'odds', values:[1.39,1.4,5.4,5.5,10,10.5] },
    { title:'England v Croatia', date:'18/06/2026 01:00:00', type:'odds', values:[1.78,1.79,3.85,3.9,5.5,5.6] },
    { title:'Ghana v Panama', date:'18/06/2026 04:00:00', type:'odds', values:[2.32,2.34,3.45,3.5,3.55,3.6] },
    { title:'Czechia v South Africa', date:'18/06/2026 21:00:00', type:'odds', values:[1.83,1.84,3.9,3.95,4.9,5] },
  ],
  Tennis: [
    { title:'Joh Rodriguez Rodriguez v Ma Soto', date:'16/06/2026 22:30:00', live:true, tv:true, type:'odds', values:[7.4,7.8,'-','-',1.15,1.16] },
    { title:'Je Vandromme v Allur Zamarripa', date:'16/06/2026 22:55:00', live:true, tv:true, bm:true, type:'odds', values:[1.5,1.51,'-','-',2.98,3.1] },
    { title:'Kicker v Coria', date:'17/06/2026 00:00:00', live:true, tv:true, type:'odds', values:[1.28,1.29,'-','-',4.4,4.6] },
    { title:'ATP LONDON OPEN 2026- WINNER', date:'21/06/2026 13:00:00', live:true, bm:true, type:'locked' },
    { title:'WTA BERLIN OPEN 2026 - WINNER', date:'21/06/2026 15:00:00', live:true, bm:true, type:'locked' },
    { title:'Vekic v Al Eala', date:'17/06/2026 13:30:00', live:true, tv:true, bm:true, type:'odds', values:[6.4,6.6,'-','-',1.18,1.19] },
    { title:'Mertens v Nikol Bartunkova', date:'17/06/2026 13:30:00', live:true, tv:true, bm:true, type:'odds', values:[2.66,2.74,'-','-',1.57,1.6] },
    { title:'Ziz Bergs v Fritz', date:'17/06/2026 13:35:00', live:true, tv:true, bm:true, type:'odds', values:[4.6,5,'-','-',1.25,1.28] },
    { title:'Carballes Baena v Travaglia', date:'17/06/2026 14:50:00', live:true, tv:true, bm:true, type:'odds', values:[1.62,1.71,'-','-',2.4,2.62] },
    { title:'Ol Crawford v Galarneau', date:'17/06/2026 16:25:00', live:true, tv:true, bm:true, type:'odds', values:[1.56,1.59,'-','-',2.68,2.78] },
    { title:'Bar Palicova v J Teichmann', date:'17/06/2026 16:25:00', live:true, tv:true, bm:true, type:'odds', values:[3.25,3.65,'-','-',1.38,1.45] },
    { title:'Yu Hsu v Searle', date:'17/06/2026 16:25:00', live:true, tv:true, bm:true, type:'odds', values:[5.2,5.9,'-','-',1.2,1.24] },
    { title:'Grabher v A Sobolieva', date:'17/06/2026 16:30:00', live:true, tv:true, bm:true, type:'odds', values:[1.44,1.53,'-','-',2.88,3.3] },
    { title:'Olivieri v Ribecai', date:'17/06/2026 16:35:00', live:true, tv:true, bm:true, type:'odds', values:[1.95,1.99,'-','-',2,2.06] },
    { title:'Mao Mushika - Yu Chen', date:'17/06/2026 18:05:00', live:true, tv:true, type:'partlocked', values:[1.71,1.77,'-','-',2.18,2.43] },
    { title:'Dayeon Back / Chia Yi Tsao - Yu-Ning Tsai / Ching Ying Chen', date:'17/06/2026 18:10:00', live:true, type:'locked' },
    { title:'Sheng Tang / Mingyuan Yang - Chen Ye / Pan Weiwen', date:'17/06/2026 18:15:00', live:true, type:'locked' },
    { title:'Hikaru Sato / Anri Nagata - Gyeong Seo Lee / Erika Sema', date:'17/06/2026 18:20:00', live:true, type:'partlocked', values:[1.44,1.49,'-','-',3.02,3.29] },
    { title:'Kevin Krawietz / Tim Puetz - Galloway Robert / John Peers', date:'17/06/2026 19:15:00', live:true, tv:true, type:'odds', values:[2.57,'-','-','-',1.49,'-'] },
    { title:'ATP HALLE OPEN 2026 - WINNER', date:'21/06/2026 17:00:00', live:true, bm:true, type:'locked' },
    { title:'WTA NOTTINGHAM OPEN 2026 - WINNER', date:'21/06/2026 18:00:00', live:true, bm:true, type:'locked' },
    { title:'Yu Starodubtseva v Emm Navarro', date:'17/06/2026 13:40:00', bm:true, type:'odds', values:[2.8,2.84,'-','-',1.54,1.56] },
    { title:'Nakashima v Ig Buse', date:'17/06/2026 13:45:00', bm:true, type:'odds', values:[1.32,1.33,'-','-',4.1,4.2] },
    { title:'Tiafoe v Shimabukuro', date:'17/06/2026 16:00:00', bm:true, type:'odds', values:[1.46,1.47,'-','-',3.1,3.15] },
    { title:'Ofner v Dalla Valle', date:'17/06/2026 16:00:00', bm:true, type:'odds', values:[1.45,1.46,'-','-',3.2,3.25] },
    { title:'Be Shelton v Sonego', date:'17/06/2026 16:00:00', bm:true, type:'odds', values:[1.27,1.28,'-','-',4.6,4.8] },
    { title:'J Pegula v K Siniakova', date:'17/06/2026 16:00:00', bm:true, type:'odds', values:[1.55,1.56,'-','-',2.78,2.82] },
    { title:'Ferro v Gorgodze', date:'17/06/2026 16:30:00', bm:true, type:'odds', values:[1.21,1.22,'-','-',5.6,5.9] },
    { title:'Volynets v Je Bouzas Maneiro', date:'17/06/2026 16:30:00', bm:true, type:'odds', values:[1.69,1.71,'-','-',2.42,2.44] },
    { title:'Aldila Sutjiadi / Janice Tjen - Ann Li / Tereza Valentova', date:'17/06/2026 16:30:00', type:'locked' },
    { title:'Demanet v Sanchez Jover', date:'17/06/2026 16:40:00', bm:true, type:'odds', values:[2.74,2.8,'-','-',1.56,1.57] },
    { title:'Diaz Acosta v Hy Barton', date:'17/06/2026 16:40:00', bm:true, type:'odds', values:[1.54,1.56,'-','-',2.8,2.82] },
    { title:'Djere v Seggerman', date:'17/06/2026 16:40:00', tv:true, bm:true, type:'odds', values:[1.17,1.18,'-','-',6.4,6.8] },
    { title:'Christian Harrison / Neal Skupski - Austin Krajicek / Nikola Mektic', date:'17/06/2026 16:40:00', type:'locked' },
    { title:'Ma Kasnikowski v Choinski', date:'17/06/2026 16:40:00', bm:true, type:'odds', values:[2.36,2.4,'-','-',1.71,1.73] },
    { title:'Cecchinato v Bondioli', date:'17/06/2026 16:45:00', bm:true, type:'odds', values:[1.58,1.61,'-','-',2.66,2.74] },
    { title:'OConnell v Clarke', date:'17/06/2026 16:45:00', bm:true, type:'odds', values:[1.63,1.64,'-','-',2.58,2.6] },
    { title:'Gi Bailly v Co Rolland de Ravel', date:'17/06/2026 16:50:00', bm:true, type:'odds', values:[1.41,1.43,'-','-',3.35,3.45] },
    { title:'An Kulikova v Ali Charaeva', date:'17/06/2026 16:55:00', bm:true, type:'odds', values:[8.8,10.5,'-','-',1.11,1.13] },
    { title:'Cl Tabur v S Sakellaridis', date:'17/06/2026 16:55:00', bm:true, type:'odds', values:[2.22,2.28,'-','-',1.79,1.82] },
    { title:'Dimitrov v Gannon', date:'17/06/2026 16:55:00', bm:true, type:'odds', values:[1.04,1.05,'-','-',21,26] },
    { title:'Hruncakova v Yeonwoo Ku', date:'17/06/2026 16:55:00', bm:true, type:'odds', values:[2.04,2.08,'-','-',1.93,1.97] },
    { title:'Raquillet v P Kotov', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[6.6,7.4,'-','-',1.16,1.18] },
    { title:'Alex de Minaur v Shapovalov', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[1.27,1.28,'-','-',4.5,4.7] },
    { title:'Fearnley v Bonzi', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[2.12,2.16,'-','-',1.87,1.88] },
    { title:'Ti Droguet v Je Kym', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[1.55,1.56,'-','-',2.78,2.8] },
    { title:'Toshihide Matsui - Jangjun Kim', date:'17/06/2026 17:00:00', type:'locked' },
    { title:'Go Bueno v Ferreira Silva', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[1.75,1.82,'-','-',2.22,2.34] },
    { title:'Gombos v Svrcina', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[4.8,5,'-','-',1.25,1.27] },
    { title:'Chase Ferguson / Cheng-Peng Hsieh - Zhenxiong Dong / Aoran Wang', date:'17/06/2026 17:00:00', type:'locked' },
    { title:'Krumich v Jo Reis Da Silva', date:'17/06/2026 17:00:00', bm:true, type:'odds', values:[2.32,2.34,'-','-',1.74,1.76] },
    { title:'Isabelle Haverlag / Ingrid Martins - Ulrikke Eikeri / Quinn Gleason', date:'17/06/2026 17:00:00', type:'locked' },
    { title:'Leylah Fernandez / Yuliia Starodubtseva - Eri Hozumi / Wu Fang-Hsien', date:'17/06/2026 17:20:00', type:'odds', values:[1.71,'-','-','-',2.3,'-'] },
    { title:'Balshaw v Luc Ratti', date:'17/06/2026 17:30:00', bm:true, type:'odds', values:[1.42,1.44,'-','-',3.3,3.35] },
    { title:'Galan v Van Assche', date:'17/06/2026 17:30:00', bm:true, type:'odds', values:[2.68,2.76,'-','-',1.57,1.6] },
    { title:'Yan Rong Tzeng / Ju-Yun Jeng - Misaki Matsuda / Yuki Naito', date:'17/06/2026 17:30:00', type:'locked' },
    { title:'Natsumi Kawaguchi / Ayano Shimizu - Anchisa Chanta / Fang An Lin', date:'17/06/2026 17:30:00', type:'locked' },
    { title:'Hurkacz v Altmaier', date:'17/06/2026 17:30:00', bm:true, type:'odds', values:[1.29,1.3,'-','-',4.3,4.5] },
    { title:'Le Tien v F Auger-Aliassime', date:'17/06/2026 17:30:00', bm:true, type:'odds', values:[2.32,2.36,'-','-',1.74,1.75] },
    { title:'Heliovaara Harri / Patten Henry - Guido Andreozzi / Manuel Guinard', date:'17/06/2026 17:50:00', type:'locked' },
    { title:'Ot Virtanen v Fe Gill', date:'17/06/2026 18:00:00', bm:true, type:'odds', values:[1.22,1.23,'-','-',5.3,5.6] },
    { title:'Bandecchi v Katar Kuzmova', date:'17/06/2026 18:00:00', bm:true, type:'odds', values:[1.47,1.49,'-','-',3.05,3.15] },
    { title:'Vasami v Bu Gadamauri', date:'17/06/2026 18:00:00', bm:true, type:'odds', values:[1.72,1.76,'-','-',2.32,2.4] },
    { title:'B Harris v Ar Gea', date:'17/06/2026 18:00:00', bm:true, type:'odds', values:[2.06,2.1,'-','-',1.9,1.94] },
    { title:'Rottgering v Jacquet', date:'17/06/2026 18:00:00', bm:true, type:'odds', values:[2.78,2.82,'-','-',1.55,1.57] },
    { title:'Tereza Mihalikova / Olivia Nicholls - Elise Mertens / Shuai Zhang', date:'17/06/2026 18:30:00', type:'locked' },
    { title:'Constantin Frantzen / Robin Haase - A.davidovich Fokina/a.rinderknech', date:'17/06/2026 18:30:00', type:'locked' },
    { title:'Caty Mcnally / Storm Sanders Hunter - Alicia Dudeney / Mingge Xu', date:'17/06/2026 18:30:00', type:'locked' },
    { title:'Eudice Chong / Magali Kempen - Shuko Aoyama / Hao-Ching Chan', date:'17/06/2026 18:30:00', type:'partlocked', values:[2.18,'-','-','-',1.67,'-'] },
    { title:'D Yastremska v T Maria', date:'17/06/2026 18:30:00', bm:true, type:'odds', values:[2.08,2.12,'-','-',1.9,1.91] },
    { title:'Feldbausch v Sv Gulin', date:'17/06/2026 18:30:00', bm:true, type:'odds', values:[1.32,1.33,'-','-',4,4.1] },
    { title:'P Badosa v C Gauff', date:'17/06/2026 18:30:00', bm:true, type:'odds', values:[3.85,3.9,'-','-',1.34,1.36] },
    { title:'Mannarino v Ar Fery', date:'17/06/2026 18:30:00', bm:true, type:'odds', values:[1.83,1.85,'-','-',2.18,2.2] },
    { title:'J Rodionov v Colton Smith', date:'17/06/2026 18:50:00', bm:true, type:'odds', values:[2.04,2.1,'-','-',1.92,1.95] },
    { title:'Campana Lee v Th Faurel', date:'17/06/2026 19:00:00', bm:true, type:'odds', values:[3.9,4.1,'-','-',1.32,1.35] },
    { title:'Atmane v Medvedev', date:'17/06/2026 19:00:00', bm:true, type:'odds', values:[5.6,5.8,'-','-',1.21,1.22] },
    { title:'Ram Rajeev/Salisbury Joe - Marcelo Arevalo / Mate Pavic', date:'17/06/2026 19:00:00', type:'partlocked', values:[3.06,'-','-','-',1.35,'-'] },
    { title:'Anastasia Detiuc / Irina Khromacheva - Lyudmyla Kichenok / Desirae Krawczyk', date:'17/06/2026 19:00:00', type:'locked' },
    { title:'David Stevenson / Marcus Willis - Hugo Nys / Roger-Vasselin', date:'17/06/2026 19:00:00', type:'odds', values:[2.39,'-','-','-',1.65,'-'] },
    { title:'Yi Zhou v Ni Mejia', date:'17/06/2026 19:30:00', bm:true, type:'odds', values:[1.68,1.71,'-','-',2.42,2.46] },
    { title:'Robert Cash / James Tracy - Jan-Lennard Struff / Yannick Hanfmann', date:'17/06/2026 19:30:00', type:'odds', values:[1.78,'-','-','-',2.18,'-'] },
    { title:'Brooksby v Cerundolo', date:'17/06/2026 20:00:00', bm:true, type:'odds', values:[2.72,2.76,'-','-',1.57,1.58] },
    { title:'Ta Gibson v Q Zheng', date:'17/06/2026 20:00:00', bm:true, type:'odds', values:[2.88,2.9,'-','-',1.52,1.53] },
    { title:'Gu Heide v Mrva', date:'17/06/2026 20:00:00', bm:true, type:'odds', values:[1.63,1.64,'-','-',2.56,2.6] },
    { title:'A Sabalenka v Alexandrova', date:'17/06/2026 20:30:00', bm:true, type:'odds', values:[1.27,1.28,'-','-',4.6,4.7] },
    { title:'E Ribeiro v J La Serna', date:'17/06/2026 21:00:00', bm:true, type:'odds', values:[1.71,3.8,'-','-',1.36,2.4] },
    { title:'Sa De la Fuente v Ma Soto', date:'17/06/2026 21:00:00', bm:true, type:'odds', values:[1.44,22,'-','-',1.1,3.3] },
    { title:'Tia Rakotomanga Rajaona v Mia Ristic', date:'17/06/2026 21:00:00', bm:true, type:'odds', values:[2.08,2.2,'-','-',1.84,1.92] },
    { title:'Gu Justo v Gomez', date:'17/06/2026 21:00:00', bm:true, type:'odds', values:[1.09,2.98,'-','-',1.51,13.5] },
    { title:'Ambrogi v Sant Rodriguez Taverna', date:'17/06/2026 22:30:00', bm:true, type:'odds', values:[1.09,1.56,'-','-',1.44,13] },
    { title:'Da Rincon v Napolitano', date:'17/06/2026 23:00:00', bm:true, type:'odds', values:[2.24,2.3,'-','-',1.76,1.8] },
    { title:'Ju Estevez v Casanova', date:'18/06/2026 00:00:00', bm:true, type:'odds', values:[2.42,2.54,'-','-',1.64,1.7] },
    { title:'Joa Aguilar Cardozo v Villanueva', date:'18/06/2026 00:00:00', bm:true, type:'odds', values:[2.28,2.48,'-','-',1.67,1.78] },
    { title:'Scott Jones - Valentino De Pellegrin', date:'18/06/2026 04:30:00', type:'locked' },
    { title:'Luca Connaughton - Nikita Volonski', date:'18/06/2026 04:30:00', type:'locked' },
    { title:'Finley Dyer - Vitorio Sardinha', date:'18/06/2026 04:30:00', type:'locked' },
    { title:'Daniel Jankoski - Omar Jasika', date:'18/06/2026 04:30:00', tv:true, type:'locked' },
    { title:'Ri Hijikata v Lehecka', date:'18/06/2026 13:00:00', bm:true, type:'odds', values:[3.75,3.9,'-','-',1.34,1.37] },
    { title:'Paul v Bot Van de Zandschulp', date:'18/06/2026 13:00:00', bm:true, type:'odds', values:[1.32,1.33,'-','-',4,4.2] },
    { title:'Ha Medjedovic v Humbert', date:'18/06/2026 13:00:00', bm:true, type:'odds', values:[2.52,2.62,'-','-',1.61,1.66] },
    { title:'Moutet v Davidovich Fokina', date:'18/06/2026 13:00:00', bm:true, type:'odds', values:[2.4,2.46,'-','-',1.68,1.71] },
    { title:'Ruggeri v M Sherif', date:'18/06/2026 13:30:00', bm:true, type:'odds', values:[1.46,7.4,'-','-',1.16,3.2] },
    { title:'Mir Bulgaru v A Del Olmo', date:'18/06/2026 13:30:00', bm:true, type:'odds', values:[2.44,2.9,'-','-',1.57,1.7] },
    { title:'X Wang v Car Monnet', date:'18/06/2026 13:30:00', bm:true, type:'odds', values:[1.17,1.21,'-','-',5.9,6.8] },
    { title:'Ortenzi v Eliz Yaneva', date:'18/06/2026 13:30:00', bm:true, type:'odds', values:[2.3,2.44,'-','-',1.69,1.77] },
    { title:'Golubic v Zeyn Sonmez', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[2.44,3.95,'-','-',1.35,1.7] },
    { title:'Dar Vidmanova v Ele Micic', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.06,2.9,'-','-',1.53,18] },
    { title:'Al Korneeva v Kubka', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.18,3.3,'-','-',1.44,7] },
    { title:'M Bouzkova v Ha Klugman', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.1,1.22,'-','-',5.5,11] },
    { title:'Keys v Muchova', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.75,2.14,'-','-',1.88,2.34] },
    { title:'L Noskova v D Parry', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.31,1.43,'-','-',3.35,4.2] },
    { title:'A Li v Tay Preston', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.48,1.56,'-','-',2.78,3.05] },
    { title:'Svitolina v Eva Lys', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.19,1.22,'-','-',5.5,6.4] },
    { title:'Ka Pliskova v C Mcnally', date:'18/06/2026 14:00:00', bm:true, type:'odds', values:[1.57,3.3,'-','-',1.44,2.74] },
    { title:'A Zverev v Hanfmann', date:'18/06/2026 14:30:00', bm:true, type:'odds', values:[1.13,1.16,'-','-',7.6,8.8] },
    { title:'Collignon v Ma Bellucci', date:'18/06/2026 14:30:00', bm:true, type:'odds', values:[1.84,1.88,'-','-',2.14,2.2] },
    { title:'Test 1 v Test 2', date:'29/06/2030 23:30:00', bm:true, type:'locked' },
  ],
  'Table Tennis': TABLE_TENNIS_EXTENDED,
  Basketball: [
    { title:'Real Bamako - USFAS Bamako', date:'16/06/2026 18:00:00', live:true, tv:true, type:'odds', values:[3.48,3.88,'-','-',1.35,1.4] },
    { title:'Maccabi Tel Aviv - Hapoel Tel Aviv', date:'16/06/2026 22:50:00', type:'odds', values:[1.6,1.67,'-','-',2.47,2.69] },
    { title:'Indiana Fever W - Toronto Tempo W', date:'17/06/2026 04:00:00', type:'odds', values:[1.32,1.37,'-','-',3.68,4.15] },
    { title:'Nelson Giants - Manawatu Jets', date:'17/06/2026 12:00:00', type:'odds', values:[2.47,2.69,'-','-',1.6,1.67] },
  ],
  Wrestling: [
    { title:'Bianca Belair v Rhea Ripley', date:'16/06/2026 18:50:00', live:true, tv:true, bm:true, controllerIcon:true, type:'locked' },
    { title:'Roman Reigns v Stone Cold', date:'16/06/2026 19:00:00', bm:true, controllerIcon:true, type:'locked' },
    { title:'Cody Rhodes v Seth Rollins', date:'16/06/2026 19:30:00', bm:true, controllerIcon:true, type:'locked' },
  ],
  Volleyball: [
    { title:'Dominican Republic W - USA W', date:'17/06/2026 09:00:00', type:'odds', values:[9.31,15.31,'-','-',1.07,1.12] },
    { title:'Canada W - Netherlands W', date:'17/06/2026 11:00:00', type:'odds', values:[1.57,1.64,'-','-',2.54,2.77] },
    { title:'Japan W - Serbia W', date:'17/06/2026 17:00:00', type:'odds', values:[1.25,1.31,'-','-',4.21,5.02] },
    { title:'France W - Brazil W', date:'17/06/2026 18:00:00', type:'odds', values:[6.86,9.35,'-','-',1.12,1.17] },
  ],
  Snooker: [
    { title:'Luca Brecel - Steven Hallworth', date:'16/06/2026 18:30:00', live:true, tv:true, type:'partlocked', values:[1.46,1.57,'-','-',2.73,3.19] },
    { title:'Y. Xu - Mahmoud El Hareedy', date:'16/06/2026 18:30:00', live:true, type:'odds', values:[1.33,1.42,'-','-',3.36,4.05] },
    { title:'Michael Holt - Leone Crowley', date:'16/06/2026 18:30:00', live:true, tv:true, type:'odds', values:[1.11,1.2,'-','-',5.98,10.11] },
    { title:'Martin ODonnell - Liam Davies', date:'16/06/2026 23:00:00', type:'odds', values:[1.62,1.69,'-','-',2.43,2.63] },
    { title:'Ryan Day - Mitchell Mann', date:'16/06/2026 23:00:00', type:'odds', values:[1.35,1.4,'-','-',3.48,3.88] },
  ],
  Politics: [
    { title:'US Presidential Election 2028 - Winner', date:'01/11/2028 00:00:00', f:true, bm:true, type:'locked' },
  ],
};

// ===================== GAMES =====================
const GAMES = [
  {img:IMG.i01,lbl:'MATKA MARKET'},{img:IMG.i02,lbl:'VIP TEENPATTI 1DAY'},
  {img:IMG.i03,lbl:'DOLI DANA LIVE'},{img:IMG.i04,lbl:'MOGAMBO'},
  {img:IMG.i05,lbl:'20-20 TEEN PATTI'},{img:IMG.i06,lbl:'LUCKY 6'},
  {img:IMG.i07,lbl:'BEACH ROULETTE'},{img:IMG.i08,lbl:'GOLDEN ROULETTE'},
  {img:IMG.i09,lbl:'ROULETTE'},{img:IMG.i09,lbl:'POISON TP ONE DAY'},
  {img:IMG.i10,lbl:'UNIQUE TEENPATTI'},{img:IMG.i11,lbl:'POISON TP 20-20'},
  {img:IMG.i12,lbl:'UNLIMITED JOKER 20-20'},{img:IMG.i13,lbl:'TEENPATTI JOKER 20-20'},
  {img:IMG.i14,lbl:'UNLIMITED JOKER ONEDAY'},{img:IMG.i15,lbl:'20-20 TEENPATTI C'},
  {img:IMG.i16,lbl:'2 BOLLYWOOD CASINO'},{img:IMG.i17,lbl:'UNIQUE ROULETTE'},
  {img:IMG.i18,lbl:'MINI SUPER OVER'},{img:IMG.i19,lbl:'GOAL'},
  {img:IMG.i20,lbl:'ANDAR BAHAR 150'},{img:IMG.i21,lbl:'LUCKY 15'},
  {img:IMG.i22,lbl:'SUPER OVER 2'},{img:IMG.i23,lbl:'QUEEN TOP OPEN'},
  {img:IMG.i24,lbl:'JACK TOP OPEN'},{img:IMG.i25,lbl:'SIC BO 2'},
  {img:IMG.i26,lbl:'INSTANT TP 3.0'},{img:IMG.i27,lbl:'SIC BO'},
  {img:IMG.i28,lbl:'BALL BY BALL'},{img:IMG.i29,lbl:'INSTANT TP 2.0'},
  {img:IMG.i30,lbl:'TEENPATTI 1 DAY'},{img:IMG.i31,lbl:'20-20 TEENPATTI'},
  {img:IMG.i32,lbl:'TEENPATTI TEST'},{img:IMG.i33,lbl:'TEENPATTI OPEN'},
  {img:IMG.i34,lbl:'POKER 1 DAY'},{img:IMG.i35,lbl:'20-20 POKER'},
  {img:IMG.i36,lbl:'POKER 6 PLAYERS'},{img:IMG.i37,lbl:'BACCARAT'},
  {img:IMG.i38,lbl:'BACCARAT 2'},{img:IMG.i39,lbl:'20-20 DRAGON TIGER'},
  {img:IMG.i40,lbl:'1 DAY DRAGON TIGER'},{img:IMG.i41,lbl:'20-20 DTL'},
  {img:IMG.i42,lbl:'20-20 DT 2'},{img:IMG.i43,lbl:'32 CARDS A'},
  {img:IMG.i44,lbl:'32 CARDS B'},{img:IMG.i45,lbl:'ANDAR BAHAR'},
  {img:IMG.i46,lbl:'ANDAR BAHAR 2'},{img:IMG.i47,lbl:'7-A LUCKY'},
  {img:IMG.i48,lbl:'7-B LUCKY'},{img:IMG.i49,lbl:'3 CARDS JUDGEMENT'},
  {img:IMG.i50,lbl:'CASINO WAR'},{img:IMG.i51,lbl:'WORLI MATKA'},
  {img:IMG.i52,lbl:'INSTANT WORLI'},{img:IMG.i53,lbl:'AMAR AKBAR ANTHONY'},
  {img:IMG.i54,lbl:'BOLLYWOOD CASINO'},{img:IMG.i55,lbl:'LOTTERY'},
  {img:IMG.i56,lbl:'5 FIVE CRICKET'},{img:IMG.i57,lbl:'CRICKET MATCH 20-20'},
  {img:IMG.i58,lbl:'CASINO METER'},{img:IMG.i59,lbl:'TEENPATTI 2.0'},
  {img:IMG.i60,lbl:'QUEEN'},{img:IMG.i61,lbl:'RACE 20'},
  {img:IMG.i62,lbl:'LUCKY 7-C CASINO'},{img:IMG.i63,lbl:'SUPER OVER RSA ENG'},
  {img:IMG.i64,lbl:'THE TRAP'},{img:IMG.i65,lbl:'2 CARDS TEENPATTI'},
  {img:IMG.i66,lbl:'29 BACCARAT'},{img:IMG.i67,lbl:'MUFLIS TEENPATTI'},
  {img:IMG.i68,lbl:'RACE TO 17'},{img:IMG.i69,lbl:'20-20 TEENPATTI B'},
];

// ===================== LOCK CELL =====================
const LockCell: React.FC<{ rightTone?: boolean; colSpan?: number }> = ({ rightTone, colSpan = 2 }) => (
  <td colSpan={colSpan} className={`ex-lock-td${rightTone ? ' right' : ''}`}>
    <div className={`ex-lock-cell${rightTone ? ' right' : ''}`}>
      <span>-</span>
      <img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="ex-lock-icon"/>
      <span>-</span>
    </div>
  </td>
);

// ===================== MOBILE MATCH CARD =====================
const MobileMatchCard: React.FC<{ match: ExMatch }> = ({ match }) => {
  const v = match.values || [];
  const renderOddsRow = () => {
    if (match.type === 'locked' || match.type === 'partlocked2') {
      return (
        <div className="mob-odds-row">
          {['1','X','2'].map(label => (
            <div key={label} className="mob-odds-group">
              <div className="mob-odds-label">{label}</div>
              <div className="mob-odds-cells">
                <div className="mob-cell lock"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="mob-lock-icon"/></div>
                <div className="mob-cell lock"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="mob-lock-icon"/></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (match.type === 'partlocked') {
      return (
        <div className="mob-odds-row">
          <div className="mob-odds-group">
            <div className="mob-odds-label">1</div>
            <div className="mob-odds-cells">
              <div className="mob-cell back">{v[0]??'-'}</div>
              <div className="mob-cell lock"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="mob-lock-icon"/></div>
            </div>
          </div>
          <div className="mob-odds-group">
            <div className="mob-odds-label">X</div>
            <div className="mob-odds-cells"><div className="mob-cell dash-blue">-</div><div className="mob-cell dash-pink">-</div></div>
          </div>
          <div className="mob-odds-group">
            <div className="mob-odds-label">2</div>
            <div className="mob-odds-cells">
              <div className="mob-cell back">{v[4]??'-'}</div>
              <div className="mob-cell lock"><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="mob-lock-icon"/></div>
            </div>
          </div>
        </div>
      );
    }
    const cellVal = (val: OddsVal, isBack: boolean) => {
      const isDash = val === '-';
      return <div className={`mob-cell ${isDash ? (isBack ? 'dash-blue' : 'dash-pink') : (isBack ? 'back' : 'lay')}`}>{isDash ? '-' : val}</div>;
    };
    return (
      <div className="mob-odds-row">
        <div className="mob-odds-group"><div className="mob-odds-label">1</div><div className="mob-odds-cells">{cellVal(v[0],true)}{cellVal(v[1],false)}</div></div>
        <div className="mob-odds-group"><div className="mob-odds-label">X</div><div className="mob-odds-cells">{cellVal(v[2],true)}{cellVal(v[3],false)}</div></div>
        <div className="mob-odds-group"><div className="mob-odds-label">2</div><div className="mob-odds-cells">{cellVal(v[4],true)}{cellVal(v[5],false)}</div></div>
      </div>
    );
  };
  return (
    <div className="mob-match-card">
      <div className="mob-card-header">
        <div className="mob-card-title-wrap">
          <span className="mob-card-title">{match.title}</span>
          {match.date && <span className="mob-card-date">{match.date}</span>}
        </div>
        <div className="mob-card-badges">
          {match.live && <span className="ex-dot"></span>}
          {match.tv && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/icons/tv.png" alt="tv" onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}}/>}
          {match.f && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_fancy.png" alt="f"/>}
          {match.bm && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_bm.png" alt="BM"/>}
          {match.controllerIcon && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/game-icon.svg" alt="game"/>}
        </div>
      </div>
      {renderOddsRow()}
    </div>
  );
};

// ===================== ODDS ROW (DESKTOP) =====================
const ExRow: React.FC<{ match: ExMatch }> = ({ match }) => {
  const v = match.values || [];
  const cell = (val: OddsVal, isBack: boolean) => {
    const isDash = val === '-';
    return <td className={isDash ? (isBack ? 'ex-dash-blue' : 'ex-dash-pink') : (isBack ? 'ex-back' : 'ex-lay')}>{isDash ? '-' : val}</td>;
  };
  return (
    <tr className="ex-row">
      <td className="ex-td-game">
        <span className="ex-gtitle">{match.title}</span>
        {match.date && <span className="ex-gdate"> / {match.date}</span>}
      </td>
      <td className="ex-td-badges">
        <div className="ex-badges-inner">
          {match.live && <span className="ex-dot"></span>}
          {match.tv && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/icons/tv.png" alt="tv" onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}}/>}
          {match.f && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_fancy.png" alt="f"/>}
          {match.bm && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_bm.png" alt="BM"/>}
          {match.cards && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_vir.png" alt="vir" style={{height:'11px'}}/>}
          {match.ebadge && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/ic_fancy.png" alt="e" style={{height:'14px'}}/>}
          {match.controllerIcon && <img className="ex-bdg-img" src="https://allpanel247.com/static/front/img/game-icon.svg" alt="game"/>}
        </div>
      </td>
      {match.type === 'locked' && (<><LockCell/><td className="ex-dash-blue">-</td><td className="ex-dash-pink">-</td><LockCell rightTone/></>)}
      {match.type === 'partlocked' && (
        <>
          {cell(v[0],true)}
          <td className="ex-lock-td"><div className="ex-lock-cell" style={{gap:0,justifyContent:'center'}}><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="ex-lock-icon"/></div></td>
          <td className="ex-dash-blue">-</td><td className="ex-dash-pink">-</td>
          {cell(v[4],true)}
          <td className="ex-lock-td"><div className="ex-lock-cell right" style={{gap:0,justifyContent:'center'}}><img src="https://g1ver.sprintstaticdata.com/v104/static/front/img/icons/lock.svg" alt="lock" className="ex-lock-icon"/></div></td>
        </>
      )}
      {match.type === 'partlocked2' && (<><LockCell/><td className="ex-dash-blue">-</td><td className="ex-dash-pink">-</td><LockCell rightTone/></>)}
      {match.type === 'odds' && (<>{cell(v[0],true)}{cell(v[1],false)}{cell(v[2],true)}{cell(v[3],false)}{cell(v[4],true)}{cell(v[5],false)}</>)}
    </tr>
  );
};

// ===================== RACING VIEW =====================
const RacingView: React.FC<{ sport: string }> = ({ sport }) => {
  const data = RACING_DATA[sport];
  const [activeSub, setActiveSub] = useState(data.subTabs[0]);
  const venues = data.venues[activeSub] || [];
  return (
    <div className="ex-racing-wrap">
      <div className="ex-racing-subtabs">
        {data.subTabs.map(st => <div key={st} className={`ex-racing-stab${activeSub===st?' on':''}`} onClick={()=>setActiveSub(st)}>{st}</div>)}
      </div>
      {venues.length===0 ? <div className="ex-no-record">No Record Found</div> : venues.map((v,vi) => (
        <div key={vi} className="ex-venue-row">
          <div className="ex-venue-name"><span>{v.name}</span></div>
          <div className="ex-venue-times">{v.times.map((t,ti) => <div key={ti} className="ex-vtime">{t}</div>)}</div>
        </div>
      ))}
    </div>
  );
};

const TableColgroup = () => (
  <colgroup>
    <col className="ex-col-game"/><col className="ex-col-badges"/>
    <col className="ex-col-odds"/><col className="ex-col-odds"/>
    <col className="ex-col-odds"/><col className="ex-col-odds"/>
    <col className="ex-col-odds"/><col className="ex-col-odds"/>
  </colgroup>
);

// ===================== EXCHANGE TABLE =====================
const ExchangeTable: React.FC<{ tab: string; liveData: Record<string, ExMatch[]>; isMobile: boolean }> = ({ tab, liveData, isMobile }) => {
  const thead = (
    <thead><tr>
      <th className="ex-th-game" colSpan={2}>Game</th>
      <th colSpan={2} className="ex-th-odds">1</th>
      <th colSpan={2} className="ex-th-odds">X</th>
      <th colSpan={2} className="ex-th-odds">2</th>
    </tr></thead>
  );
  if (NO_RECORD_TABS.includes(tab)) {
    if (isMobile) return <div className="mob-no-record">No Record Found</div>;
    return <div className="ex-table-wrap"><table className="ex-table"><TableColgroup/>{thead}</table><div className="ex-no-record">No Record Found</div></div>;
  }
  if (tab === 'Horse Racing' || tab === 'Greyhound Racing') return <RacingView sport={tab}/>;
  const matches = liveData[tab] || [];
  if (isMobile) {
    return (
      <div className="mob-matches-wrap">
        {matches.length === 0 ? <div className="ex-no-record">No Record Found</div> : matches.map((m,i) => <MobileMatchCard key={i} match={m}/>)}
      </div>
    );
  }
  return (
    <div className="ex-table-wrap">
      <div className="ex-table-scroll">
        <table className="ex-table"><TableColgroup/>{thead}
          <tbody>
            {matches.length === 0 ? <tr><td colSpan={8} className="ex-no-record">No Record Found</td></tr> : matches.map((m,i) => <ExRow key={i} match={m}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ===================== HOME =====================
type NavPage = 'HOME' | 'LOTTERY' | 'CRICKET' | 'TENNIS' | 'FOOTBALL' | 'TABLE TENNIS' | 'BACCARAT' | '32 CARDS' | 'TEENPATTI' | 'POKER' | 'LUCKY 7' | 'CRASH';

const SPORT_MATCH_MAP: Record<string, string> = {
  'CRICKET': 'Cricket', 'TENNIS': 'Tennis', 'FOOTBALL': 'Football', 'TABLE TENNIS': 'Table Tennis',
};
const NAV_CASINO_MAP: Record<string, string> = {
  'BACCARAT': 'baccarat', '32 CARDS': '32cards', 'TEENPATTI': 'teenpatti', 'POKER': 'poker', 'LUCKY 7': 'lucky7',
};

const Home: React.FC = () => {
const location = useLocation();
const [activeSection, setActiveSection] = useState<CasinoSection|null>(
  (location.state as any)?.activeSection || null
);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [activeNavPage, setActiveNavPage] = useState<NavPage>('HOME');
  const [activeTab, setActiveTab] = useState('Cricket');
  const [liveData, setLiveData] = useState<Record<string,ExMatch[]>>(()=>JSON.parse(JSON.stringify(MATCH_DATA)));
  const [isMobile, setIsMobile] = useState(false);
  const [activeCasinoTab, setActiveCasinoTab] = useState<string>('baccarat');
  const [activeMobileNav, setActiveMobileNav] = useState<MobileNavKey | null>(null);
  // ── NEW: active match title for MatchDetailPage ──
  const [activeMatchTitle, setActiveMatchTitle] = useState<string | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1200);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(WELCOME_POPUP_KEY)) setShowWelcomePopup(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => {
        const next = JSON.parse(JSON.stringify(prev)) as Record<string,ExMatch[]>;
        Object.values(next).forEach(rows => rows.forEach(row => {
          if (row.type === 'odds' && row.values) {
            row.values = row.values.map(val => {
              if (val === '-') return '-';
              const num = parseFloat(String(val));
              if (isNaN(num) || num > 100) return val;
              const computed = Math.max(1.01, num + (Math.random() * 0.04 - 0.02));
              return computed >= 10 ? Math.round(computed) : parseFloat(computed.toFixed(2));
            });
          }
        }));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      const container = tabsRef.current;
      const el = container?.querySelector(`[data-tab="${tab}"]`) as HTMLElement;
      if (container && el) {
        const target = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
        container.scrollTo({ left: target, behavior: 'smooth' });
      }
    }, 0);
  };

  const handleNavTabChange = (tab: string) => {
    setActiveNavPage(tab as NavPage);
    setActiveSection(null);
    setActiveMobileNav(null);
    setActiveMatchTitle(null);
    if (NAV_CASINO_MAP[tab]) setActiveCasinoTab(NAV_CASINO_MAP[tab]);
  };

  const handleMobileNavClick = (key: MobileNavKey) => {
    setActiveMobileNav(key);
    setActiveMatchTitle(null);
    if (key === 'CRASH') { setActiveNavPage('CRASH'); setActiveSection(null); }
    else if (key === 'LOTTERY') { setActiveNavPage('LOTTERY'); setActiveSection(null); }
    else if (key === 'SPORTS') { setActiveNavPage('HOME'); setActiveSection(null); }
    else if (key === 'OUR_CASINO') { setActiveNavPage('TEENPATTI'); setActiveCasinoTab('teenpatti'); setActiveSection(null); }
    else if (key === 'LIVE_CASINO') { setActiveNavPage('BACCARAT'); setActiveCasinoTab('baccarat'); setActiveSection(null); }
    else if (key === 'SLOTS') { setActiveNavPage('CRASH'); setActiveSection(null); }
    else if (key === 'FANTASY') { setActiveNavPage('HOME'); setActiveSection(null); }
  };

  const renderNavContent = () => {
    if (activeNavPage === 'HOME') return null;
    if (activeNavPage === 'LOTTERY') return <div style={{minHeight:'60vh', background:'#fff'}}></div>;
    if (SPORT_MATCH_MAP[activeNavPage]) return <ExchangeTable tab={SPORT_MATCH_MAP[activeNavPage]} liveData={liveData} isMobile={isMobile}/>;
    if (activeNavPage === 'CRASH') return (
      <div className="cn-grid" style={{padding:'8px'}}>
        {CRASH_IMAGES.map((img,i) => (
          <div key={i} className="cn-item">
            <img src={img.src} alt={img.lbl} loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).src=FALLBACK;}}/>
            <div className="cn-lbl">{img.lbl}</div>
          </div>
        ))}
      </div>
    );
    if (NAV_CASINO_MAP[activeNavPage]) return <CasinoNavPage key={activeCasinoTab} tabs={CASINO_NAV_TABS} images={CASINO_IMAGES} defaultTab={activeCasinoTab}/>;
    return <div style={{minHeight:'60vh', background:'#fff'}}></div>;
  };

  const showMobileQuickNav = activeNavPage === 'HOME' && !activeSection;

  return (
    <div className="home-root">
      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}
      <Header activeTab={activeNavPage} balance={1500} exp={0} username="Demo" onTabChange={handleNavTabChange}/>
      <div className="home-wrap">
        <Sidebar activeSection={activeSection} onSectionChange={(s) => { setActiveSection(s); setActiveNavPage('HOME'); setActiveMobileNav(null); setActiveMatchTitle(null); }}/>
        <div className="home-content">
          {activeNavPage !== 'HOME' ? renderNavContent() : activeSection ? <CasinoPage section={activeSection}/> : activeMatchTitle ? (
            // ── MatchDetailPage — tab click se aata hai ──
            <MatchDetailPage matchTitle={activeMatchTitle} onBack={() => setActiveMatchTitle(null)}/>
          ) : (
            <div className="home-default">
              {/* Top 5 highlight boxes */}
              <div className="ex-top-strip">
                {TOP_CARDS.map((card,i) => (
                  <div
                    key={i}
                    className={`ex-highlight-item${i===0?' active':''}`}
                    style={{cursor:'pointer'}}
                    onClick={() => {
                      setActiveMatchTitle(card.title);
                      setActiveSection(null);
                    }}
                  >
                    <img src={card.icon==='cricket' ? './image/cricket.png' : './image/ball.png'} alt={card.icon} className="ex-hl-icon"/>
                    <span className="ex-hl-txt">{card.title}</span>
                  </div>
                ))}
              </div>

              {/* MOBILE QUICK NAV — sirf <=1200px, sirf HOME pe */}
              {showMobileQuickNav && (
                <div className="mob-quick-nav">
                <div className="mob-qn-anim-wrap">
  <svg className="mob-qn-plane" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 350" width="35" height="40" fill="#c1121f">
    <path d="M61.85,273.4c-1.8-3.5-2.3-3.9-4-3-3.2,1.7-5.5,1.1-9-2.5l-3.3-3.4,4.4-1.9c2.4-1.1,8-2.2,12.4-2.6,27.1-2.5,84.1-19.2,161-47.1,32.1-11.7,80.4-30.1,81.3-31,1.2-1.2-1-1.5-11.9-1.7-10.6-.2-11.7,0-16.5,2.4-13.1,6.8-74.6,31.2-92.8,36.7l-6.9,2.1-6.4-5-6.5-4.9-3.6,1.5c-21.3,9-88,36.4-89.2,36.6-1,.2-1.6-.6-1.8-2.3-.3-2.4.5-3,7.8-6.9,4.5-2.3,7.9-4.5,7.5-4.8-.3-.4-4.3-.9-8.9-1.3-9.7-.8-17.3-4-28.2-11.9-4.8-3.5-7.8-5-10-5-4.3,0-6.4.9-6.4,2.7,0,.8,6.8,8.7,15.1,17.6,13,13.7,14.9,16.2,13.3,16.8-3.7,1.5-4.8.8-16.3-10.3-6.4-6.2-14.6-14.2-18.3-17.7l-6.7-6.5-8.8,4.2-8.8,4.2-.3-3.4c-.2-2,.2-4.4.8-5.5s6.5-4.8,13.1-8.2c11.8-6,14.2-8,12.2-10-.7-.7-4.1.5-10.2,3.5l-9.1,4.6v-2.5c0-2,1.4-3.3,7.7-7,10.3-6,17.3-8.1,22.3-6.6,2.1.6,10.7,6.3,19.1,12.6,19,14.3,29.4,19.9,35.9,19.2,5.3-.5,34-13.7,61.9-28.5,18.3-9.7,21.6-12.1,19.5-14.2-.7-.7-7.1,1.8-21.4,8.5-14.7,7-20.5,9.3-21.1,8.4-1.2-2-.1-3.3,5.6-6.3,3-1.6,5.5-3.4,5.5-4,0-.7-1.3-2.5-2.8-4l-2.9-2.7-19.8,9.6c-10.9,5.2-20,9.3-20.2,9.1-.8-.7,2.5-12.8,3.8-14.1.8-.8,9.5-5.6,19.4-10.8,17.7-9.4,18-9.6,17.8-12.7,0-1.7-.4-3.4-.7-3.7s-3.9.9-8,2.7l-7.4,3.3-8.9-9.3c-4.8-5.1-8.9-9.6-9.1-10-.5-1.4,8.8-7.9,14.6-10.1,10.4-4,10.9-3.9,118.5,11.3,35.6,5,65.5,9.7,66.5,10.4,1.6,1.1,1.6,1.4-.1,4.8l-1.7,3.7,2.8,1c1.5.5,5.8,2.1,9.5,3.6l6.9,2.5,10.1-4.3c12.4-5.2,32.9-15.6,45.6-23.2l9.4-5.5,3.2,2.4c3.2,2.4,6.9,3.1,7.9,1.6.3-.5-2.5-6.9-6.3-14.3-3.7-7.4-8.7-18.4-11-24.4-2.4-6.1-4.8-11.6-5.4-12.4-.9-1-3.3-1.2-10.7-.8-10.8.5-18.1,2.6-42,12-15.4,6-67.7,31.5-70.6,34.4-1.3,1.4-3.4,1.4-19.2-.1-9.7-.9-18-1.6-18.4-1.6-1.4,0-.8-5.5,1.1-9.7,1.6-3.4,3.9-5.4,14-12.1,14.3-9.5,28.2-16.5,37.4-18.9l6.5-1.7,9.9,3.9c14.3,5.6,16.3,5.6,39.8-1,38.2-10.6,43.5-11.8,52.2-11.9,8-.1,8.3,0,11.6,3.3,2.6,2.5,5.7,8.3,12,23,4.7,10.8,9,21.3,9.7,23.5,1.7,5.4.8,11.9-2.4,16-6.7,8.8-38,25.2-82.1,42.8-22.8,9.1-61.8,21.9-162.5,53.3-31.1,9.7-64.7,20.3-74.6,23.6-10,3.2-18.9,5.9-19.8,5.9-.8,0-2.5-1.8-3.6-4Z M291.35,168.4c3.8-2.3,7.1-6.9,5.8-8-.6-.5-144.9-20.8-158.8-22.3-1.2-.1-2,.4-2,1.3,0,1.2,15.5,4.6,72,16.1,39.6,8.1,73.7,14.7,75.9,14.8,2.3.1,5.2-.7,7.1-1.9Z M247.65,122c4.2-2.3,11.2-5.8,15.4-7.7,4.3-1.9,7.8-3.7,7.8-4.1s-2.8-1.3-6.2-2c-7.7-1.7-13.7-.9-22.4,3.3-6.7,3.1-18.9,11.7-18.1,12.6.6.5,9.3,1.9,13.5,2.2,1.3,0,5.8-1.9,10-4.3Z M282.15,115.8c7.5-3.8,10.7-6,10.5-7.1-.4-2.1-18.3-9.2-23.4-9.3-2.2,0-4.9.6-6,1.4q-2.1,1.6,10.4,6.5c2.6,1,4.8,2.3,5,2.9s-1.9,2.2-4.7,3.6c-5.5,2.8-6.6,4-5.7,6.1.8,2.3,2.3,1.9,13.9-4.1Z"/>
    <path d="M440.55,196.2c-6.8-10.1-13.5-20.3-14.9-22.8-1.5-2.5-5.5-14.1-9.1-25.7l-6.5-21.3,5.1-5c2.7-2.8,5.1-4.9,5.2-4.8.1.2,5.2,9.4,11.4,20.6,11.9,21.3,15.8,31,23.1,58,3.3,11.9,3.3,12.3,1.7,15.7-.9,1.9-2.1,3.5-2.6,3.5s-6.5-8.2-13.4-18.2Z M454.65,206.5c.2-1.9-.5-4.6-1.7-6.7-1.8-3.1-22-30.4-24.3-32.9-1.2-1.3-3,1.5-2.2,3.5,1.2,3.4,26,39.9,26.9,39.6.6-.1,1.1-1.7,1.3-3.5Z"/>
    <path d="M295.35,148.3c-13.2-2.6-24.6-4.9-25.4-5.1-.8-.2,11.3-5.4,27-11.6l28.3-11.4,5.3,5.9c2.9,3.2,5.2,6.3,5.3,6.9,0,.6-2.3,5.5-5.1,10.8-4.8,9.1-5.2,9.6-8.2,9.5-1.8-.1-14-2.3-27.2-5Z"/>
    <path d="M334.85,152.1c0-.2,1.6-3.6,3.6-7.5,1.9-4,4.1-9,4.9-11.1l1.3-3.8-5.3-6.9c-5.3-6.8-5.4-6.9-3.2-8.1,2-1.1,2.6-.8,6.2,3.2,2.2,2.5,4.3,4.5,4.6,4.5s1.7-3.9,3-8.7l2.4-8.8.3,4.9c.2,2.6-.2,8-.8,11.8l-1,7,5.1,6.4,5.1,6.4-2.7,1c-2.2.9-2.9.6-5-1.8-1.3-1.5-2.5-3-2.5-3.4-.1-2.3-1.9-.1-3.9,4.6-1.2,3-2.8,5.9-3.5,6.5-1.4,1.1-8.6,4.3-8.6,3.8Z"/>
    <path d="M404.75,114.7c-7.2-16.1-7.3-16.4-5.8-17.5,1.5-1,21.2-.4,24.2.7.9.4,1.7,1.4,1.7,2.2,0,4.2-12.6,21.3-15.6,21.3-.9,0-2.8-2.9-4.5-6.7Z M414.15,104.7c4.8-2,8.7-4,8.7-4.4,0-1.2-4.4-1.9-13.2-1.9-8.2,0-8.8.1-8.8,2,0,2.4,2.7,8,3.8,8,.4,0,4.6-1.6,9.5-3.7Z"/>
    <path d="M385.05,75.9c-10.7-19.1-14-27.3-20.7-51.6-4-14.3-4.3-18.7-1.6-22l1.9-2.3,14.8,22.3,14.8,22.3,7.6,24.2c4.2,13.2,7.4,24.2,7.1,24.3-.3.1-3.5.3-7.1.6l-6.5.4-10.3-18.2Z M391.85,46.5c0-1.5-23.2-37.5-26.1-40.6-1.3-1.3-2.9,1.2-2.9,4.7,0,2.5,8.8,15.4,22.3,32.7,4.6,6,6.7,7,6.7,3.2Z"/>
  </svg>
</div>
                  {/* Tab links with pipe separators */}
                  <div className="mob-qn-links">
                    {MOBILE_NAV_TABS.map((tab, idx) => (
                      <React.Fragment key={tab.key}>
                        <span
                          className={`mob-qn-item${activeMobileNav === tab.key ? ' on' : ''}`}
                          onClick={() => handleMobileNavClick(tab.key)}
                        >
                          {tab.label}
                        </span>
                        {idx < MOBILE_NAV_TABS.length - 1 && <span className="mob-qn-sep">|</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}

              {/* 22 Sport Tabs */}
              <div className="ex-sport-tabs" ref={tabsRef}>
                {SPORT_TABS_22.map(tab => (
                  <div key={tab.label} data-tab={tab.label} className={`ex-stab${activeTab===tab.label?' on':''}`} onClick={() => handleTabClick(tab.label)}>
                    <img src={tab.icon} alt={tab.label} className="ex-stab-icon" onError={(e)=>{ (e.target as HTMLImageElement).style.display='none'; }}/>
                    <span className="ex-stab-label">{tab.label}</span>
                  </div>
                ))}
              </div>

              <ExchangeTable tab={activeTab} liveData={liveData} isMobile={isMobile}/>

              {/* Games Grid */}
              <div className="hm-games-wrap">
                <div className="hm-games-grid">
                  {GAMES.map((g,i) => (
                    <div key={i} className="hm-gc">
                      <img src={g.img} alt={g.lbl} loading="lazy" onError={(e)=>{(e.target as HTMLImageElement).src=FALLBACK;}}/>
                      <div className="hm-gc-lbl">{g.lbl}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;