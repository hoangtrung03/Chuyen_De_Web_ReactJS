import React, { useEffect, useRef, useState } from "react";
//@ts-ignore
import styles from "./ChangePassword.module.scss";
//@ts-ignore
import { get, post } from "../../../utilities/api.ts";
//@ts-ignore
import { url, User } from '../../../pages/Register/Register.tsx';
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
//@ts-ignore
import { getUserInfo } from "../../../utilities/api.ts";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';
//@ts-ignore
import { ResponseStatus } from "../../../pages/Register/Register.tsx";


export interface ChangePasswordProps { }

export interface ChangePasswordDataType {
    email: string;
    password: string;
    newPassword: string;
}
interface UserInfoData {
    email: string;
    password: string;
    newPassword: string;
}

const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [valid, setValid] = useState<{ field: string, message: string }>({ field: "", message: "" })
    const [validEmail, setValidEmail] = useState<{ field: string, message: string }>({ field: "", message: "" })
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
    });
    const defaultUser: UserInfoData = {
        email: "",
        password: "",
        newPassword: "",
    };
    const [userInfo, setUserInfo] = useState<UserInfoData>(defaultUser);
    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        formState: { isDirty },
    } = useForm<ChangePasswordDataType>();
    const onSubmit: SubmitHandler<ChangePasswordDataType> = async (data) => {
        const response = await post(
            `http://localhost:8080/api/auth/changepassword`,
            data
        );
        alert("Update user info success");
    };
    const checkValidEmail = async (email: string) => {
        const checkEmail: ResponseStatus = await get(`${url}api/auth/checkvalidemail?email=${email}`)
        // console.log("checkemail:", checkEmail.data.success);
        if (checkEmail.data.success) {
            setDisable(true);   
            setValidEmail({ field: "email", message: checkEmail.data.message });
        } else {
            setValidEmail({ field: "", message: "" })
            setDisable(false)
        }
    }
    useEffect(() => {
        onUserInfo();
    }, []);
    const onUserInfo = async () => {
        const checkMe = await getUserInfo(`http://localhost:8080/api/user/me`).then(
            (data: UserInfoData) => {
                setUserInfo(data);
                setValue("email", data.email);
                setValue("password", data.password);
                setValue("newPassword", data.newPassword);
                console.log("data", data);
            }
        );
    };
    return (
        <div className={styles["root"]}>
            <div className={styles["profile-title"]}>
                <h1> {t("setting.changepass.title")}</h1>
                <div className={styles["title-detail"]}>
                    {t("setting.changepass.description")}
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
                                    <label htmlFor="">{t("setting.changepass.email")}</label>
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
                                    <label htmlFor="">
                                        {t("setting.changepass.password")}
                                    </label>
                                </div>
                                <div className={styles["form-input"]}>
                                    <div className={styles["input-with-validator-wrapper"]}>
                                        <div className={styles["input-with-validator"]}>
                                            <input
                                                className={styles["input-content"]}
                                                type="text"
                                                {...register("password")}
                                                defaultValue={userInfo.password}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles["form-item"]}>
                            <div className={styles["form-content"]}>
                                <div className={styles["form-label"]}>
                                    <label htmlFor="">{t("setting.changepass.newPassword")}</label>
                                </div>
                                <div className={styles["form-input"]}>
                                    <div className={styles["input-with-validator-wrapper"]}>
                                        <div className={styles["input-with-validator"]}>
                                            <input
                                                className={styles["input-content"]}
                                                type="text"
                                                {...register("newPassword")}
                                                defaultValue={userInfo.newPassword}
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

export default ChangePassword;
