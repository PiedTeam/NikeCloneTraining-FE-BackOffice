import * as yup from "yup";
import validate from "../validate.json";
export const createEmployeeSchema = yup.object({
  firstName: yup
    .string()
    .matches(new RegExp(validate.onlyCharacter), "Only Character")
    .required(),
  lastName: yup
    .string()
    .matches(new RegExp(validate.onlyCharacter), "Only Character")
    .required(),
  profileImg: yup.object(),
  role: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .matches(new RegExp(validate.onlyNumber), "Only Number")
    .max(9)
    .min(0)
    .required(),
  contractSigningDate: yup.string().datetime("date not valid").required(),
  contractTerminationDate: yup.string().datetime("date not valid").required(),
  salary: yup.number().required(),
  contractImg: yup.string().required(),
});
