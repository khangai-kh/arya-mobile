import * as Yup from 'yup';

export const userValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  termsAccepted: Yup.boolean().oneOf([true], 'You must accept Terms & Conditions')
});

export const memberValidationSchema = Yup.object().shape({
  // Step 1: Personal
  full_name: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters')
    .required('Full name is required'),
  email: Yup.string()
    .nullable() // Allow null to match UserModel
    .email('Invalid email')
    .required('Email is required'),
  linkedin_url: Yup.string()
    .url('Invalid URL')
    .matches(/linkedin\.com/, 'Must be a valid LinkedIn URL')
    .required('LinkedIn URL is required'),
  date_of_birth: Yup.string()
    .nullable() // Allow null to match UserModel
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Date of birth must be in DD.MM.YYYY format')
    .required('Date of birth is required'),
  address: Yup.string()
    .nullable() // Allow null to match UserModel
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters')
    .required('Address is required'),

  // Step 2: Career (nested under carrier)
  carrier: Yup.object().shape({
    is_company_owner: Yup.boolean()
      .required('Please select an option'),
      company_name: Yup.string().when('is_company_owner', {
        is: true,
        then: (schema) => schema.required('Company name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    industry: Yup.object()
      .shape({
        id: Yup.number().notRequired(), // id is not collected in the form
        name: Yup.string()
          .min(2, 'Industry must be at least 2 characters')
          .max(50, 'Industry must not exceed 50 characters')
          .required('Industry is required'),
      })
      .required('Industry is required'),
    sector: Yup.object()
      .shape({
        id: Yup.number().notRequired(), // id is not collected in the form
        name: Yup.string()
          .min(2, 'Sector must be at least 2 characters')
          .max(50, 'Sector must not exceed 50 characters')
          .required('Sector is required'),
      })
      .required('Sector is required'),
    title: Yup.string()
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must not exceed 50 characters')
      .required('Title is required'),
    area_of_expertise: Yup.string()
      .min(2, 'Area of expertise must be at least 2 characters')
      .max(100, 'Area of expertise must not exceed 100 characters')
      .required('Area of expertise is required'),
  }),

  // Step 3: Additional
  isInternational: Yup.boolean()
    .required('Please select an option'),
  motivation: Yup.string()
    .min(10, 'Motivation must be at least 10 characters')
    .max(500, 'Motivation must not exceed 500 characters')
    .required('Motivation is required'),
  profileType: Yup.string()
    .min(2, 'Profile type must be at least 2 characters')
    .max(50, 'Profile type must not exceed 50 characters')
    .required('Profile type is required'),
  termsAccepted: Yup.boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required('You must accept the terms and conditions'),
});

export const startupValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slogan: Yup.string().required('Slogan is required'),
  description: Yup.string().required('Description is required'),
  stage: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Stage is required').required('Stage is required'),
    label: Yup.string().required(),
  })
  .required('Stage is required'),
  totalInvestment: Yup.string().required('Total investment is required'),
  startupType: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Type is required').required('Type is required'),
    label: Yup.string().required(),
  })
  .required('Type is required'),
  fundingRoundType: Yup.object()
  .shape({
    value: Yup.number().min(1, 'Funding round is required').required('Funding round is required'),
    label: Yup.string().required(),
  })
  .required('Funding round is required'),
  logo: Yup.string().optional(),
  currency:Yup.object()
  .shape({
    value: Yup.number().min(1, 'Currency is required').required('Currency is required'),
    label: Yup.string().required(),
  })
  .required('Currency is required'),
});
