import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getPageTitle, getPageContent, simplifyBlock } from '@/lib/notion';

export default async function ContentPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/auth/signin');
  }

  const title = await getPageTitle();
  const blocks = await getPageContent(50);
  const simplifiedBlocks = blocks.map(simplifyBlock);

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">BetterMe</Link>
          <nav className="nav">
            <Link href="/">首页</Link>
            <Link href="/content" style={{ color: 'var(--primary)' }}>内容</Link>
            {session.user.role === 'admin' && (
              <Link href="/admin">管理</Link>
            )}
            <Link href="/api/auth/signout" className="btn btn-outline btn-sm">退出</Link>
          </nav>
        </div>
      </header>

      <main className="content-container">
        {simplifiedBlocks.map((block) => {
          if (!block.type || block.type === 'unsupported') {
            return null;
          }

          // 处理各种块类型
          switch (block.type) {
            case 'paragraph':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <p>{block.text}</p>
                </div>
              );
              
            case 'heading_1':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <h1>{block.text}</h1>
                </div>
              );
              
            case 'heading_2':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <h2>{block.text}</h2>
                </div>
              );
              
            case 'heading_3':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <h3>{block.text}</h3>
                </div>
              );
              
            case 'bulleted_list_item':
              return (
                <div key={block.id} className="content-block" style={{ padding: '8px 24px' }}>
                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>{block.text}</li>
                  </ul>
                </div>
              );
              
            case 'numbered_list_item':
              return (
                <div key={block.id} className="content-block" style={{ padding: '8px 24px' }}>
                  <ol style={{ margin: 0, paddingLeft: '20px' }}>
                    <li>{block.text}</li>
                  </ol>
                </div>
              );
              
            case 'to_do':
              return (
                <div key={block.id} className="content-block" style={{ padding: '8px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={block.checked} readOnly />
                    <span style={{ textDecoration: block.checked ? 'line-through' : 'none' }}>
                      {block.text}
                    </span>
                  </div>
                </div>
              );
              
            case 'quote':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <blockquote>{block.text}</blockquote>
                </div>
              );
              
            case 'code':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <pre><code>{block.text}</code></pre>
                </div>
              );
              
            case 'toggle':
              return (
                <details key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <summary>{block.text}</summary>
                </details>
              );
              
            case 'image':
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  {block.url && <img src={block.url} alt={block.caption || ''} />}
                </div>
              );
              
            case 'divider':
              return <hr key={block.id} style={{ margin: '24px 0', border: 'none', borderTop: '1px solid #eee' }} />;
              
            default:
              return (
                <div key={block.id} className="content-block" style={{ padding: '16px 24px' }}>
                  <p>{block.text || ''}</p>
                </div>
              );
          }
        })}
      </main>
    </div>
  );
}
