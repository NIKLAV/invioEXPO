export default function validateLogin(login, password, totp) {
  let errors = {};

  if (!login) {
    errors.login = 'Field is required';
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(login)) {
    errors.login = 'Invalid login';
  }
  if (!password) {
    errors.password = 'Field is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be longer';
  }
  /* if (totp.length < 4) {
    errors.totp = 'Totp must be longer';
  } */
  return errors;
}
