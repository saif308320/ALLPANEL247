import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CasinoPage.css';

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

interface GameItem { s: string; l: string; }

// ── OUR CASINO (18 tabs) ──
const OUR_CASINO_DATA: Record<string, GameItem[]> = {
  teenpatti:    [{s:IMG.i30,l:'TEENPATTI 1 DAY'},{s:IMG.i31,l:'20-20 TEENPATTI'},{s:IMG.i32,l:'TEENPATTI TEST'},{s:IMG.i33,l:'TEENPATTI OPEN'},{s:IMG.i02,l:'VIP TEENPATTI 1DAY'},{s:IMG.i03,l:'DOLI DANA LIVE'},{s:IMG.i11,l:'POISON TP 20-20'},{s:IMG.i12,l:'UNLIMITED JOKER 20-20'},{s:IMG.i13,l:'TEENPATTI JOKER 20-20'},{s:IMG.i15,l:'20-20 TEENPATTI C'},{s:IMG.i59,l:'TEENPATTI 2.0'},{s:IMG.i65,l:'2 CARDS TEENPATTI'},{s:IMG.i67,l:'MUFLIS TEENPATTI'},{s:IMG.i26,l:'INSTANT TP 3.0'},{s:IMG.i29,l:'INSTANT TP 2.0'},{s:IMG.i14,l:'UNLIMITED JOKER ONEDAY'},{s:IMG.i23,l:'QUEEN TOP OPEN'},{s:IMG.i24,l:'JACK TOP OPEN'}],
  roulette:     [{s:IMG.i07,l:'BEACH ROULETTE'},{s:IMG.i08,l:'GOLDEN ROULETTE'},{s:IMG.i09,l:'ROULETTE'},{s:IMG.i17,l:'UNIQUE ROULETTE'}],
  poker:        [{s:IMG.i34,l:'POKER 1 DAY'},{s:IMG.i35,l:'20-20 POKER'},{s:IMG.i36,l:'POKER 6 PLAYERS'}],
  baccarat:     [{s:IMG.i37,l:'BACCARAT'},{s:IMG.i38,l:'BACCARAT 2'},{s:IMG.i66,l:'29 BACCARAT'}],
  'dragon-tiger':[{s:IMG.i39,l:'20-20 DRAGON TIGER'},{s:IMG.i40,l:'1 DAY DRAGON TIGER'},{s:IMG.i41,l:'20-20 DTL'},{s:IMG.i42,l:'20-20 DT 2'}],
  '32cards':    [{s:IMG.i43,l:'32 CARDS A'},{s:IMG.i44,l:'32 CARDS B'}],
  'andar-bahar':[{s:IMG.i20,l:'ANDAR BAHAR 150'},{s:IMG.i45,l:'ANDAR BAHAR'},{s:IMG.i46,l:'ANDAR BAHAR 2'}],
  lucky7:       [{s:IMG.i06,l:'LUCKY 6'},{s:IMG.i21,l:'LUCKY 15'},{s:IMG.i47,l:'7-A LUCKY'},{s:IMG.i48,l:'7-B LUCKY'},{s:IMG.i62,l:'LUCKY 7-C CASINO'}],
  '3card':      [{s:IMG.i49,l:'3 CARDS JUDGEMENT'}],
  'casino-war': [{s:IMG.i50,l:'CASINO WAR'}],
  worli:        [{s:IMG.i51,l:'WORLI MATKA'},{s:IMG.i52,l:'INSTANT WORLI'},{s:IMG.i01,l:'MATKA MARKET'}],
  'hi-low':     [{s:IMG.i47,l:'HI LOW 7'},{s:IMG.i48,l:'HI LOW B'}],
  'color-pred': [{s:IMG.i55,l:'COLOR PREDICTION'},{s:IMG.i22,l:'COLOR GAME'}],
  bollywood:    [{s:IMG.i53,l:'AMAR AKBAR ANTHONY'},{s:IMG.i54,l:'BOLLYWOOD CASINO'},{s:IMG.i16,l:'2 BOLLYWOOD CASINO'}],
  sports:       [{s:IMG.i56,l:'5 FIVE CRICKET'},{s:IMG.i57,l:'CRICKET MATCH 20-20'},{s:IMG.i58,l:'CASINO METER'},{s:IMG.i63,l:'SUPER OVER RSA ENG'}],
  lottery:      [{s:IMG.i55,l:'LOTTERY'}],
  others:       [{s:IMG.i25,l:'SIC BO 2'},{s:IMG.i27,l:'SIC BO'},{s:IMG.i28,l:'BALL BY BALL'},{s:IMG.i64,l:'THE TRAP'},{s:IMG.i61,l:'RACE 20'},{s:IMG.i68,l:'RACE TO 17'},{s:IMG.i60,l:'QUEEN'},{s:IMG.i18,l:'MINI SUPER OVER'},{s:IMG.i19,l:'GOAL'},{s:IMG.i04,l:'MOGAMBO'},{s:IMG.i10,l:'UNIQUE TEENPATTI'},{s:IMG.i69,l:'20-20 TEENPATTI B'}],
};
const _ocAll: GameItem[] = []; const _ocSeen = new Set<string>();
Object.values(OUR_CASINO_DATA).forEach(a => a.forEach(i => { if(!_ocSeen.has(i.s)){_ocSeen.add(i.s);_ocAll.push(i);} }));
OUR_CASINO_DATA.all = _ocAll;

