/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import api from '../../services/api';
import ReactLoading from 'react-loading';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LinkGenerator = () => {
  const [phone, setPhone] = useState<string>('');
  const [text, setText] = useState('');
  const [textCopy, setTextCopy] = useState<string>('Copiar');
  const [showLink, setShowLink] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [alertText, setAlertText] = useState<string>('');

  let url = `https://api.whatsapp.com/send?phone=${phone}${
    text.length > 0 ? '&text=' + text : ''
  }`;

  const maskPhone = (value: any) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})(\d+?)$/, '$1');
  };

  const short = async () => {
    try {
      const response = await api.post('/shorten', {
        long_url: url,
      });
      setLink(response.data.link);
      console.log(response.data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  function generator() {
    if (phone.length <= 8) {
      return setAlertText('preencha o número corretamente');
    }
    setAlertText('');
    setShowLink(true);
    short();
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const Copy = () => {
    setTextCopy('Link copiado 🎉');
    setTimeout(() => {
      setTextCopy('Copiar');
    }, 2500);
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>WhatLink</h1>
      <p>Crie seu link profissional com apenas um click!</p>
      <div className={styles.container}>
        <div
          className={styles.row}
          data-aos='fade-in'
          data-aos-delay='50'
          data-aos-duration='2500'
        >
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
              <label>Text</label>
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
            {showLink ? (
              <>
                {loading ? (
                  <></>
                ) : (
                  <div className={styles.link}>
                    <label>Seu link 👉</label>
                    <h3>{link}</h3>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  generator();
                }}
              >
                Gerar Link{' '}
                {loading && showLink ? (
                  <ReactLoading
                    type={'spin'}
                    color={'#fff'}
                    height={'20px'}
                    width={'20px'}
                    className={styles.spin}
                  />
                ) : (
                  <></>
                )}
              </button>

              {showLink ? (
                <div>
                  {loading ? (
                    <></>
                  ) : (
                    <>
                      <CopyToClipboard text={link}>
                        <button className={styles.copy} onClick={Copy}>
                          {textCopy}
                        </button>
                      </CopyToClipboard>
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.alert}>{alertText}</div>
          </div>
        </div>
        <div
          className={styles.row}
          data-aos='fade-left'
          data-aos-delay='50'
          data-aos-duration='2500'
        >
          <img src='./banner.png' alt='' />
        </div>
      </div>
    </div>
  );
};

export default LinkGenerator;
