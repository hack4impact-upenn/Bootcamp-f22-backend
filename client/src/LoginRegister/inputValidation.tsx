import {
  login,
  register,
  forgotPassword,
  resetPassword,
  googleLogin,
} from './api';

async function LoginValidation(
  email: string,
  password: string,
  setError: (a: string) => void,
) {
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!password || !email) {
    setError('empty');
    return 'empty';
  }
  if (
    !password.match(passwordRegex) ||
    !email.match(emailRegex) ||
    !(await login(email, password))
  ) {
    setError('fail');
    return 'fail';
  }
  setError('');
  return '';
}

async function GoogleLoginValidation(setError: (a: string) => void) {
  if (!(await googleLogin())) {
    setError('fail');
    return 'fail';
  }
}

async function RegisterValidation(
  email: string,
  password: string,
  confirmPassword: string,
  setError: (a: string) => void,
) {
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!password || !email || !confirmPassword) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!password.match(passwordRegex)) {
    setError('badPassword');
    return 'badPassword';
  }
  if (!(confirmPassword === password)) {
    setError('mismatch');
    return 'mismatch';
  }
  if (!(await register(email, password))) {
    setError('duplicate');
    return 'duplicate';
  }

  setError('');
  return '';
}

async function ForgotValidation(email: string, setError: (a: string) => void) {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!email) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!(await forgotPassword(email))) {
    setError('accountDNE');
    return 'accountDNE';
  }

  setError('');
  return '';
}

async function ResetValidation(
  email: string,
  password: string,
  confirmPassword: string,
  setError: (a: string) => void,
) {
  const passwordRegex = /^[a-zA-Z0-9!?$%^*)(+=._-]{6,61}$/g;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
  if (!password || !email || !confirmPassword) {
    setError('empty');
    return 'empty';
  }
  if (!email.match(emailRegex)) {
    setError('badEmail');
    return 'badEmail';
  }
  if (!password.match(passwordRegex)) {
    setError('badPassword');
    return 'badPassword';
  }
  if (!(confirmPassword === password)) {
    setError('mismatch');
    return 'mismatch';
  }
  if (!(await resetPassword(email))) {
    setError('accountDNE');
    return 'accountDNE';
  }

  setError('');
  return '';
}

export {
  LoginValidation,
  GoogleLoginValidation,
  RegisterValidation,
  ForgotValidation,
  ResetValidation,
};
