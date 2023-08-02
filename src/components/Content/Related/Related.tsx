import React, { useEffect, useState } from 'react'
// @ts-ignore
import styles from './Related.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper';
import { useNavigate } from 'react-router-dom';
//@ts-ignore
import { API_IMG, API_URL } from '../../../utilities/apiUrl.ts';
import { useCheckMobileScreen } from '../../../utilities/customHook.ts';
import { useTranslation } from "react-i18next";

export interface RelatedProps {
  original_title: string,
  title: string, 
  poster_path: string
}
export const Related: React.FC<RelatedProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [films, setFilm] = useState([]);
  const mobile = useCheckMobileScreen(768);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(films => {
        // console.log(films);
        setFilm(films);
      })
  }, [])
  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };

  return (
    <>
      <div id={styles['related-movies']}>
        <h3 className={styles['heading']}>{t('related')}</h3>
        <>
          <Swiper
            slidesPerView={mobile ? 2 : 3}
            spaceBetween={16}
            slidesPerGroup={mobile ? 1 : 3}
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={styles['mySwiper']}
            initialSlide={2}
          >
            {films.map((film:any) => (
              <SwiperSlide key={film} className={styles['items']}>
                <div className={styles['box']}>
                  <a href="" onClick={() => {
                handleDetail(film.slug);
              }}>
                    <img className={styles['img-film']} src={film.posterUrl} alt={film.title} />
                    <div className={styles['film-title-box']}>
                      <div className={styles['film-title']}>
                        <div className={styles['entry-title']}>{film.title}
                          <span className={styles['tooltip']}>{film.title}</span>
                        </div>
                        <div className={styles['original-title']}>{film.title}</div>
                      </div>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      </div>
    </>
  )
}
export default Related
