import Link from 'next/link';
import React from 'react';
import style from './styles.module.scss';

const Header = () => {
  return (
    <div className={style.header}>
      <Link href='https://github.com/gomestzx/wathsapp-link-with-bitly'>
        Código fonte ⚡
      </Link>
    </div>
  );
};

export default Header;
