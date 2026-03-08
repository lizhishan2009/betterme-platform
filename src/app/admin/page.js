import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getCustomers, createUser, deleteUser } from '@/lib/users';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const customers = getCustomers();

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">BetterMe</Link>
          <nav className="nav">
            <Link href="/">首页</Link>
            <Link href="/content">内容</Link>
            <Link href="/admin" style={{ color: 'var(--primary)' }}>管理</Link>
            <Link href="/api/auth/signout" className="btn btn-outline btn-sm">退出</Link>
          </nav>
        </div>
      </header>

      <main className="container" style={{ padding: '40px 20px' }}>
        <h1 style={{ marginBottom: '32px' }}>用户管理</h1>

        {/* 添加用户表单 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">添加新用户</h2>
          </div>
          <form action="/api/admin/users" method="POST">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">姓名</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="客户姓名"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">邮箱</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="customer@example.com"
                  required
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">密码</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  placeholder="初始密码"
                  required
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                <button type="submit" className="btn btn-primary">
                  添加用户
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 用户列表 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">客户列表 ({customers.length}人)</h2>
          </div>
          
          {customers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <p>暂无客户，请添加</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>姓名</th>
                  <th>邮箱</th>
                  <th>添加时间</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{new Date(customer.createdAt).toLocaleDateString('zh-CN')}</td>
                    <td>
                      <div className="actions">
                        <Link 
                          href={`/admin/user/${customer.id}`}
                          className="action-btn edit"
                        >
                          编辑
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}
