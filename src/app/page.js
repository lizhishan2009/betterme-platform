'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>加载中...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">BetterMe</Link>
          <nav className="nav">
            <div className="user-info">
              <span className="user-name">{session.user.name}</span>
              {session.user.role === 'admin' && (
                <span className="role-badge">管理员</span>
              )}
            </div>
            {session.user.role === 'admin' && (
              <Link href="/admin" className="btn btn-outline btn-sm">
                管理后台
              </Link>
            )}
            <Link href="/api/auth/signout" className="btn btn-outline btn-sm">
              退出
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="content-container">
        <div className="content-block">
          <h1>欢迎来到 BetterMe 内容平台</h1>
          <p>这是一个基于 Notion 构建的会员内容平台。</p>
          
          {session.user.role === 'admin' ? (
            <div style={{ marginTop: '24px' }}>
              <p>作为管理员，您可以：</p>
              <ul style={{ marginTop: '12px' }}>
                <li>📊 管理客户账号</li>
                <li>👥 添加/删除用户</li>
                <li>📝 查看内容统计</li>
              </ul>
              <Link href="/admin" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                进入管理后台
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: '24px' }}>
              <p>欢迎回来！您可以浏览平台内容。</p>
              <Link href="/content" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                浏览内容
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
