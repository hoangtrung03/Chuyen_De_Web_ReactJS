import React, { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore
import { API_IMG, API_URL } from "../../utilities/apiUrl.ts";
import { Movies } from "../ListFilm/Movie";
//@ts-ignore
import styles from "./PopularList.module.scss";
//@ts-ignore
import { get } from "../../utilities/api.ts";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export interface PopularListProps {}

export interface PopularListDataType {}

const PopularList: React.FC<PopularListProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [moviePopular, setMoviePopular] = useState<Movies[]>();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMoviePopular(data.slice(0, 8));
      });
  }, []);

  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };
  const handleFilter = (year: string) => {
    if (year === "All") {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setMoviePopular(data);
          console.log("filter", data);
        });
    } else {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const filterData = data.filter((film) => film.releaseDate === year);
          setMoviePopular(filterData);
          console.log("filter", data);
        });
    }
  };
  return (
    <div className={styles["trending"]}>
      <div className={styles["trending-list"]}>
        <h4 className={styles["trending-text"]}>
          {t("popular")} <BiRightArrowAlt></BiRightArrowAlt>
        </h4>
        <div className={styles["trending-filter"]}>
          <form action="" className={styles["trending-form"]}>
            <select
              className={styles["trending-select"]}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option className={styles["trending-option"]}>All</option>
              <option className={styles["trending-option"]}>2020</option>
              <option className={styles["trending-option"]}>2021</option>
              <option className={styles["trending-option"]}>2022</option>
            </select>
            <MdOutlineKeyboardArrowDown className={styles["trending-arrow"]} />
          </form>
        </div>
      </div>
      <div className={styles["container"]}>
        {moviePopular?.map((movieItem) => (
          <div
            key={movieItem.slug}
            className={styles["items"]}
            onClick={() => {
              handleDetail(movieItem.slug);
            }}
          >
            <div className={styles["box"]}>
              <img
                className={styles["img-film"]}
                src={movieItem.posterUrl}
                alt={movieItem.title}
              />
              <div className={styles["film-title-box"]}>
                <div className={styles["film-title"]}>
                  <div className={styles["entry-title"]}>{movieItem.title}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularList;
