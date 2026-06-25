import React, { useState } from 'react';
import './MatchDetailPage.css';

// ===================== DATA =====================
const csData: (string|number)[][] = [
  ['0-0',  11.5,30.04, 12,217.16, 12.5,422.65, 13,14.88,  13.5,167.4, 14,61.29],
  ['0-1',  6,802.15,   6.2,37.15, 6.4,84.36,   6.6,1012.66,6.8,54.17, 7,54.01],
  ['0-2',  5.9,1011.74,6,469.75,  6.2,61.1,    6.6,726.37, 6.8,972.42,7,49.91],
  ['0-3',  9.4,56.54,  9.6,128.5, 9.8,29.79,   10,21.57,  10.5,415.08,11,704.37],
  ['1-0',  20,178.78,  22,116.97, 23,11.42,    25,1.29,   26,1.73,    28,657.42],
  ['1-1',  10.5,705.69,11,149.69, 11.5,99.09,  12,501.75, 12.5,59.42, 13,324.21],
  ['1-2',  9.8,31.46,  10,1686.51,10.5,716.6,  11,57.13,  11.5,1318.32,12,47.61],
  ['1-3',  14.5,337.02,15,457.38, 15.5,171.35, 16,7.05,   16.5,13.64, 17,6.86],
  ['2-0',  80,25.32,   85,37.58,  90,4.37,     95,1.53,   100,11.27,  130,254.95],
  ['2-1',  32,124.55,  34,63.87,  36,1.46,     40,7.19,   42,22.57,   44,5.73],
  ['2-2',  32,9.27,    34,94.51,  36,2.98,     40,244.9,  50,2.34,    55,81.81],
  ['2-3',  46,28.38,   48,32.92,  50,40.82,    55,36.13,  60,297.23,  490,3.91],
  ['3-0',  280,23.53,  290,32.81, 300,35.06,   490,2.8,   500,6,      550,1],
  ['3-1',  150,1,      170,15.34, 180,12.33,   200,5.07,  210,1,      220,3.02],
  ['3-2',  130,45.04,  150,2,     170,12.99,   200,1,     210,1.73,   220,103.36],
  ['3-3',  240,4.33,   260,2,     270,1.44,    280,1.4,   290,53.53,  300,2.77],
  ['Any Other Home Win',280,10.9, 290,31.28,   300,8.31,  380,1.78,   390,4.31,  410,2],
  ['Any Other Away Win',7.4,388,  7.6,1.46,    7.8,2.14,  8,16.02,    8.2,109.9, 8.4,10.24],
  ['Any Other Draw',   32,3.85,   42,1.68,     1000,22.91,'-','-',    '-','-',   '-','-'],
];
const htsData: (string|number)[][] = [
  ['0-0',  2.72,12.08, 2.74,31.21,  2.76,146.82, 2.8,4.31,   2.82,27.52,  2.84,28.87],
  ['1-1',  14,32.11,   14.5,45.94,  15,12.29,    16,11.97,   16.5,266.63, 28,14.03],
  ['2-2',  70,26.44,   75,29.42,    200,1.26,    380,49.92,  800,1.2,     960,1.3],
  ['1-0',  12,24.74,   13,38.19,    13.5,14,     15,19.9,    22,13.73,    28,7.59],
  ['2-0',  85,27.8,    100,26.26,   110,2.29,    140,138,    350,1,       '-','-'],
  ['2-1',  70,22.5,    85,16.51,    110,2.29,    150,128.01, 590,1,       860,1.06],
  ['0-1',  3.3,112.14, 3.35,36.38,  3.4,142.37,  3.5,14,     3.6,32.99,   3.65,298.39],
  ['0-2',  7.6,26.74,  7.8,29.26,   8,26.92,     8.6,111.21, 8.8,249.77,  9.2,10.35],
  ['1-2',  28,11.9,    30,12.37,    32,12.22,    36,212.55,  44,2.47,     90,1],
  ['Any Unquoted',14,2.26,14.5,1.18,16.5,12.6,  19.5,7.05,  20,21,       22,250],
];
const mobttsData: (string|number)[][] = [
  ['Scotland/Yes',10,375,   20,3.5,   21,100,   28,8.54,   34,820.77, 1000,0.86],
  ['Brazil/Yes',  4,6.9,    4.1,35.37,4.2,12.94,4.6,815.21,4.7,1560.15,4.8,11.22],
  ['Draw/Yes',    7.2,10.35,7.4,12.08,7.6,795.48,9,995.82, 9.4,309.7, 14,3.88],
  ['Scotland/No', '-','-',  1.12,17.84,20,3.5,  28,8.54,   '-','-',   '-','-'],
  ['Brazil/No',   '-','-',  1.03,212.23,1.17,17.08,'-','-','-','-',   '-','-'],
  ['Draw/No',     '-','-',  1.03,224.82,1.04,6.75,9,2.22,  '-','-',   '-','-'],
];
const mououData: (string|number)[][] = [
  ['Scotland/Under 2.5 Goals','-','-',  '-','-',   1.64,10.52, 25,12.94,  '-','-',   '-','-'],
  ['Scotland/Over 2.5 Goals', '-','-',  1.04,294.5, 1.76,9.8,  '-','-',   '-','-',   '-','-'],
  ['Brazil/Under 2.5 Goals',  1.04,294.5,1.76,9.8, 3.05,2.06, '-','-',   '-','-',   '-','-'],
  ['Brazil/Over 2.5 Goals',   '-','-',  '-','-',   1.04,311.08,2.54,6.79, '-','-',   '-','-'],
  ['Draw/Under 2.5 Goals',    '-','-',  1.04,294.5, 1.76,9.8,  '-','-',   '-','-',   '-','-'],
  ['Draw/Over 2.5 Goals',     '-','-',  1.04,294.5, 1.76,9.8,  '-','-',   '-','-',   '-','-'],
];
const htftData: (string|number)[][] = [
  ['Scotland/Scotland','-','-',   2.42,43.64,  2.46,236.74, 990,1.73,  '-','-',   '-','-'],
  ['Scotland/Draw',    2.2,83.33, 2.42,43.64,  2.46,236.74, 990,1.73,  '-','-',   '-','-'],
  ['Scotland/Brazil',  2.46,236.74,32,4.03,   34,3.62,     990,1.73,  '-','-',   '-','-'],
  ['Draw/Scotland',    2.46,236.74,3.5,12,    16,1,        990,1.73,  '-','-',   '-','-'],
  ['Draw/Draw',        1.54,185.19,2.42,43.64, 2.46,236.74, 990,1.73,  '-','-',   '-','-'],
  ['Draw/Brazil',      2.42,43.64,2.46,236.74, 3.2,1,      990,1.73,  '-','-',   '-','-'],
  ['Brazil/Scotland',  2.42,284.3,6,6,        30,1.04,     150,3.88,  990,1.73,  '-','-'],
  ['Brazil/Draw',      2.2,83.33, 2.42,43.64,  2.46,236.74, 990,1.73,  '-','-',   '-','-'],
  ['Brazil/Brazil',    '-','-',   1.01,576.62, 1.1,20,     1.72,400,  990,1.73,  '-','-'],
];

