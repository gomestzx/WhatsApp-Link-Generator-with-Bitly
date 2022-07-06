import Link from 'next/link';
import React from 'react';
import style from './styles.module.scss';

const Header = () => {
  return (
    <div className={style.header}>
      <Link href='http://github.com/gomestzx'>Source code 🚀</Link>
    </div>
  );
};

export default Header;