// 18 tabs — arrows show honge
const OUR_CASINO_TABS = [
  {key:'all',lbl:'All Casino'},{key:'roulette',lbl:'Roulette'},{key:'teenpatti',lbl:'Teenpatti'},
  {key:'poker',lbl:'Poker'},{key:'baccarat',lbl:'Baccarat'},{key:'dragon-tiger',lbl:'Dragon Tiger'},
  {key:'32cards',lbl:'32 Cards'},{key:'andar-bahar',lbl:'Andar Bahar'},{key:'lucky7',lbl:'Lucky 7'},
  {key:'3card',lbl:'3 Card Judgement'},{key:'casino-war',lbl:'Casino War'},{key:'worli',lbl:'Worli'},
  {key:'hi-low',lbl:'Hi Low'},{key:'color-pred',lbl:'Color Prediction'},
  {key:'bollywood',lbl:'Bollywood'},{key:'sports',lbl:'Sports'},
  {key:'lottery',lbl:'Lottery'},{key:'others',lbl:'Others'},
];

// ── OUR VIP CASINO (8 tabs — no arrows needed but keep consistent) ──
const VIP_CASINO_DATA: Record<string, GameItem[]> = {
  teenpatti:    [{s:IMG.i30,l:'TEENPATTI 1DAY'},{s:IMG.i31,l:'TEENPATTI 20-20'},{s:IMG.i02,l:'VIP TEENPATTI 1DAY'},{s:IMG.i03,l:'DOLI DANA LIVE'},{s:IMG.i59,l:'TEENPATTI 2.0'},{s:IMG.i65,l:'2 CARDS TEENPATTI'},{s:IMG.i67,l:'MUFLIS TEENPATTI'}],
  baccarat:     [{s:IMG.i37,l:'BACCARAT'},{s:IMG.i38,l:'BACCARAT 2'},{s:IMG.i66,l:'29 BACCARAT'}],
  'dragon-tiger':[{s:IMG.i39,l:'DRAGON TIGER 20-20'},{s:IMG.i40,l:'DRAGON TIGER 1DAY'},{s:IMG.i41,l:'20-20 DTL'},{s:IMG.i42,l:'20-20 DT 2'}],
  lucky7:       [{s:IMG.i47,l:'LUCKY 7'},{s:IMG.i06,l:'VIP LUCKY 6'},{s:IMG.i21,l:'VIP LUCKY 15'},{s:IMG.i48,l:'7-B LUCKY'}],
  '32cards':    [{s:IMG.i43,l:'32 CARDS A'},{s:IMG.i44,l:'32 CARDS B'}],
  poker:        [{s:IMG.i34,l:'VIP POKER'},{s:IMG.i35,l:'20-20 POKER'},{s:IMG.i36,l:'POKER 6 PLAYERS'}],
  roulette:     [{s:IMG.i07,l:'BEACH ROULETTE'},{s:IMG.i08,l:'GOLDEN ROULETTE'},{s:IMG.i09,l:'ROULETTE'}],
  'andar-bahar':[{s:IMG.i20,l:'ANDAR BAHAR 150'},{s:IMG.i45,l:'ANDAR BAHAR'},{s:IMG.i46,l:'ANDAR BAHAR 2'}],
};
const _vAll: GameItem[] = []; const _vSeen = new Set<string>();
Object.values(VIP_CASINO_DATA).forEach(a => a.forEach(i => { if(!_vSeen.has(i.s)){_vSeen.add(i.s);_vAll.push(i);} }));
VIP_CASINO_DATA.all = _vAll;

