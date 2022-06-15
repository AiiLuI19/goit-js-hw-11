import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com';
const API_KEY = '28000983-d0b2a085634fa0bb803984db3';
const per_page = 40;
let page = 1;

async function onFetchPicture(name, isNewRequest) {
  if (isNewRequest) {
    page = 1;
  }
  const response = await axios.get('/api/', {
    params: {
      key: API_KEY,
      q: `${name}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: per_page,
      page,
    },
  });
  if (!response) {
    return;
  }
  page += 1;

  return response.data;
}

export { onFetchPicture };
