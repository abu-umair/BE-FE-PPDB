import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import AuthService from "./../../services/auth.service";
import { CustomToast, Toast } from './../../utils/Toast';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerInput } from "./../../features/registerSlice";




export function SignUp({ onNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    photo: null,
  };
  const validationSchema = yup.object({
    name: yup.string().required().trim(),
    email: yup.string().required().email().trim(),
    password: yup.string().required().trim().min(6),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Password must match"),
    photo: yup.mixed()
      .nullable()
      .test(
        'fileSize',
        'Ukuran file terlalu besar, maksimal 1 MB',
        value => !value || (value && value.size <= 1024 * 1024)
      )
  });


  const onSubmit = async (values) => {
    console.log(values);
    onNext(values); // Kirim data ke form selanjutnya
    // try {
    //   await AuthService.register(
    //     values.name,
    //     values.email,
    //     values.password,
    //     values.photo
    //   ).then(
    //     (response) => {
    //       console.log(response);
    //       const registerInfo = {
    //         displayName: 'asdf',
    //         email: 'asdf',
    //         password: 'asdf',
    //         photoURL: 'asdfasf',
    //       };
    //       dispatch(registerInput(registerInfo));//registerInfo:inport ke payload

    //       // Notifification success
    //       CustomToast({ message: "Sign Success!", type: "success" });

    //       setTimeout(() => {
    //         // navigate("/sign-in");
    //         navigate("/pemilihan-jenjang");
    //         window.location.reload();
    //       }, 2000);

    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // } catch (err) {
    //   console.log(err);

    //   CustomToast({ message: "Sign Failed", type: "error" });

    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 2000);
    // }
  }
  return (
    <section className="m-8 flex">
      <Toast />
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/banner-daftar.jpg"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Daftar Akun PPDB ABUDZAR</Typography>
        </div>
        <Formik initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        // onSubmite={onSubmit}
        >
          {props => {
            return (
              <Form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Nama <span className='text-pink-600 font-black'> *</span>
                  </Typography>
                  <Field name="name">
                    {({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="Masukan nama"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="name">
                    {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                  </ErrorMessage>

                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Email <span className='text-pink-600 font-black'> *</span>
                  </Typography>
                  <Field name="email">
                    {({ field }) => (
                      <Input
                        {...field}
                        size="lg"
                        placeholder="Masukan email, contoh : name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="email">
                    {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                  </ErrorMessage>

                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Password<span className='text-pink-600 font-black'> *</span>
                  </Typography>
                  <Field name="password">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="password">
                    {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">{error}</p>)}
                  </ErrorMessage>

                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Konfirmasi Password<span className='text-pink-600 font-black'> *</span>
                  </Typography>
                  <Field name="confirmPassword">
                    {({ field }) => (
                      <Input
                        {...field}
                        type="password"
                        size="lg"
                        placeholder="********"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="confirmPassword">
                    {(error) => (<p className="text-sm text-pink-600 -mt-4 ml-3">confirm password is a required field and must be the same as the password</p>)}
                  </ErrorMessage>

                  <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                    Upload Photo
                  </Typography>
                  <div className="grid grid-cols-1 space-y-2">
                    {/* <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label> */}
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                        <div className="h-full w-full text-center flex flex-col items-center justify-center items-center  ">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                            <img className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image" />
                          </div>
                          {/* <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p> */}
                          <p className="pointer-none text-gray-500 "><a id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                        </div>
                        <input name="photo" accept="image/png, image/jpg, image/jpeg" type="file" className="hidden" onChange={(e) =>
                          props.setFieldValue(
                            "photo",
                            e.target.files[0]
                          )
                        } />
                      </label>
                    </div>
                    <p className="text-sm text-gray-300">
                      <span>File types of images and max size of 1 MB</span>
                    </p>
                  </div>




                </div>
                {/* <Checkbox
                  required
                  label={
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-start font-medium"
                    >
                      I agree the&nbsp;
                      <a
                        href="#"
                        className="font-normal text-black transition-colors hover:text-gray-900 underline"
                      >
                        Terms and Conditions
                      </a>
                    </Typography>
                  }
                  containerProps={{ className: "-ml-2.5" }}
                /> */}
                <Button
                  // color="red"
                  className="mt-6 bg-[#282464]"
                  fullWidth
                  type="submit"
                  disabled={props.isSubmitting || !props.isValid}
                // loading={props.isSubmitting ? true : false}
                >
                  {props.isSubmitting ? "Mohon Tunggu" : "Selanjutnya"}

                </Button>

                {/* <div className="space-y-4 mt-8">
                  <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1156_824)">
                        <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                        <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                        <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                        <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                      </g>
                      <defs>
                        <clipPath id="clip0_1156_824">
                          <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Sign in With Google</span>
                  </Button>
                  <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
                    <img src="/img/twitter-logo.svg" height={24} width={24} alt="" />
                    <span>Sign in With Twitter</span>
                  </Button>
                </div> */}
                <Typography variant="paragraph" className="text-center text-gray-900 font-normal mt-4">
                  Sudah punya akun?
                  <Link to="/sign-in" className="text-gray-900 ml-1 font-bold">Masuk disini</Link>
                </Typography>
              </Form>)
          }}
        </Formik>

      </div>
    </section>
  );
}

export default SignUp;
