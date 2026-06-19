import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { CasinoSection } from '../../components/Sidebar/CasinoPage';
import './CasinoResults.css';

interface TableRow {
  roundId: string;
  winner: string;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function formatDate(d: Date): string {
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
}
function parseDate(str: string): Date {
  const [dd,mm,yyyy] = str.split('/');
  return new Date(Number(yyyy),Number(mm)-1,Number(dd));
}
function getDaysInMonth(y: number, m: number) { return new Date(y,m+1,0).getDate(); }

const Calendar: React.FC<{value:string;onChange:(v:string)=>void;maxDate?:Date}> = ({value,onChange,maxDate}) => {
  const sel = parseDate(value);
  const [vy,setVy] = useState(sel.getFullYear());
  const [vm,setVm] = useState(sel.getMonth());
  const today = new Date();
  const firstDay = new Date(vy,vm,1).getDay();
  const dim = getDaysInMonth(vy,vm);
  const dipm = getDaysInMonth(vy,vm-1);
  const prev=()=>{if(vm===0){setVm(11);setVy(y=>y-1);}else setVm(m=>m-1);};
  const next=()=>{if(vm===11){setVm(0);setVy(y=>y+1);}else setVm(m=>m+1);};
  const cells:{day:number;type:'prev'|'curr'|'next'}[]=[];
  for(let i=firstDay-1;i>=0;i--) cells.push({day:dipm-i,type:'prev'});
  for(let d=1;d<=dim;d++) cells.push({day:d,type:'curr'});
  while(cells.length%7!==0) cells.push({day:cells.length-dim-firstDay+1,type:'next'});
  return (
    <div className="cr-calendar">
      <div className="cr-cal-header">
        <button className="cr-cal-nav" onClick={prev}>&#8249;</button>
        <span>{MONTHS[vm]} {vy}</span>
        <button className="cr-cal-nav" onClick={next}>&#8250;</button>
      </div>
      <div className="cr-cal-grid">
        {DAYS.map(d=><div key={d} className="cr-cal-day-name">{d}</div>)}
        {cells.map((cell,i)=>{
          if(cell.type!=='curr') return <div key={i} className="cr-cal-day cr-cal-day--disabled">{cell.day}</div>;
          const td=new Date(vy,vm,cell.day);
          const isSel=cell.day===sel.getDate()&&vm===sel.getMonth()&&vy===sel.getFullYear();
          const isDis=maxDate?td>maxDate:false;
          const isTod=cell.day===today.getDate()&&vm===today.getMonth()&&vy===today.getFullYear();
          return <div key={i}
            className={['cr-cal-day',isSel?'cr-cal-day--selected':'',isDis?'cr-cal-day--disabled':'',isTod&&!isSel?'cr-cal-day--today':''].join(' ')}
            onClick={()=>!isDis&&onChange(formatDate(new Date(vy,vm,cell.day)))}
          >{cell.day}</div>;
        })}
      </div>
    </div>
  );
};

const DatePicker: React.FC<{value:string;onChange:(v:string)=>void;maxDate?:Date}> = ({value,onChange,maxDate}) => {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[]);
  return (
    <div className="cr-date-wrapper" ref={ref}>
      <div className="cr-date-input" onClick={()=>setOpen(o=>!o)}>
        <span>{value}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </div>
      {open&&<Calendar value={value} onChange={v=>{onChange(v);setOpen(false);}} maxDate={maxDate}/>}
    </div>
  );
};

