import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import api from '../../services/api';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LinkGenerator = () => {
  const [phone, setPhone] = useState<string>('');
  const [text, setText] = useState('');
  const [showLink, setShowLink] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  let url = `https://api.whatsapp.com/send?phone=${phone}${
    text.length > 0 ? '&text=' + text : ''
  }`;

  const short = async () => {
    try {
      const response = await api.post('/shorten', {
        long_url: url,
      });
      setLink(response.data.link);
      console.log(response.data);
      setLoading(false);
    } catch {
      alert('Error');
    }
  };

  function generator() {
    setShowLink(true);
    short();
  }

  useEffect(() => {
    AOS.init();
  }, []);

  const notify = () => toast.success('Copied Link');

  return (
    <div>
        <ToastContainer position="bottom-right" newestOnTop />
      <div
        className={styles.container}
        data-aos='fade-in'
        data-aos-delay='50'
        data-aos-duration='2500'
      >
        
        
        <div className={styles.form}>
          <Image
            src='/logo.png'
            width={300}
            height={95}
            alt=''
            data-aos='zoom-in'
            data-aos-delay='50'
            data-aos-duration='2500'
          />

          <input
            type='text'
            placeholder='Phone'
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            name=''
            id=''
            cols={30}
            rows={10}
            onChange={(e) => setText(e.target.value)}
            placeholder='Type here...'
          ></textarea>
          {showLink ? (
            <div>
              {loading ? (
                <div className={styles.loading}>
                  <ReactLoading
                    type={'spin'}
                    color={'#EE6123'}
                    height={'10%'}
                    width={'10%'}
                  />
                </div>
              ) : (
                <div className={styles.link}>
                  <h3>{link}</h3> <div className={styles.buttons}></div>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
          <div className={styles.buttons}>
            <button
              onClick={() => {
                generator();
              }}
            >
              GET LINK
            </button>
            {showLink ? (
              <div>
                {loading ? (
                  <></>
                ) : (
                    <>
                  <CopyToClipboard text={link}>
                    <button className={styles.copy} onClick={notify}>COPY</button>
                    
                  </CopyToClipboard>
                  
                  </>
                  
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default LinkGenerator;
