const KEY_API = '23041177-0c0b450b7629b324f32016842';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';


export default class GalleryApi {
  constructor() {
    this.page = 1;
    this.inputValue = '';
 }

  async fetchPictures() {
    const response = await fetch(`${BASE_URL}${this.inputValue}&page=${this.page}&per_page=12&key=${KEY_API}`);
    return await response.json();
  } 
  
   getPictures(inputValue) {
    return this.fetchPictures()

  }
  setInputValue (value) {
    this.inputValue = value;
  }

  incrementPage() {
    return this.page += 1;
  }

  returnStartPage() {
    return this.page = 1;
  }
}
 



  // get inputValue() {
  //   this.query = query;
  // }
  // set inputValue(newQuery) {
  //   this.query = newQuery;
  // }



















// export default class Gallery {
//   constructor(page = 1, inputValue = '', ) {
//     this.page = page;
//     this.inputValue = inputValue;
//  }

//   async fetchPictures() {
//     const response = await fetch(`${BASE_URL}${this.inputValue}&page=${this.page}&per_page=12&key=${KEY_API}`);
//     return await response.json();
//   } 
  
//    getPictures(inputValue) {
//     return this.fetchPictures()

//   }
//   setInputValue (value) {
//     this.inputValue = value;
//   }

//   incrementPage() {
//     return this.page += 1;
//   }

//   returnStartPage() {
//     return this.page = 1;
//   }
// }

