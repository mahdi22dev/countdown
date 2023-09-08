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

export const AddCountDownSchema = yup.object().shape({
  title: yup.string().required(),
  descripe: yup.string(),
  targetDate: yup
    .date()
    .transform((value, originalValue) => {
      // Attempt to parse the input value as a date
      const parsedDate = new Date(originalValue);

      // Check if the parsedDate is a valid date
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }

      // Return undefined if the input is not a valid date
      return undefined;
    })
    .required("Target date is required")
    .test("is-future-date", "Target date must be in the future", (value) => {
      // Ensure the value is not undefined (meaning it's a valid date)
      // and that it's greater than or equal to 24 hours from now
      if (value && value >= new Date().getTime() + 24 * 60 * 60 * 1000) {
        return true;
      }
      return false;
    }),
});
