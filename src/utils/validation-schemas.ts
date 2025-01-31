import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept Terms & Conditions')
});
