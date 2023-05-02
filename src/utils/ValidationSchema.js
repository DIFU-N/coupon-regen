import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid'),
  name: Yup.string().required('Name is required'),
  cell: Yup.string()
    .required('Phone Number is required'),
    // .matches(/^(?:(\+234)|0)?([7-9][01]\d{8})$/, 'Invalid phone number format'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.string().required('Birthday is required'),
});