const CASINO_OPTIONS: string[] = [
  'Select Casino Type',
  'Teenpatti 1-day','Poker 1-Day','3 Cards Judgement','Amar Akbar Anthony','Andar Bahar','Andar Bahar 2',
  'Baccarat','Baccarat 2','Bollywood Casino','32 Cards A','32 Cards B','Cricket Match 20-20','Casino Meter',
  'Cricket V','Cricket V2','5Five Cricket','20-20 Dragon Tiger','20-20 Dragon Tiger 2','1 Day Dragon Tiger',
  '20-20 D T L','Lottery','Lucky 7 - A','Lucky 7 - B','20-20 Poker','Poker 6 Players','20-20 Teenpatti',
  'Teenpatti Open','Teenpatti Test','Casino War','Worli Matka','Instant Worli','Teenpatti - 2.0','Queen',
  'Race20','Lucky 7 - C','Super Over','The Trap','2 Cards Teenpatti','29Card Baccarat','Muflis Teenpatti',
  'Race to 17','20-20 Teenpatti B','Trio','Note Number','Teen 20 24','K.B.C','1 CARD 20-20','1 CARD ONE-DAY',
  'V-20-20 Teenpatti','V-Teenpatti 1-day','V-1 Day Dragon Tiger','V-20-20 Dragon Tiger','V-Lucky 7 - A',
  'V-Race to 17','V-Muflis Teenpatti','V-Amar Akbar Anthony','V-Bollywood Casino','V-Baccarat','V-Trio',
  'V-The Trap','ANDAR BAHAR 50 CARDS','V-20-20 D T L','Amar Akbar Anthony 2','Vivo Gaming','snakes and ladders',
  'roulette','Race to 2nd','Instant Teenpatti','Ball By Ball','Instant Teenpatti 3.0','Sic Bo 2',
  'Queen Top Open Teenpatti','Jack Top Open Teenpatti','Lucky 15',
];

const CasinoTypeSelect: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const label = value === '' ? 'Select Casino Type' : value;
  return (
    <div className="cr-select-wrapper" ref={ref}>
      <div className="cr-select-btn" onClick={() => setOpen(o => !o)}>
        <span>{label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      {open && <div className="cr-select-dropdown">
        {CASINO_OPTIONS.map((opt, i) => (
          <div key={i}
            className={['cr-select-option', i === 0 ? 'cr-select-option--placeholder' : '', opt === value ? 'cr-select-option--selected' : ''].join(' ')}
            onClick={() => { if (i !== 0) { onChange(opt); setOpen(false); } }}
          >{opt}</div>
        ))}
      </div>}
    </div>
  );
};

const ShowSelect: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  return (
    <div className="cr-show-select" ref={ref}>
      <div className="cr-show-btn" onClick={() => setOpen(o => !o)}>
        <span>{value}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      {open && <div className="cr-show-dropdown">
        {[10, 20, 30, 40, 50].map(opt => (
          <div key={opt} className={['cr-show-option', opt === value ? 'cr-show-option--selected' : ''].join(' ')} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</div>
        ))}
      </div>}
    </div>
  );
};

const MOCK_DATA: TableRow[] = [];

const CasinoResults: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(formatDate(today));
  const [casinoType, setCasinoType] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSectionChange = (section: CasinoSection | null) => {
    if (section) {
      navigate('/home', { state: { activeSection: section } });
    }
  };

  const handleSubmit = () => {
    if (casinoType === '') {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
      return;
    }
    setTableData(MOCK_DATA);
    setSubmitted(true);
  };

  const filtered = tableData.filter(r =>
    searchText === '' ||
    r.roundId.toLowerCase().includes(searchText.toLowerCase()) ||
    r.winner.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="cr-root">
      {showError && (
        <div className="cr-error-toast">
          <span className="cr-error-icon">&#10006;</span>
          Select Casino Type !
        </div>
      )}

      <Header activeTab="HOME" balance={1500} exp={0} username="Demo" />

      <div className="cr-wrap">
        <Sidebar activeSection={null} onSectionChange={handleSectionChange} />

        <div className="cr-content">
          <div className="cr-inner">

            <div className="cr-page-header">Casino Results</div>

            <div className="cr-filter-row">
              <DatePicker value={selectedDate} onChange={setSelectedDate} maxDate={today} />
              <CasinoTypeSelect value={casinoType} onChange={setCasinoType} />
              <button className="cr-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="cr-controls-row">
              <div className="cr-controls-left">
                <span>Show</span>
                <ShowSelect value={showEntries} onChange={setShowEntries} />
                <span>Entries</span>
              </div>
              <div className="cr-controls-right">
                <span>Search:</span>
                <input className="cr-search-input"
                  placeholder={`${filtered.length} records...`}
                  value={searchText} onChange={e => setSearchText(e.target.value)} />
              </div>
            </div>

            <div className="cr-table-wrapper">
              <table className="cr-table">
                <thead>
                  <tr><th>Round ID</th><th>Winner</th></tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr className="cr-empty-row"><td colSpan={2} className="cr-empty-cell">{submitted ? 'No records found' : ''}</td></tr>
                  ) : filtered.slice(0, showEntries).map((row, i) => (
                    <tr key={i}>
                      <td>{row.roundId}</td>
                      <td>{row.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CasinoResults;