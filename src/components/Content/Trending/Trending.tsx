import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { Movies } from '../../../pages/ListFilm/Movie';
//@ts-ignore
import { t } from 'i18next';
import { useTranslation } from "react-i18next";

import styles from '../Related/Related.module.scss';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
//@ts-ignore
import { API_IMG, API_URL } from '../../../utilities/apiUrl.ts';
//@ts-ignore
import { useCheckMobileScreen } from '../../../utilities/customHook.ts';

export interface TrendingProps { }

export interface ListFilmDataType { }

const Trending: React.FC<TrendingProps> = (props) => {
    const { t, i18n } = useTranslation();
    const [movieTrending, setMovieTrending] = useState<Movies[]>();
    const mobile = useCheckMobileScreen(768);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then(data => {
                // console.log(data);
                setMovieTrending(data);
            })
    }, [])

    const handleDetail = (e: string) => {
        navigate(`/detail/${e}`);
    };
    return (
        <>
            <div id={styles['related-movies']}>
                <h3 className={styles['heading']}>{t('trending-list.trending-movies')}</h3>
                <>
                    <Swiper
                        slidesPerView={mobile ? 2 : 3}
                        spaceBetween={16}
                        slidesPerGroup={mobile ? 1 : 3}
                        initialSlide={2}
                        loop={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className={styles['mySwiper']}
                    >
                        {movieTrending?.map((movieItem) => (
                            <SwiperSlide key={movieItem.id} className={styles['items']}>
                                <div className={styles['box']}>
                                    <a href="" onClick={() => {
                                        handleDetail(movieItem.slug);
                                    }}>
                                        <img className={styles['img-film']} src={movieItem.posterUrl} alt={movieItem.title} />
                                        <div className={styles['film-title-box']}>
                                            <div className={styles['film-title']}>
                                                <div className={styles['entry-title']}>{movieItem.title}
                                                    <span className={styles['tooltip']}>{movieItem.title}</span>
                                                </div>
                                                <div className={styles['original-title']}>{movieItem.title}</div>
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

export default Trending