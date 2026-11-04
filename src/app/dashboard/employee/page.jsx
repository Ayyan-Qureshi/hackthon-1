'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  User, Users, Calendar, DollarSign, FileText, 
  Search, ChevronDown, Clock, LogOut 
} from 'lucide-react';

export default function EmployeeDashboard() {
  const [userName, setUserName] = useState('Tariq Mehmood');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setUserName(storedName);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/signup');
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #a7d0e4 0%, #7db4d2 40%, #8bbad6 100%)', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#1e384c',
      padding: '16px',
      boxSizing: 'border-box'
    }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '210px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        paddingRight: '16px'
      }}>
        <div>
          {/* Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', paddingLeft: '4px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.6)', padding: '6px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/logo.png" 
                alt="HC Logo" 
                width={70} 
                height={55} 
                style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '50px' }}
                priority 
              />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#163248', lineHeight: 1 }}>Qureshi</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#3a6280', lineHeight: 1, marginTop: '2px' }}>Enterprises</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <a href="#" style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', 
              borderRadius: '12px', background: 'rgba(255, 255, 255, 0.7)', 
              color: '#163248', textDecoration: 'none', fontSize: '13px', fontWeight: '700',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
            }}>
              <User size={16} /> My profile
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <Users size={16} /> Team
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <Calendar size={16} /> Leave
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <DollarSign size={16} /> Payroll
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <FileText size={16} /> Documents
            </a>
          </nav>
        </div>

        {/* Bottom Section: AI Copilot & Logout Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.45)', 
            backdropFilter: 'blur(8px)',
            padding: '12px 14px', 
            borderRadius: '12px', 
            border: '1px solid rgba(255,255,255,0.4)' 
          }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: '#163248', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              ✨ Ask AI Copilot
            </p>
            <p style={{ fontSize: '10px', color: '#385d7b', margin: 0, lineHeight: '1.3' }}>
              Ask policy rules, draft leaves, or analyze payroll anytime.
            </p>
          </div>

          <button 
            onClick={handleLogout}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px', 
              width: '100%', 
              padding: '10px', 
              background: 'rgba(229, 115, 115, 0.25)', 
              border: '1px solid rgba(229, 115, 115, 0.4)', 
              borderRadius: '10px', 
              color: '#9f1239', 
              fontWeight: '700', 
              fontSize: '12px', 
              cursor: 'pointer' 
            }}
          >
            <LogOut size={15} /> Logout & Sign Up
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            Good Afternoon, {userName}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* User Badge */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(10px)',
              padding: '4px 10px 4px 6px', borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.6)' 
            }}>
              <div style={{ 
                width: '26px', height: '26px', borderRadius: '50%', 
                background: '#4b7596', color: '#fff', fontSize: '11px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
              }}>
                TM
              </div>
              <div style={{ fontSize: '11px', textAlign: 'left' }}>
                <div style={{ fontWeight: '700', color: '#163248', lineHeight: 1.1 }}>Employee</div>
                <div style={{ fontSize: '9px', color: '#3c6483', lineHeight: 1.1 }}>Shift: 09:00 - 18:00</div>
              </div>
              <ChevronDown size={14} style={{ color: '#274b68', marginLeft: '4px' }} />
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#4b7290' }} />
              <input 
                type="text" 
                placeholder="Search Search" 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.45)', 
                  border: '1px solid rgba(255,255,255,0.5)', 
                  borderRadius: '16px', 
                  padding: '6px 12px 6px 30px', 
                  fontSize: '12px', 
                  outline: 'none',
                  color: '#163248',
                  width: '130px'
                }} 
              />
            </div>
          </div>
        </header>

        {/* Dashboard 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1fr', gap: '14px', alignItems: 'start' }}>
          
          {/* COLUMN 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Punch Status */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '54px', height: '54px', borderRadius: '50%', 
                  border: '5px solid #a3d9ca', borderTopColor: '#2b7864', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(255,255,255,0.3)'
                }}>
                  <Clock size={18} style={{ color: '#163248' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#163248' }}>Today's Punch Status</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#385d7b' }}>Shift starts at 09:00</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#577b97' }}>Personal progress</p>
                </div>
              </div>
            </div>

            {/* Leave Overview */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Leave Overview</h4>
                <span style={{ fontSize: '14px', cursor: 'pointer', color: '#274b68' }}>^</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#163248' }}>
                    <span>Annual Balance</span>
                    <span>14 Days</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: '#4db6ac', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#163248' }}>
                    <span>Sick</span>
                    <span>8 Days</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '35%', height: '100%', background: '#e57373', borderRadius: '3px' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', marginBottom: '4px', color: '#163248' }}>
                    <span>Personal</span>
                    <span>2 Days</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.5)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '15%', height: '100%', background: '#ffb74d', borderRadius: '3px' }}></div>
                  </div>
                </div>
              </div>

              <button style={{ 
                width: '100%', marginTop: '16px', padding: '9px', 
                background: '#1d3e56', color: '#ffffff', border: 'none', 
                borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' 
              }}>
                Apply for Leave
              </button>
            </div>

            {/* AI Insights */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>AI Insights</h4>
                <span style={{ fontSize: '12px', color: '#385d7b' }}>•••</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '10px', padding: '10px', marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248', marginBottom: '2px' }}>Smart HR Policy FAQs</div>
                <div style={{ fontSize: '10px', color: '#385d7b', lineHeight: '1.3' }}>Learn HR Policy FAQs and guidelines for leave applications, tend improvement applications.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '10px', padding: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248', marginBottom: '2px' }}>AI-Generated Drafts</div>
                <div style={{ fontSize: '10px', color: '#385d7b', lineHeight: '1.3' }}>Learn more about AI to generate draft leave applications for employee.</div>
              </div>
            </div>

          </div>

          {/* COLUMN 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Clock Controls Card */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#163248' }}>Personal Progress</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: '#1d3e56', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                  Clock In/Out
                </button>
                <button style={{ background: 'rgba(255,255,255,0.5)', color: '#163248', border: '1px solid rgba(255,255,255,0.6)', padding: '7px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                  Clock In
                </button>
              </div>
            </div>

            {/* Task/Workflow Queue */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Task/Workflow Queue</h4>
                <span style={{ fontSize: '12px', color: '#385d7b' }}>•••</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { title: 'Approve Expenses', time: 'Now insert 09:00 at 8:30 PM', active: true },
                  { title: 'Complete Training', time: 'Now insert 09:00 at 8:30 PM', active: false },
                  { title: 'Complete Engineering', time: 'Start insert 09:00 at 9:30 PM', active: false },
                  { title: 'Approve Expenses', time: 'Now insert 09:00 at 11:00m at 30 PM', active: false },
                  { title: 'Complete Training', time: 'Start insert 09:00 at 2:30 PM', active: false },
                  { title: 'Complete Training', time: 'Stow insert 09:00 at 3:30 PM', active: false },
                ].map((task, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '8px 10px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: task.active ? '#34d399' : '#cbd5e1' }}></span>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>{task.title}</div>
                        <div style={{ fontSize: '9px', color: '#4b7290' }}>{task.time}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ background: '#d1fae5', color: '#065f46', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                      <button style={{ background: '#ffe4e6', color: '#9f1239', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Upcoming Events */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Upcoming Events</h4>
                <span style={{ fontSize: '12px', color: '#385d7b' }}>•••</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.35)', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>📢 Quarterly Townhall</div>
                  <div style={{ fontSize: '10px', color: '#385d7b', margin: '2px 0 6px 0' }}>All staff members are invited opcromrity.</div>
                  <button style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', color: '#163248', cursor: 'pointer' }}>
                    Save to Calendar
                  </button>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.35)', padding: '10px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>🎂 Birthday's Birthday</div>
                  <div style={{ fontSize: '10px', color: '#385d7b', margin: '2px 0 6px 0' }}>Townhall s</div>
                  <button style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', color: '#163248', cursor: 'pointer' }}>
                    Save to Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Team Availability */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Team Availability</h4>
                <button style={{ background: 'rgba(255,255,255,0.6)', border: 'none', padding: '3px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: '600', color: '#163248', cursor: 'pointer' }}>
                  Send direct message
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Tariq Mehmood', status: '#34d399' },
                  { name: 'Horix Mainmon', status: '#34d399' },
                  { name: 'Allli Team', status: '#facc15' },
                  { name: 'Tariq Mehmood', status: '#34d399' },
                  { name: 'Jash Sanith', status: '#34d399' },
                  { name: 'Sann Funta', status: '#facc15' },
                  { name: 'Rosh Veaker', status: '#f87171' },
                ].map((user, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: '#163248', fontWeight: '500' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#4b7596', color: '#fff', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {user.name.charAt(0)}
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: user.status }}></span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}