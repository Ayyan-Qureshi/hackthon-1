'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('employee@smit.com');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('Employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'HR') {
      setEmail('hr@smit.com');
    } else {
      setEmail('employee@smit.com');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Signup failed.');
        setLoading(false);
        return;
      }

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userEmail', email);

      if (data.role === 'Admin') {
        router.push('/dashboard/admin');
      } else if (data.role === 'HR') {
        router.push('/dashboard/hr');
      } else {
        router.push('/dashboard/employee');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #a7d0e4 0%, #7db4d2 40%, #8bbad6 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: 'rgba(28, 43, 60, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '20px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        padding: '36px 32px',
        boxSizing: 'border-box',
        color: '#ffffff'
      }}>
        {/* Header Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-flex',
            padding: '8px 14px',
            borderRadius: '12px',
            marginBottom: '6px'
          }}>
            <Image 
              src="/logo.png-removebg-preview.png" 
              alt="HCM Lite Logo" 
              width={160} 
              height={95} 
              style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '85px' }}
              priority 
            />
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#cbd5e1', margin: '2px 0' }}>
            HCM Lite Portal
          </h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '8px 0 0 0' }}>
            Enter any details to access the Employee or HR Dashboard.
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(225, 29, 72, 0.2)',
            border: '1px solid rgba(225, 29, 72, 0.4)',
            color: '#fca5a5',
            padding: '10px 12px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ayyan Qureshi"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(15, 23, 42, 0.6)',
                fontSize: '13px',
                color: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Account Role Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Account Role *
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleRoleChange('Employee')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: role === 'Employee' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                  background: role === 'Employee' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  color: role === 'Employee' ? '#38bdf8' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                Employee
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('HR')}
                style={{
                  padding: '10px',
                  borderRadius: '10px',
                  border: role === 'HR' ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.15)',
                  background: role === 'HR' ? 'rgba(56, 189, 248, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  color: role === 'HR' ? '#38bdf8' : '#94a3b8',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                HR Specialist
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Work Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(15, 23, 42, 0.6)',
                fontSize: '13px',
                color: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Password *
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(15, 23, 42, 0.6)',
                fontSize: '13px',
                color: '#ffffff',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '6px',
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(90deg, #7dd3fc 0%, #38bdf8 100%)',
              color: '#0f172a',
              fontSize: '13px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)'
            }}
          >
            {loading ? 'Processing...' : 'Open Dashboard →'}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Already have an account?{' '}
            <button
              onClick={() => router.push('/')}
              style={{
                background: 'none',
                border: 'none',
                color: '#38bdf8',
                fontWeight: '600',
                cursor: 'pointer',
                padding: 0,
                fontSize: '12px'
              }}
            >
              Admin Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}