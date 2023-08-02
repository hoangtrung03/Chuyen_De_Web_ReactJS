import React from 'react';
import styles from './LayoutUserSetting.module.scss';

export interface LayoutUserSettingProps {}

export interface LayoutUserSettingDataType {}

const LayoutUserSetting: React.FC<LayoutUserSettingProps> = (props) => (
  <div className={styles['root']}>LayoutUserSetting component</div>
);

export default LayoutUserSetting;