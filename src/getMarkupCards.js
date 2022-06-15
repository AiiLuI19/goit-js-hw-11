export function getMarkupCards(container, response) {
  if (!response.hits === 0) {
    return;
  }

  const markup = response.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
 <a class="link" href="${largeImageURL}" target=_self> 
 <img class="img"src="${webformatURL}" alt="${tags}" loading="lazy"/>
 <div class="info">
    <p class="info-item">
      <b>Likes</b> <br> 
     <b class="bold-text">${likes}</b>
    </p>
    <p class="info-item">
       <b>Views</b> <br> 
        <b class="bold-text">${views}</b>
    </p>
    <p class="info-item">
      <b>Comments</b> <br> 
        <b class="bold-text">${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads</b> <br> 
        <b class="bold-text">${downloads}</b>
    </p>
  </div>
 </a>
  
</div>
`
    )
    .join('');
  container.insertAdjacentHTML('beforeend', markup);
}
