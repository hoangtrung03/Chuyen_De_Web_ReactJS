import { Button, Input } from "antd";
import React, { useCallback, useState } from "react";
//@ts-ignore
import styles from "./Login.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
//@ts-ignore
import { postUserInfo,get } from "../../utilities/api.ts";
//@ts-ignore
import {url, User} from '../Register/Register.tsx'
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { debounce } from "lodash";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import FacebookLogin from 'react-facebook-login';

export interface LoginProps {}

export interface LoginDataType {
  username: string;
  password: string;
}
export interface CurrentUserType {
  id?: number;
  username: string;
  name: string;
  roles: {
    id:number;
    name: string;
  }[]
}

const Login: React.FC<LoginProps> = (props) => {
  const { t, i18n } = useTranslation();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required'),
    password: Yup.string()
      .required('Password is required')
  });
  const { handleSubmit, register, formState: { errors } } = useForm<LoginDataType>({
    resolver: yupResolver(validationSchema)
  });
  const [redirect, setRedirect] = useState<boolean>(false)
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await postUserInfo(`${url}api/auth/signin`, data)
    .catch(error => {
      // console.log("Login fail");
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      return;
    }
    );
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("tokenType", response.tokenType);
    
    const checkMe: {data: CurrentUserType} = await get(`${url}api/user/me`, {headers:{
      authorization: `${response.tokenType} ${response.accessToken}`
    }})
    const a = localStorage.setItem("userInfo", JSON.stringify(checkMe.data.roles[0].name))
    localStorage.setItem("userId", JSON.stringify(checkMe.data.id))
    console.log(a);
    
    if (checkMe.data.roles[0].name === "ROLE_ADMIN") {
      window.location.href="/admin"
    }else if(checkMe.data.roles[0].name === "ROLE_USER"){
      window.location.href="/"
    }
    
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Login Successfully',
      // footer: '<a href="">Why do I have this issue?</a>'
    })
  };

  const responseFacebook = (response) => {
    console.log(response);
    navigate(`/register/${response.name}/${response.email}`)
  }

  return (
    <div className={styles["login-container"]}>
      <div className={styles["login-form"]}>
        <h1>{t('login.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <label>{t('login.username')}</label>
          <input
            type="text"
            {...register("username")}
            placeholder={t("login.placehoderuser")}
            onChange={(e) => setUsername(e.target.value)}
            className={classNames(`form-control ${errors.username ? 'is-invalid' : ''}`, styles["form-control"])}
          />
          <div className="invalid-feedback">{errors.username?.message}</div>

          <label>{t('login.password')}</label>
          <input
            type="password"
            {...register("password")}
            placeholder={t('login.placehoderpassword')}
            onChange={(e) => setPassword(e.target.value)}
            className={classNames(`form-control ${errors.password ? 'is-invalid' : ''}`, styles["form-control"])}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <Link to="/forgotpassword">{t('login.forgotpass')}</Link>
          <Button htmlType="submit" type="primary">Submit</Button>

          <FacebookLogin
            appId="1227239494774329"
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass={styles["facebook"]}
            icon="fa-facebook"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
