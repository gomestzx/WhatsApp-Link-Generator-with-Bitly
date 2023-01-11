import React from 'react';
import styles from './styles.module.scss';

interface ITextInput {
  label: string;
  onChange(e: any): void;
  value: string;
  placeholder: string;
}

const TextInput = (props: ITextInput) => {
  return (
    <div className={styles.textInput}>
      <label>{props.label}</label>
      <input
        type='text'
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextInput;
