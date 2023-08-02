import React, { useCallback, useEffect, useState } from "react";
import { Input, Select, Checkbox, Button, Form } from "antd";
//@ts-ignore
import styles from "./Register.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormProvider } from "rc-field-form";
//@ts-ignore
import { post, get } from "../../utilities/api.ts";
import { debounce } from 'lodash'
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'
import { useTranslation } from "react-i18next";

export interface User {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ResponseStatus {
  data: {
    success: boolean;
    message: string;
  }
}
export const url: string = "http://localhost:8080/";
export interface RegisterProps { }
export const Register: React.FC<RegisterProps> = (props) => {
  const { userName, email } = useParams();
  const { t, i18n } = useTranslation();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Fullname is required'),
    username: Yup.string()
      .required('Username is required')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must not exceed 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/, "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
  });
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<User>({
    resolver: yupResolver(validationSchema)
  });
  const [disable, setDisable] = useState<boolean>(false);
  const [valid, setValid] = useState<{ field: string, message: string }>({ field: "", message: "" })
  const [validEmail, setValidEmail] = useState<{ field: string, message: string }>({ field: "", message: "" })
  const navigate = useNavigate()
  const [user, setUser] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    console.log("userName", userName);
    console.log("email", email);
    if (userName) {
      setValue("username", userName);
      setValue("name", userName);
    }
    if (email) {
      setValue("email", email);
    }
  }, [userName]);

  //call api
  const onSubmit: SubmitHandler<User> = async (data) => {
    const response = await post(`${url}api/auth/signup`, data
    );
    if (data) {
      // console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Register Successfully',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
    navigate("/login")
  };

  //check valid user name
  // const debounceValidName = useCallback(debounce( (nextValue) =>  get(`${url}api/auth/checkvalidname?name=${nextValue}`), 100), [])
  const checkValidName = async (name: string) => {
    const checkName: ResponseStatus = await get(`${url}api/auth/checkvalidname?name=${name}`)
    // const checkName = await debounceValidName(name)
    console.log("checkname:", checkName.data.success);
    if (!checkName.data.success) {
      setDisable(true);
      setValid({ field: "name", message: checkName.data.message });
    } else {
      setValid({ field: "", message: "" })
      setDisable(false)
    }
  }

  //check valid email
  const checkValidEmail = async (email: string) => {
    const checkEmail: ResponseStatus = await get(`${url}api/auth/checkvalidemail?email=${email}`)
    // console.log("checkemail:", checkEmail.data.success);
    if (!checkEmail.data.success) {
      setDisable(true);
      setValidEmail({ field: "email", message: checkEmail.data.message });
      // console.log("validEmail:", validEmail);

    } else {
      setValidEmail({ field: "", message: "" })
      setDisable(false)
    }
  }

  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-form"]}>
        <h1>{t('register.title')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <label>{t('register.name')} <span style={{ color: "red" }}>*</span></label>
          <input
            id={styles["form-control"]}
            type="text"
            {...register("name")}
            placeholder={t("register.placeholderName")}
            className={`form-control ${errors.name ? 'is-invalid' : ''} `}
          />
          <div className="invalid-feedback">{errors.name?.message}</div>

          <label>{t('register.username')} <span style={{ color: "red" }}>*</span></label>
          <input
            id={styles["form-control"]}
            type="text"
            {...register("username")}
            placeholder={t("register.placeholderUsername")}
            onChange={(e) => checkValidName(e.target.value)}
            className={`form-control ${errors.username ? 'is-invalid' : ''} `}
          />
          {valid.field === "name" && <div style={{ paddingLeft: "20px", color: "red" }}>{valid.message}</div>}
          <div className="invalid-feedback">{errors.username?.message}</div>
          <label>{t('register.email')} <span style={{ color: "red" }}>*</span></label>
          <input
            id={styles["form-control"]}
            type="text"
            {...register("email")}
            placeholder={t("register.placeholderEmail")}
            onChange={(e) => checkValidEmail(e.target.value)}
            className={`form-control ${errors.email ? 'is-invalid' : ''} `}
          />
          {validEmail.field === "email" && <div style={{ paddingLeft: "20px", color: "red" }}>{validEmail.message}</div>}
          <div className="invalid-feedback">{errors.email?.message}</div>
          <label>{t('register.password')} <span style={{ color: "red" }}>*</span></label>
          <input
            id={styles["form-control"]}
            type="password"
            {...register("password")}
            placeholder={t("register.placeholderPassword")}
            className={`form-control ${errors.password ? 'is-invalid' : ''} `}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
          <label>{t('register.confirmpassword')} <span style={{ color: "red" }}>*</span></label>
          <input
            id={styles["form-control"]}
            type="password"
            {...register("confirmPassword")}
            placeholder={t("register.placeholderConfirmPassword")}
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''} `}
          />
          <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          <Button htmlType="submit" type="primary" disabled={disable}>Submit</Button>
        </form>
      </div>
    </div>
  );
};
export default Register;