interface BetState {
  open: boolean;
  sel: string;
  odds: string;
  stake: string;
  isLay: boolean;
}

const BACK_BG = '#72bbef';
const LAY_BG  = '#faa9ba';
const BACK_HDR = 'rgb(114,187,239)';
const LAY_HDR  = 'rgb(250,169,186)';

function calcProfit(odds: string, stake: string): string {
  const o = parseFloat(odds) || 0;
  const s = parseFloat(stake) || 0;
  return ((o - 1) * s).toFixed(0);
}

function buildRows(
  data: (string|number)[][],
  onBet: (sel:string, isLay:boolean, odds:string) => void
) {
  const bgCls = ['bk1','bk2','bk3','ly1','ly2','ly3'];
  const isLayArr = [false,false,false,true,true,true];
  return data.map((r, ri) => {
    const cells = [1,3,5,7,9,11].map((vi, idx) => {
      const val = r[vi], vol = r[vi+1];
      if (val === '-') {
        return <td key={idx} className={`${bgCls[idx]} empty-cell`}>-</td>;
      }
      return (
        <td key={idx} className={bgCls[idx]}
          onClick={() => onBet(String(r[0]), isLayArr[idx], String(val))}>
          <span className="odd-val">{val}</span>
          <span className="odd-vol">{vol}</span>
        </td>
      );
    });
    return <tr key={ri}><td className="odds-runner">{r[0]}</td>{cells}</tr>;
  });
}

interface MatchInfo { title: string; date: string; }
const MATCH_DATA: Record<string, MatchInfo> = {
  'France vs Senegal':           { title: 'FRANCE V SENEGAL',           date: '23/06/2026 22:00:00' },
  'England W vs Ireland W':      { title: 'ENGLAND W V IRELAND W',      date: '23/06/2026 18:30:00' },
  'Iraq vs Norway':              { title: 'IRAQ V NORWAY',              date: '23/06/2026 03:00:00' },
  'FIFA WORLD CUP - WINNER 2026':{ title: 'FIFA WORLD CUP - WINNER 2026',date:'17/06/2026 00:10:00' },
  'FIFA WORLD CUP 2026- SPECIAL...':{ title:'FIFA WORLD CUP 2026 - SPECIAL MARKET',date:'17/06/2026 00:15:00'},
};
const DEFAULT_INFO: MatchInfo = { title: 'SCOTLAND V BRAZIL', date: '25/06/2026 02:55:00' };

interface Props { matchTitle: string; onBack: () => void; }

