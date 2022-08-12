import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import Header from '../components/Header';
import LinkGenerator from '../components/LinkGenerator';
import { SEO } from '../components/SEO';


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <SEO title='Gerador de link para WhatsApp' />
      <Header />
      <LinkGenerator />
    </div>
  );
};

export default Home;
