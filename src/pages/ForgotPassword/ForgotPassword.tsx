import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
//@ts-ignore
import styles from "./ForgotPassword.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
//@ts-ignore
import { postUserInfo, get } from "../../utilities/api.ts";
//@ts-ignore
import { url, User } from '../Register/Register.tsx';
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
//@ts-ignore    
import {post} from '../../utilities/api.ts'
import * as Yup from 'yup';
import { debounce } from "lodash";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useTranslation } from "react-i18next";
import classNames from "classnames";
//@ts-ignore
import { ResponseStatus } from "../Register/Register.tsx";

export interface ForgotPasswordProps { }

export interface ForgotPasswordDataType {
    email: string;
}
export interface CurrentUserType {
    id?: number;
    username: string;
    name: string;
    roles: {
        id: number;
        name: string;
    }[]
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
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
    const { handleSubmit, register, formState: { errors } } = useForm<ForgotPasswordDataType>({
        resolver: yupResolver(validationSchema)
    });
    const [redirect, setRedirect] = useState<boolean>(false)
    const navigate = useNavigate()
    const onSubmit: SubmitHandler<User> = async (data) => {
        const response = await post(`${url}api/auth/forgotpassword`, data)
            .catch(error => {
                console.log("Login fail");
                return;
            }
            );
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("tokenType", response.tokenType);

        const checkMe: { data: CurrentUserType } = await get(`${url}api/user/me`, {
            headers: {
                authorization: `${response.tokenType} ${response.accessToken}`
            }
        })
        const a = localStorage.setItem("userInfo", JSON.stringify(checkMe.data.roles[0].name))
        localStorage.setItem("userId", JSON.stringify(checkMe.data.id))
        console.log(a); 
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
    return (
        <div className={styles["forgot-container"]}>
            <div className={styles["forgot-form"]}>
                <h1 className={styles["forgot-title"]}>{t('forgotpass.title')}</h1>
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <label className={styles["forgot-label"]}>{t('forgotpass.email')}</label>
                    <input
                        type="email"
                        {...register("email")}
                        placeholder={t("forgotpass.placehoderEmail")}
                        onChange={(e) => checkValidEmail(e.target.value)}
                        className={classNames(`form-control ${errors.email ? 'is-invalid' : ''}`, styles["form-control"])}
                    />
                    {validEmail.field !== "email" && <div style={{ paddingLeft: "20px", color: "red" }}>{validEmail.message}</div>}
                    <div className="invalid-feedback">{errors.email?.message}</div>
                    <Button htmlType="submit" type="primary" disabled={disable}>{t("forgotpass.submit")}</Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
