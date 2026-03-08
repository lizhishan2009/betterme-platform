// 用户数据存储（开发环境使用文件，生产环境建议使用数据库）
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const DATA_FILE = path.join(process.cwd(), 'data', 'users.json');

// 确保数据目录存在
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
  const initialData = {
    users: [
      {
        id: uuidv4(),
        email: 'lizhishan2009@163.com',
        password: bcrypt.hashSync('admin123456', 10),
        name: '管理员',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
    ],
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

/**
 * 读取所有用户
 */
export function getUsers() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data).users;
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

/**
 * 保存用户列表
 */
function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ users }, null, 2));
}

/**
 * 根据邮箱查找用户
 */
export function findUserByEmail(email) {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

/**
 * 根据 ID 查找用户
 */
export function findUserById(id) {
  const users = getUsers();
  return users.find((u) => u.id === id);
}

/**
 * 创建新用户
 */
export function createUser(email, password, name, role = 'user') {
  const users = getUsers();
  
  // 检查邮箱是否已存在
  if (users.find((u) => u.email === email)) {
    throw new Error('邮箱已存在');
  }
  
  const newUser = {
    id: uuidv4(),
    email,
    password: bcrypt.hashSync(password, 10),
    name: name || email.split('@')[0],
    role,
    createdAt: new Date().toISOString(),
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return newUser;
}

/**
 * 更新用户
 */
export function updateUser(id, updates) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  
  if (index === -1) {
    throw new Error('用户不存在');
  }
  
  if (updates.password) {
    updates.password = bcrypt.hashSync(updates.password, 10);
  }
  
  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  
  return users[index];
}

/**
 * 删除用户
 */
export function deleteUser(id) {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  
  if (index === -1) {
    throw new Error('用户不存在');
  }
  
  users.splice(index, 1);
  saveUsers(users);
  
  return true;
}

/**
 * 验证密码
 */
export function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

/**
 * 获取所有客户（非管理员用户）
 */
export function getCustomers() {
  const users = getUsers();
  return users.filter((u) => u.role === 'user');
}

export default {
  getUsers,
  findUserByEmail,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyPassword,
  getCustomers,
};
