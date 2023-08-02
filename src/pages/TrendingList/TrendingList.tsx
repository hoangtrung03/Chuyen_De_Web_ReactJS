import React, { useEffect, useState } from "react";
import { Movies } from "../ListFilm/Movie";
//@ts-ignore
import styles from "./TrendingList.module.scss";
//@ts-ignore
import { API_URL, API_IMG } from "../../utilities/apiUrl.ts";
//@ts-ignore
import { get } from "../../utilities/api.ts";
import { Link, useNavigate } from "react-router-dom";
import { BiRightArrowAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Select } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export interface TrendingListProps {}

export interface TrendingListDataType {}

const TrendingList: React.FC<TrendingListProps> = (props) => {
  const [movieTrending, setMovieTrending] = useState<Movies[]>();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMovieTrending(data);
      });
  }, []);
  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { autocomplete: [], select: [] },
  });
  const handleFilter = (year: string) => {
    if (year === "All") {
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          setMovieTrending(data);
        });
    }else{
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          const filterData = data.filter((film) => film.releaseDate === year);
          setMovieTrending(filterData);
        });
    }
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["trending"]}>
        <div className={styles["trending-list"]}>
          <h4 className={styles["trending-text"]}>
            {t("trending")} <BiRightArrowAlt></BiRightArrowAlt>
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
              <MdOutlineKeyboardArrowDown
                className={styles["trending-arrow"]}
              />
            </form>
          </div>
        </div>
        <div className={styles["container"]}>
          {movieTrending?.map((movieItem) => (
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
                    <div className={styles["entry-title"]}>
                      {movieItem.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingList;
