import { useState, useEffect, useCallback, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

const useForm = (callback, validateLogin, currencyValue) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [totp, setTotp] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessfullSubmiting, setSsSuccessfullSubmiting] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const { signin } = useContext(AuthContext);

  const setCredentialsToNull = () => {
    setPassword("");
    setLogin("");
    setTotp("");
  };

/*   const handleSubmit = (event) => {
    setErrors(validateLogin(login, password, totp));
    if (Object.keys(errors).length === 0) {
      signin(login, password, totp);
    }
  }; */
  useEffect(() => {
    if (
      Object.keys(errors).length ===
      0 /* &&
      password.length > 0 &&
      login.length > 0 */
      /* totp.length > 0 */
    ) {
      setDisableButton(false);
    } else setDisableButton(true);
  }, [password.length, login.length, errors, totp]);

  /*   useEffect(() => {
    if (
      Object.keys(errors).length === 0 &&
      isSubmitting &&
      password.length > 0 &&
      login.length > 0
    ) {
      setSsSuccessfullSubmiting(true);
      callback();
      setLogin('');
      setPassword('');
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, callback, password.length, login.length]); */

  return {
    login,
    setLogin,
    password,
    setPassword,
    errors,
    isSuccessfullSubmiting,
    setSsSuccessfullSubmiting,
    setErrors,
    disableButton,
    setCredentialsToNull,
    totp,
    setTotp,
  };
};

export default useForm;
