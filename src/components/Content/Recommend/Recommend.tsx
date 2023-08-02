import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import { API_IMG, API_URL } from '../../../utilities/apiUrl.ts';
// @ts-ignore
import styles from '../Recommend/Recommend.module.scss';
import { useTranslation } from "react-i18next";

export interface RecommendProps {
  slug: string,
  title: string,
  poster_path: string
}

export const Recommend: React.FC<RecommendProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [films, setFilm] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        console.log("data", data)
        setFilm(data);
        
      })
  }, [])

  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };
  return (
    <div id={styles['right-content']}>
      <div className="title">
        <h3 className={styles['heading']}>{t('recommend')}</h3>
      </div>
      <ul className={styles['list-movie']}>
        {films.slice(0, 10).map((film:any, index) => (
          <li key={film.slug} {...film}
            onClick={() => {
              handleDetail(film.slug);
            }}>
            <div className={styles['box']}>
              <a href="">
                <img className={styles['img-film']} src={film.posterUrl} alt={film.title} />
                <div className={styles['film-title-box']}>
                  <div className={styles['film-title']}>
                    <h3 className={styles['entry-title']}>{film.title}</h3>
                    <div className={styles['original-title']}>{film.title}</div>
                  </div>
                </div>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Recommend
