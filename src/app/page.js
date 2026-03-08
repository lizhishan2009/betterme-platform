'use client';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <form method="POST" action="/api/auth/signin" style={{ 
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
        
        <input type="hidden" name="csrfToken" value="test" />
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>邮箱</label>
          <input 
            type="email" 
            name="email" 
            placeholder="your@email.com" 
            required
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}
          />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px' }}>密码</label>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            required
            style={{ width: '100%', padding: '12px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}
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
        >
          登录
        </button>
        
        <div style={{ textAlign: 'center', marginTop: '24px', color: '#6B7280', fontSize: '14px' }}>
          BetterMe 内容平台
        </div>
      </form>
    </div>
  );
}
