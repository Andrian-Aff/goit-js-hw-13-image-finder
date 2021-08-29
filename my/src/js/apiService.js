const APY_KEY ='23041177-0c0b450b7629b324f32016842';
const BASE_URL ='https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';

export default class NewsApiService {
    constructor() {
    this.searchQuery = '';
    this.page = 1;
    }
    async fetchArticles() {
        const response = await fetch(`${BASE_URL}${this.searchQuery}&page=${this.page}&per_page=12&key=${APY_KEY}`)
        return await response.json();
        // .then(response => response.json())
        // .then(data => {
        //     this.page +=1;
        //     console.log(data);
        //     return data.hits;
        // })
        // .catch(eror => console.log(eror));
    }

    resetPage() {
        this.page = 1;
    };

    get query() {
       return this.searchQuery;
    };
    set query(newQuery) {
        this.searchQuery = newQuery;
    };
    incrementPage() {
        return this.page += 1;
      }
    
      returnStartPage() {
        return this.page =1;
      }
};
