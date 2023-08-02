import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/images/home/icon.png";
import classNames from "classnames";
import { Menu, Dropdown, Space, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { post, getUserInfo, get } from "../../utilities/api.ts";
import { BiHistory, BiLogIn, BiSearch } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { Movies } from "../../pages/ListFilm/Movie";
import { IoIosArrowDown } from "react-icons/io";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
export interface HeaderProps {
  page: string;
  keyword: string;
  category: string;
}

export interface HeaderDataType { }
export interface UserInfoDataType {
  id?: number;
  name: string;
  username: string;
  roles: {
    id: number;
    name: string;
  }[];
}

const Header: React.FC<HeaderProps> = (props) => {
  const [keyword, setKeyword] = useState<String>();
  const [movie, setMovie] = useState<Movies>();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("Eng");
  const lngs = {
    en: { nativeName: "English" },
    vi: { nativeName: "Tiếng Việt" },
  };
  const [isShow, setIsShow] = useState<boolean>(false)
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <button
              className={styles["language-button"]}
              onClick={() => {
                i18n.changeLanguage("en");
                setLanguage(lngs.en.nativeName);
              }}
            >
              {" "}
              {lngs.en.nativeName}
            </button>
          ),
        },
        {
          key: '2',
          label: (
            <button
              className={styles["language-button"]}
              onClick={() => {
                i18n.changeLanguage("vi");
                setLanguage(lngs.vi.nativeName);
              }}
            >
              {" "}
              {lngs.vi.nativeName}
            </button>
          )
        }
      ]}
    />
  );

  const debounceChange = useMemo(
    () =>
      debounce(async (searchValue) => {
        if (searchValue === "") {
          setMovie([]);
        } else {
          const search = await get(
            `http://localhost:8080/api/movie/ShowAndsearch?keyword=${searchValue}`
          );
          setMovie(search.data.data.products);
          setIsShow(true);
        }
      }, 500),
    [movie]
  );

  const defaultUser: UserInfoDataType = {
    id: -1,
    name: "",
    username: "",
    roles: [],
  };
  const [login, setLogin] = useState<UserInfoDataType>(defaultUser);
  const [userId, setUserId] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    console.log("here");
  };

  useEffect(() => {
    if (login.id == -1) {
      onUserInfo();
      checkUserId();
    }
  }, []);

  const history = useNavigate();
  const navigate = useNavigate();

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
  const handleDetail = (e: string) => {
    navigate(`/user/account/profile/${e}`);
  };
  const handleDetailFilm = (e: string) => {
    navigate(`/detail/${e}`);
    window.location.reload();
  };
  const userIdLc = localStorage.getItem("userId");

  return (
    <div className={styles["root"]}>
      <div className={classNames(styles["wrapper"], "g-container")}>
        <Link style={{ display: "flex", verticalAlign: "middle" }} to="/">
          <img src={logo} alt="Logo" className={styles["logo"]}></img>
          <p className={styles["p-logo"]}>FilmHot</p>
        </Link>
        <div className={styles["hamburger"]} onClick={handleToggle}>
          <div className="icon" />
        </div>
        <div className={styles["wrapper-header"]}>
          <div className={styles["change-language"]}>
            <Dropdown overlay={menu}>
              <a className={styles["language-text"]} onClick={(e) => e.preventDefault()}>
                <Space >
                  {language}
                  <IoIosArrowDown className={styles["language-arrow"]} />
                </Space>
              </a>
            </Dropdown>
          </div>
          <div className={styles["login-container"]}>
            {login.id === -1 && (
              <>
                <Link to="/login" className={styles["item"]}>
                  <div className={styles["content"]}>{t("header.login")}</div>
                </Link>
                <Link to="/register" className={styles["item"]}>
                  <div className={styles["content"]}>{t("header.register")}</div>
                </Link>
              </>
            )}
            {login.id != -1 && (
              <div style={{ display: "flex", color: "#fff" }}>
                <div
                  className={classNames(styles["icon-headerr"], styles["flex"])}
                >
                  {login.name}
                </div>
                <Link to="/user/account/history?action=show">
                  <div style={{ margin: "0 5px" }}>
                    <BiHistory className={styles["icon-header"]} />
                  </div>
                </Link>
                <a
                  style={{ margin: "0 5px" }}
                  onClick={() => {
                    handleDetail(userIdLc!);
                  }}
                >
                  <MdOutlineManageAccounts className={styles["icon-header"]} />
                </a>
                <div style={{ margin: " 0 5px" }}>
                  <BiLogIn onClick={logout} className={styles["icon-header"]} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles["nav-menu"],
          isOpen ? styles["nav-menu"] : ""
        )}
      >
        <div className={styles["navbar"]}>
          <Link to="/" className={styles["item"]}>
            <div className={classNames(styles["content"])}>{t("header.navbar.home")}</div>
          </Link>
          <Link to="/listfilm" className={styles["item"]}>
            <div className={styles["content"]}>{t("header.navbar.listfilm")}</div>
          </Link>
        </div>
        <div className={styles["search"]}>
          <form id="search-form-pc" name="halimForm" role="search" method="GET">
            <div className={styles["form-group"]}>
              <div
                className={classNames(styles["input-group"], styles["col-xs-12"])}
                style={{ position: "relative" }}
              >
                <Input
                  className={styles["input-search"]}
                  placeholder={t("header.search")}
                  onChange={(e) => debounceChange(e.target.value)}
                  onDoubleClick={(e) => setIsShow(false)}
                />
                <Link to="/listfilm" className={styles["search-button"]}>
                  <BiSearch
                    className={styles["search-icon"]}
                    aria-hidden="true"
                  ></BiSearch>
                </Link>
                <div className={classNames(styles["search-back"], isShow ? styles["show"] : "")}>
                  {movie?.map((e: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, slug:string }) => (
                    <div className={styles["search-entry"]}>
                      <a onClick={() => {
                        handleDetailFilm(e.slug);
                      }}>{e.title}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <div className={styles["navbar-mobile"]}>
          <div className={styles["close-btn"]}>
            <GrClose onClick={handleToggle} className={styles["close"]} />
          </div>
          <div className={styles["navbar-mobile-container"]}>
            <Link
              to="/"
              className={styles["item-mobile"]}
              onClick={handleToggle}
            >
              <div className={classNames(styles["content-mobile"])}>{t("header.navbar.home")}</div>
            </Link>
            <Link
              to="/listfilm"
              className={styles["item-mobile"]}
              onClick={handleToggle}
            >
              <div className={styles["content-mobile"]}>{t("header.navbar.listfilm")}</div>
            </Link>
            <div className={styles["change-language"]}>
              <Dropdown overlay={menu}>
                <a className={styles["language-text"]} onClick={(e) => e.preventDefault()}>
                  <Space >
                    {language}
                    <IoIosArrowDown className={styles["language-arrow"]} />
                  </Space>
                </a>
              </Dropdown>
            </div>
            <a
              className={styles["item-mobile"]}
              onClick={() => {
                handleDetail(userIdLc!);
              }}
            >
              <div className={styles["content-mobile"]}>{t("header.navbar.account")}</div>
            </a>
            <Link
              to="/login"
              className={styles["item-mobile"]}
              onClick={handleToggle}
            >
              <div className={styles["content-mobile"]}>{t("header.login")}</div>
            </Link>
            <Link
              to="/register"
              className={styles["item-mobile"]}
              onClick={handleToggle}
            >
              <div className={classNames(styles["content-mobile"], styles["item-mobile"])}>{t("header.register")}</div>
            </Link>
            <Link to={""} className={classNames(styles["language-text"],styles["item-mobile"])}>
              <Dropdown overlay={menu}>
                <a className={classNames(styles["language-text"],styles["item-mobile"])} onClick={(e) => e.preventDefault()}>
                  <Space >
                    {language}
                    <IoIosArrowDown className={styles["language-arrow"]} />
                  </Space>
                </a>
              </Dropdown>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
