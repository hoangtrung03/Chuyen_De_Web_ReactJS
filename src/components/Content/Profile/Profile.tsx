import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.scss";
import { put } from "../../../utilities/api.ts";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { getUserInfo } from "../../../utilities/api.ts";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export interface ProfileProps {}

export interface ProfileDataType {
  username: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
}
interface UserInfoData {
  username: string;
  name: string;
  email: string;
  gender: string;
  address: string;
  phone: string;
}

const Profile: React.FC<ProfileProps> = (props) => {
  const { t, i18n } = useTranslation();
  const defaultUser: UserInfoData = {
    username: "",
    name: "",
    email: "",
    gender: "",
    address: "",
    phone: "",
  };
  const [userInfo, setUserInfo] = useState<UserInfoData>(defaultUser);
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isDirty },
  } = useForm<ProfileDataType>();
  const onSubmit: SubmitHandler<ProfileDataType> = async (data) => {
    const response = await put(
      `http://localhost:8080/api/user/update/${localStorage.getItem("userId")}`,
      data
    );
    alert("Update user info success");
  };

  useEffect(() => {
    onUserInfo();
  }, []);
  const onUserInfo = async () => {
    const checkMe = await getUserInfo(`http://localhost:8080/api/user/me`).then(
      (data: UserInfoData) => {
        setUserInfo(data);
        setValue("username", data.username);
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("gender", data.gender);
        setValue("address", data.address);
        setValue("phone", data.phone);
        console.log("data", data);
      }
    );
  };
  return (
    <div className={styles["root"]}>
      <div className={styles["profile-title"]}>
        <h1> {t("setting.profilecontent.title")}</h1>
        <div className={styles["title-detail"]}>
          {t("setting.profilecontent.description")}
        </div>
      </div>
      <div className={styles["profile-content"]}>
        <div className={styles["profile-form"]}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="put"
            style={{ display: "block", marginTop: "0em" }}
          >
            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">
                    {t("setting.profilecontent.username")}
                  </label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="text"
                        {...register("username")}
                        defaultValue={userInfo.username}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">{t("setting.profilecontent.name")}</label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="text"
                        {...register("name")}
                        defaultValue={userInfo.name}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">{t("setting.profilecontent.email")}</label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="email"
                        {...register("email")}
                        defaultValue={userInfo.email}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">{t("setting.profilecontent.gender")}</label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="text"
                        {...register("gender")}
                        defaultValue={userInfo.gender}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">
                    {t("setting.profilecontent.address")}
                  </label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="text"
                        {...register("address")}
                        defaultValue={userInfo.address}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-label"]}>
                  <label htmlFor="">{t("setting.profilecontent.phone")}</label>
                </div>
                <div className={styles["form-input"]}>
                  <div className={styles["input-with-validator-wrapper"]}>
                    <div className={styles["input-with-validator"]}>
                      <input
                        className={styles["input-content"]}
                        type="text"
                        {...register("phone")}
                        defaultValue={userInfo.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles["form-item"]}>
              <div className={styles["form-content"]}>
                <div className={styles["form-input"]}>
                  <Button htmlType="submit">
                    {t("setting.profilecontent.save")}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
