import * as Yup from 'yup';
export const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(25).matches(/^[A-Z][a-zA-Z]*$/, '1st letter must be capital').required("Please  enter your first name"),
    lastName: Yup.string().min(2).max(25).matches(/^[A-Z][a-zA-Z]*$/, '1st letter must be capital').required("Please  enter your last name"),
    email: Yup.string().email("Please enter a valid email").required("Please  enter your email"),
    gender: Yup.string().required("Gender is required"),
    qualification: Yup.array().required("Qualification is required"),
  
    country: Yup.string()
    .required('Country is required'),

    state: Yup.string()
    .required('State is required')
    .matches(/^(?:AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|HR|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|UP|VT|VI|VA|WA|WV|WI|WY)$/i, 'Invalid state'),

    city: Yup.string()
    .required('City is required')
    .matches(/^[a-zA-Z\s]+$/, 'Invalid city'),

    phoneNumber: Yup.string().min(10).matches(/^[0-9]{10}$/, 'Invalid phone number').required("Please  enter your Phone Number"),

    password: Yup.string().min(8).required("Please enter your password").matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$/,"Password must be 8-30 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    confirmPassword: Yup.string().required("Confirm Password should not be empty").oneOf([Yup.ref("password"), null], "Password and Confirm Password should be the same"),
})