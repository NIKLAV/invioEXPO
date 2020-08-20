
const setLanguage = lang => dispatch => {
   dispatch({
    type: 'SET_LANGUAGE',
    payload: lang,
  });
};
export default setLanguage;
