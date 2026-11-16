'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed.');
        setLoading(false);
        return;
      }

      localStorage.setItem('userName', data.name);
      localStorage.setItem('userRole', data.role);

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
        {/* Header Logo & Title - Logo size increased */}
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
            Sign in to access the Administrator Portal.
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
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Admin Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@smit.com"
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#cbd5e1' }}>
                Password *
              </label>
              <span style={{ fontSize: '11px', color: '#38bdf8', cursor: 'pointer' }}>
                Forgot Password?
              </span>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
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
            {loading ? 'Signing in...' : 'Sign In To Admin Dashboard →'}
          </button>
        </form>

        {/* Footer Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/signup')}
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
              Sign up as Employee or HR
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}