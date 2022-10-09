import { useContext } from 'react';
import { LinkContext } from '../context/LinkContext';

export function useLinkContext() {
  const ctx = useContext(LinkContext);
  return ctx;
}
