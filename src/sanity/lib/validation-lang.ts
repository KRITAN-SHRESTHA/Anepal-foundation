type valueType = {
  value: string;
  _type: string;
  _key: string;
}[];

export const validationLang = (value: valueType, errorMsg: string) => {
  console.log('value', value);
  if (!value) {
    return errorMsg;
  }
  //  value = [
  //   { "_key": "en", "value": "hello" },
  //   { "_key": "fr", "value": "bonjour" },
  // ]
  const hasEnglish = value[0]._key === 'en' && !!value[0].value;
  const hasSpanish = value[1]._key === 'es' && !!value[1].value;

  if (!hasEnglish) return 'English translation is required';
  if (!hasSpanish) return 'Spanish translation is required';

  return true;
};