// 9 tabs
const VIP_CASINO_TABS = [
  {key:'all',lbl:'All Casino'},{key:'teenpatti',lbl:'Teenpatti'},
  {key:'baccarat',lbl:'Baccarat'},{key:'dragon-tiger',lbl:'Dragon Tiger'},
  {key:'lucky7',lbl:'Lucky 7'},{key:'32cards',lbl:'32 Cards'},
  {key:'poker',lbl:'Poker'},{key:'roulette',lbl:'Roulette'},
  {key:'andar-bahar',lbl:'Andar Bahar'},
];

// ── OUR PREMIUM CASINO ──
const PREM_CASINO_DATA: Record<string, GameItem[]> = {
  teenpatti:    [{s:IMG.i30,l:'TEENPATTI 1DAY'},{s:IMG.i31,l:'TEENPATTI 20-20'},{s:IMG.i02,l:'PREMIUM VIP TP'},{s:IMG.i59,l:'TEENPATTI 2.0'},{s:IMG.i65,l:'2 CARDS TEENPATTI'},{s:IMG.i67,l:'MUFLIS TEENPATTI'}],
  baccarat:     [{s:IMG.i37,l:'BACCARAT'},{s:IMG.i38,l:'BACCARAT 2'},{s:IMG.i66,l:'29 BACCARAT'}],
  'dragon-tiger':[{s:IMG.i39,l:'DRAGON TIGER 20-20'},{s:IMG.i40,l:'DRAGON TIGER 1DAY'},{s:IMG.i41,l:'20-20 DTL'},{s:IMG.i42,l:'20-20 DT 2'}],
  lucky7:       [{s:IMG.i47,l:'LUCKY 7'},{s:IMG.i06,l:'LUCKY 6'},{s:IMG.i21,l:'LUCKY 15'},{s:IMG.i48,l:'7-B LUCKY'}],
  '32cards':    [{s:IMG.i43,l:'32 CARDS A'},{s:IMG.i44,l:'32 CARDS B'}],
  poker:        [{s:IMG.i34,l:'PREMIUM POKER'},{s:IMG.i35,l:'20-20 POKER'},{s:IMG.i36,l:'POKER 6 PLAYERS'}],
  roulette:     [{s:IMG.i07,l:'BEACH ROULETTE'},{s:IMG.i08,l:'GOLDEN ROULETTE'},{s:IMG.i09,l:'ROULETTE'}],
  'andar-bahar':[{s:IMG.i20,l:'ANDAR BAHAR 150'},{s:IMG.i45,l:'ANDAR BAHAR'},{s:IMG.i46,l:'ANDAR BAHAR 2'}],
  others:       [{s:IMG.i04,l:'PREMIUM MOGAMBO'},{s:IMG.i25,l:'SIC BO 2'},{s:IMG.i27,l:'SIC BO'},{s:IMG.i28,l:'BALL BY BALL'},{s:IMG.i64,l:'THE TRAP'}],
};
const _pAll: GameItem[] = []; const _pSeen = new Set<string>();
Object.values(PREM_CASINO_DATA).forEach(a => a.forEach(i => { if(!_pSeen.has(i.s)){_pSeen.add(i.s);_pAll.push(i);} }));
PREM_CASINO_DATA.all = _pAll;

const PREM_CASINO_TABS = [
  {key:'all',lbl:'All Casino'},{key:'teenpatti',lbl:'Teenpatti'},
  {key:'baccarat',lbl:'Baccarat'},{key:'dragon-tiger',lbl:'Dragon Tiger'},
  {key:'lucky7',lbl:'Lucky 7'},{key:'32cards',lbl:'32 Cards'},
  {key:'poker',lbl:'Poker'},{key:'roulette',lbl:'Roulette'},
  {key:'andar-bahar',lbl:'Andar Bahar'},{key:'others',lbl:'Others'},
];

