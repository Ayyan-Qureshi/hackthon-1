'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('employee@smit.com');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('Employee');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const router = useRouter();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'Employee') {
      setEmail('employee@smit.com');
    } else if (selectedRole === 'HR') {
      setEmail('hr@smit.com');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name || 'User');
        setSuccessMsg(`Success! Directing to ${role} Dashboard...`);
        
        setTimeout(() => {
          if (role === 'HR') {
            router.push('/dashboard/hr');
          } else {
            router.push('/dashboard/employee');
          }
        }, 800);
      } else {
        setErrorMsg(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Ensure dev server is running.');
    }
  };

  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: '#24527d', 
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px 0'
    }}>
      <form onSubmit={handleSignupSubmit} style={{ 
        background: 'rgba(52, 94, 138, 0.75)', 
        backdropFilter: 'blur(10px)',
        padding: '35px 35px', 
        borderRadius: '20px', 
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)', 
        width: '440px', 
        maxWidth: '90%', 
        color: 'white',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <Image 
            src="/logo.png-removebg-preview.png" 
            alt="HCM Lite Logo" 
            width={210} 
            height={100} 
            style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '100px' }}
            priority 
          />
        </div>

        <p style={{ color: '#B0CBDC', fontSize: '13px', marginBottom: '20px', marginTop: '2px', lineHeight: '1.4' }}>
          Enter any details to access the Employee or HR Dashboard.
        </p>

        {errorMsg && (
          <div style={{ 
            background: 'rgba(253, 222, 222, 0.9)', 
            color: '#A81D1D', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '18px', 
            fontSize: '13px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            textAlign: 'left'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ 
            background: 'rgba(222, 253, 235, 0.9)', 
            color: '#1D6B39', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '18px', 
            fontSize: '13px', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            textAlign: 'left'
          }}>
            <CheckCircle size={18} style={{ flexShrink: 0 }} />
            {successMsg}
          </div>
        )}

        {/* Legal Name */}
        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
            Full Legal Name *
          </label>
          <div style={{ position: 'relative' }}>
            <User size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: '#9AB8CC' }} />
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="e.g. Ayyan Qureshi"
              required
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 42px', 
                background: 'rgba(30, 60, 92, 0.6)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '10px', 
                color: 'white', 
                fontSize: '14px', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Account Role */}
        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
            Account Role *
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={() => handleRoleSelect('Employee')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: role === 'Employee' ? '1px solid #85E3D2' : '1px solid rgba(255,255,255,0.15)',
                background: role === 'Employee' ? 'rgba(133, 227, 210, 0.25)' : 'rgba(30, 60, 92, 0.6)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Employee
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect('HR')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: role === 'HR' ? '1px solid #85E3D2' : '1px solid rgba(255,255,255,0.15)',
                background: role === 'HR' ? 'rgba(133, 227, 210, 0.25)' : 'rgba(30, 60, 92, 0.6)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              HR Specialist
            </button>
          </div>
        </div>

        {/* Email Address - Accepts ANY email input */}
        <div style={{ marginBottom: '14px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
            Work Email Address *
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: '#9AB8CC' }} />
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter any email address"
              required
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 42px', 
                background: 'rgba(30, 60, 92, 0.6)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '10px', 
                color: 'white', 
                fontSize: '14px', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Password */}
        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
            Password *
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: '#9AB8CC' }} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter any password"
              required
              style={{ 
                width: '100%', 
                padding: '12px 12px 12px 42px', 
                background: 'rgba(30, 60, 92, 0.6)', 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: '10px', 
                color: 'white', 
                fontSize: '14px', 
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Button */}
        <button type="submit" style={{ 
          width: '100%', 
          padding: '13px', 
          background: '#6BB3E3', 
          color: '#12304D', 
          border: 'none', 
          borderRadius: '10px', 
          fontSize: '15px', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '10px',
          marginBottom: '18px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
        }}>
          Open Dashboard
          <ArrowRight size={18} />
        </button>

        <p style={{ fontSize: '13px', color: '#B0CBDC', margin: 0 }}>
          Already have an account?{' '}
          <a href="/" style={{ color: '#85E3D2', textDecoration: 'none', fontWeight: '500' }}>
            Admin Login
          </a>
        </p>
      </form>
    </main>
  );
}