import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
//@ts-ignore
import styles from "./UserSetting.module.scss";
import { CgProfile, CgHeart } from "react-icons/cg";
import { AiOutlineHistory, AiOutlineLogout } from "react-icons/ai";
import { RiExchangeBoxLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
//@ts-ignore
import { UserInfoDataType } from "../../components/Header/Header.tsx";
//@ts-ignore
import { getUserInfo} from "../../utilities/api.ts";

export interface UserSettingProps {}

export interface UserSettingDataType {}

const UserSetting: React.FC<UserSettingProps> = (props) => {
  const { t, i18n } = useTranslation();
  const defaultUser: UserInfoDataType = {
    id: -1,
    name: "",
    username: "",
    roles: [],
  };
  const [login, setLogin] = useState<UserInfoDataType>(defaultUser);
  const [userId, setUserId] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    if (login.id == -1) {
      onUserInfo();
      checkUserId();
    }
  }, []);
  const checkUserId = async () => {
    const checkId = await getUserInfo(`http://localhost:8080/api/user/me`).then(
      (data: { id: string }) => {
        setUserId(data.id);
      }
    );
  };
  const onUserInfo = async () => {
    const checkMe = await getUserInfo(`http://localhost:8080/api/user/me`).then(
      (data: UserInfoDataType) => {
        setLogin(data);
      }
    );
  };
  const logout = () => {
    navigate("/");
    window.localStorage.clear(); //clear all localstorage
    window.localStorage.removeItem("accessToken"); //remove one item
    window.location.reload();
  };
  return (
    <nav>
      <div style={{ background: "#E7E6E6" }}>
        <div className={styles["container-setting"]}>
          <div className={styles["avatar"]}>
            <div className={styles["avatar-wrapper"]}>
              <a className={styles["avatar-img"]} href="/user/account/profile">
                <div className={styles["profile-avatar"]}>
                  <img
                    className={styles["profile-avatar__img"]}
                    src="https://cf.shopee.vn/file/b85d1a89e8a2e0ea6ce0881507f5f4fa_tn"
                  />
                </div>
              </a>
              <div className={styles["avatar-name"]}>
              {login.id != -1 && (
                <div className={styles["avatar-name-text"]}>{login.name}</div>
              )}
                <div>
                  <Link
                    to={`profile/${localStorage.getItem("userId")}`}
                    className={styles["edit-profile"]}
                  >
                    {t("setting.editprofile")}
                  </Link>
                </div>
              </div>
            </div>
            <div className={styles["navbar"]}>
              <div className={styles["stardust-dropdown"]}>
                <div className={styles["stardust-dropdown__item-header"]}>
                  <NavLink
                    to={`profile/${localStorage.getItem("userId")}`}
                    className={({ isActive }) => 
                      (isActive ? styles["navbar-link"] : styles["not-navbar-link"])}
                  >
                    <CgProfile className={styles["icon-navbar"]} />
                    <div className={styles["item-navbar"]}>
                      <span className={styles["item-span"]}>
                        {t("setting.profile")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className={styles["stardust-dropdown"]}>
                <div className={styles["stardust-dropdown__item-header"]}>
                  <NavLink
                    to="wishlist?action=show"
                    className={({ isActive }) => 
                      (isActive ? styles["navbar-link"] : styles["not-navbar-link"])}
                  >
                    <CgHeart className={styles["icon-navbar"]} />
                    <div className={styles["item-navbar"]}>
                      <span className={styles["item-span"]}>
                        {t("setting.wishlist")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className={styles["stardust-dropdown"]}>
                <div className={styles["stardust-dropdown__item-header"]}>
                  <NavLink
                    to="history?action=show"
                    className={({ isActive }) => 
                      (isActive ? styles["navbar-link"] : styles["not-navbar-link"])}
                  >
                    <AiOutlineHistory className={styles["icon-navbar"]} />
                    <div className={styles["item-navbar"]}>
                      <span className={styles["item-span"]}>
                        {t("setting.historywatch")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className={styles["stardust-dropdown"]}>
                <div className={styles["stardust-dropdown__item-header"]}>
                  <NavLink
                    to={`changepass/${localStorage.getItem("userId")}`}
                    className={({ isActive }) => 
                      (isActive ? styles["navbar-link"] : styles["not-navbar-link"])}
                  >
                    <RiExchangeBoxLine className={styles["icon-navbar"]} />
                    <div className={styles["item-navbar"]}>
                      <span className={styles["item-span"]}>
                        {t("setting.changepass.title")}
                      </span>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className={styles["stardust-dropdown"]}>
                <div className={styles["stardust-dropdown__item-header"]}>
                  <div className={styles["not-navbar-link"]} onClick={logout}>
                    <AiOutlineLogout className={styles["icon-navbar"]}/>
                    <div className={styles["item-navbar"]} >
                      <span className={styles["item-span"]}>
                        {t("setting.logout")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="setting-content" style={{ flex: "6" }}>
            <div className={styles["info-content"]}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserSetting;
