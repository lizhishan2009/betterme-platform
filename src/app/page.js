export default function Home() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', background: 'white', borderRadius: '12px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '24px', color: '#1F2937' }}>
        欢迎来到 BetterMe 内容平台
      </h1>
      <p style={{ marginBottom: '16px', lineHeight: '1.8' }}>
        这是一个基于 Notion 构建的会员内容平台。
      </p>
      
      <div style={{ marginTop: '40px', padding: '20px', background: '#E8F5E9', borderRadius: '8px' }}>
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