// ── OUR VIRTUAL ──
const VIRTUAL_DATA: Record<string, GameItem[]> = {
  all:          [{s:IMG.i01,l:'JETX'},{s:IMG.i56,l:'CRICKETX'},{s:IMG.i06,l:'BALLOON'},{s:IMG.i07,l:'PLINKO X'},{s:IMG.i08,l:'FOOTBALLX'},{s:IMG.i09,l:'9 MINE ISLAND'},{s:IMG.i10,l:'TOWER X'},{s:IMG.i17,l:'HELICOPTER X'},{s:IMG.i18,l:'SMASH'},{s:IMG.i19,l:'ROLL X'},{s:IMG.i22,l:'4 BONUSES'},{s:IMG.i25,l:'AVIASTAR'},{s:IMG.i27,l:'CRASH DUEL X'},{s:IMG.i28,l:'CRICKETER'},{s:IMG.i61,l:'BONUS TIME'},{s:IMG.i62,l:'CAI BALAO'},{s:IMG.i63,l:'CAR X'},{s:IMG.i64,l:'MULTI HOT WHEEL'},{s:IMG.i68,l:'WHEEL OF DESTINY'},{s:IMG.i69,l:'CHICKEN HIGHWAY'},{s:IMG.i04,l:'CHEESY ROAD'},{s:IMG.i05,l:'BOTTLE MANIA'},{s:IMG.i11,l:'CHEESY ROAD 2'},{s:IMG.i12,l:'CHICKEN WAYS'}],
  teenpatti:    [{s:IMG.i01,l:'JETX'},{s:IMG.i56,l:'CRICKETX'},{s:IMG.i06,l:'BALLOON'}],
  'dragon-tiger':[{s:IMG.i07,l:'PLINKO X'},{s:IMG.i08,l:'FOOTBALLX'},{s:IMG.i09,l:'9 MINE ISLAND'},{s:IMG.i10,l:'TOWER X'}],
  lucky7:       [{s:IMG.i17,l:'HELICOPTER X'},{s:IMG.i18,l:'SMASH'},{s:IMG.i19,l:'ROLL X'},{s:IMG.i22,l:'4 BONUSES'},{s:IMG.i25,l:'AVIASTAR'}],
  bollywood:    [{s:IMG.i61,l:'BONUS TIME'},{s:IMG.i62,l:'CAI BALAO'},{s:IMG.i63,l:'CAR X'},{s:IMG.i64,l:'MULTI HOT WHEEL'}],
  others:       [{s:IMG.i68,l:'WHEEL OF DESTINY'},{s:IMG.i69,l:'CHICKEN HIGHWAY'},{s:IMG.i04,l:'CHEESY ROAD'},{s:IMG.i05,l:'BOTTLE MANIA'},{s:IMG.i11,l:'CHEESY ROAD 2'},{s:IMG.i12,l:'CHICKEN WAYS'}],
};
const VIRTUAL_TABS = [
  {key:'all',lbl:'All Casino'},{key:'teenpatti',lbl:'Teenpatti'},
  {key:'dragon-tiger',lbl:'Dragon Tiger'},{key:'lucky7',lbl:'Lucky 7'},
  {key:'bollywood',lbl:'Bollywood'},{key:'others',lbl:'Others'},
];

