import * as yup from 'yup';
import { EMAIL_REGEXP, PASSWORD_REGEXP, NAME_REGEXP } from '../utils/regex.js';

const email = yup
  .string()
  .required('Email is required')
  .matches(EMAIL_REGEXP, 'Enter a valid email address');

const password = yup
  .string()
  .required('Password is required')
  .matches(PASSWORD_REGEXP, 'Password must be 8-64 characters long, with no spaces');

const name = yup
  .string()
  .required('Name is required')
  .matches(NAME_REGEXP, 'Name must be 2-32 characters long');

export const loginSchema = yup.object({ email, password });

export const registerSchema = yup.object({ name, email, password });
