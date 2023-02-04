/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import api from '../../services/api';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLinkContext } from '../../hooks/useLinkContext';
import Modal from 'react-modal';
import ModalQR from '../ModalQR/index.jsx';
import { maskPhone } from '../../utils/maskPhone';
import TextInput from '../TextInput';
import Button from '../Button';
import CopyButton from '../CopyButton';

const LinkGenerator = () => {
  const [showLink, setShowLink] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [alertText, setAlertText] = useState<string>('');
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const { phone, setPhone, text, setText, link, setLink } = useLinkContext();

  let url = `https://api.whatsapp.com/send?phone=${phone.replace(
    /[^0-9]/g,
    '',
  )}${text.length > 0 ? '&text=' + text : ''}`;

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
      return setAlertText('preencha o número corretamente!');
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
      backgroundColor: '#fff',
      borderRadius: '8px',
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

  return (
    <div
      className={styles.app}
      data-aos='fade-in'
      data-aos-delay='50'
      data-aos-duration='2500'
    >
      <h1 className={styles.title}>Crie seu link profissional</h1>
      <h1 className={styles.title}>
        para <span>WhatsApp!</span>
      </h1>
      <div className={styles.container}>
        <div className={styles.form}>
          {!link && (
            <>
              <TextInput
                onChange={(e) => setPhone(maskPhone(e.target.value))}
                value={phone}
                placeholder='(DDD) 0 0000-0000'
                label='Número'
              />
              <TextInput
                onChange={(e) => setText(e.target.value)}
                placeholder='Escreva seu texto aqui...'
                value={text}
                label='Mensagem'
              />
            </>
          )}
          {showLink && (
            <>
              {!loading && (
                <>
                  <div className={styles.link}>
                    <label>Seu link 👉</label>
                    <a href={link} target='_blank' rel='noreferrer'>
                      {link}
                    </a>
                  </div>
                </>
              )}
            </>
          )}
          <div className={styles.buttons}>
            {!link && (
              <Button
                onClick={() => {
                  generator();
                }}
                loading={loading && showLink}
                value='Gerar link'
              />
            )}
            {showLink && (
              <>
                {!loading && (
                  <>
                    <Button
                      onClick={() => {
                        reset();
                      }}
                      background='transparent'
                      color='#fff'
                      value='ou gerar novo link'
                    />
                    <Button
                      onClick={openModal}
                      value='Gerar QR Code'
                      background='#4945ff'
                    />
                    <CopyButton textToCopy={link} />
                  </>
                )}
              </>
            )}
          </div>
          <div className={styles.alert}>{alertText}</div>
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
