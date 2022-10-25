import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';

export default function HeaderApp() {
  return (
    <header className={styles.header}>
      <a className={styles.logo}>
        <img src='./icon.png' alt='' />
      </a>
      <input className={styles.menuBtn} type='checkbox' id='menu-btn' />
      <label className={styles.menuIcon} htmlFor='menu-btn'>
        <span className={styles.navicon} />
      </label>
      <ul className={styles.menu}>
        <li>
          <Link href='/clicks'>Contador de Clicks</Link>
        </li>
        <li>
          <Link href='/button-floater'>Botão para Site</Link>
        </li>
        <li>
          <Link href='#contato'>Contato</Link>
        </li>
      </ul>
    </header>
  );
}
