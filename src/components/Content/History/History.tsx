import React, { useEffect, useState } from "react";
import styles from "./History.module.scss";
import { post } from "../../../utilities/api.ts";
import { useTranslation } from "react-i18next";
import { Movies } from "../../../pages/ListFilm/Movie.ts";

export interface HistoryProps {}

export interface HistoryDataType {}

const History: React.FC<HistoryProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [history, setHistory] = useState<Movies[]>();
  useEffect(() => {
    showHistory();
  }, []);
  const showHistory = async () => {
    const historyData = await post(
      `http://localhost:8080/api/history/findAll?action=show`,
      { id: parseInt(localStorage.getItem("userId") || "-1") }
    );
    setHistory(historyData.data);
    console.log("wishlist", historyData.data);
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["profile-title"]}>
        <h1>{t("setting.historycontent.title")}</h1>
        <div className={styles["title-detail"]}>
          {t("setting.historycontent.description")}
        </div>
      </div>
      {history &&
        history
          ?.slice(0)
          .reverse()
          .map((item) => (
            <div className={styles["courses-container"]}>
              <div className={styles["course"]}>
                <img
                  className={styles["course-preview"]}
                  style={{ width: "200px", height: "150px" }}
                  src={item.movie.backdropUrl}
                  alt=""
                />
                <div className={styles["course-info"]}>
                  <h3>{item.movie.title}</h3>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default History;
