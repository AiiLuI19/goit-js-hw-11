// import { onFetchPicture } from './fetchPicture';
import { onFetchPicture } from './fetchPicture';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getMarkupCards } from './getMarkupCards';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

const refs = {
  searchFormEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.searchFormEl.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', addPageMore);

async function selectGallery(isNewRequest, page) {
  try {
    const valueText = refs.searchFormEl.elements.searchQuery.value.trim();

    if (!valueText) {
      return;
    }
    const response = await onFetchPicture(valueText, isNewRequest);
    if (isNewRequest) {
      page = 1;
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    getMarkupCards(refs.galleryEl, response);
    let gallery = new SimpleLightbox('.gallery a', {});
    if (response.total === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    function isLastPage(response) {
      const currentPage = page;
      const totalPages = Math.ceil(response.totalHits / 39);

      return currentPage === totalPages ? false : true;
    }
    if (isLastPage(response)) {
      refs.btnLoadMore.classList.add('is-hidden');
      Notify.warning('OK');
    }
    // if (page === Math.ceil(response.totalHits / response.per_page)) {
    //   refs.btnLoadMore.classList.add('is-hidden');
    //   Notify.warning('OK');
    // }
  } catch (error) {
    console.log(error);
  }
}
// function isLastPage(response) {
//   const currentPage = page;
//   const totalPages = Math.ceil(response.data.totalHits / per_page);

//   return currentPage === totalPages ? false : true;
// }

function onSearch(evt) {
  evt.preventDefault();
  refs.galleryEl.innerHTML = '';
  selectGallery(true);
  showBtnLoadMore();
}
function addPageMore() {
  toHideBtnLoadMore();
  selectGallery(false);
}

function toHideBtnLoadMore() {
  refs.btnLoadMore.classList.add('is-hidden');
  refs.btnLoadMore.classList.remove('is-hidden');
}
function showBtnLoadMore() {
  refs.btnLoadMore.classList.remove('is-hidden');
}
