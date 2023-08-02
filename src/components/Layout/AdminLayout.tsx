import React from 'react';
import styles from './Layout.module.scss';
import Header from '../Header/Header.tsx';
import Footer from '../Footer/Footer.tsx';
export interface LayoutProps {
  children?: React.ReactNode;
 }

export interface LayoutDataType { }

const AdminLayout: React.FC<LayoutProps> = ({children}) => (
  <div className={styles['root']}>
 
    <main>{children}</main>
    

  </div>
);

export default AdminLayout;