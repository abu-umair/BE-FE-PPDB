import React, { useState, lazy, Suspense } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import AuthService from "./../../services/auth.service";
import { useDispatch } from "react-redux";
import { userLogin } from "./../../features/userSlice";
import { CustomToast, Toast } from './../../utils/Toast';

const EyeIcon = lazy(() => import("@heroicons/react/24/solid/EyeIcon"));
const EyeSlashIcon = lazy(() => import("@heroicons/react/24/solid/EyeSlashIcon"));

export const SignIn = React.memo(() => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = { id: "", password: "" };
  const validationSchema = yup.object({
    id: yup.string().required("user id is a required field").trim(),
    password: yup.string().required().trim().min(6),
  });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const onSubmit = async (values) => {
    try {
      const parts = values.id.split("-");
      if (parts.length !== 2) {
        CustomToast({ message: "Format salah tidak valid", type: "error" });
      } else {
        const prefix = parts[0].toLowerCase();
        if (prefix === "adz") {
          const idUser = parts[1];
          const response = await AuthService.login(idUser, values.password);

          const userInfo = {
            userId: response.id,
            displayName: response.name,
            email: response.email,
            emailVerifiedAt: response.email_verified_at,
            photoURL: response.image,
            token: response.token,
            roles: response.roles,
          };

          dispatch(userLogin(userInfo));
          CustomToast({ message: "Sign In Success!", type: "success" });
        } else {
          CustomToast({ message: "Tanda pengenal tidak valid", type: "error" });
        }
      }
    } catch (err) {
      CustomToast({ message: "Sign Failed", type: "error" });
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-gray-50">
      <Toast />
      <div className="w-full lg:w-3/5 flex flex-col items-center">
        <div className="text-center">
          <img
            src="/img/abudzar.png"
            height={100}
            width={100}
            alt="Logo Abu Dzar"
            className="mx-auto mb-5"
            loading="lazy"
          />
          <Typography variant="h2" className="font-bold mb-4">
            Masuk Akun PPDB Abu Dzar
          </Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Masukan User ID dan password untuk masuk.
          </Typography>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {props => (
            <Form className="mt-8 w-11/12 max-w-md">
              <div className="mb-6 flex flex-col gap-6">
                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  User ID<span className='text-pink-600 font-black'> *</span>
                </Typography>
                <Field name="id">
                  {({ field }) => (
                    <Input
                      {...field}
                      size="lg"
                      placeholder="ADZ-122"
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  )}
                </Field>
                <ErrorMessage name="id">
                  {error => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                </ErrorMessage>

                <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                  Password<span className='text-pink-600 font-black'> *</span>
                </Typography>
                <Field name="password">
                  {({ field }) => (
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        size="lg"
                        placeholder="********"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={togglePasswordVisibility}
                      >
                        <Suspense fallback={<div>...</div>}>
                          {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                          )}
                        </Suspense>
                      </button>
                    </div>
                  )}
                </Field>
                <ErrorMessage name="password">
                  {error => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                </ErrorMessage>
              </div>
              <div className="mb-6 flex flex-col gap-6">
                  <Link to="https://wa.link/1f4a9z" className="text-gray-900 font-medium text-sm text-right mt-[-10px]">Lupa user id/password ?</Link>
              </div>
              <Button
                className="mt-6 bg-[#282464]"
                fullWidth
                type="submit"
                disabled={props.isSubmitting || !props.isValid}
              >
                {props.isSubmitting ? "Please Wait" : "Sign In"}
              </Button>

              <Typography variant="paragraph" className="text-center text-gray-900 font-normal mt-4">
                Belum mendaftar?
                <Link to="/sign-up" className="text-gray-900 ml-1 font-bold">Buat Akun</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:block w-2/5 h-full">
        <img
          src="/img/banner-depan.jpg"
          className="h-full w-full object-cover"
          loading="lazy"
          alt="Banner Depan"
        />
      </div>
    </section>
  );
});

export default SignIn;
