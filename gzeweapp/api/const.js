export const CONTENT_TYPE = {
  APPLICATION_JSON: 'application/json',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
};

export const API = {
  prefix: '/openapi',
};

export function getUrl(url) {
  return `${API.prefix}/${url}`;
}

