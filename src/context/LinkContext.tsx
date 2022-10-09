import React, { createContext, useState } from 'react';

interface ILinkContext {
  phone: string
  setPhone(e: any): void
  text: string
  setText(e: any): void
  link: string
  setLink(e: any): void

}

interface IProvider {
  children: React.ReactNode;
}

export const LinkContext = createContext({} as ILinkContext);

export function LinkProvider({ children }: IProvider) {
  const [phone, setPhone] = useState('');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  return <LinkContext.Provider value={{phone: phone, text: text, link: link, setPhone, setText, setLink}}>{children}</LinkContext.Provider>;
}
