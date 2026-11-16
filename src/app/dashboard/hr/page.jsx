'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { 
  LayoutDashboard, UserCheck, Calendar, FileCheck, 
  ChevronDown, UserPlus, LogOut, CheckCircle, XCircle 
} from 'lucide-react';

export default function HRDashboard() {
  const [hrName, setHrName] = useState('HR Manager');
  const [activeTab, setActiveTab] = useState('overview');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [toast, setToast] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setHrName(storedName);
    fetchLeaveRequests();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchLeaveRequests = async () => {
    try {
      const snap = await getDocs(collection(db, 'leaveRequests'));
      setLeaveRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateLeaveStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'leaveRequests', id), { status: newStatus });
      showToast(`Leave request ${newStatus} successfully!`);
      fetchLeaveRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  const glassCard = {
    background: 'rgba(255, 255, 255, 0.45)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '18px',
    border: '1px solid rgba(255, 255, 255, 0.55)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)'
  };

  const primaryBtn = {
    padding: '7px 12px',
    background: '#1d3e56',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '11px',
    fontWeight: '700',
    cursor: 'pointer'
  };

  const navItemStyle = (tabKey) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    borderRadius: '12px',
    background: activeTab === tabKey ? 'rgba(255, 255, 255, 0.75)' : 'transparent',
    color: activeTab === tabKey ? '#163248' : '#274b68',
    border: 'none',
    fontSize: '13px',
    fontWeight: activeTab === tabKey ? '700' : '600',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  });

  return (
    <div style={{ 
      display: 'flex', minHeight: '100vh', 
      background: 'linear-gradient(135deg, #a7d0e4 0%, #7db4d2 40%, #8bbad6 100%)', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#1e384c', padding: '16px', boxSizing: 'border-box'
    }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingRight: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', paddingLeft: '4px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.65)', padding: '6px', borderRadius: '12px' }}>
              <Image src="/logo.png-removebg-preview.png" alt="Logo" width={65} height={50} style={{ objectFit: 'contain', maxHeight: '45px' }} priority />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#163248' }}>Qureshi</div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#3a6280' }}>Enterprises</div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button onClick={() => setActiveTab('overview')} style={navItemStyle('overview')}><LayoutDashboard size={16} /> Overview</button>
            <button onClick={() => setActiveTab('attendance')} style={navItemStyle('attendance')}><UserCheck size={16} /> Attendance Track</button>
            <button onClick={() => setActiveTab('leaves')} style={navItemStyle('leaves')}><Calendar size={16} /> Leave Approvals</button>
            <button onClick={() => setActiveTab('onboarding')} style={navItemStyle('onboarding')}><UserPlus size={16} /> Onboarding</button>
            <button onClick={() => setActiveTab('policies')} style={navItemStyle('policies')}><FileCheck size={16} /> Policy Records</button>

            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(229, 115, 115, 0.25)', border: '1px solid rgba(229, 115, 115, 0.4)', color: '#9f1239', fontSize: '13px', fontWeight: '700', cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '12px' }}>
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(8px)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#163248', margin: '0 0 4px 0' }}>✨ HR Operations</p>
          <p style={{ fontSize: '10px', color: '#385d7b', margin: 0 }}>Review leave applications & attendance logs.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '25px', fontWeight: '700', color: '#ffffff', margin: 0 }}>HR Portal, {hrName}</h1>
            <p style={{ fontSize: '12px', color: '#e0f2fe', margin: '2px 0 0 0', fontWeight: '500' }}>People Operations, Attendance Boards & Leave Approvals</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {toast && <div style={{ background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{toast}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.55)', padding: '4px 10px 4px 6px', borderRadius: '20px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1d3e56', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>HR</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>{hrName}</div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Present Today</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>38</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Pending Leaves</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>{leaveRequests.filter(l => l.status === 'Pending Review').length}</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Late Comers</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>4</div>
              </div>
            </div>

            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Recent Leave Applications Requiring Approval</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaveRequests.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No pending leave requests.</p>}
                {leaveRequests.map(leave => (
                  <div key={leave.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '10px', fontSize: '12px' }}>
                    <div>
                      <strong>{leave.employeeName}</strong> ({leave.email}) — <em>{leave.reason}</em> ({leave.days} Days)
                      <div style={{ fontSize: '11px', color: '#385d7b' }}>Status: <strong>{leave.status}</strong></div>
                    </div>
                    {leave.status === 'Pending Review' && (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Approved')} style={{ ...primaryBtn, background: '#047857' }}>Approve</button>
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Rejected')} style={{ ...primaryBtn, background: '#b91c1c' }}>Reject</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'attendance' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Employee Daily Attendance Board</h3>
            <p style={{ fontSize: '12px', color: '#385d7b' }}>Real-time check-in and check-out logs for all active staff members are tracked here.</p>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>All Leave Approvals & Management</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {leaveRequests.map(leave => (
                <div key={leave.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '10px', fontSize: '12px' }}>
                  <div>
                    <strong>{leave.employeeName}</strong>: {leave.reason} ({leave.days} Days)
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontWeight: '700', color: leave.status === 'Approved' ? '#047857' : leave.status === 'Rejected' ? '#b91c1c' : '#b45309' }}>{leave.status}</span>
                    {leave.status === 'Pending Review' && (
                      <>
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Approved')} style={{ ...primaryBtn, background: '#047857' }}>Approve</button>
                        <button onClick={() => handleUpdateLeaveStatus(leave.id, 'Rejected')} style={{ ...primaryBtn, background: '#b91c1c' }}>Reject</button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Employee Onboarding Pipeline</h3>
            <p style={{ fontSize: '12px', color: '#385d7b' }}>Manage new hire documents, contract agreements, and orientation checklists.</p>
          </div>
        )}

        {activeTab === 'policies' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Company Policy Records</h3>
            <p style={{ fontSize: '12px', color: '#385d7b' }}>Access company rulebooks, attendance guidelines, and code of conduct documentation.</p>
          </div>
        )}
      </main>
    </div>
  );
}