// ── LIVE CASINO ──
const LIVE_DATA: Record<string, GameItem[]> = {
  all:      [{s:IMG.i04,l:'SWIFT ROULETTE'},{s:IMG.i05,l:'ROULETTE A'},{s:IMG.i07,l:'ROULETTE AUTO'},{s:IMG.i08,l:'ROULETTE AUTO SPEED'},{s:IMG.i09,l:'ROULETTE'},{s:IMG.i10,l:'ROULETTE FTV'},{s:IMG.i17,l:'ROULETTE POPOK'},{s:IMG.i37,l:'BACCARAT LIVE'},{s:IMG.i38,l:'BACCARAT SPEED'},{s:IMG.i30,l:'TEENPATTI LIVE'},{s:IMG.i31,l:'TEENPATTI 20-20'},{s:IMG.i34,l:'BLACKJACK A'},{s:IMG.i35,l:'BLACKJACK B'},{s:IMG.i36,l:'BLACKJACK C'},{s:IMG.i45,l:'ANDAR BAHAR LIVE'},{s:IMG.i46,l:'ANDAR BAHAR 2'},{s:IMG.i49,l:'3 CARDS JUDGEMENT'},{s:IMG.i50,l:'CASINO WAR'}],
  roulette: [{s:IMG.i07,l:'BEACH ROULETTE'},{s:IMG.i08,l:'GOLDEN ROULETTE'},{s:IMG.i09,l:'ROULETTE'},{s:IMG.i17,l:'UNIQUE ROULETTE'},{s:IMG.i04,l:'SWIFT ROULETTE'},{s:IMG.i05,l:'ROULETTE A'},{s:IMG.i10,l:'ROULETTE FTV'}],
  blackjack:[{s:IMG.i34,l:'BLACKJACK A'},{s:IMG.i35,l:'BLACKJACK B'},{s:IMG.i36,l:'BLACKJACK C'},{s:IMG.i37,l:'FREE BET BLACKJACK'},{s:IMG.i38,l:'LIGHTNING BLACKJACK'},{s:IMG.i39,l:'BLACKJACK VIP'},{s:IMG.i40,l:'SPEED BLACKJACK'}],
  baccarat: [{s:IMG.i37,l:'BACCARAT LIVE'},{s:IMG.i38,l:'BACCARAT SPEED'},{s:IMG.i66,l:'29 BACCARAT'}],
  poker:    [{s:IMG.i34,l:'POKER LIVE'},{s:IMG.i35,l:'POKER 20-20'},{s:IMG.i36,l:'POKER 6 PLAYERS'}],
  keno:     [{s:IMG.i55,l:'KENO LOTTERY'},{s:IMG.i22,l:'KENO 2'}],
  other:    [{s:IMG.i45,l:'ANDAR BAHAR LIVE'},{s:IMG.i46,l:'ANDAR BAHAR 2'},{s:IMG.i49,l:'3 CARDS JUDGEMENT'},{s:IMG.i50,l:'CASINO WAR'}],
};
const LIVE_PROVIDERS = ['Creedroomz','Evolution','EZUGI','CockFight','Red Carat','Jacktop','Holi'];
const LIVE_SUBTABS_MAP: Record<string,{key:string;lbl:string}[]> = {
  Creedroomz: [{key:'roulette',lbl:'Roulette'},{key:'blackjack',lbl:'Blackjack'},{key:'baccarat',lbl:'Baccarat'},{key:'poker',lbl:'Poker'},{key:'keno',lbl:'Keno'},{key:'other',lbl:'Other'}],
  Evolution:  [{key:'blackjack',lbl:'Blackjack'},{key:'roulette',lbl:'Roulette'},{key:'baccarat',lbl:'Baccarat'},{key:'poker',lbl:'Game Show'},{key:'other',lbl:'Other'}],
  EZUGI:      [{key:'roulette',lbl:'Roulette'},{key:'blackjack',lbl:'Blackjack'},{key:'baccarat',lbl:'Baccarat'},{key:'poker',lbl:'Poker'},{key:'other',lbl:'Other'}],
  CockFight:  [{key:'all',lbl:'All'}],
  'Red Carat':[{key:'all',lbl:'All'}],
  Jacktop:    [{key:'all',lbl:'All'}],
  Holi:       [{key:'all',lbl:'All'}],
};

