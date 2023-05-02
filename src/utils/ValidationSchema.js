import * as Yup from 'yup';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { firebaseConfig } from '../firebase';

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);

// Get Firestore instance
const db = app.firestore();

const emailExists = (message = 'Email already exists') => {
  return Yup.string().test('email-exists', message, async (value) => {
    if (!value) return true; // Skip validation if value is falsy
    const querySnapshot = await db.collection('user').where('email', '==', value).get();
    return querySnapshot.empty; // Return true if email doesn't exist in Firestore database
  });
};

const numberExists = (message = 'Phone Number already exists') => {
  return Yup.string().test('number-exists', message, async (value) => {
    if (!value) return true; // Skip validation if value is falsy
    const querySnapshot = await db.collection('user').where('cell', '==', value).get();
    return querySnapshot.empty; // Return true if email doesn't exist in Firestore database
  });
};

export const validationSchema = Yup.object().shape({
  checkEmail: Yup.boolean(),
  email: emailExists()
    .required('Email is required')
    .email('Email is invalid'),
  name: Yup.string().required('Name is required'),
  cell: numberExists()
    .required('Phone Number is required'),
    // .matches(/^(?:(\+234)|0)?([7-9][01]\d{8})$/, 'Invalid phone number format'),
  gender: Yup.string().required('Gender is required'),
  birthday: Yup.string().required('Birthday is required'),
});
