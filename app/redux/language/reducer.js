

const language = (state = 'eng', { payload, type }) => {
  switch (type) {
    case 'SET_LANGUAGE':
      return payload;
    default:
      return state;
  }
};
export default language;
