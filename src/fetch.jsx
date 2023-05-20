import axios from 'axios';

export class PixabayService {
  static async get(page, query) {
    let response;
    try {
      response = await axios.get(
        `https://pixabay.com/api/?key=34995094-3137eae5ca5d9e0be5780a27e&image_type=photo&orientation=horizontal&per_page=12&q=${query}&page=${page}`
      );
      console.log('response', response);
    } catch (error) {
      throw new Error('Awww shit here we go again....');
    }
    const totalPages = Math.ceil(response.data.totalHits / 12);
    return [response.data.hits, totalPages];
  }
}
