import { onFetchPicture } from './fetchPicture'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getMarkupCards } from './getMarkupCards';


const refs = {
    searchFormEl: document.querySelector("#search-form"),
    galleryEl: document.querySelector(".gallery")
}

refs.searchFormEl.addEventListener("submit", selectGallery)

function selectGallery(evt) {
    evt.preventDefault();
    const valueText = refs.searchFormEl.elements.searchQuery.value.trim();
    console.log(valueText);
    if (!valueText) {
        return;
    }
    onFetchPicture(valueText).then(response => {
        renderCards(response);
       
    }).catch(error => {
       console.error(error.stack)
     Notify.warning("Sorry, there are no images matching your search query. Please try again.");
         
    });
};

function renderCards(response) {
        const markup = getMarkupCards(response);
        refs.galleryEl.insertAdjacentHTML('beforeend', markup);
        }
