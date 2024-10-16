import storeHelper from '../store/helper';

export const getUrl = (key, params = {}) => {
  let url = storeHelper.getUrl(key);

  if (!url) console.error('not found api key:', key);

  if (url && params && Object.keys(params).length) {
    for (const param in params) {
      url = url.replace(`{${param}}`, params[param]);
    }
  }
  return url;
}
