import type { NextPage } from 'next';
import Header from '../components/Header';
import LinkGenerator from '../components/LinkGenerator';
import { SEO } from '../components/SEO';
import { LinkProvider } from '../context/LinkContext';

const Home: NextPage = () => {
  return (
    <LinkProvider>
      <Header />
      <SEO title='Gerador de link para WhatsApp' />
      <LinkGenerator />
    </LinkProvider>
  );
};

export default Home;
