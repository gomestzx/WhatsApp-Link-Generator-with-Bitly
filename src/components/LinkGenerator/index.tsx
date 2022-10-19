/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import api from '../../services/api';
import ReactLoading from 'react-loading';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLinkContext } from '../../hooks/useLinkContext';
import Modal from 'react-modal';
import ModalQR from '../ModalQR/index.jsx';

const LinkGenerator = () => {
  const [textCopy, setTextCopy] = useState<string>('Copiar');
  const [showLink, setShowLink] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertText, setAlertText] = useState<string>('');
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  /* Link Context */

  const { phone, setPhone, text, setText, link, setLink } = useLinkContext();

  let url = `https://api.whatsapp.com/send?phone=${phone.replace(
    /[^0-9]/g,
    '',
  )}${text.length > 0 ? '&text=' + text : ''}`;

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
    if (phone.length <= 14) {
      return setAlertText('preencha o número corretamente');
    }
    setAlertText('');
    setShowLink(true);
    short();
  }

  function reset() {
    setLink('');
    setShowLink(false);
    setPhone('');
    setText('');
    setLoading(true);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px',
      backgroundColor: '#1F2029',
      borderRadius: '8px',
      overlay: { background: '#000' },
      border: '0',
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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

  console.log(phone);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>WhatLink</h1>
      <p>Crie seu link profissional para WhatsApp!</p>
      <div className={styles.container}>
        <div
          className={styles.row}
          data-aos='fade-in'
          data-aos-delay='50'
          data-aos-duration='2500'
        >
          <div className={styles.form}>
            {!link ? (
              <>
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
              </>
            ) : (
              <></>
            )}

            {showLink ? (
              <>
                {loading ? (
                  <></>
                ) : (
                  <div className={styles.link}>
                    <label>Seu link 👉</label>
                    <a href={link} target="_blank" rel="noreferrer">{link}</a>
                  </div>
                )}
              </>
            ) : (
              <></>
            )}
            <div className={styles.buttons}>
              {!link ? (
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
              ) : (
                <></>
              )}

              {showLink ? (
                <>
                  {loading ? (
                    <></>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          reset();
                        }}
                        className={styles.reset}
                      >
                        ou gerar um novo link
                      </button>
                      <button className={styles.qr} onClick={openModal}>
                        Gerar QR Code
                      </button>
                      <CopyToClipboard text={link}>
                        <button className={styles.copy} onClick={Copy}>
                          {textCopy}
                        </button>
                      </CopyToClipboard>
                    </>
                  )}
                </>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
        overlayClassName={styles.overlayModal}
      >
        <ModalQR onClick={closeModal} value={link} />
      </Modal>
    </div>
  );
};

export default LinkGenerator;
