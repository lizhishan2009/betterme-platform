import { SessionProvider } from 'next-auth/react';
import './globals.css';

export default function Layout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
