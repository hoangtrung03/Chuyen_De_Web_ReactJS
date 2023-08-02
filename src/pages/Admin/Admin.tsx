import React from 'react';
import styles from './Admin.module.scss';
import HeaderAdmin from './HeaderAdmin/HeaderAdmin.tsx';

export interface AdminProps {}

export interface AdminDataType {}

const Admin: React.FC<AdminProps> = (props) => (
  <div className={styles['root']}>
    <HeaderAdmin/>
    asdfjkasjdkfjaksjk
  </div>
);

export default Admin;