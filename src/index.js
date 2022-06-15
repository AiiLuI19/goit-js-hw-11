// import { onFetchPicture } from './fetchPicture';
import { onFetchPicture } from './fetchPicture';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getMarkupCards } from './getMarkupCards';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

export const refs = {
  searchFormEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

refs.searchFormEl.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', addPageMore);

let gallery = new SimpleLightbox('.gallery a', {});

async function selectGallery(isNewRequest) {
  try {
    const valueText = refs.searchFormEl.elements.searchQuery.value.trim();

    if (!valueText) {
      return;
    }

    const response = await onFetchPicture(valueText, isNewRequest);

    if (isNewRequest && response.totalHits !== 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
    }
    getMarkupCards(refs.galleryEl, response);
    gallery.refresh();
    if (response.total === 0) {
      Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      showBtnLoadMore(false);
    }
  } catch (error) {
    console.log(error);
  }
}

function onSearch(evt) {
  evt.preventDefault();
  refs.galleryEl.innerHTML = '';
  selectGallery(true);
  showBtnLoadMore(false);
}
function addPageMore() {
  showBtnLoadMore(false);
  selectGallery(false);
}

function showBtnLoadMore(flag) {
  if (flag) {
    refs.btnLoadMore.classList.remove('is-hidden');
  } else {
    refs.btnLoadMore.classList.add('is-hidden');
  }
}
