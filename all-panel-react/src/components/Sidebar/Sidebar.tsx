import React, { useState } from 'react';
import './Sidebar.css';
import { CasinoSection } from './CasinoPage';

const horseRacingTabs = [
  '20:03 Chepstow (GB)','20:13 ParisLongchamp (FR)','20:15 Wetherby (GB)',
  '20:23 Carlisle (GB)','20:33 Chepstow (GB)','20:40 Kilbeggan (IE)',
  '20:48 ParisLongchamp (FR)','20:50 Wetherby (GB)','20:58 Carlisle (GB)',
  '21:05 Chepstow (GB)','21:12 Kilbeggan (IE)','21:30 ParisLongchamp (FR)',
  '21:35 Wetherby (GB)','21:45 Carlisle (GB)','21:52 Chepstow (GB)',
  '22:00 Kilbeggan (IE)','22:10 ParisLongchamp (FR)','22:20 Wetherby (GB)',
  '22:30 Carlisle (GB)','22:40 Chepstow (GB)',
];

const greyhoundRacingTabs = [
  '19:59 Doncaster (GB)','20:03 Sunderland (GB)','20:09 Central Park (GB)',
  '20:16 Monmore (GB)','20:18 Doncaster (GB)','20:22 Sunderland (GB)',
  '20:28 Central Park (GB)','20:34 Monmore (GB)','20:37 Doncaster (GB)',
  '20:41 Sunderland (GB)','20:47 Central Park (GB)','20:53 Monmore (GB)',
  '20:56 Doncaster (GB)','21:00 Sunderland (GB)','21:06 Central Park (GB)',
  '21:12 Monmore (GB)','21:15 Doncaster (GB)','21:19 Sunderland (GB)',
];

interface SubItem { name: string; matches?: string[]; }
interface SportItem { name: string; subItems: SubItem[]; }

const allSportsData: SportItem[] = [
  { name: 'Politics', subItems: [{ name: 'Assembly Election 2026', matches: ['Assembly Election 2026'] }] },
  { name: 'Cricket', subItems: [
    { name: 'ICC Womens T20 World Cup', matches: ['Australia W v Bangladesh W','England W v Ireland W','India W v Netherlands W','New Zealand W v Sri Lanka W','South Africa W v Pakistan W','West Indies W v Scotland W'] },
    { name: 'Dim Cricket League (1 over)', matches: ['Gujarat Titans (e) - Chennai Super Kings (e)','Kolkata Knight Riders (e) - Punjab Kings (e)'] },
    { name: 'County Championship', matches: [] },
    { name: 'Test Matches', matches: [] },
  ]},
  { name: 'Football', subItems: [
    { name: 'FIFA WORLD CUP 2026', matches: [] },
    { name: 'SWEDEN Superettan', matches: [] },
    { name: 'BRAZIL Serie C', matches: [] },
  ]},
  { name: 'Tennis', subItems: [
    { name: 'ATP LONDON OPEN 2026', matches: [] },
    { name: 'WTA - SINGLES Berlin', matches: [] },
  ]},
  { name: 'Table Tennis', subItems: [
    { name: 'CZECH Liga Pro', matches: [] },
    { name: 'MEN Setka Cup', matches: [] },
  ]},
  { name: 'Badminton', subItems: [] },
  { name: 'Esoccer', subItems: [] },
  { name: 'Basketball', subItems: [] },
  { name: 'Volleyball', subItems: [] },
  { name: 'Snooker', subItems: [] },
  { name: 'Ice Hockey', subItems: [] },
  { name: 'E Games', subItems: [] },
  { name: 'Futsal', subItems: [] },
  { name: 'Handball', subItems: [] },
  { name: 'Kabaddi', subItems: [] },
  { name: 'Golf', subItems: [] },
  { name: 'Rugby League', subItems: [] },
  { name: 'Boxing', subItems: [] },
  { name: 'Beach Volleyball', subItems: [] },
  { name: 'Mixed Martial Arts', subItems: [] },
  { name: 'MotoGP', subItems: [] },
  { name: 'Chess', subItems: [] },
  { name: 'Cycling', subItems: [] },
  { name: 'Motorbikes', subItems: [] },
  { name: 'Athletics', subItems: [] },
  { name: 'Basketball 3X3', subItems: [] },
  { name: 'Sumo', subItems: [] },
  { name: 'Virtual sports', subItems: [] },
  { name: 'Motor Sports', subItems: [] },
  { name: 'Baseball', subItems: [] },
  { name: 'Rugby Union', subItems: [] },
  { name: 'Darts', subItems: [] },
  { name: 'American Football', subItems: [] },
  { name: 'Soccer', subItems: [] },
  { name: 'Esports', subItems: [] },
  { name: 'Boat Racing', subItems: [] },
  { name: 'Wrestling', subItems: [] },
];

export const CASINO_ITEMS: { label: string; section: CasinoSection; blink?: boolean }[] = [
  { label: 'Our Casino',         section: 'Our Casino',         blink: true },
  { label: 'Our VIP Casino',     section: 'Our VIP Casino',     blink: true },
  { label: 'Our Premium Casino', section: 'Our Premium Casino' },
  { label: 'Our Virtual',        section: 'Our Virtual' },
  { label: 'Live Casino',        section: 'Live Casino' },
  { label: 'Slot Game',          section: 'Slot Game' },
  { label: 'Fantasy Game',       section: 'Fantasy Game' },
];

