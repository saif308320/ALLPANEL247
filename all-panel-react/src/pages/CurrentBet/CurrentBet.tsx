import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import { CasinoSection } from '../../components/Sidebar/CasinoPage';
import './CurrentBet.css';

interface TableRow {
  sport: string;
  eventName: string;
  marketName: string;
  nation: string;
  userRate: number;
  amount: number;
  placeDate: string;
  type: 'Back' | 'Lay';
}

const REPORT_OPTIONS = [
  { label: 'Select Report Type', value: '' },
  { label: 'Sports', value: 'sports' },
  { label: 'Casino', value: 'casino' },
];

const ReportSelect: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); }; document.addEventListener('mousedown', h); return () => document.removeEventListener('mousedown', h); }, []);
  const sel = REPORT_OPTIONS.find(o => o.value === value) || REPORT_OPTIONS[0];
  return (
    <div className="cb-select-wrapper" ref={ref}>
      <div className="cb-select-btn" onClick={() => setOpen(o => !o)}>
        <span>{sel.label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      {open && <div className="cb-select-dropdown">
        {REPORT_OPTIONS.map(opt => (
          <div key={opt.value}
            className={['cb-select-option', opt.value === '' ? 'cb-select-option--placeholder' : '', opt.value === value ? 'cb-select-option--selected' : ''].join(' ')}
            onClick={() => { if (opt.value !== '') { onChange(opt.value); setOpen(false); } }}
          >{opt.label}</div>
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
    <div className="cb-show-select" ref={ref}>
      <div className="cb-show-btn" onClick={() => setOpen(o => !o)}>
        <span>{value}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      {open && <div className="cb-show-dropdown">
        {[10, 20, 30, 40, 50].map(opt => (
          <div key={opt} className={['cb-show-option', opt === value ? 'cb-show-option--selected' : ''].join(' ')} onClick={() => { onChange(opt); setOpen(false); }}>{opt}</div>
        ))}
      </div>}
    </div>
  );
};

const MOCK_DATA: TableRow[] = [];

const CurrentBet: React.FC = () => {
  const navigate = useNavigate();

  const [reportType, setReportType] = useState('');
  const [showEntries, setShowEntries] = useState(10);
  const [filterType, setFilterType] = useState<'all' | 'back' | 'lay'>('all');
  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState<TableRow[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSectionChange = (section: CasinoSection | null) => {
    if (section) {
      navigate('/home', { state: { activeSection: section } });
    }
  };

  const handleSubmit = () => { setTableData(MOCK_DATA); setSubmitted(true); };

  const filtered = tableData
    .filter(r => filterType === 'all' || (filterType === 'back' && r.type === 'Back') || (filterType === 'lay' && r.type === 'Lay'))
    .filter(r => searchText === '' || r.eventName.toLowerCase().includes(searchText.toLowerCase()) || r.nation.toLowerCase().includes(searchText.toLowerCase()));

  const totalAmount = filtered.reduce((sum, r) => sum + r.amount, 0);
  const showSportsColumns = reportType === 'sports';

  return (
    <div className="cb-root">
      <Header activeTab="HOME" balance={1500} exp={0} username="Demo" />

      <div className="cb-wrap">
        <Sidebar activeSection={null} onSectionChange={handleSectionChange} />

        <div className="cb-content">
          <div className="cb-inner">

            <div className="cb-page-header">Current Bets</div>

            <div className="cb-filter-row">
              <ReportSelect value={reportType} onChange={setReportType} />
              <button className="cb-submit-btn" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="cb-controls-row">
              <div className="cb-col cb-col-show">
                <span>Show</span>
                <ShowSelect value={showEntries} onChange={setShowEntries} />
                <span>Entries</span>
              </div>

              <div className="cb-col cb-col-radio">
                <div className="cb-radio-group">
                  <label className="cb-radio-label">
                    <input type="radio" name="betType" checked={filterType === 'all'} onChange={() => setFilterType('all')} />
                    All
                  </label>
                  <label className="cb-radio-label">
                    <input type="radio" name="betType" checked={filterType === 'back'} onChange={() => setFilterType('back')} />
                    Back
                  </label>
                  <label className="cb-radio-label">
                    <input type="radio" name="betType" checked={filterType === 'lay'} onChange={() => setFilterType('lay')} />
                    Lay
                  </label>
                </div>
              </div>

              <div className="cb-col cb-col-totals">
                <span className="cb-totals">Total Bets: {filtered.length}</span>
                <span className="cb-totals">Total Amount: {totalAmount}</span>
              </div>

              <div className="cb-col cb-col-search">
                <span>Search:</span>
                <input className="cb-search-input"
                  placeholder={`${filtered.length} records...`}
                  value={searchText} onChange={e => setSearchText(e.target.value)} />
              </div>
            </div>

            <div className="cb-table-wrapper">
              <table className="cb-table">
                <thead>
                  <tr>
                    {showSportsColumns && <th>Sports</th>}
                    <th>Event Name</th>
                    {showSportsColumns && <th>Market Name</th>}
                    <th>Nation</th><th>User Rate</th><th>Amount</th><th>Place Date</th>
                    <th className="cb-th-check"><input type="checkbox" disabled /></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr className="cb-empty-row"><td colSpan={showSportsColumns ? 8 : 6} className="cb-empty-cell">{submitted ? 'No records found' : ''}</td></tr>
                  ) : filtered.slice(0, showEntries).map((row, i) => (
                    <tr key={i}>
                      {showSportsColumns && <td>{row.sport}</td>}
                      <td>{row.eventName}</td>
                      {showSportsColumns && <td>{row.marketName}</td>}
                      <td>{row.nation}</td>
                      <td className="text-right">{row.userRate}</td>
                      <td className="text-right">{row.amount.toLocaleString()}</td>
                      <td>{row.placeDate}</td>
                      <td className="cb-th-check"><input type="checkbox" /></td>
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

export default CurrentBet;