import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Test User1',
    email: 'tu1@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Test User2',
    email: 'tu2@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;