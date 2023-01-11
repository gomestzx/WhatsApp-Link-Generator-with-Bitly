import type { NextPage } from 'next';
import LinkGenerator from '../components/Generator';
import { SEO } from '../components/SEO';
import { LinkProvider } from '../context/LinkContext';

const Home: NextPage = () => {
  return (
    <LinkProvider>
      <SEO title='Gerador de link para WhatsApp' />
      <LinkGenerator />
    </LinkProvider>
  );
};

export default Home;
