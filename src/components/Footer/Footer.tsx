import React from 'react';
import styles from './Footer.module.scss';

export interface FooterProps {}

export interface FooterDataType {}

const Footer: React.FC<FooterProps> = (props) => (
  <div className={styles['root']}>Copyright by Truong ©</div>
);

export default Footer;