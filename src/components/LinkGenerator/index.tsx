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
    } catch (err) {
      alert(err);
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
    <div >
      <ToastContainer position='bottom-right' newestOnTop />

      <div
        className={styles.container}
        
      >
        <div className={styles.form} data-aos='fade-in'
    data-aos-delay='50'
    data-aos-duration='2500'>
          <Image
            src='/logo.png'
            width={300}
            height={95}
            alt=''
            data-aos='zoom-in'
            data-aos-delay='50'
            data-aos-duration='2500'
          />
          <label>Phone </label>

          <input type='text' onChange={(e) => setPhone(e.target.value)} />
          <label>Text </label>
          <textarea
            name=''
            id=''
            cols={30}
            rows={10}
            onChange={(e) => setText(e.target.value)}
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
                  <label>Your link:</label>
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
                      <button className={styles.copy} onClick={notify}>
                        COPY
                      </button>
                    </CopyToClipboard>
                  </>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className={styles.made}>
        Made with ❤️ by <a href="https://instagram.com/gomestzx">gomestzx</a>
      </p>
        </div>
      </div>
    </div>
  );
};

export default LinkGenerator;