// ── SLOT GAME (35 providers) ──
const SLOT_PROVIDERS = [
  'Amigo','Jili','Turbo Games','Red Tiger','1X2 Gaming','BB Games','Booongo',
  'Dragoon Soft','Pocket Game','Evoplay','Fantasma Games','Habanero',
  'Hacksaw Gaming','Iron Dog Studio','Kalamba Games','Lady Luck','Nolimit city',
  'OMI Gaming','OneTouch','PlayPearls','Push Gaming','Quickspin','Relax Gaming',
  'RTG Slots','Spearhead Studios','Slotmill','Splitrock Gaming','Thunderkick',
  'Woohoo Games','Yggdrasil','Virtual Games','Kingmidas','EGT','KA Gaming','Pragmatic Play',
];
const _slotLabels = ['9 CIRCLES OF HELL','ALEXANDERS FORTUNE','ALI BABA BOUNTY','AMERICAN SPIRIT','AMIGO BRONZE','AMIGO DOUBLE','AMIGO FRUITS 5','GIFT STORE','GOLD CLASSIC','HOT 100','HOT 20','HOT 40','HOT CLASSIC','LUCKY FRUITS','LUCKY FRUITS PIN WIN','MIGHTY STARS','MONKEY','MONKEY 2','MULTI FRUITS','SILVER CLASSIC','WILDLUCK','ANIMAL','BARBARIAN','BLAZING','BLAZING 7','BLAST OFF','BONUS LINK','BOOK OF DEAD','BOUNTY HUNT','BULL RIDER','CASHZUMA','CHERRY BLAST','CLASSIC 77','COIN FLIP','COLOSSUS','CONGO CASH','COSMIC SPINS','CRYSTAL CAVERN','CYBERPUNK CITY','DANGER ZONE','DARK VORTEX','DEAD OR ALIVE','DIAMOND RICHES','DRAGON BLAZE','DRAGON FIRE','DRAGON GOLD','DYNAMO SPIN','EMERALD KING','EMPIRE SPIN','ENCHANTED CASH','EPIC QUEST','EXTREME FIRE','FELINE FRENZY','FIRE BLAST','FIRE FORTUNE','FLASH WIN','FROST BITE','FURY ROAD','GALAXY SPIN','GHOST RUSH','GOLD BLITZ','GOLD ERUPTION','GOLD FEVER','GOLD RUSH','GOLDEN HUNT','GOLDEN QUEST','GRAVITY BLAST','HEAT SURGE','HERO RISE','HOT FIRE'];
const buildSlotData = (start: number, count: number): GameItem[] => {
  const keys = Object.keys(IMG);
  return Array.from({length: count}, (_, i) => ({
    s: IMG[keys[(start + i) % keys.length]],
    l: _slotLabels[(start + i) % _slotLabels.length],
  }));
};
const SLOT_DATA_MAP: Record<string, GameItem[]> = { 'New Slots': buildSlotData(3, 70) };
SLOT_PROVIDERS.forEach((p, i) => { SLOT_DATA_MAP[p] = buildSlotData(i * 3, 20); });

// ── FANTASY GAME ──
const FANTASY_PROVIDERS = ['smart','pascal','popok','our','spribe','scratch','darwin','gemini','studio21','beon','jacktop','Kingmidas'];
const FANTASY_DATA: Record<string, GameItem[]> = {
  smart:    [{s:IMG.i01,l:'JETX'},{s:IMG.i56,l:'CRICKETX'},{s:IMG.i06,l:'BALLOON'},{s:IMG.i07,l:'PLINKO X'},{s:IMG.i08,l:'FOOTBALLX'},{s:IMG.i09,l:'9 MINE ISLAND'},{s:IMG.i10,l:'TOWER X'}],
  pascal:   [{s:IMG.i17,l:'HELICOPTER X'},{s:IMG.i18,l:'SMASH'},{s:IMG.i19,l:'ROLL X'}],
  popok:    [{s:IMG.i22,l:'4 BONUSES'},{s:IMG.i25,l:'AVIASTAR'},{s:IMG.i27,l:'CRASH DUEL X'},{s:IMG.i28,l:'CRICKETER'}],
  our:      [{s:IMG.i61,l:'BONUS TIME'},{s:IMG.i62,l:'CAI BALAO'},{s:IMG.i63,l:'CAR X'}],
  spribe:   [{s:IMG.i64,l:'MULTI HOT WHEEL'},{s:IMG.i68,l:'WHEEL OF DESTINY'},{s:IMG.i69,l:'CHICKEN HIGHWAY'}],
  scratch:  [{s:IMG.i04,l:'CHEESY ROAD'},{s:IMG.i05,l:'BOTTLE MANIA'},{s:IMG.i11,l:'CHEESY ROAD 2'},{s:IMG.i12,l:'CHICKEN WAYS'}],
  darwin:   [{s:IMG.i13,l:'JETX TURBO'},{s:IMG.i14,l:'SPEED CRASH'},{s:IMG.i15,l:'HYPER BALLOON'}],
  gemini:   [{s:IMG.i16,l:'GEMINI BLAST'},{s:IMG.i20,l:'GEMINI PLINKO'},{s:IMG.i21,l:'GEMINI CRASH'}],
  studio21: [{s:IMG.i23,l:'STUDIO CRASH'},{s:IMG.i24,l:'STUDIO MINES'},{s:IMG.i26,l:'STUDIO PLINKO'}],
  beon:     [{s:IMG.i29,l:'BEON CRASH'},{s:IMG.i30,l:'BEON MINES'},{s:IMG.i31,l:'BEON BALLOON'}],
  jacktop:  [{s:IMG.i32,l:'JACK CRASH'},{s:IMG.i33,l:'JACK PLINKO'},{s:IMG.i34,l:'JACK MINES'}],
  Kingmidas:[{s:IMG.i35,l:'KING CRASH'},{s:IMG.i36,l:'KING MINES'},{s:IMG.i37,l:'KING PLINKO'}],
};
const _fAll: GameItem[] = []; const _fSeen = new Set<string>();
Object.values(FANTASY_DATA).forEach(a => a.forEach(i => { if(!_fSeen.has(i.s)){_fSeen.add(i.s);_fAll.push(i);} }));

