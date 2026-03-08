import { Providers } from '@/components/Providers';
import './globals.css';

export default function Layout({ children }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
