import Link from 'next/link';
import React from 'react';
import style from './styles.module.scss';

const Header = () => {
  return (
    <div className={style.header}>
      <Link href=''>
        Confira o gerador de Button Floater para sites ⚡
      </Link>
    </div>
  );
};

export default Header;
