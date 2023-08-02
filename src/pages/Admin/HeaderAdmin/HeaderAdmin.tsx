import React from 'react';
//@ts-ignore
import styles from './HeaderAdmin.module.scss';
import classNames from 'classnames';
import { IoIosArrowDown } from 'react-icons/io';
import { BiLogIn } from 'react-icons/bi';
import { Menu, Dropdown, Space } from 'antd';
//@ts-ignore
import Logo from '../../../assets/images/home/icon.png';
export interface HeaderAdminProps { }

export interface HeaderAdminDataType { }

const HeaderAdmin: React.FC<HeaderAdminProps> = (props) => {
  const menu = (
    <Menu
      items={[
        {
          label: <a href="">Thông tin tài khoản</a>,
          key: '0',
        },
        {
          label: <a href="">2nd menu item</a>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: <a href="">Đăng xuất <BiLogIn style={{height: "25px", width: "25px"}} /> </a>,
          key: '3',
        },
      ]}
    />
  );
  return (
    <div className={styles['root']}>
      <div className={styles["navbar-custom"]}>
        <ul className={classNames(styles["list-unstyled"], styles["right"])}>
          <Dropdown className={styles["dropdown"]} overlay={menu} trigger={['hover']}>
            <a className={styles["nav-link"]} onClick={(e) => e.preventDefault()}>
              <img className={styles["avatar"]} src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.6435-9/168506484_2916164895278880_6797367447967881596_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LATJyMiX29gAX_D4dPV&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT9gU-p4kFdfMydqE9iabY5ZGS_QGUfj4_NfKkj_Kkzc5A&oe=62C00FFF" alt="" />
              <Space className={styles["pro-username"]}>
                Minh Quân
                <IoIosArrowDown />
              </Space>
            </a>
          </Dropdown>
          <li className="dropdown-noti"></li>
        </ul>
        <div className={classNames(styles["logo-box"])}>
          <a className={styles["logo"]} href="">
            <a href="" className={styles["logo"]}>
              <span className={styles["logo-lg"]}>
                <img src={Logo} alt="" height="35" />
                <span className={styles["logo-text"]}>FilmHot</span>
              </span>
            </a>
          </a>
        </div>
        <ul className={classNames(styles["list-unstyled"], styles["left"])}>
        </ul>
      </div>
    </div>
  )
};

export default HeaderAdmin;