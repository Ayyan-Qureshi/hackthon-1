'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { 
  LayoutDashboard, Clock, Calendar, FileText, User, 
  ChevronDown, CheckCircle, LogOut, Briefcase, Award, AlertCircle 
} from 'lucide-react';

export default function EmployeeDashboard() {
  const [employeeName, setEmployeeName] = useState('Employee');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [attendanceStatus, setAttendanceStatus] = useState('Not Checked In');
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDays, setLeaveDays] = useState('');
  const [myLeaves, setMyLeaves] = useState([]);
  const [toast, setToast] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail') || 'employee@smit.com';
    if (storedName) setEmployeeName(storedName);
    setEmployeeEmail(storedEmail);
    fetchMyLeaves(storedEmail);
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchMyLeaves = async (email) => {
    try {
      const snap = await getDocs(collection(db, 'leaveRequests'));
      const leaves = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMyLeaves(leaves);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckInOut = () => {
    if (attendanceStatus === 'Not Checked In') {
      setAttendanceStatus('Checked In (09:00 AM)');
      showToast('Attendance recorded: Checked In successfully!');
    } else {
      setAttendanceStatus('Checked Out (06:00 PM)');
      showToast('Attendance recorded: Checked Out successfully!');
    }
  };

  const handleApplyLeave = async (e) => {
    e.preventDefault();
    if (!leaveReason || !leaveDays) return;
    try {
      await addDoc(collection(db, 'leaveRequests'), {
        employeeName,
        email: employeeEmail,
        reason: leaveReason,
        days: Number(leaveDays),
        status: 'Pending Review'
      });
      setLeaveReason('');
      setLeaveDays('');
      showToast('Leave application submitted to HR!');
      fetchMyLeaves(employeeEmail);
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

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.7)',
    background: 'rgba(255, 255, 255, 0.65)',
    fontSize: '12px',
    color: '#163248',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const primaryBtn = {
    padding: '9px 16px',
    background: '#1d3e56',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
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
    textAlign: 'left',
    transition: 'all 0.2s ease'
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
            <button onClick={() => setActiveTab('attendance')} style={navItemStyle('attendance')}><Clock size={16} /> Attendance</button>
            <button onClick={() => setActiveTab('leaves')} style={navItemStyle('leaves')}><Calendar size={16} /> Leaves</button>
            <button onClick={() => setActiveTab('payslips')} style={navItemStyle('payslips')}><FileText size={16} /> Payslips</button>
            <button onClick={() => setActiveTab('profile')} style={navItemStyle('profile')}><User size={16} /> Profile</button>

            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '12px', background: 'rgba(229, 115, 115, 0.25)', border: '1px solid rgba(229, 115, 115, 0.4)', color: '#9f1239', fontSize: '13px', fontWeight: '700', cursor: 'pointer', width: '100%', textAlign: 'left', marginTop: '12px' }}>
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.45)', backdropFilter: 'blur(8px)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.4)' }}>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#163248', margin: '0 0 4px 0' }}>✨ Employee Assistant</p>
          <p style={{ fontSize: '10px', color: '#385d7b', margin: 0 }}>Check in daily & apply for leaves instantly.</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '25px', fontWeight: '700', color: '#ffffff', margin: 0 }}>Employee Portal, {employeeName}</h1>
            <p style={{ fontSize: '12px', color: '#e0f2fe', margin: '2px 0 0 0', fontWeight: '500' }}>Manage attendance, leave requests, and salary payslips.</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {toast && <div style={{ background: '#10b981', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{toast}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.55)', padding: '4px 10px 4px 6px', borderRadius: '20px' }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1d3e56', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{employeeName.charAt(0)}</div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#163248' }}>{employeeName}</div>
            </div>
          </div>
        </header>

        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Today's Status</div>
                <div style={{ fontSize: '20px', fontWeight: '800', color: '#163248' }}>{attendanceStatus}</div>
                <button onClick={handleCheckInOut} style={{ ...primaryBtn, marginTop: '10px', width: '100%', justifyContent: 'center' }}>
                  {attendanceStatus === 'Not Checked In' ? 'Check In Now' : 'Check Out'}
                </button>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Remaining Leave Quota</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>10 Days</div>
                <div style={{ fontSize: '10px', color: '#2b7864', marginTop: '4px' }}>Annual Quota Active</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '6px' }}>Performance Rating</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>4.8 / 5.0</div>
                <div style={{ fontSize: '10px', color: '#2b7864', marginTop: '4px' }}>Top Performer Tier</div>
              </div>
            </div>

            <div style={glassCard}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Quick Apply Leave</h3>
              <form onSubmit={handleApplyLeave} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '10px' }}>
                <input type="text" placeholder="Reason for leave (e.g. Sick Leave)" value={leaveReason} onChange={e => setLeaveReason(e.target.value)} style={inputStyle} required />
                <input type="number" placeholder="Days" value={leaveDays} onChange={e => setLeaveDays(e.target.value)} style={inputStyle} required />
                <button type="submit" style={primaryBtn}>Submit Leave</button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'attendance' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Attendance Log & Check-In</h3>
            <p style={{ fontSize: '12px', color: '#385d7b', marginBottom: '14px' }}>Current Status: <strong>{attendanceStatus}</strong></p>
            <button onClick={handleCheckInOut} style={primaryBtn}>
              {attendanceStatus === 'Not Checked In' ? 'Click to Check In for Today' : 'Click to Check Out'}
            </button>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>My Leave Applications History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {myLeaves.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No leave applications submitted yet.</p>}
              {myLeaves.map(leave => (
                <div key={leave.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '10px', fontSize: '12px' }}>
                  <div>
                    <strong>{leave.reason}</strong> ({leave.days} Days)
                  </div>
                  <span style={{ fontWeight: '700', color: leave.status === 'Approved' ? '#047857' : '#b45309' }}>{leave.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payslips' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>Monthly Salary Payslips</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '12px', borderRadius: '10px', fontSize: '12px' }}>
              <div>
                <strong>October 2026 Payslip</strong>
                <div style={{ fontSize: '11px', color: '#385d7b' }}>Net Salary: $3,500.00 (Paid)</div>
              </div>
              <button style={primaryBtn} onClick={() => alert('Downloading PDF Payslip...')}>Download PDF</button>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>My Profile Details</h3>
            <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><strong>Name:</strong> {employeeName}</div>
              <div><strong>Email:</strong> {employeeEmail}</div>
              <div><strong>Designation:</strong> Software Engineering Associate</div>
              <div><strong>Role:</strong> Employee Portal Access</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}