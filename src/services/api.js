//url da api /movie/now_playing?api_key=d0313c3a7bffc695e8bc3edecf07bf94&language=pt-BR
//base da url https://api.themoviedb.org/3/

import axios from "axios";
const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});
export default api; 