// ══════════════════════════════════════════════════
//  COMPONENTS
// ══════════════════════════════════════════════════

// Single nav bar — #5ab2de gradient, arrows sirf jab tabs > 8
const NavBar: React.FC<{
  tabs: {key:string;lbl:string}[];
  active: string;
  onSelect: (k:string)=>void;
  dark?: boolean;   // dark = #2c3e50 (Live Casino sub-tabs)
  showArrows?: boolean;
}> = ({ tabs, active, onSelect, dark = false, showArrows = false }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: number) => { if (ref.current) ref.current.scrollLeft += d; };
  return (
    <div className={`cp-navbar${dark ? ' cp-navbar--dark' : ''}`}>
      {showArrows && (
        <button className="cp-navbar__arrow" onClick={() => scroll(-200)}>&#8249;</button>
      )}
      <div className="cp-navbar__inner" ref={ref}>
        {tabs.map(t => (
          <button
            key={t.key}
            className={`cp-navbar__tab${active === t.key ? ' cp-navbar__tab--on' : ''}`}
            onClick={() => onSelect(t.key)}
          >{t.lbl}</button>
        ))}
      </div>
      {showArrows && (
        <button className="cp-navbar__arrow" onClick={() => scroll(200)}>&#8250;</button>
      )}
    </div>
  );
};

// Provider bar — #2c3e50 dark, arrows hamesha (35 providers hain)
const ProviderBar: React.FC<{
  providers: string[];
  active: string;
  onSelect: (p:string)=>void;
}> = ({ providers, active, onSelect }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const scroll = (d: number) => { if (ref.current) ref.current.scrollLeft += d; };
  return (
    <div className="cp-provider-bar">
      <button className="cp-provider-bar__arrow" onClick={() => scroll(-200)}>&#8249;</button>
      <div className="cp-provider-bar__inner" ref={ref}>
        {providers.map(p => (
          <button
            key={p}
            className={`cp-provider-bar__tab${active === p ? ' cp-provider-bar__tab--on' : ''}`}
            onClick={() => onSelect(p)}
          >{p}</button>
        ))}
      </div>
      <button className="cp-provider-bar__arrow" onClick={() => scroll(200)}>&#8250;</button>
    </div>
  );
};

// Image grid
const GAME_ROUTES = ['/game/football','/game/cricket','/game/andar-bahar','/game/baccarat'];

const ImageGrid: React.FC<{ items: GameItem[] }> = ({ items }) => {
  const navigate = useNavigate();
  return (
    <div className="cp-grid">
      {items.length === 0
        ? <div className="cp-no-games">No games found</div>
        : items.map((item, i) => (
          <div key={i} className="cp-grid__cell" style={{cursor:'pointer'}} onClick={() => navigate(GAME_ROUTES[i % 4])}>
            <img src={item.s} alt={item.l} loading="lazy" />
            <div className="cp-grid__lbl">{item.l}</div>
          </div>
        ))
      }
    </div>
  );
};

// ══════════════════════════════════════════════════
//  PAGE COMPONENTS
// ══════════════════════════════════════════════════

// Our Casino — 18 tabs, arrows show
const OurCasinoPage: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <div className="cp-page">
      <NavBar tabs={OUR_CASINO_TABS} active={active} onSelect={setActive} showArrows={true} />
      <div className="cp-grid-wrap"><ImageGrid items={OUR_CASINO_DATA[active] || []} /></div>
    </div>
  );
};

