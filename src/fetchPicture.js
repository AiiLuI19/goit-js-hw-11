

// import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api';
// // const API_KEY = '28000983-d0b2a085634fa0bb803984db3';


// export function onFetchPicture(name) {
//     return axios.get(`/?key=28000983-d0b2a085634fa0bb803984db3&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)

//     //     params: {
//     //         key: '28000983-d0b2a085634fa0bb803984db3',
//     //         q: `${name}`,
//     //     image_type: "photo",
//     //     orientation: "horizontal",
//     //     safesearch: true,
//     //     }
//     // })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.statusText)
//             }
//             return response.json();
//         });
// };
        
const BASE_URL = 'https://pixabay.com/api'
export function onFetchPicture(name) {
    return fetch(
    `${BASE_URL}/?key=28000983-d0b2a085634fa0bb803984db3&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.message);
    }
    return response.json();
  });
 }
