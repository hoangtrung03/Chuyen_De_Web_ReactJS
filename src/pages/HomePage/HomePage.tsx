import React, { useEffect, useState } from 'react';
//@ts-ignore
import styles from './HomePage.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Scrollbar } from 'swiper';
import { Button } from 'antd';
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper";
//@ts-ignore
import Recommend from '../../components/Content/Recommend/Recommend.tsx';
//@ts-ignore
import Trending from '../../components/Content/Trending/Trending.tsx';
//@ts-ignore
import Popular from '../../components/Content/Popular/Popular.tsx';
//@ts-ignore
import { API_IMG, API_URL } from '../../utilities/apiUrl.ts';
import { AiFillStar } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface HomePageProps { }

export interface HomePageDataType { }

const HomePage: React.FC<HomePageProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(data => {
        console.log("data", data);
        setData(data);
      })
  }, [])

  const handleDetail = (e: string) => {
    navigate(`/detail/${e}`);
  };
  return (
    <div className={styles['container']}>
      <div className={styles['root']}>
        <div className={styles['top-slider']}>
          <Swiper navigation={true} modules={[Navigation, Autoplay]} loop={true}
            loopFillGroupWithBlank={true} autoplay={{ delay: 5000 }} className={styles['swiper']}>
            {data.map((d: any) => (
              <SwiperSlide>
                <div className={styles["item"]}>
                  <img src={d.backdropUrl} alt="banner" className={styles['background']} />
                  <h3 className={styles['content']}>
                    {d.title}
                  </h3>
                  {/* <h5 className={styles['vote']}>
                    {/* Vote: {d.vote_average} / 10 */}
                    {/* <AiFillStar color='#ffc41f'/> */}
                  {/* </h5> */} 
                  <a onClick={() => {
                    handleDetail(d.slug);
                  }} className={styles['button-watch']}>{t('homepage.watchnow')} 
                    <svg data-v-946d9054="" viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="chevron right"
                      xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi-chevron-right b-icon bi"><g data-v-946d9054="">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path></g></svg>
                  </a>
                  <div className={styles["overlay"]}></div>
                </div>
              </SwiperSlide>
            ))};
          </Swiper>
        </div>
        <div className={styles['row']}>
          <div className={styles['col-left']}>
            <Trending />
            <Popular />
          </div>
          <div className={styles['col-right']}>
            <div className={styles['container-col-right']}>
              <Recommend />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default HomePage;