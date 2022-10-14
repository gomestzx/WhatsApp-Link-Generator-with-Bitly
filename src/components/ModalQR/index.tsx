import { QRCodeSVG } from 'qrcode.react';
import React, { createRef, useState } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import styles from './styles.module.scss';

interface IModalQR {
  onClick(e: any): void;
  value: string;
}

const ModalQR = (props: IModalQR) => {
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className={styles.modal}>
      <div className={styles.headerModal}>
        <button onClick={props.onClick}>X</button>
      </div>

      <div className={styles.contentModal} ref={ref}>
        <QRCodeSVG
          value={props.value}
          size={200}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
        />
      </div>

      <div className={styles.buttons}>
        <button className={styles.btnDownload} onClick={downloadScreenshot}>
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default ModalQR;
