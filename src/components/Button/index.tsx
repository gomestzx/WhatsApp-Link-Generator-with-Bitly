import React from 'react';
import ReactLoading from 'react-loading';
import styles from './styles.module.scss'


interface IButton {
  onClick(e: any): void;
  background?: string 
  color?: string
  value: any;
  loading?: boolean;
}

const Button = (props: IButton) => {
  
  return (
    <div className={styles.button}>
      <button onClick={props.onClick} style={{backgroundColor: `${props.background}`, color: `${props.color ? props.color : '#fff'}`}}>
        {props.value}
        {props.loading && (
          <ReactLoading
            type={'spin'}
            color={'#fff'}
            height={'20px'}
            width={'20px'}
            className={styles.spin}
          />
        )}
        
      </button>
    </div>
  );
};

export default Button;
