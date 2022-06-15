import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { refs } from './index';

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

  const totalPage = Math.ceil(response.data.totalHits / per_page);

  if (page === totalPage) {
    refs.btnLoadMore.classList.add('is-hidden');
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    refs.btnLoadMore.classList.remove('is-hidden');
  }
  page += 1;

  return response.data;
}

export { onFetchPicture };
