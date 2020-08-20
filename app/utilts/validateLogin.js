import T from "i18n-react";

export default function validateLogin(login, password, totp) {
  let errors = {};

  if (!login) {
    errors.login = T.translate('t_0008');
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(login)) {
    errors.login = T.translate('t_0009');
  }
  if (!password) {
    errors.password = T.translate('t_0008');
  } else if (password.length < 8) {
    errors.password = T.translate('t_0010');
  }
  /* if (totp.length < 4) {
    errors.totp = 'Totp must be longer';
  } */
  return errors;
}
