import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

import { Movies } from '../../../pages/ListFilm/Movie';
//@ts-ignore
import { get } from '../../../utilities/api.ts';
//@ts-ignore

import styles from '../Related/Related.module.scss';
import "swiper/css";
import "swiper/css/pagination";
//@ts-ignore
import { API_IMG, API_URL_POPULAR } from '../../../utilities/apiUrl.ts';
import { useCheckMobileScreen } from '../../../utilities/customHook.ts';
import { API_URL } from '../../../utilities/apiUrl.ts';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';


export interface PopularProps { }

export interface ListFilmDataType { }

const Popular: React.FC<PopularProps> = (props) => {
    const { t, i18n } = useTranslation();
    const [moviePopular, setMoviePopular] = useState<Movies[]>();
    const mobile = useCheckMobileScreen(768);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(API_URL)
            .then((res) => res.json())
            .then(data => {
                console.log(data);
                setMoviePopular(data);
            })
    }, [])

    const handleDetail = (e: string) => {
        navigate(`/detail/${e}`);
    };
    return (
        <>
            <div id={styles['related-movies']}>
                <h3 className={styles['heading']}>{t('popular-list.popular-movies')}</h3>
                <>
                    <Swiper
                        slidesPerView={mobile ? 2 : 3}
                        spaceBetween={16}
                        slidesPerGroup={mobile ? 1 : 3}
                        initialSlide={1}
                        loop={true}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className={styles['mySwiper']}

                    >
                        {moviePopular?.map((movieItem) => (
                            <SwiperSlide key={movieItem.slug} className={styles['items']}>
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

export default Popular