export interface SidebarProps {
  activeSection: CasinoSection | null;
  onSectionChange: (section: CasinoSection | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [racingOpen,    setRacingOpen]    = useState(true);
  const [othersOpen,    setOthersOpen]    = useState(true);
  const [allSportsOpen, setAllSportsOpen] = useState(true);
  const [activeModal,   setActiveModal]   = useState<null | 'horse' | 'greyhound'>(null);
  const [expandedSports, setExpandedSports] = useState<Set<string>>(new Set());
  const [expandedSub,    setExpandedSub]    = useState<string | null>(null);

  const toggleSport = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();  // ← BUG FIX: event bubble rok do
    setExpandedSports(prev => {
      const next = new Set(prev);
      if (next.has(name)) { next.delete(name); setExpandedSub(null); }
      else next.add(name);
      return next;
    });
  };

  const toggleSub = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();  // ← BUG FIX
    setExpandedSub(p => p === key ? null : key);
  };

  const handleCasino = (e: React.MouseEvent, section: CasinoSection) => {
    e.stopPropagation();  // ← BUG FIX
    setActiveModal(null);
    onSectionChange(activeSection === section ? null : section);
  };

  const handleRacing = (e: React.MouseEvent, type: 'horse' | 'greyhound') => {
    e.stopPropagation();  // ← BUG FIX
    setActiveModal(p => p === type ? null : type);
  };

  const handleSectionToggle = (e: React.MouseEvent, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    e.stopPropagation();  // ← BUG FIX
    setter(o => !o);
  };

  return (
    <>
      <div className="ap-sidebar">

        {/* ── Racing Sports ── */}
        <div
          className="ap-sidebar__section-header"
          onClick={(e) => handleSectionToggle(e, setRacingOpen)}
        >
          <span>Racing Sports</span>
          <i className={`fas fa-chevron-${racingOpen ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
        </div>
        {racingOpen && (
          <div className="ap-sidebar__section-content">
            <div
              className={`ap-sidebar__item${activeModal === 'horse' ? ' active' : ''}`}
              onClick={(e) => handleRacing(e, 'horse')}
            >Horse Racing</div>
            <div
              className={`ap-sidebar__item${activeModal === 'greyhound' ? ' active' : ''}`}
              onClick={(e) => handleRacing(e, 'greyhound')}
            >Greyhound Racing</div>
          </div>
        )}

        {/* ── Others ── */}
        <div
          className="ap-sidebar__section-header"
          onClick={(e) => handleSectionToggle(e, setOthersOpen)}
        >
          <span>Others</span>
          <i className={`fas fa-chevron-${othersOpen ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
        </div>
        {othersOpen && (
          <div className="ap-sidebar__section-content">
            {CASINO_ITEMS.map(({ label, section, blink }) => (
              <div
                key={section}
                className={`ap-sidebar__item${blink ? ' ap-blink' : ''}${activeSection === section ? ' active' : ''}`}
                onClick={(e) => handleCasino(e, section)}
              >
                {label}
              </div>
            ))}
          </div>
        )}

        {/* ── All Sports ── */}
        <div
          className="ap-sidebar__section-header"
          onClick={(e) => handleSectionToggle(e, setAllSportsOpen)}
        >
          <span>All Sports</span>
          <i className={`fas fa-chevron-${allSportsOpen ? 'up' : 'down'}`} style={{ fontSize: 11 }} />
        </div>
        {allSportsOpen && (
          <div className="ap-sidebar__section-content">
            {allSportsData.map(sport => {
              const isExpanded = expandedSports.has(sport.name);
              const hasKids    = sport.subItems.length > 0;
              return (
                <React.Fragment key={sport.name}>
                  <div
                    className="ap-sidebar__sport-item"
                    onClick={(e) => toggleSport(e, sport.name)}
                  >
                    <i
                      className={`far ${isExpanded ? 'fa-minus-square' : 'fa-plus-square'}`}
                      style={{ color: '#222', fontSize: 17, flexShrink: 0, marginRight: 7 }}
                    />
                    {sport.name}
                  </div>

                  {hasKids && isExpanded && sport.subItems.map(sub => {
                    const key    = `${sport.name}__${sub.name}`;
                    const subExp = expandedSub === key;
                    return (
                      <React.Fragment key={key}>
                        <div
                          className="ap-sidebar__sub-item"
                          onClick={(e) => toggleSub(e, key)}
                        >
                          <i
                            className={`far ${subExp ? 'fa-minus-square' : 'fa-plus-square'}`}
                            style={{ color: '#222', fontSize: 17, flexShrink: 0, marginRight: 7 }}
                          />
                          {sub.name}
                        </div>
                        {subExp && sub.matches?.map((m, mi) => (
                          <div key={mi} className="ap-sidebar__match-item">{m}</div>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Horse Racing Popup ── */}
      {activeModal === 'horse' && (
        <>
          <div className="ap-sidebar__modal-overlay" onClick={() => setActiveModal(null)} />
          <div className="ap-sidebar__modal">
            <div className="ap-sidebar__modal-title">All Horse Racing</div>
            {horseRacingTabs.map((item, idx) => (
              <div key={idx} className="ap-sidebar__modal-item">{item}</div>
            ))}
          </div>
        </>
      )}

      {/* ── Greyhound Racing Popup ── */}
      {activeModal === 'greyhound' && (
        <>
          <div className="ap-sidebar__modal-overlay" onClick={() => setActiveModal(null)} />
          <div className="ap-sidebar__modal">
            <div className="ap-sidebar__modal-title">All Greyhound Racing</div>
            {greyhoundRacingTabs.map((item, idx) => (
              <div key={idx} className="ap-sidebar__modal-item">{item}</div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;