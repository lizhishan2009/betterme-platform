'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>加载中...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px' }}>欢迎来到 BetterMe 内容平台</h1>
      <p style={{ marginBottom: '16px' }}>这是一个基于 Notion 构建的会员内容平台。</p>
      
      {content ? (
        <div>
          <h2>内容</h2>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      ) : (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <p>正在从Notion获取内容...</p>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
            如果Notion未正确配置，将显示此默认内容
          </p>
        </div>
      )}
      
      <div style={{ marginTop: '40px', padding: '20px', background: '#e8f5e9', borderRadius: '8px' }}>
        <h3>🧪 测试内容</h3>
        <p>这是一个测试页面，用于验证BetterMe Platform是否正常运行。</p>
        <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>✅ Vercel部署成功</li>
          <li>✅ 域名解析正常</li>
          <li>✅ Next.js应用运行中</li>
        </ul>
      </div>
    </div>
  );
}