const MatchDetailPage: React.FC<Props> = ({ matchTitle }) => {
  const info = MATCH_DATA[matchTitle] || DEFAULT_INFO;
  const [mobTab, setMobTab] = useState<'odds'|'mybet'>('odds');
  const [bet, setBet] = useState<BetState>({ open:false, sel:'', odds:'0', stake:'', isLay:false });

  const openBet = (sel: string, isLay: boolean, odds: string) => {
    setBet({ open:true, sel, isLay, odds, stake:'' });
  };
  const closeBet = () => setBet(b => ({ ...b, open:false, stake:'' }));
  const addStake = (v: number) => setBet(b => ({ ...b, stake: String((parseFloat(b.stake)||0)+v) }));
  const changeOdds = (d: number) => setBet(b => ({ ...b, odds: (parseFloat(b.odds)+d).toFixed(2) }));

  const bodyBg  = bet.isLay ? LAY_BG   : BACK_BG;
  const hdrBg   = bet.isLay ? LAY_HDR  : BACK_HDR;
  const profit  = calcProfit(bet.odds, bet.stake);

  const quickBtns = [1000,2000,5000,10000,20000,25000,50000,75000,90000,95000];
  const ob = (sel:string, isLay:boolean, odds:string) => openBet(sel, isLay, odds);

  const DesktopBetSlip = bet.open ? (
    <div>
      <div className="rp-section">Place Bet</div>
      <div className="bs-header">
        <span className="bh-sel">(Bet for)</span>
        <span className="bh-col">Odds</span>
        <span className="bh-col">Stake</span>
        <span className="bh-profit">Profit</span>
      </div>
      <div style={{background: bodyBg}}>
        <div className="bs-row">
          <span className="bs-sel-name">{bet.sel}</span>
          <div className="bs-odds-wrap">
            <input type="number" value={bet.odds} step="0.01"
              onChange={e => setBet(b=>({...b, odds:e.target.value}))} />
            <div className="bs-arrows">
              <button onClick={()=>changeOdds(0.01)}>▲</button>
              <button onClick={()=>changeOdds(-0.01)}>▼</button>
            </div>
          </div>
          <input type="number" className="bs-stake" placeholder="" value={bet.stake}
            onChange={e=>setBet(b=>({...b,stake:e.target.value}))} />
          <span className="bs-profit">{profit}</span>
        </div>
        <div className="bs-btns">
          {quickBtns.map(v=>(
            <button key={v} className="bs-btn" onClick={()=>addStake(v)}>
              +{v>=1000?(v/1000)+'k':v}
            </button>
          ))}
        </div>
        <div className="bs-actions">
          <button className="btn-clear" onClick={closeBet}>clear</button>
          <button className="btn-edit">Edit</button>
          <button className="btn-reset" onClick={closeBet}>Reset</button>
          <button className="btn-submit">Submit</button>
        </div>
      </div>
    </div>
  ) : null;

  const MobileBetPopup = bet.open ? (
    <div className="mobile-bet-overlay" onClick={(e)=>{if(e.target===e.currentTarget)closeBet();}}>
      <div className="mobile-bet-box" style={{background: bodyBg}}>
        <div className="mob-bet-header" style={{background: hdrBg}}>
          <span className="mob-bet-sel">{bet.sel}</span>
          <span className="mob-bet-profit">Profit:<span>{profit}</span></span>
          <button className="mob-bet-close" onClick={closeBet}>✕</button>
        </div>
        <div className="mob-bet-fields">
          <div className="mob-bet-field">
            <label>Amount</label>
            <div className="mob-bet-amount-wrap">
              <input type="number" value={bet.stake} placeholder=""
                onChange={e=>setBet(b=>({...b,stake:e.target.value}))} />
            </div>
          </div>
          <div className="mob-bet-field">
            <label>Odds</label>
            <div className="mob-odds-wrap">
              <button className="mob-odds-btn" onClick={()=>changeOdds(-1)}>−</button>
              <input type="number" value={bet.odds}
                onChange={e=>setBet(b=>({...b,odds:e.target.value}))} />
              <button className="mob-odds-btn" onClick={()=>changeOdds(1)}>+</button>
            </div>
          </div>
        </div>
        <div className="mob-bet-quickbtns">
          {quickBtns.map(v=>(
            <button key={v} className="mob-bet-qbtn" onClick={()=>addStake(v)}>
              +{v>=1000?(v/1000)+'k':v}
            </button>
          ))}
        </div>
        <div className="mob-bet-actions">
          <button className="mob-btn-clear" onClick={closeBet}>clear</button>
          <button className="mob-btn-edit">Edit</button>
          <button className="mob-btn-reset" onClick={closeBet}>Reset</button>
          <button className="mob-btn-submit">Place Bet</button>
        </div>
        <div className="mob-mybet-section">
          <div className="mob-mybet-cols">
            <span>Scotland</span><span>Brazil</span><span>The Draw</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  const OddsContent = (
    <>
      <div className="mkt-title">MATCH_ODDS</div>
      <div className="mkt-sub">
        <div className="mkt-sub-left">Max: 15L</div>
        <div className="mkt-sub-right">
          <div style={{background:'rgb(242, 242, 242)'}}></div>
          <div style={{background:'rgb(242, 242, 242)'}}></div>
          <div style={{background:'rgb(114,187,239)'}}>Back</div>
          <div style={{background:'rgb(250,169,186)'}}>Lay</div>
          <div style={{background:'rgb(242, 242, 242)'}}></div>
          <div style={{background:'rgb(242, 242, 242)'}}></div>
        </div>
      </div>
      <table className="odds-grid">
        <colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr>
            <td className="odds-runner">Scotland</td>
            <td className="bk1" onClick={()=>ob('Scotland',false,'9.8')}><span className="odd-val">9.8</span><span className="odd-vol">2019.31</span></td>
            <td className="bk2" onClick={()=>ob('Scotland',false,'10')}><span className="odd-val">10</span><span className="odd-vol">2422.17</span></td>
            <td className="bk3" onClick={()=>ob('Scotland',false,'10.5')}><span className="odd-val">10.5</span><span className="odd-vol">161.4</span></td>
            <td className="ly1" onClick={()=>ob('Scotland',true,'11')}><span className="odd-val">11</span><span className="odd-vol">716.78</span></td>
            <td className="ly2" onClick={()=>ob('Scotland',true,'11.5')}><span className="odd-val">11.5</span><span className="odd-vol">1439.36</span></td>
            <td className="ly3" onClick={()=>ob('Scotland',true,'12')}><span className="odd-val">12</span><span className="odd-vol">1923.52</span></td>
          </tr>
          <tr>
            <td className="odds-runner">Brazil</td>
            <td className="bk1" onClick={()=>ob('Brazil',false,'1.37')}><span className="odd-val">1.37</span><span className="odd-vol">40068.98</span></td>
            <td className="bk2" onClick={()=>ob('Brazil',false,'1.38')}><span className="odd-val">1.38</span><span className="odd-vol">30457.38</span></td>
            <td className="bk3" onClick={()=>ob('Brazil',false,'1.39')}><span className="odd-val">1.39</span><span className="odd-vol">6058.12</span></td>
            <td className="ly1" onClick={()=>ob('Brazil',true,'1.4')}><span className="odd-val">1.4</span><span className="odd-vol">13986.52</span></td>
            <td className="ly2" onClick={()=>ob('Brazil',true,'1.41')}><span className="odd-val">1.41</span><span className="odd-vol">13248.75</span></td>
            <td className="ly3" onClick={()=>ob('Brazil',true,'1.42')}><span className="odd-val">1.42</span><span className="odd-vol">11087.87</span></td>
          </tr>
          <tr>
            <td className="odds-runner">The Draw</td>
            <td className="bk1" onClick={()=>ob('The Draw',false,'5')}><span className="odd-val">5</span><span className="odd-vol">3893.43</span></td>
            <td className="bk2" onClick={()=>ob('The Draw',false,'5.1')}><span className="odd-val">5.1</span><span className="odd-vol">3174.78</span></td>
            <td className="bk3" onClick={()=>ob('The Draw',false,'5.2')}><span className="odd-val">5.2</span><span className="odd-vol">610.84</span></td>
            <td className="ly1" onClick={()=>ob('The Draw',true,'5.3')}><span className="odd-val">5.3</span><span className="odd-vol">528.19</span></td>
            <td className="ly2" onClick={()=>ob('The Draw',true,'5.4')}><span className="odd-val">5.4</span><span className="odd-vol">2793.38</span></td>
            <td className="ly3" onClick={()=>ob('The Draw',true,'5.5')}><span className="odd-val">5.5</span><span className="odd-vol">1225.09</span></td>
          </tr>
        </tbody>
      </table>

      <div className="bm-row">
        <div className="bm-box">
          <div className="mkt-title">Bookmaker</div>
          <div className="bm-mkt-sub">
            <span>Min: 100.00 &nbsp;Max: 30L</span>
            <div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div>
          </div>
          <table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup>
            <tbody>
              <tr><td className="bm-runner">Scotland</td><td className="bm-b" onClick={()=>ob('Scotland BM',false,'900')}><b>900</b><small>200000</small></td><td className="bm-l" onClick={()=>ob('Scotland BM',true,'1000')}><b>1000</b><small>200000</small></td></tr>
              <tr><td className="bm-runner">Brazil</td><td className="bm-b" onClick={()=>ob('Brazil BM',false,'39')}><b>39</b><small>3000000</small></td><td className="bm-l" onClick={()=>ob('Brazil BM',true,'41')}><b>41</b><small>3000000</small></td></tr>
              <tr><td className="bm-runner">The Draw</td><td className="bm-b" onClick={()=>ob('Draw BM',false,'400')}><b>400</b><small>1000000</small></td><td className="bm-l" onClick={()=>ob('Draw BM',true,'420')}><b>420</b><small>1000000</small></td></tr>
            </tbody>
          </table>
          <div className="marquee-wrap"><div className="marquee-inner">Scotland v Brazil – FIFA &nbsp;&nbsp;&nbsp; Scotland v Brazil – FIFA &nbsp;&nbsp;&nbsp;</div></div>
        </div>
        <div className="bm-box">
          <div className="mkt-title">BM_OVER_UNDER_25</div>
          <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 10L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
          <table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup>
            <tbody>
              <tr><td className="bm-runner">Under 2.5 Goals</td><td className="bm-b" onClick={()=>ob('Under 2.5 BM',false,'89')}><b>89</b><small>1000000</small></td><td className="bm-l" onClick={()=>ob('Under 2.5 BM',true,'91')}><b>91</b><small>1000000</small></td></tr>
              <tr><td className="bm-runner">Over 2.5 Goals</td><td className="bm-b" onClick={()=>ob('Over 2.5 BM',false,'109')}><b>109</b><small>250000</small></td><td className="bm-l" onClick={()=>ob('Over 2.5 BM',true,'112')}><b>112</b><small>250000</small></td></tr>
            </tbody>
          </table>
        </div>
        <div className="bm-box">
          <div className="mkt-title">BM_HALF_TIME</div>
          <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 5L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
          <table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup>
            <tbody>
              <tr><td className="bm-runner">Scotland</td><td colSpan={2} className="susp">SUSPENDED</td></tr>
              <tr><td className="bm-runner">Brazil</td><td className="bm-b" onClick={()=>ob('Brazil HT BM',false,'95')}><b>95</b><small>500000</small></td><td className="bm-l" onClick={()=>ob('Brazil HT BM',true,'99')}><b>99</b><small>500000</small></td></tr>
              <tr><td className="bm-runner">The Draw</td><td colSpan={2} className="susp">SUSPENDED</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mkt-title">HALF_TIME</div>
      <div className="mkt-sub">
        <div className="mkt-sub-left">Max: 3L</div>
        <div className="mkt-sub-right">
          <div></div><div></div>
          <div style={{background:'rgb(114,187,239)'}}>Back</div>
          <div style={{background:'rgb(250,169,186)'}}>Lay</div>
          <div></div><div></div>
        </div>
      </div>
      <table className="odds-grid">
        <colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Scotland</td>
            <td className="bk1" onClick={()=>ob('Scotland HT',false,'9.6')}><span className="odd-val">9.6</span><span className="odd-vol">36</span></td>
            <td className="bk2" onClick={()=>ob('Scotland HT',false,'9.8')}><span className="odd-val">9.8</span><span className="odd-vol">47.41</span></td>
            <td className="bk3" onClick={()=>ob('Scotland HT',false,'10')}><span className="odd-val">10</span><span className="odd-vol">126.07</span></td>
            <td className="ly1" onClick={()=>ob('Scotland HT',true,'11')}><span className="odd-val">11</span><span className="odd-vol">274.14</span></td>
            <td className="ly2" onClick={()=>ob('Scotland HT',true,'11.5')}><span className="odd-val">11.5</span><span className="odd-vol">76.5</span></td>
            <td className="ly3" onClick={()=>ob('Scotland HT',true,'12')}><span className="odd-val">12</span><span className="odd-vol">87.41</span></td>
          </tr>
          <tr><td className="odds-runner">Brazil</td>
            <td className="bk1" onClick={()=>ob('Brazil HT',false,'1.93')}><span className="odd-val">1.93</span><span className="odd-vol">224.11</span></td>
            <td className="bk2" onClick={()=>ob('Brazil HT',false,'1.94')}><span className="odd-val">1.94</span><span className="odd-vol">25.37</span></td>
            <td className="bk3" onClick={()=>ob('Brazil HT',false,'1.95')}><span className="odd-val">1.95</span><span className="odd-vol">100</span></td>
            <td className="ly1" onClick={()=>ob('Brazil HT',true,'1.98')}><span className="odd-val">1.98</span><span className="odd-vol">456.45</span></td>
            <td className="ly2" onClick={()=>ob('Brazil HT',true,'1.99')}><span className="odd-val">1.99</span><span className="odd-vol">220.83</span></td>
            <td className="ly3" onClick={()=>ob('Brazil HT',true,'2')}><span className="odd-val">2</span><span className="odd-vol">324.5</span></td>
          </tr>
          <tr><td className="odds-runner">The Draw</td>
            <td className="bk1" onClick={()=>ob('Draw HT',false,'2.44')}><span className="odd-val">2.44</span><span className="odd-vol">608.09</span></td>
            <td className="bk2" onClick={()=>ob('Draw HT',false,'2.46')}><span className="odd-val">2.46</span><span className="odd-vol">627.68</span></td>
            <td className="bk3" onClick={()=>ob('Draw HT',false,'2.48')}><span className="odd-val">2.48</span><span className="odd-vol">159</span></td>
            <td className="ly1" onClick={()=>ob('Draw HT',true,'2.58')}><span className="odd-val">2.58</span><span className="odd-vol">169.05</span></td>
            <td className="ly2" onClick={()=>ob('Draw HT',true,'2.6')}><span className="odd-val">2.6</span><span className="odd-vol">204</span></td>
            <td className="ly3" onClick={()=>ob('Draw HT',true,'2.62')}><span className="odd-val">2.62</span><span className="odd-vol">583.35</span></td>
          </tr>
        </tbody>
      </table>

      <div className="mkt-title">Normal</div>
      <div className="nm-wrap">
        <div className="nm-inner">
          <div className="nm-half">
            <span className="nm-label">Total Corners (Full Time)</span>
            <div className="nm-cols-wrap">
              <div className="nm-col-labels">
                <div className="nm-col-lbl" style={{color:'#c0392b'}}>No</div>
                <div className="nm-col-lbl" style={{color:'#1a5276'}}>Yes</div>
              </div>
              <div className="nm-cells">
                <div className="nm-no" onClick={()=>ob('Corners No',true,'9')}><span className="nm-val-big">9</span><span className="nm-val-small">130</span></div>
                <div className="nm-yes" onClick={()=>ob('Corners Yes',false,'9')}><span className="nm-val-big">9</span><span className="nm-val-small">105</span></div>
              </div>
            </div>
            <div className="nm-info">Min: 100.00<br/>Max: 5L</div>
          </div>
          <div className="nm-half">
            <span className="nm-label">Total Cards (Full Time)</span>
            <div className="nm-cols-wrap">
              <div className="nm-col-labels">
                <div className="nm-col-lbl" style={{color:'#c0392b'}}>No</div>
                <div className="nm-col-lbl" style={{color:'#1a5276'}}>Yes</div>
              </div>
              <div className="nm-cells">
                <div className="nm-no" onClick={()=>ob('Cards No',true,'3')}><span className="nm-val-big">3</span><span className="nm-val-small">80</span></div>
                <div className="nm-yes" onClick={()=>ob('Cards Yes',false,'3')}><span className="nm-val-big">3</span><span className="nm-val-small">65</span></div>
              </div>
            </div>
            <div className="nm-info">Min: 100.00<br/>Max: 5L</div>
          </div>
        </div>
        <div className="nm-note">Number of corners at Full Time. Score = 0</div>
        <div className="nm-note">Yellow=1pts, Red=2pts, max 3pt per player. Score = 0</div>
      </div>

      <div className="mkt-title">FIRST_HALF_GOALS_05</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 2L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 0.5 Goals</td><td className="bk1" onClick={()=>ob('U0.5 FHG',false,'3')}><span className="odd-val">3</span><span className="odd-vol">2213.8</span></td><td className="bk2" onClick={()=>ob('U0.5 FHG',false,'3.05')}><span className="odd-val">3.05</span><span className="odd-vol">1415.93</span></td><td className="bk3" onClick={()=>ob('U0.5 FHG',false,'3.1')}><span className="odd-val">3.1</span><span className="odd-vol">338.3</span></td><td className="ly1" onClick={()=>ob('U0.5 FHG',true,'3.15')}><span className="odd-val">3.15</span><span className="odd-vol">3515.3</span></td><td className="ly2" onClick={()=>ob('U0.5 FHG',true,'3.2')}><span className="odd-val">3.2</span><span className="odd-vol">2883.54</span></td><td className="ly3" onClick={()=>ob('U0.5 FHG',true,'3.25')}><span className="odd-val">3.25</span><span className="odd-vol">2479.75</span></td></tr>
          <tr><td className="odds-runner">Over 0.5 Goals</td><td className="bk1" onClick={()=>ob('O0.5 FHG',false,'1.45')}><span className="odd-val">1.45</span><span className="odd-vol">6186.06</span></td><td className="bk2" onClick={()=>ob('O0.5 FHG',false,'1.46')}><span className="odd-val">1.46</span><span className="odd-vol">8013.97</span></td><td className="bk3" onClick={()=>ob('O0.5 FHG',false,'1.47')}><span className="odd-val">1.47</span><span className="odd-vol">177.1</span></td><td className="ly1" onClick={()=>ob('O0.5 FHG',true,'1.48')}><span className="odd-val">1.48</span><span className="odd-vol">708.6</span></td><td className="ly2" onClick={()=>ob('O0.5 FHG',true,'1.49')}><span className="odd-val">1.49</span><span className="odd-vol">2965.39</span></td><td className="ly3" onClick={()=>ob('O0.5 FHG',true,'1.5')}><span className="odd-val">1.5</span><span className="odd-vol">4361.03</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">BM_FIRST_HALF_GOALS_05</div>
      <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 5L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
      <div className="bm-row"><div className="bm-box" style={{maxWidth:420}}><table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup><tbody>
        <tr><td className="bm-runner">Under 0.5 Goals</td><td className="bm-b" onClick={()=>ob('U0.5 BM FHG',false,'204')}><b>204</b><small>125000</small></td><td className="bm-l" onClick={()=>ob('U0.5 BM FHG',true,'212')}><b>212</b><small>125000</small></td></tr>
        <tr><td className="bm-runner">Over 0.5 Goals</td><td className="bm-b" onClick={()=>ob('O0.5 BM FHG',false,'47')}><b>47</b><small>500000</small></td><td className="bm-l" onClick={()=>ob('O0.5 BM FHG',true,'49')}><b>49</b><small>500000</small></td></tr>
      </tbody></table></div></div>

      <div className="mkt-title">FIRST_HALF_GOALS_15</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 1L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 1.5 Goals</td><td className="bk1" onClick={()=>ob('U1.5 FHG',false,'1.42')}><span className="odd-val">1.42</span><span className="odd-vol">1841.51</span></td><td className="bk2" onClick={()=>ob('U1.5 FHG',false,'1.43')}><span className="odd-val">1.43</span><span className="odd-vol">1748.73</span></td><td className="bk3" onClick={()=>ob('U1.5 FHG',false,'1.44')}><span className="odd-val">1.44</span><span className="odd-vol">1063.75</span></td><td className="ly1" onClick={()=>ob('U1.5 FHG',true,'1.45')}><span className="odd-val">1.45</span><span className="odd-vol">29.16</span></td><td className="ly2" onClick={()=>ob('U1.5 FHG',true,'1.46')}><span className="odd-val">1.46</span><span className="odd-vol">260</span></td><td className="ly3" onClick={()=>ob('U1.5 FHG',true,'1.47')}><span className="odd-val">1.47</span><span className="odd-vol">839</span></td></tr>
          <tr><td className="odds-runner">Over 1.5 Goals</td><td className="bk1" onClick={()=>ob('O1.5 FHG',false,'3.1')}><span className="odd-val">3.1</span><span className="odd-vol">541.73</span></td><td className="bk2" onClick={()=>ob('O1.5 FHG',false,'3.15')}><span className="odd-val">3.15</span><span className="odd-vol">221.65</span></td><td className="bk3" onClick={()=>ob('O1.5 FHG',false,'3.2')}><span className="odd-val">3.2</span><span className="odd-vol">81.17</span></td><td className="ly1" onClick={()=>ob('O1.5 FHG',true,'3.3')}><span className="odd-val">3.3</span><span className="odd-vol">678.24</span></td><td className="ly2" onClick={()=>ob('O1.5 FHG',true,'3.35')}><span className="odd-val">3.35</span><span className="odd-vol">714.08</span></td><td className="ly3" onClick={()=>ob('O1.5 FHG',true,'3.4')}><span className="odd-val">3.4</span><span className="odd-vol">834.23</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">OVER_UNDER_05</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 2L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 0.5 Goals</td><td className="bk1" onClick={()=>ob('U0.5 OU',false,'12.5')}><span className="odd-val">12.5</span><span className="odd-vol">522.2</span></td><td className="bk2" onClick={()=>ob('U0.5 OU',false,'13')}><span className="odd-val">13</span><span className="odd-vol">379.11</span></td><td className="bk3" onClick={()=>ob('U0.5 OU',false,'13.5')}><span className="odd-val">13.5</span><span className="odd-vol">260.11</span></td><td className="ly1" onClick={()=>ob('U0.5 OU',true,'14')}><span className="odd-val">14</span><span className="odd-vol">478.33</span></td><td className="ly2" onClick={()=>ob('U0.5 OU',true,'14.5')}><span className="odd-val">14.5</span><span className="odd-vol">1713.6</span></td><td className="ly3" onClick={()=>ob('U0.5 OU',true,'15')}><span className="odd-val">15</span><span className="odd-vol">449.83</span></td></tr>
          <tr><td className="odds-runner">Over 0.5 Goals</td><td className="bk1" onClick={()=>ob('O0.5 OU',false,'1.05')}><span className="odd-val">1.05</span><span className="odd-vol">1282.6</span></td><td className="bk2" onClick={()=>ob('O0.5 OU',false,'1.06')}><span className="odd-val">1.06</span><span className="odd-vol">40491.68</span></td><td className="bk3" onClick={()=>ob('O0.5 OU',false,'1.07')}><span className="odd-val">1.07</span><span className="odd-vol">75385.88</span></td><td className="ly1" onClick={()=>ob('O0.5 OU',true,'1.08')}><span className="odd-val">1.08</span><span className="odd-vol">3251.38</span></td><td className="ly2" onClick={()=>ob('O0.5 OU',true,'1.09')}><span className="odd-val">1.09</span><span className="odd-vol">29873.49</span></td><td className="ly3" onClick={()=>ob('O0.5 OU',true,'1.1')}><span className="odd-val">1.1</span><span className="odd-vol">32836.69</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">OVER_UNDER_15</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 3L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 1.5 Goals</td><td className="bk1" onClick={()=>ob('U1.5',false,'3.6')}><span className="odd-val">3.6</span><span className="odd-vol">4076.06</span></td><td className="bk2" onClick={()=>ob('U1.5',false,'3.65')}><span className="odd-val">3.65</span><span className="odd-vol">47.85</span></td><td className="bk3" onClick={()=>ob('U1.5',false,'3.7')}><span className="odd-val">3.7</span><span className="odd-vol">2.81</span></td><td className="ly1" onClick={()=>ob('U1.5',true,'3.75')}><span className="odd-val">3.75</span><span className="odd-vol">1686.1</span></td><td className="ly2" onClick={()=>ob('U1.5',true,'3.8')}><span className="odd-val">3.8</span><span className="odd-vol">3824.47</span></td><td className="ly3" onClick={()=>ob('U1.5',true,'3.85')}><span className="odd-val">3.85</span><span className="odd-vol">3111.88</span></td></tr>
          <tr><td className="odds-runner">Over 1.5 Goals</td><td className="bk1" onClick={()=>ob('O1.5',false,'1.34')}><span className="odd-val">1.34</span><span className="odd-vol">12997.58</span></td><td className="bk2" onClick={()=>ob('O1.5',false,'1.35')}><span className="odd-val">1.35</span><span className="odd-vol">25794.37</span></td><td className="bk3" onClick={()=>ob('O1.5',false,'1.36')}><span className="odd-val">1.36</span><span className="odd-vol">10775.18</span></td><td className="ly1" onClick={()=>ob('O1.5',true,'1.37')}><span className="odd-val">1.37</span><span className="odd-vol">7.59</span></td><td className="ly2" onClick={()=>ob('O1.5',true,'1.38')}><span className="odd-val">1.38</span><span className="odd-vol">4217.41</span></td><td className="ly3" onClick={()=>ob('O1.5',true,'1.39')}><span className="odd-val">1.39</span><span className="odd-vol">12453.32</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">BM_OVER_UNDER_15</div>
      <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 5L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
      <div className="bm-row"><div className="bm-box" style={{maxWidth:420}}><table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup><tbody>
        <tr><td className="bm-runner">Under 1.5 Goals</td><td className="bm-b" onClick={()=>ob('U1.5 BM',false,'263')}><b>263</b><small>125000</small></td><td className="bm-l" onClick={()=>ob('U1.5 BM',true,'277')}><b>277</b><small>125000</small></td></tr>
        <tr><td className="bm-runner">Over 1.5 Goals</td><td className="bm-b" onClick={()=>ob('O1.5 BM',false,'36')}><b>36</b><small>500000</small></td><td className="bm-l" onClick={()=>ob('O1.5 BM',true,'38')}><b>38</b><small>500000</small></td></tr>
      </tbody></table></div></div>

      <div className="mkt-title">OVER_UNDER_25</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 3L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 2.5 Goals</td><td className="bk1" onClick={()=>ob('U2.5',false,'1.87')}><span className="odd-val">1.87</span><span className="odd-vol">3697.62</span></td><td className="bk2" onClick={()=>ob('U2.5',false,'1.88')}><span className="odd-val">1.88</span><span className="odd-vol">1708.13</span></td><td className="bk3" onClick={()=>ob('U2.5',false,'1.89')}><span className="odd-val">1.89</span><span className="odd-vol">531.72</span></td><td className="ly1" onClick={()=>ob('U2.5',true,'1.9')}><span className="odd-val">1.9</span><span className="odd-vol">218.68</span></td><td className="ly2" onClick={()=>ob('U2.5',true,'1.91')}><span className="odd-val">1.91</span><span className="odd-vol">5862.41</span></td><td className="ly3" onClick={()=>ob('U2.5',true,'1.92')}><span className="odd-val">1.92</span><span className="odd-vol">2284.81</span></td></tr>
          <tr><td className="odds-runner">Over 2.5 Goals</td><td className="bk1" onClick={()=>ob('O2.5',false,'2.06')}><span className="odd-val">2.06</span><span className="odd-vol">10009.76</span></td><td className="bk2" onClick={()=>ob('O2.5',false,'2.08')}><span className="odd-val">2.08</span><span className="odd-vol">7595.37</span></td><td className="bk3" onClick={()=>ob('O2.5',false,'2.1')}><span className="odd-val">2.1</span><span className="odd-vol">3246.85</span></td><td className="ly1" onClick={()=>ob('O2.5',true,'2.14')}><span className="odd-val">2.14</span><span className="odd-vol">3332.04</span></td><td className="ly2" onClick={()=>ob('O2.5',true,'2.16')}><span className="odd-val">2.16</span><span className="odd-vol">4656.99</span></td><td className="ly3" onClick={()=>ob('O2.5',true,'2.18')}><span className="odd-val">2.18</span><span className="odd-vol">6759.93</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">OVER_UNDER_35</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 1L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Under 3.5 Goals</td><td className="bk1" onClick={()=>ob('U3.5',false,'1.31')}><span className="odd-val">1.31</span><span className="odd-vol">12574.91</span></td><td className="bk2" onClick={()=>ob('U3.5',false,'1.32')}><span className="odd-val">1.32</span><span className="odd-vol">16777.4</span></td><td className="bk3" onClick={()=>ob('U3.5',false,'1.33')}><span className="odd-val">1.33</span><span className="odd-vol">337.95</span></td><td className="ly1" onClick={()=>ob('U3.5',true,'1.34')}><span className="odd-val">1.34</span><span className="odd-vol">168.56</span></td><td className="ly2" onClick={()=>ob('U3.5',true,'1.35')}><span className="odd-val">1.35</span><span className="odd-vol">9763.33</span></td><td className="ly3" onClick={()=>ob('U3.5',true,'1.36')}><span className="odd-val">1.36</span><span className="odd-vol">19506.86</span></td></tr>
          <tr><td className="odds-runner">Over 3.5 Goals</td><td className="bk1" onClick={()=>ob('O3.5',false,'3.85')}><span className="odd-val">3.85</span><span className="odd-vol">4224.54</span></td><td className="bk2" onClick={()=>ob('O3.5',false,'3.9')}><span className="odd-val">3.9</span><span className="odd-vol">1398.78</span></td><td className="bk3" onClick={()=>ob('O3.5',false,'3.95')}><span className="odd-val">3.95</span><span className="odd-vol">25.87</span></td><td className="ly1" onClick={()=>ob('O3.5',true,'4')}><span className="odd-val">4</span><span className="odd-vol">23.44</span></td><td className="ly2" onClick={()=>ob('O3.5',true,'4.1')}><span className="odd-val">4.1</span><span className="odd-vol">2721.66</span></td><td className="ly3" onClick={()=>ob('O3.5',true,'4.2')}><span className="odd-val">4.2</span><span className="odd-vol">4631.64</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">DRAW_NO_BET</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 2L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Scotland</td><td className="bk1 empty-cell">-</td><td className="bk2 empty-cell">-</td><td className="bk3" onClick={()=>ob('Scotland DNB',false,'8.4')}><span className="odd-val">8.4</span><span className="odd-vol">152.01</span></td><td className="ly1" onClick={()=>ob('Scotland DNB',true,'9')}><span className="odd-val">9</span><span className="odd-vol">1226.08</span></td><td className="ly2 empty-cell">-</td><td className="ly3 empty-cell">-</td></tr>
          <tr><td className="odds-runner">Brazil</td><td className="bk1" onClick={()=>ob('Brazil DNB',false,'1.1')}><span className="odd-val">1.1</span><span className="odd-vol">101893.92</span></td><td className="bk2" onClick={()=>ob('Brazil DNB',false,'1.11')}><span className="odd-val">1.11</span><span className="odd-vol">50305.3</span></td><td className="bk3" onClick={()=>ob('Brazil DNB',false,'1.12')}><span className="odd-val">1.12</span><span className="odd-vol">24802.14</span></td><td className="ly1" onClick={()=>ob('Brazil DNB',true,'1.14')}><span className="odd-val">1.14</span><span className="odd-vol">24344.08</span></td><td className="ly2" onClick={()=>ob('Brazil DNB',true,'1.15')}><span className="odd-val">1.15</span><span className="odd-vol">43107.27</span></td><td className="ly3" onClick={()=>ob('Brazil DNB',true,'1.16')}><span className="odd-val">1.16</span><span className="odd-vol">19915.63</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">BM_DRAW_NO_BET</div>
      <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 3L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
      <div className="bm-row"><div className="bm-box" style={{maxWidth:420}}><table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup><tbody>
        <tr><td className="bm-runner">Scotland</td><td className="bm-b" onClick={()=>ob('Scotland BM DNB',false,'714')}><b>714</b><small>75000</small></td><td className="bm-l" onClick={()=>ob('Scotland BM DNB',true,'769')}><b>769</b><small>75000</small></td></tr>
        <tr><td className="bm-runner">Brazil</td><td className="bm-b" onClick={()=>ob('Brazil BM DNB',false,'13')}><b>13</b><small>300000</small></td><td className="bm-l" onClick={()=>ob('Brazil BM DNB',true,'14')}><b>14</b><small>300000</small></td></tr>
      </tbody></table></div></div>

      <div className="mkt-title">BOTH_TEAMS_TO_SCORE</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 1L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>
          <tr><td className="odds-runner">Yes</td><td className="bk1" onClick={()=>ob('BTTS Yes',false,'2.48')}><span className="odd-val">2.48</span><span className="odd-vol">2819.27</span></td><td className="bk2" onClick={()=>ob('BTTS Yes',false,'2.5')}><span className="odd-val">2.5</span><span className="odd-vol">1379.04</span></td><td className="bk3" onClick={()=>ob('BTTS Yes',false,'2.52')}><span className="odd-val">2.52</span><span className="odd-vol">82.8</span></td><td className="ly1" onClick={()=>ob('BTTS Yes',true,'2.6')}><span className="odd-val">2.6</span><span className="odd-vol">95.48</span></td><td className="ly2" onClick={()=>ob('BTTS Yes',true,'2.62')}><span className="odd-val">2.62</span><span className="odd-vol">6.75</span></td><td className="ly3" onClick={()=>ob('BTTS Yes',true,'2.64')}><span className="odd-val">2.64</span><span className="odd-vol">434.22</span></td></tr>
          <tr><td className="odds-runner">No</td><td className="bk1" onClick={()=>ob('BTTS No',false,'1.61')}><span className="odd-val">1.61</span><span className="odd-vol">136.98</span></td><td className="bk2" onClick={()=>ob('BTTS No',false,'1.62')}><span className="odd-val">1.62</span><span className="odd-vol">146.14</span></td><td className="bk3" onClick={()=>ob('BTTS No',false,'1.63')}><span className="odd-val">1.63</span><span className="odd-vol">7.04</span></td><td className="ly1" onClick={()=>ob('BTTS No',true,'1.65')}><span className="odd-val">1.65</span><span className="odd-vol">45.2</span></td><td className="ly2" onClick={()=>ob('BTTS No',true,'1.66')}><span className="odd-val">1.66</span><span className="odd-vol">124.52</span></td><td className="ly3" onClick={()=>ob('BTTS No',true,'1.67')}><span className="odd-val">1.67</span><span className="odd-vol">4104.16</span></td></tr>
        </tbody>
      </table>

      <div className="mkt-title">BM_BOTH_TEAMS_TO_SCORE</div>
      <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 2L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
      <div className="bm-row"><div className="bm-box" style={{maxWidth:420}}><table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup><tbody>
        <tr><td className="bm-runner">Yes</td><td className="bm-b" onClick={()=>ob('BTTS Yes BM',false,'153')}><b>153</b><small>50000</small></td><td className="bm-l" onClick={()=>ob('BTTS Yes BM',true,'158')}><b>158</b><small>50000</small></td></tr>
        <tr><td className="bm-runner">No</td><td className="bm-b" onClick={()=>ob('BTTS No BM',false,'63')}><b>63</b><small>200000</small></td><td className="bm-l" onClick={()=>ob('BTTS No BM',true,'65')}><b>65</b><small>200000</small></td></tr>
      </tbody></table></div></div>

      {[
        {title:'TEAM_A_1',max:'Max: 1L',rows:[['Scotland +1','3.4','6543.23','3.45','144.79','3.5','4011.79','3.6','5548.57','3.65','9568.4','3.7','3523.31'],['Brazil -1','2.2','317.67','2.22','1722.79','2.24','30','2.28','2309.57','2.3','376.3','2.32','439.31'],['Draw','3.45','833.46','3.5','53.49','3.55','2014.23','3.75','101.34','3.8','1258.92','3.85','1864.46']]},
        {title:'TEAM_A_2',max:'Max: 1L',rows:[['Scotland +2','1.76','34.31','1.77','575.82','1.8','67.02','1.82','101.79','1.84','153.24','1.85','645.15'],['Brazil -2','4.2','129.96','4.3','110.96','4.4','21.38','4.7','2','4.8','2.39','4.9','449.81'],['Draw','4','115.59','4.1','76.83','4.2','648.96','4.6','20.45','4.7','1369.36','4.8','11.22']]},
        {title:'TEAM_A_3',max:'Max: 1L',rows:[['Scotland +3','1.25','17621.26','1.26','315.4','1.27','7.4','1.29','72.92','1.3','235.08','1.31','339.81'],['Brazil -3','9.6','9.8','9.8','21.99','10.5','8.63','12','173.94','12.5','1192.32','13','594.6'],['Draw','6.8','50.66','7','379.08','7.2','19.24','8.2','19.45','8.4','828.94','8.6','11.45']]},
        {title:'TEAM_B_1',max:'Max: 1L',rows:[['Brazil +1','1.07','70101.56','1.08','67936.07','1.09','23629.74','1.1','3105','1.11','16866.82','1.12','49068.29'],['Scotland -1','38','8.29','42','48.78','50','6.5','55','8.91','65','482.18','95','440.46'],['Draw','12.5','582.94','13','248.02','13.5','36.3','15','21.65','15.5','1035.96','16','128.05']]},
      ].map(mkt => (
        <div key={mkt.title}>
          <div className="mkt-title">{mkt.title}</div>
          <div className="mkt-sub"><div className="mkt-sub-left">{mkt.max}</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
          <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
            <tbody>{mkt.rows.map((r,ri)=>(
              <tr key={ri}>
                <td className="odds-runner">{r[0]}</td>
                <td className="bk1" onClick={()=>ob(r[0] as string,false,r[1] as string)}><span className="odd-val">{r[1]}</span><span className="odd-vol">{r[2]}</span></td>
                <td className="bk2" onClick={()=>ob(r[0] as string,false,r[3] as string)}><span className="odd-val">{r[3]}</span><span className="odd-vol">{r[4]}</span></td>
                <td className="bk3" onClick={()=>ob(r[0] as string,false,r[5] as string)}><span className="odd-val">{r[5]}</span><span className="odd-vol">{r[6]}</span></td>
                <td className="ly1" onClick={()=>ob(r[0] as string,true,r[7] as string)}><span className="odd-val">{r[7]}</span><span className="odd-vol">{r[8]}</span></td>
                <td className="ly2" onClick={()=>ob(r[0] as string,true,r[9] as string)}><span className="odd-val">{r[9]}</span><span className="odd-vol">{r[10]}</span></td>
                <td className="ly3" onClick={()=>ob(r[0] as string,true,r[11] as string)}><span className="odd-val">{r[11]}</span><span className="odd-vol">{r[12]}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      ))}

      <div className="mkt-title">CORRECT_SCORE</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 1L</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>{buildRows(csData, (sel,isLay,odds)=>ob(sel,isLay,odds))}</tbody>
      </table>

      <div className="mkt-title">HALF_TIME_SCORE</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 10K</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>{buildRows(htsData, (sel,isLay,odds)=>ob(sel,isLay,odds))}</tbody>
      </table>

      <div className="mkt-title">MATCH_ODDS_AND_BTTS</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 10K</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>{buildRows(mobttsData, (sel,isLay,odds)=>ob(sel,isLay,odds))}</tbody>
      </table>

      <div className="mkt-title">MATCH_ODDS_AND_OU_25</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 10K</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>{buildRows(mououData, (sel,isLay,odds)=>ob(sel,isLay,odds))}</tbody>
      </table>

      <div className="mkt-title">HALF_TIME_FULL_TIME</div>
      <div className="mkt-sub"><div className="mkt-sub-left">Max: 10K</div><div className="mkt-sub-right"><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(114,187,239)'}}>Back</div><div style={{background:'rgb(250,169,186)'}}>Lay</div><div style={{background:'rgb(242,242,242)'}}></div><div style={{background:'rgb(242,242,242)'}}></div></div></div>
      <table className="odds-grid"><colgroup><col className="col-rname"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/><col className="col-ocell"/></colgroup>
        <tbody>{buildRows(htftData, (sel,isLay,odds)=>ob(sel,isLay,odds))}</tbody>
      </table>

      <div className="bm-row">
        {[{title:'Next Goal 1.0',max:'Max: 2L',rows:[{n:'Scotland',b:'3.62',bv:'5000000',l:null},{n:'Brazil',susp:true},{n:'No Goal',b:'8.69',bv:'5000000',l:null}]},{title:'Next Goal 2.0',max:'Max: 2L',rows:[{n:'Scotland',b:'3.14',bv:'5000000',l:null},{n:'Brazil',susp:true},{n:'No Goal',b:'8.7',bv:'5000000',l:null}]},{title:'Goals Odd/Even',max:'Max: 1L',rows:[{n:'Odd',b:'1.88',bv:'5000000',l:null},{n:'Even',susp:true}]}].map(bm=>(
          <div key={bm.title} className="bm-box">
            <div className="mkt-title">{bm.title}</div>
            <div className="bm-mkt-sub"><span>{bm.max}</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
            <table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup>
              <tbody>{(bm.rows as any[]).map((r:any,ri:number)=>(
                <tr key={ri}>
                  <td className="bm-runner">{r.n}</td>
                  {r.susp ? <td colSpan={2} className="susp">SUSPENDED</td> : <>
                    <td className="bm-b" onClick={()=>ob(r.n,false,r.b)}><b>{r.b}</b><small>{r.bv}</small></td>
                    <td className="bm-dash">-</td>
                  </>}
                </tr>
              ))}</tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="bm-row">
        {[
          {title:'BM_Penalty In The Match',max:'Min: 100.00  Max: 2L',rows:['Yes','No'],note:'Only Advance Market Odds'},
          {title:'BM_Match First Goal Method',max:'Min: 100.00  Max: 50K',rows:['Shot','Header','Penalty','Free Kick','Own Goal','No Goal'],note:'Only Advance Odds Market.'},
        ].map(bm=>(
          <div key={bm.title} className="bm-box">
            <div className="mkt-title">{bm.title}</div>
            <div className="bm-mkt-sub"><span>{bm.max}</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
            <table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup>
              <tbody>{bm.rows.map((r,ri)=>(
                <tr key={ri}><td className="bm-runner">{r}</td><td colSpan={2} className="susp">SUSPENDED</td></tr>
              ))}</tbody>
            </table>
            <div style={{color:'#1a9cc7',padding:'3px 10px',fontSize:10,fontStyle:'italic',borderTop:'1px solid #eee'}}>{bm.note}</div>
          </div>
        ))}
      </div>

      <div className="mkt-title">BM_1ST PENALTY</div>
      <div className="bm-mkt-sub"><span>Min: 100.00 &nbsp;Max: 25L</span><div className="bm-mkt-sub-right"><span className="bm-mkt-sub-back">Back</span><span className="bm-mkt-sub-lay">Lay</span></div></div>
      <div className="bm-row"><div className="bm-box" style={{maxWidth:300}}><table className="bm-table"><colgroup><col style={{width:'auto'}}/><col style={{width:80}}/><col style={{width:80}}/></colgroup><tbody>
        <tr><td className="bm-runner">Score</td><td colSpan={2} className="susp">SUSPENDED</td></tr>
        <tr><td className="bm-runner">Miss</td><td colSpan={2} className="susp">SUSPENDED</td></tr>
      </tbody></table></div></div>
      <div style={{height:24}}></div>
    </>
  );

  return (
    <div className="mdp-wrap">
      <div className="mdp-main-content">
        {/* Desktop header - shown only on desktop */}
        <div className="match-header">
          <span>{info.title}</span>
          <span>{info.date}</span>
        </div>

      

        {/* Mobile: match name LEFT, date RIGHT — like reference image */}
        <div className="mobile-match-bar">
          <div className="team-name">{info.title}</div>
          <div className="match-date">{info.date}</div>
        </div>

        {/* Mobile tabs: ODDS | MATCHED BET | icon */}
        <div className="mobile-tabs">
          <div className={`mobile-tab${mobTab==='odds'?' active':''}`} onClick={()=>setMobTab('odds')}>ODDS</div>
          <div className={`mobile-tab${mobTab==='mybet'?' active':''}`} onClick={()=>setMobTab('mybet')}>MATCHED BET (0)</div>
          <div className="mobile-tab" style={{flex:0,padding:'9px 12px'}}>
            <svg width="18" height="13" viewBox="0 0 20 14" fill="none"><rect x="1" y="1" width="18" height="11" rx="1.5" stroke="white" strokeWidth="1.5" fill="none"/><line x1="6" y1="13" x2="14" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/><line x1="10" y1="12" x2="10" y2="13" stroke="white" strokeWidth="1.5"/></svg>
          </div>
        </div>

        {mobTab === 'mybet' && (
          <div className="mobile-mybet-content-wrap">
            <div className="mobile-mybet-header"><span>Matched Bet</span><span>Odds</span><span>Stake</span></div>
            <div style={{flex:1,background:'#fff',minHeight:300}}></div>
          </div>
        )}

        {mobTab === 'odds' && OddsContent}
        {MobileBetPopup}
      </div>

      {/* RIGHT PANEL - desktop sticky */}
      <div className="mdp-right-panel">
        <div className="rp-matka">
          <span className="rp-matka-icon">i</span>
          <a href="#">Matka</a>
        </div>
        {DesktopBetSlip}
        <div className="rp-section">My Bet</div>
        <div className="rp-mybet-cols">
          <span>Matched Bet</span><span>Odds</span><span>Stake</span>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;