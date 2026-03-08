'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Submitting login...', email);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Login result:', result);

      if (result?.error) {
        setError('邮箱或密码错误');
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '16px', 
        padding: '40px', 
        width: '100%', 
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginBottom: '8px' }}>
          BetterMe
        </h1>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '32px' }}>
          登录您的账号
        </p>

        {error && (
          <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', background: '#FEE2E2', color: '#991B1B' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>邮箱</label>
            <input
              type="email"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>密码</label>
            <input
              type="password"
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: '#4F46E5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
            disabled={loading}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#6B7280', fontSize: '14px' }}>
          BetterMe 内容平台
        </div>
      </div>
    </div>
  );
}
