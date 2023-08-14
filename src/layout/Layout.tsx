import { ReactElement } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <div className="App">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
