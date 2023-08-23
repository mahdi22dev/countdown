import * as yup from "yup";
export const SingUpschema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});
export const SignInschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
