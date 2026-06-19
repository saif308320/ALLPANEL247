import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { CasinoSection } from '../../components/Sidebar/CasinoPage';
import './AccountStatement.css';

interface TableRow {
  date: string; srNo: number;
  credit: number | null; debit: number | null;
  pts: number; remark: string;
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
    <div className="as-calendar">
      <div className="as-cal-header">
        <button className="as-cal-nav" onClick={prev}>&#8249;</button>
        <span>{MONTHS[vm]} {vy}</span>
        <button className="as-cal-nav" onClick={next}>&#8250;</button>
      </div>
      <div className="as-cal-grid">
        {DAYS.map(d=><div key={d} className="as-cal-day-name">{d}</div>)}
        {cells.map((cell,i)=>{
          if(cell.type!=='curr') return <div key={i} className="as-cal-day as-cal-day--disabled">{cell.day}</div>;
          const td=new Date(vy,vm,cell.day);
          const isSel=cell.day===sel.getDate()&&vm===sel.getMonth()&&vy===sel.getFullYear();
          const isDis=maxDate?td>maxDate:false;
          const isTod=cell.day===today.getDate()&&vm===today.getMonth()&&vy===today.getFullYear();
          return <div key={i}
            className={['as-cal-day',isSel?'as-cal-day--selected':'',isDis?'as-cal-day--disabled':'',isTod&&!isSel?'as-cal-day--today':''].join(' ')}
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
    <div className="as-date-wrapper" ref={ref}>
      <div className="as-date-input" onClick={()=>setOpen(o=>!o)}>
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

const REPORT_OPTIONS=[
  {label:'Select Report Type',value:''},
  {label:'Deposite/Withdraw Reports',value:'deposit_withdraw'},
  {label:'Sport Reports',value:'sport'},
  {label:'Casino Reports',value:'casino'},
];

const ReportSelect: React.FC<{value:string;onChange:(v:string)=>void}> = ({value,onChange}) => {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[]);
  const sel=REPORT_OPTIONS.find(o=>o.value===value)||REPORT_OPTIONS[1];
  return (
    <div className="as-select-wrapper" ref={ref}>
      <div className="as-select-btn" onClick={()=>setOpen(o=>!o)}>
        <span>{sel.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      {open&&<div className="as-select-dropdown">
        {REPORT_OPTIONS.map(opt=>(
          <div key={opt.value}
            className={['as-select-option',opt.value===''?'as-select-option--placeholder':'',opt.value===value?'as-select-option--selected':''].join(' ')}
            onClick={()=>{if(opt.value!==''){onChange(opt.value);setOpen(false);}}}
          >{opt.label}</div>
        ))}
      </div>}
    </div>
  );
};

const ShowSelect: React.FC<{value:number;onChange:(v:number)=>void}> = ({value,onChange}) => {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h);},[]);
  return (
    <div className="as-show-select" ref={ref}>
      <div className="as-show-btn" onClick={()=>setOpen(o=>!o)}>
        <span>{value}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      {open&&<div className="as-show-dropdown">
        {[10,20,30,40,50].map(opt=>(
          <div key={opt} className={['as-show-option',opt===value?'as-show-option--selected':''].join(' ')} onClick={()=>{onChange(opt);setOpen(false);}}>{opt}</div>
        ))}
      </div>}
    </div>
  );
};

const MOCK_DATA: TableRow[] = [
  {date:'10/06/2026 16:09:00',srNo:1,credit:0,debit:null,pts:0,remark:'Opening Pts'},
  {date:'17/06/2026 04:00:07',srNo:2,credit:1500,debit:null,pts:1500,remark:'User creation'},
];

const AccountStatement: React.FC = () => {
  const navigate = useNavigate();
  const today = new Date();
  const weekAgo = new Date(today);
  weekAgo.setDate(today.getDate()-7);

  const [fromDate,setFromDate]=useState(formatDate(weekAgo));
  const [toDate,setToDate]=useState(formatDate(today));
  const [reportType,setReportType]=useState('deposit_withdraw');
  const [showEntries,setShowEntries]=useState(10);
  const [searchText,setSearchText]=useState('');
  const [tableData,setTableData]=useState<TableRow[]>([]);
  const [submitted,setSubmitted]=useState(false);
  const [currentPage,setCurrentPage]=useState(1);
  const [goToPage,setGoToPage]=useState('1');

  // ✅ FIX: Sidebar casino click pe /home pe navigate karo with section state
  const handleSectionChange = (section: CasinoSection | null) => {
    if (section) {
      navigate('/home', { state: { activeSection: section } });
    }
  };

  const handleSubmit=()=>{setTableData(MOCK_DATA);setSubmitted(true);setCurrentPage(1);setGoToPage('1');};
  const filtered=tableData.filter(r=>searchText===''||r.date.includes(searchText)||r.remark.toLowerCase().includes(searchText.toLowerCase()));
  const totalPages=Math.max(1,Math.ceil(filtered.length/showEntries));
  const paginated=filtered.slice((currentPage-1)*showEntries,currentPage*showEntries);
  const goFirst=()=>{setCurrentPage(1);setGoToPage('1');};
  const goPrev=()=>{const p=Math.max(1,currentPage-1);setCurrentPage(p);setGoToPage(String(p));};
  const goNext=()=>{const p=Math.min(totalPages,currentPage+1);setCurrentPage(p);setGoToPage(String(p));};
  const goLast=()=>{setCurrentPage(totalPages);setGoToPage(String(totalPages));};
  const handleGoto=(e:React.KeyboardEvent)=>{if(e.key==='Enter'){const p=Math.min(totalPages,Math.max(1,Number(goToPage)||1));setCurrentPage(p);setGoToPage(String(p));}};

  return (
    <div className="as-root">
      <Header activeTab="HOME" balance={1500} exp={0} username="Demo" />

      <div className="as-wrap">
        <Sidebar activeSection={null} onSectionChange={handleSectionChange} />

        <div className="as-content">
          <div className="as-inner">

            <div className="as-page-header">Account Statement</div>

            <div className="as-filter-row">
              <DatePicker value={fromDate} onChange={setFromDate} maxDate={parseDate(toDate)}/>
              <DatePicker value={toDate} onChange={setToDate} maxDate={today}/>
              <ReportSelect value={reportType} onChange={setReportType}/>
              <button className="as-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="as-controls-row">
              <div className="as-controls-left">
                <span>Show</span>
                <ShowSelect value={showEntries} onChange={v=>{setShowEntries(v);setCurrentPage(1);}}/>
                <span>Entries</span>
              </div>
              <div className="as-controls-right">
                <span>Search:</span>
                <input className="as-search-input"
                  placeholder={submitted?`${filtered.length} records...`:'0 records...'}
                  value={searchText} onChange={e=>setSearchText(e.target.value)}/>
              </div>
            </div>

            <div className="as-table-wrapper">
              <table className="as-table">
                <thead>
                  <tr><th>Date</th><th>Sr no</th><th>Credit</th><th>Debit</th><th>Pts</th><th>Remark</th></tr>
                </thead>
                <tbody>
                  {paginated.length===0?(
                    <tr className="as-empty-row"><td colSpan={6} className="as-empty-cell">{submitted?'No records found':''}</td></tr>
                  ):paginated.map((row,i)=>(
                    <tr key={i}>
                      <td>{row.date}</td>
                      <td className="text-right">{row.srNo}</td>
                      <td className={`text-right${row.credit&&row.credit>0?' credit-pos':''}`}>{row.credit!==null?row.credit.toLocaleString():''}</td>
                      <td className="text-right">{row.debit!==null?row.debit.toLocaleString():''}</td>
                      <td className={`text-right${row.pts>0?' pts-pos':''}`}>{row.pts.toLocaleString()}</td>
                      <td>{row.remark}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {submitted&&filtered.length>0&&(
              <div className="as-pagination">
                <button className="as-pg-btn" onClick={goFirst} disabled={currentPage===1}>First</button>
                <button className="as-pg-btn" onClick={goPrev}  disabled={currentPage===1}>Previous</button>
                <button className="as-pg-btn" onClick={goNext}  disabled={currentPage===totalPages}>Next</button>
                <button className="as-pg-btn" onClick={goLast}  disabled={currentPage===totalPages}>Last</button>
                <span className="as-pg-info">Page <strong>{currentPage} of {totalPages}</strong></span>
                <span className="as-pg-info">| Go to Page</span>
                <input className="as-goto-input" value={goToPage} onChange={e=>setGoToPage(e.target.value)} onKeyDown={handleGoto}/>
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountStatement;