export default function validateLogin(login, password, totp) {
  let errors = {};

  if (!login) {
    errors.login = 'Field is required';
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(login)) {
    errors.login = 'Invalid login';
  }
  if (!password) {
    errors.password = 'Field is required';
  } else if (password.length < 8) {
    errors.password = 'Password must be longer';
  }
  if (!totp) {
    errors.totp = 'Field is required';
  } else if (totp.length < 4) {
    errors.totp = 'Totp must be longer';
  }
  return errors;
}
