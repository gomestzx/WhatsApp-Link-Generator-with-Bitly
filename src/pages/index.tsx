import type { NextPage } from 'next';
import styles from '../../styles/Home.module.scss';
import LinkGenerator from '../components/LinkGenerator';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <LinkGenerator />
    </div>
  );
};

export default Home;
