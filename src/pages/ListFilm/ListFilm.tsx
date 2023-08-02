import React from "react";
//@ts-ignore
import styles from "./ListFilm.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movies } from "./Movie";
import { Link, useNavigate } from "react-router-dom";
import {BiRightArrowAlt} from "react-icons/bi"
//@ts-ignore
import { get } from '../../utilities/api.ts';
//@ts-ignore
import { API_IMG, API_URL } from "../../utilities/apiUrl.ts";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export interface ListFilmProps {}

export interface ListFilmDataType {}

const ListFilm: React.FC<ListFilmProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [movieTrending, setMovieTrending] = useState<Movies[]>();
  const [moviePopular, setMoviePopular] = useState<Movies[]>();
  const navigate = useNavigate();

  // useEffect( () => {
  //   if (!movieTrending) get(API_URL).then((res) => setMovieTrending(res.data.results.slice(0,8)));
  //   if (!moviePopular) get(API_URL).then((res) => setMoviePopular(res.data.results.slice(0,8)));
  //  ;
  // }, [])
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        // console.log(data);
        setMovieTrending(data.slice(0,8));
        setMoviePopular(data.slice(0,8));
      })
  }, [])

  // useEffect( () => {
    
  //   if (movieTrending) console.log("movie",movieTrending);
    
  // }, [movieTrending])
  
  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["trending"]}>
      <Link to="/trending"><h4 className={styles["trending-text"]}>{t('trending')} <BiRightArrowAlt></BiRightArrowAlt></h4></Link>
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
      <div className={styles["trending"]}>
      <Link to="/popular"><h4 className={styles["trending-text"]}>{t('popular')}  <BiRightArrowAlt></BiRightArrowAlt></h4></Link>
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

export default ListFilm;