// Our VIP Casino — 9 tabs, no arrows
const OurVipCasinoPage: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <div className="cp-page">
      <NavBar tabs={VIP_CASINO_TABS} active={active} onSelect={setActive} showArrows={false} />
      <div className="cp-grid-wrap"><ImageGrid items={VIP_CASINO_DATA[active] || []} /></div>
    </div>
  );
};

// Our Premium Casino — 10 tabs, no arrows
const OurPremiumCasinoPage: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <div className="cp-page">
      <NavBar tabs={PREM_CASINO_TABS} active={active} onSelect={setActive} showArrows={false} />
      <div className="cp-grid-wrap"><ImageGrid items={PREM_CASINO_DATA[active] || []} /></div>
    </div>
  );
};

// Our Virtual — 6 tabs, no arrows
const OurVirtualPage: React.FC = () => {
  const [active, setActive] = useState('all');
  return (
    <div className="cp-page">
      <NavBar tabs={VIRTUAL_TABS} active={active} onSelect={setActive} showArrows={false} />
      <div className="cp-grid-wrap"><ImageGrid items={VIRTUAL_DATA[active] || []} /></div>
    </div>
  );
};

// Live Casino — provider bar (dark) + sub-tabs (dark)
const LiveCasinoPage: React.FC = () => {
  const [provider, setProvider] = useState('Creedroomz');
  const subTabs = LIVE_SUBTABS_MAP[provider] || [{key:'all',lbl:'All'}];
  const [subActive, setSubActive] = useState(subTabs[0].key);

  const handleProvider = (p: string) => {
    setProvider(p);
    const tabs = LIVE_SUBTABS_MAP[p] || [{key:'all',lbl:'All'}];
    setSubActive(tabs[0].key);
  };

  return (
    <div className="cp-page">
      <ProviderBar providers={LIVE_PROVIDERS} active={provider} onSelect={handleProvider} />
      <NavBar tabs={subTabs} active={subActive} onSelect={setSubActive} dark showArrows={false} />
      <div className="cp-grid-wrap">
        <ImageGrid items={LIVE_DATA[subActive] || LIVE_DATA.all} />
      </div>
    </div>
  );
};

// Slot Game — provider bar (dark, 35 tabs, arrows) + "New Slots" sub-tab
const SlotGamePage: React.FC = () => {
  const [provider, setProvider] = useState('Amigo');
  const handleProvider = (p: string) => setProvider(p);
  return (
    <div className="cp-page">
      <ProviderBar providers={SLOT_PROVIDERS} active={provider} onSelect={handleProvider} />
      <NavBar tabs={[{key:'New Slots',lbl:'New Slots'}]} active="New Slots" onSelect={()=>{}} dark showArrows={false} />
      <div className="cp-grid-wrap">
        <ImageGrid items={SLOT_DATA_MAP[provider] || SLOT_DATA_MAP['New Slots']} />
      </div>
    </div>
  );
};

// Fantasy Game — provider bar only (dark, arrows)
const FantasyGamePage: React.FC = () => {
  const [provider, setProvider] = useState('smart');
  return (
    <div className="cp-page">
      <ProviderBar providers={FANTASY_PROVIDERS} active={provider} onSelect={setProvider} />
      <div className="cp-grid-wrap">
        <ImageGrid items={FANTASY_DATA[provider] || _fAll} />
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════
//  MAIN EXPORT
// ══════════════════════════════════════════════════
export type CasinoSection =
  | 'Our Casino' | 'Our VIP Casino' | 'Our Premium Casino'
  | 'Our Virtual' | 'Live Casino' | 'Slot Game' | 'Fantasy Game';

const CasinoPage: React.FC<{ section: CasinoSection }> = ({ section }) => {
  switch (section) {
    case 'Our Casino':         return <OurCasinoPage />;
    case 'Our VIP Casino':     return <OurVipCasinoPage />;
    case 'Our Premium Casino': return <OurPremiumCasinoPage />;
    case 'Our Virtual':        return <OurVirtualPage />;
    case 'Live Casino':        return <LiveCasinoPage />;
    case 'Slot Game':          return <SlotGamePage />;
    case 'Fantasy Game':       return <FantasyGamePage />;
    default:                   return <OurCasinoPage />;
  }
};

export default CasinoPage;