'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { 
  doc, getDoc, setDoc, collection, addDoc, getDocs, deleteDoc, updateDoc 
} from 'firebase/firestore';
import { 
  LayoutDashboard, Users, ShieldCheck, Calendar, Building2, 
  ChevronDown, Settings, LogOut, Plus, Trash2, CheckCircle, Clock, MapPin, Briefcase
} from 'lucide-react';

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState('Administrator');
  const [activeTab, setActiveTab] = useState('overview');
  const [saveMessage, setSaveMessage] = useState('');
  const router = useRouter();

  // 1. Company & Attendance Settings State
  const [companyConfig, setCompanyConfig] = useState({
    companyName: 'Qureshi Enterprises',
    industry: 'Information Technology',
    address: 'North Karachi, Pakistan',
    officeStartTime: '09:00',
    officeEndTime: '18:00',
    gracePeriodMins: '15',
    weekends: 'Saturday, Sunday',
    attendanceLocations: 'Karachi HQ, Islamabad Branch, Remote'
  });

  // 2. Departments & Designations State
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState('');
  const [designations, setDesignations] = useState([]);
  const [newDesig, setNewDesig] = useState('');

  // 3. Leave Types & Holidays State
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [newLeaveName, setNewLeaveName] = useState('');
  const [newLeaveQuota, setNewLeaveQuota] = useState('');
  const [holidays, setHolidays] = useState([]);
  const [newHolidayTitle, setNewHolidayTitle] = useState('');
  const [newHolidayDate, setNewHolidayDate] = useState('');

  // 4. Users & RBAC State
  const [usersList, setUsersList] = useState([]);
  const [rbacPermissions, setRbacPermissions] = useState({
    adminAccess: 'Full System Control, Payroll Audits, Org Setup, User Management',
    hrAccess: 'Employee Onboarding, Attendance Tracking, Leave Approvals, Policy Records',
    employeeAccess: 'Self Check-in/Out, Leave Applications, View Payslips, Profile View'
  });

  // Load Initial Data from Firestore
  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) setAdminName(storedName);
    fetchAllFoundationData();
  }, []);

  const showToast = (msg) => {
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const fetchAllFoundationData = async () => {
    try {
      // Fetch Company Config
      const configSnap = await getDoc(doc(db, 'settings', 'companyConfig'));
      if (configSnap.exists()) {
        setCompanyConfig(configSnap.data());
      }

      // Fetch RBAC Config
      const rbacSnap = await getDoc(doc(db, 'settings', 'rbacRules'));
      if (rbacSnap.exists()) {
        setRbacPermissions(rbacSnap.data());
      }

      // Fetch Departments
      const deptSnap = await getDocs(collection(db, 'departments'));
      setDepartments(deptSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch Designations
      const desigSnap = await getDocs(collection(db, 'designations'));
      setDesignations(desigSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch Leave Types
      const leaveSnap = await getDocs(collection(db, 'leaveTypes'));
      setLeaveTypes(leaveSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch Public Holidays
      const holSnap = await getDocs(collection(db, 'holidays'));
      setHolidays(holSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      // Fetch Users
      const usersSnap = await getDocs(collection(db, 'users'));
      setUsersList(usersSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching foundation data:', error);
    }
  };

  // Save Company & Attendance Rules
  const handleSaveCompanyConfig = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'settings', 'companyConfig'), companyConfig);
      showToast('Company details & attendance rules saved!');
    } catch (err) {
      console.error(err);
    }
  };

  // Add / Delete Department
  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (!newDept.trim()) return;
    const docRef = await addDoc(collection(db, 'departments'), { name: newDept });
    setDepartments([...departments, { id: docRef.id, name: newDept }]);
    setNewDept('');
    showToast('Department added!');
  };

  const handleDeleteDepartment = async (id) => {
    await deleteDoc(doc(db, 'departments', id));
    setDepartments(departments.filter(d => d.id !== id));
  };

  // Add / Delete Designation
  const handleAddDesignation = async (e) => {
    e.preventDefault();
    if (!newDesig.trim()) return;
    const docRef = await addDoc(collection(db, 'designations'), { title: newDesig });
    setDesignations([...designations, { id: docRef.id, title: newDesig }]);
    setNewDesig('');
    showToast('Designation added!');
  };

  const handleDeleteDesignation = async (id) => {
    await deleteDoc(doc(db, 'designations', id));
    setDesignations(designations.filter(d => d.id !== id));
  };

  // Add / Delete Leave Type
  const handleAddLeaveType = async (e) => {
    e.preventDefault();
    if (!newLeaveName.trim() || !newLeaveQuota) return;
    const payload = { name: newLeaveName, quota: Number(newLeaveQuota) };
    const docRef = await addDoc(collection(db, 'leaveTypes'), payload);
    setLeaveTypes([...leaveTypes, { id: docRef.id, ...payload }]);
    setNewLeaveName('');
    setNewLeaveQuota('');
    showToast('Leave type & yearly quota added!');
  };

  const handleDeleteLeaveType = async (id) => {
    await deleteDoc(doc(db, 'leaveTypes', id));
    setLeaveTypes(leaveTypes.filter(l => l.id !== id));
  };

  // Add / Delete Holiday
  const handleAddHoliday = async (e) => {
    e.preventDefault();
    if (!newHolidayTitle.trim() || !newHolidayDate) return;
    const payload = { title: newHolidayTitle, date: newHolidayDate };
    const docRef = await addDoc(collection(db, 'holidays'), payload);
    setHolidays([...holidays, { id: docRef.id, ...payload }]);
    setNewHolidayTitle('');
    setNewHolidayDate('');
    showToast('Public holiday added!');
  };

  const handleDeleteHoliday = async (id) => {
    await deleteDoc(doc(db, 'holidays', id));
    setHolidays(holidays.filter(h => h.id !== id));
  };

  // Update User Role & Save RBAC
  const handleUserRoleChange = async (userId, updatedRole) => {
    await updateDoc(doc(db, 'users', userId), { role: updatedRole });
    setUsersList(usersList.map(u => (u.id === userId ? { ...u, role: updatedRole } : u)));
    showToast('User role updated!');
  };

  const handleSaveRbac = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'settings', 'rbacRules'), rbacPermissions);
    showToast('RBAC access levels updated!');
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  // Shared Glass Styles
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
    boxShadow: activeTab === tabKey ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
    transition: 'all 0.2s ease'
  });

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
        width: '225px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        paddingRight: '16px'
      }}>
        <div>
          {/* Logo Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', paddingLeft: '4px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.65)', padding: '6px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image 
                src="/logo.png-removebg-preview.png" 
                alt="HC Logo" 
                width={65} 
                height={50} 
                style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '45px' }}
                priority 
              />
            </div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#163248', lineHeight: 1.1 }}>
                {companyConfig.companyName.split(' ')[0]}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#3a6280', lineHeight: 1.1, marginTop: '2px' }}>
                {companyConfig.companyName.split(' ').slice(1).join(' ') || 'Enterprises'}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button onClick={() => setActiveTab('overview')} style={navItemStyle('overview')}>
              <LayoutDashboard size={16} /> Overview
            </button>
            <button onClick={() => setActiveTab('company')} style={navItemStyle('company')}>
              <Settings size={16} /> Company & Rules
            </button>
            <button onClick={() => setActiveTab('org')} style={navItemStyle('org')}>
              <Building2 size={16} /> Org Structure
            </button>
            <button onClick={() => setActiveTab('leaves')} style={navItemStyle('leaves')}>
              <Calendar size={16} /> Leaves & Holidays
            </button>
            <button onClick={() => setActiveTab('users')} style={navItemStyle('users')}>
              <ShieldCheck size={16} /> Users & RBAC
            </button>

            {/* Logout inside Navbar */}
            <button 
              onClick={handleLogout}
              style={{ 
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', 
                borderRadius: '12px', background: 'rgba(229, 115, 115, 0.25)', 
                border: '1px solid rgba(229, 115, 115, 0.4)', color: '#9f1239', 
                fontSize: '13px', fontWeight: '700', cursor: 'pointer',
                width: '100%', textAlign: 'left', marginTop: '12px'
              }}
            >
              <LogOut size={16} /> Logout
            </button>
          </nav>
        </div>

        {/* Bottom AI Copilot Card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.45)', 
          backdropFilter: 'blur(8px)',
          padding: '12px 14px', 
          borderRadius: '12px', 
          border: '1px solid rgba(255,255,255,0.4)' 
        }}>
          <p style={{ fontSize: '11px', fontWeight: '800', color: '#163248', margin: '0 0 4px 0' }}>
            ✨ Admin Foundation Setup
          </p>
          <p style={{ fontSize: '10px', color: '#385d7b', margin: 0, lineHeight: '1.3' }}>
            Configure company timings, leave policies, departments & role permissions.
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <div>
            <h1 style={{ fontSize: '25px', fontWeight: '700', color: '#ffffff', margin: 0, textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              Admin Dashboard, {adminName}
            </h1>
            <p style={{ fontSize: '12px', color: '#e0f2fe', margin: '2px 0 0 0', fontWeight: '500' }}>
              Organization Foundation, System Configurations & Access Control
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {saveMessage && (
              <div style={{ 
                background: 'rgba(16, 185, 129, 0.85)', color: '#fff', padding: '6px 14px', 
                borderRadius: '20px', fontSize: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' 
              }}>
                <CheckCircle size={14} /> {saveMessage}
              </div>
            )}

            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              background: 'rgba(255, 255, 255, 0.55)', backdropFilter: 'blur(10px)',
              padding: '4px 10px 4px 6px', borderRadius: '20px', 
              border: '1px solid rgba(255,255,255,0.6)' 
            }}>
              <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#1d3e56', color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>AD</div>
              <div style={{ fontSize: '11px', textAlign: 'left' }}>
                <div style={{ fontWeight: '700', color: '#163248', lineHeight: 1.1 }}>Administrator</div>
                <div style={{ fontSize: '9px', color: '#3c6483', lineHeight: 1.1 }}>Company Level</div>
              </div>
              <ChevronDown size={14} style={{ color: '#274b68', marginLeft: '4px' }} />
            </div>
          </div>
        </header>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '4px' }}>Registered Users</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>{usersList.length || 42}</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '4px' }}>Departments</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>{departments.length}</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '4px' }}>Leave Policies</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>{leaveTypes.length}</div>
              </div>
              <div style={glassCard}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#385d7b', marginBottom: '4px' }}>Public Holidays</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#163248' }}>{holidays.length}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={glassCard}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                  Active Company & Attendance Rules
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div><strong>Company:</strong> {companyConfig.companyName} ({companyConfig.industry})</div>
                  <div><strong>Office Timings:</strong> {companyConfig.officeStartTime} to {companyConfig.officeEndTime}</div>
                  <div><strong>Grace Period:</strong> {companyConfig.gracePeriodMins} Minutes</div>
                  <div><strong>Weekends:</strong> {companyConfig.weekends}</div>
                  <div><strong>Locations:</strong> {companyConfig.attendanceLocations}</div>
                </div>
                <button onClick={() => setActiveTab('company')} style={{ ...primaryBtn, marginTop: '14px' }}>
                  Edit Company Rules
                </button>
              </div>

              <div style={glassCard}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                  Quick Foundation Setup
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button onClick={() => setActiveTab('org')} style={{ ...primaryBtn, justifyContent: 'space-between' }}>
                    <span>+ Add Departments & Designations</span> <span>→</span>
                  </button>
                  <button onClick={() => setActiveTab('leaves')} style={{ ...primaryBtn, justifyContent: 'space-between' }}>
                    <span>+ Configure Leave Quotas & Holidays</span> <span>→</span>
                  </button>
                  <button onClick={() => setActiveTab('users')} style={{ ...primaryBtn, justifyContent: 'space-between' }}>
                    <span>+ Manage User Roles & RBAC</span> <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= TAB 2: COMPANY & ATTENDANCE RULES ================= */}
        {activeTab === 'company' && (
          <div style={glassCard}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '15px', fontWeight: '800', color: '#163248' }}>
              Company Details, Office Timings & Attendance Policies
            </h3>
            <form onSubmit={handleSaveCompanyConfig} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Company Name</label>
                <input 
                  type="text" 
                  value={companyConfig.companyName} 
                  onChange={e => setCompanyConfig({...companyConfig, companyName: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Industry / Sector</label>
                <input 
                  type="text" 
                  value={companyConfig.industry} 
                  onChange={e => setCompanyConfig({...companyConfig, industry: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Headquarters Address</label>
                <input 
                  type="text" 
                  value={companyConfig.address} 
                  onChange={e => setCompanyConfig({...companyConfig, address: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                  <Clock size={12} style={{ verticalAlign: 'middle' }} /> Office Start Time
                </label>
                <input 
                  type="time" 
                  value={companyConfig.officeStartTime} 
                  onChange={e => setCompanyConfig({...companyConfig, officeStartTime: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                  <Clock size={12} style={{ verticalAlign: 'middle' }} /> Office End Time
                </label>
                <input 
                  type="time" 
                  value={companyConfig.officeEndTime} 
                  onChange={e => setCompanyConfig({...companyConfig, officeEndTime: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Late Grace Period (Minutes)</label>
                <input 
                  type="number" 
                  value={companyConfig.gracePeriodMins} 
                  onChange={e => setCompanyConfig({...companyConfig, gracePeriodMins: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>Official Weekends</label>
                <input 
                  type="text" 
                  value={companyConfig.weekends} 
                  onChange={e => setCompanyConfig({...companyConfig, weekends: e.target.value})} 
                  placeholder="e.g. Saturday, Sunday"
                  style={inputStyle} 
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '4px' }}>
                  <MapPin size={12} style={{ verticalAlign: 'middle' }} /> Allowed Attendance Locations / Branches
                </label>
                <input 
                  type="text" 
                  value={companyConfig.attendanceLocations} 
                  onChange={e => setCompanyConfig({...companyConfig, attendanceLocations: e.target.value})} 
                  style={inputStyle} 
                />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <button type="submit" style={primaryBtn}>Save Company & Attendance Settings</button>
              </div>
            </form>
          </div>
        )}

        {/* ================= TAB 3: DEPARTMENTS & DESIGNATIONS ================= */}
        {activeTab === 'org' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Departments Card */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                <Building2 size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Departments
              </h3>
              <form onSubmit={handleAddDepartment} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. Software Engineering" 
                  value={newDept} 
                  onChange={e => setNewDept(e.target.value)} 
                  style={inputStyle} 
                />
                <button type="submit" style={primaryBtn}><Plus size={14} /> Add</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {departments.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No departments added yet.</p>}
                {departments.map(dept => (
                  <div key={dept.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.45)', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                    <span>{dept.name}</span>
                    <button onClick={() => handleDeleteDepartment(dept.id)} style={{ background: 'none', border: 'none', color: '#be123c', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Designations Card */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                <Briefcase size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Designations / Job Titles
              </h3>
              <form onSubmit={handleAddDesignation} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. Full Stack Developer" 
                  value={newDesig} 
                  onChange={e => setNewDesig(e.target.value)} 
                  style={inputStyle} 
                />
                <button type="submit" style={primaryBtn}><Plus size={14} /> Add</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {designations.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No designations added yet.</p>}
                {designations.map(desig => (
                  <div key={desig.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.45)', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                    <span>{desig.title}</span>
                    <button onClick={() => handleDeleteDesignation(desig.id)} style={{ background: 'none', border: 'none', color: '#be123c', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 4: LEAVE TYPES, QUOTAS & PUBLIC HOLIDAYS ================= */}
        {activeTab === 'leaves' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            {/* Leave Types & Quotas */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                Leave Types & Yearly Quotas
              </h3>
              <form onSubmit={handleAddLeaveType} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  placeholder="Leave Type (e.g. Annual Leave)" 
                  value={newLeaveName} 
                  onChange={e => setNewLeaveName(e.target.value)} 
                  style={inputStyle} 
                />
                <input 
                  type="number" 
                  placeholder="Days/Yr" 
                  value={newLeaveQuota} 
                  onChange={e => setNewLeaveQuota(e.target.value)} 
                  style={{ ...inputStyle, width: '100px' }} 
                />
                <button type="submit" style={primaryBtn}><Plus size={14} /> Add</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {leaveTypes.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No leave types configured yet.</p>}
                {leaveTypes.map(leave => (
                  <div key={leave.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.45)', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                    <span>{leave.name} — <span style={{ color: '#0f766e' }}>{leave.quota} Days / Year</span></span>
                    <button onClick={() => handleDeleteLeaveType(leave.id)} style={{ background: 'none', border: 'none', color: '#be123c', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Holidays */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                Official Public Holidays
              </h3>
              <form onSubmit={handleAddHoliday} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                <input 
                  type="text" 
                  placeholder="Holiday Name (e.g. Independence Day)" 
                  value={newHolidayTitle} 
                  onChange={e => setNewHolidayTitle(e.target.value)} 
                  style={inputStyle} 
                />
                <input 
                  type="date" 
                  value={newHolidayDate} 
                  onChange={e => setNewHolidayDate(e.target.value)} 
                  style={{ ...inputStyle, width: '140px' }} 
                />
                <button type="submit" style={primaryBtn}><Plus size={14} /> Add</button>
              </form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {holidays.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No public holidays added yet.</p>}
                {holidays.map(hol => (
                  <div key={hol.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.45)', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', fontWeight: '700' }}>
                    <span>{hol.title} <span style={{ fontSize: '11px', color: '#385d7b' }}>({hol.date})</span></span>
                    <button onClick={() => handleDeleteHoliday(hol.id)} style={{ background: 'none', border: 'none', color: '#be123c', cursor: 'pointer' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 5: USER ACCOUNTS & RBAC ACCESS LEVELS ================= */}
        {activeTab === 'users' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '14px' }}>
            {/* Manage User Accounts & Roles */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                <Users size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> User Accounts & Role Assignment
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {usersList.length === 0 && <p style={{ fontSize: '12px', color: '#385d7b' }}>No registered users found in database yet.</p>}
                {usersList.map(user => (
                  <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '10px' }}>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#163248' }}>{user.name}</div>
                      <div style={{ fontSize: '11px', color: '#385d7b' }}>{user.email}</div>
                    </div>
                    <select 
                      value={user.role} 
                      onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                      style={{ ...inputStyle, width: '125px', fontWeight: '700', cursor: 'pointer' }}
                    >
                      <option value="Admin">Admin</option>
                      <option value="HR">HR</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* RBAC Access Levels Definition */}
            <div style={glassCard}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '800', color: '#163248' }}>
                <ShieldCheck size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> Role Access Levels (RBAC)
              </h3>
              <form onSubmit={handleSaveRbac} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>Admin Access Scope</label>
                  <textarea 
                    rows={2} 
                    value={rbacPermissions.adminAccess} 
                    onChange={e => setRbacPermissions({...rbacPermissions, adminAccess: e.target.value})} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>HR Access Scope</label>
                  <textarea 
                    rows={2} 
                    value={rbacPermissions.hrAccess} 
                    onChange={e => setRbacPermissions({...rbacPermissions, hrAccess: e.target.value})} 
                    style={inputStyle} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', marginBottom: '4px' }}>Employee Access Scope</label>
                  <textarea 
                    rows={2} 
                    value={rbacPermissions.employeeAccess} 
                    onChange={e => setRbacPermissions({...rbacPermissions, employeeAccess: e.target.value})} 
                    style={inputStyle} 
                  />
                </div>
                <button type="submit" style={primaryBtn}>Save RBAC Permissions</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}