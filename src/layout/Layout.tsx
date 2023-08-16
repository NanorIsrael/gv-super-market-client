import { ReactElement } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      {/* <main className='page-height'> */}
        {children}
      {/* </main> */}
      {/* <Footer /> */}
    </>
  );
}
