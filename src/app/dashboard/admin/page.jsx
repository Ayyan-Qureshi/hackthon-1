'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  LayoutDashboard, Users, ShieldCheck, DollarSign, FileText, 
  Search, ChevronDown, Activity, Settings, LogOut, TrendingUp, AlertCircle 
} from 'lucide-react';

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState('Administrator');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setAdminName(storedName);
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
              <LayoutDashboard size={16} /> Overview
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <Users size={16} /> Manage Users
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <ShieldCheck size={16} /> RBAC Rules
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <DollarSign size={16} /> Payroll Audits
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', color: '#274b68', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
              <Settings size={16} /> Configurations
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
              ✨ Admin AI Copilot
            </p>
            <p style={{ fontSize: '10px', color: '#385d7b', margin: 0, lineHeight: '1.3' }}>
              Monitor headcount, analyze audits, or configure roles instantly.
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
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Admin Dashboard, {adminName}
            </h1>
            <p style={{ fontSize: '12px', color: '#e0f2fe', margin: '2px 0 0 0', fontWeight: '500' }}>
              Manage company rules, configurations, and review organization-wide audits.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Admin Badge */}
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(10px)',
              padding: '4px 10px 4px 6px', borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.6)' 
            }}>
              <div style={{ 
                width: '26px', height: '26px', borderRadius: '50%', 
                background: '#1d3e56', color: '#fff', fontSize: '11px', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' 
              }}>
                AD
              </div>
              <div style={{ fontSize: '11px', textAlign: 'left' }}>
                <div style={{ fontWeight: '700', color: '#163248', lineHeight: 1.1 }}>Administrator</div>
                <div style={{ fontSize: '9px', color: '#3c6483', lineHeight: 1.1 }}>Company Level</div>
              </div>
              <ChevronDown size={14} style={{ color: '#274b68', marginLeft: '4px' }} />
            </div>

            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '9px', color: '#4b7290' }} />
              <input 
                type="text" 
                placeholder="Search Audits..." 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.45)', 
                  border: '1px solid rgba(255,255,255,0.5)', 
                  borderRadius: '16px', 
                  padding: '6px 12px 6px 30px', 
                  fontSize: '12px', 
                  outline: 'none',
                  color: '#163248',
                  width: '140px'
                }} 
              />
            </div>
          </div>
        </header>

        {/* Top Metric Cards Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          
          <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Total Headcount</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>42</div>
            <div style={{ fontSize: '10px', color: '#2b7864', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} /> +4 this month
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Monthly Payroll Cost</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>$45,200</div>
            <div style={{ fontSize: '10px', color: '#2b7864', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={12} /> Within allocated budget
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>YTD Attrition</div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>4.2%</div>
            <div style={{ fontSize: '10px', color: '#9f1239', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} /> Stable retention rate
            </div>
          </div>

        </div>

        {/* Dashboard 3-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1fr', gap: '14px', alignItems: 'start' }}>
          
          {/* COLUMN 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* System Health */}
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
                  <Activity size={18} style={{ color: '#163248' }} />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 2px 0', fontSize: '13px', fontWeight: '700', color: '#163248' }}>System Status</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#2b7864', fontWeight: '600' }}>All services operational</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '10px', color: '#577b97' }}>Firebase Test Mode active</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Quick Configurations</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button style={{ width: '100%', padding: '9px', background: '#1d3e56', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', paddingLeft: '12px' }}>
                  + Add New Employee Record
                </button>
                <button style={{ width: '100%', padding: '9px', background: 'rgba(255,255,255,0.6)', color: '#163248', border: '1px solid rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', paddingLeft: '12px' }}>
                  ⚙️ Update Company Policies
                </button>
                <button style={{ width: '100%', padding: '9px', background: 'rgba(255,255,255,0.6)', color: '#163248', border: '1px solid rgba(255,255,255,0.7)', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', paddingLeft: '12px' }}>
                  📊 Export Monthly Audit Report
                </button>
              </div>
            </div>

          </div>

          {/* COLUMN 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Pending Approvals Queue */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Pending Role Approvals</h4>
                <span style={{ fontSize: '12px', color: '#385d7b' }}>•••</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { name: 'Ali Khan', role: 'HR Manager', time: 'Requested 10m ago' },
                  { name: 'Sara Ahmed', role: 'Employee', time: 'Requested 1h ago' },
                  { name: 'Bilal Raza', role: 'Department Lead', time: 'Requested 3h ago' },
                ].map((req, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                    padding: '8px 10px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px' 
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#4b7596', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        {req.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>{req.name} ({req.role})</div>
                        <div style={{ fontSize: '9px', color: '#4b7290' }}>{req.time}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button style={{ background: '#d1fae5', color: '#065f46', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>Approve</button>
                      <button style={{ background: '#ffe4e6', color: '#9f1239', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Recent Activity Log */}
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(12px)', 
              borderRadius: '16px', padding: '16px', border: '1px solid rgba(255,255,255,0.5)' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#163248' }}>Audit Trail</h4>
                <span style={{ fontSize: '12px', color: '#385d7b' }}>•••</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', color: '#163248' }}>
                <div style={{ background: 'rgba(255,255,255,0.35)', padding: '8px 10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700' }}>🔐 Admin Login Success</div>
                  <div style={{ fontSize: '9px', color: '#385d7b' }}>Just now from localhost</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.35)', padding: '8px 10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700' }}>👥 Role Updated</div>
                  <div style={{ fontSize: '9px', color: '#385d7b' }}>Tariq Mehmood set to Employee</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.35)', padding: '8px 10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '700' }}>📄 Payroll Policy Saved</div>
                  <div style={{ fontSize: '9px', color: '#385d7b' }}>2 hours ago by Administrator</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}