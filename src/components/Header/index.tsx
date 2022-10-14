import Link from 'next/link';
import React from 'react';
import style from './styles.module.scss';

const Header = () => {
  return (
    <div className={style.header}>
      <Link href='https://github.com/gomestzx/WhatsApp-Link-Generator-with-Bitly'>
        Confira o código fonte do projeto ⚡
      </Link>
    </div>
  );
};

export default Header;
