'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.role === 'Admin') {
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('userName', data.name);
        router.push('/dashboard/admin');
      } else {
        setErrorMsg(data.message || 'Login failed.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Make sure your server is running.');
    }
  };

  return (
    <main style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: '#24527d', 
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <form onSubmit={handleLoginSubmit} style={{ 
        background: 'rgba(52, 94, 138, 0.75)', 
        backdropFilter: 'blur(10px)',
        padding: '35px 35px', 
        borderRadius: '20px', 
        boxShadow: '0 12px 40px rgba(0,0,0,0.25)', 
        width: '420px', 
        maxWidth: '90%', 
        color: 'white',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        
        {/* Large Transparent Logo Image Header */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Image 
            src="/logo.png-removebg-preview.png" 
            alt="HCM Lite Logo" 
            width={230} 
            height={110} 
            style={{ objectFit: 'contain', width: 'auto', height: 'auto', maxHeight: '110px' }}
            priority 
          />
        </div>

        {/* Subtitle description */}
        <p style={{ color: '#B0CBDC', fontSize: '13px', marginBottom: '24px', marginTop: '2px', lineHeight: '1.4' }}>
          Sign in to access the Administrator Portal.
        </p>

        {errorMsg && (
          <div style={{ 
            background: 'rgba(253, 222, 222, 0.9)', 
            color: '#A81D1D', 
            padding: '10px', 
            borderRadius: '8px', 
            marginBottom: '20px', 
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

        {/* Work Email Field */}
        <div style={{ marginBottom: '16px', textAlign: 'left' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
            Admin Email Address *
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: '#9AB8CC' }} />
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="admin@smit.com"
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

        {/* Password Field */}
        <div style={{ marginBottom: '22px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '13px', color: '#D0E1ED', fontWeight: '500' }}>
              Password *
            </label>
            <a href="#" style={{ fontSize: '12px', color: '#85E3D2', textDecoration: 'none' }}>Forgot Password?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={17} style={{ position: 'absolute', left: '14px', top: '13px', color: '#9AB8CC' }} />
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter admin password"
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

        {/* Sign In Button */}
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
          marginBottom: '20px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)'
        }}>
          Sign In to Admin Dashboard
          <ArrowRight size={18} />
        </button>

        {/* Footer Link */}
        <p style={{ fontSize: '13px', color: '#B0CBDC', margin: 0 }}>
          Don't have an account?{' '}
          <a href="/signup" style={{ color: '#85E3D2', textDecoration: 'none', fontWeight: '500' }}>
            Sign up as Employee or HR
          </a>
        </p>
      </form>
    </main>
  );
}