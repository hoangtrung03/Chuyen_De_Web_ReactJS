import classNames from 'classnames';
import React from 'react';
import styles from './TestComponent.module.scss';

export interface TestComponentProps {}

export interface TestComponentDataType {}

const TestComponent: React.FC<TestComponentProps> = (props) => (
  <div className={classNames(styles['root'])}>TestComponent component</div>
);

export default TestComponent;