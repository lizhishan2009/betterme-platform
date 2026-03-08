import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { createUser, deleteUser, getCustomers } from '@/lib/users';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  const customers = getCustomers();
  return NextResponse.json({ customers });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const { name, email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: '邮箱和密码必填' },
        { status: 400 }
      );
    }

    const user = createUser(email, password, name || email.split('@')[0], 'user');
    
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email 
      } 
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '创建失败' },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '未授权' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    deleteUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || '删除失败' },
      { status: 400 }
    );
  }
}
