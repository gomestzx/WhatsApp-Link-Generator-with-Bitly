import React from 'react';
import { useLinkContext } from '../../hooks/useLinkContext';
import styles from './styles.module.scss';

const ButtonFloaterGeneraator = () => {
  const { phone, setPhone, text, setText, link, setLink } = useLinkContext();

  const maskPhone = (value: any) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)$/, '$1');
  };
  
  return (
    <div>
      <div className={styles.form}>
        <div className={styles.flexLabel}>
          <label>Número</label>
        </div>

        <input
          type='text'
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          value={phone}
          placeholder='(DDD) 0 0000-0000'
        />
        <div className={styles.flexLabel}>
          <label>Texto</label>
          <label>Não é obrigatório ⚠️</label>
        </div>
        <textarea
          name=''
          id=''
          cols={30}
          rows={10}
          onChange={(e) => setText(e.target.value)}
          placeholder='Escreva seu texto aqui...'
        ></textarea>
        <div className={styles.buttons}>
          <button> </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonFloaterGeneraator;
