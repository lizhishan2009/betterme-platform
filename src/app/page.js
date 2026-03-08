export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '20px', minHeight: '100vh', background: '#F3F4F6' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '24px', color: '#1F2937' }}>
          欢迎来到 BetterMe 内容平台
        </h1>
        <p style={{ marginBottom: '16px', lineHeight: '1.8' }}>
          这是一个基于 Notion 构建的会员内容平台。
        </p>
        <div style={{ marginTop: '24px' }}>
          <p style={{ marginBottom: '16px' }}>请先登录后浏览平台内容。</p>
          <Link href="/auth/signin" style={{ 
            display: 'inline-block', 
            padding: '12px 24px', 
            background: '#4F46E5', 
            color: 'white', 
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            立即登录
          </Link>
        </div>
      </div>
    </div>
  );
}
