// @ts-ignore
import axiosClient from "./api.ts";

export const category = {
    movie: 'movie',
    tv: 'tv'
}
export const movieType= {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}
export const tvType= {
    on_the_air: 'on_the_air',
    popular: 'popular',
    top_rated: 'top_rated'
}
const tmdbApi ={
    getMovieList: (type, params) => {
        const url = 'movie'+ movieType[type]
        return axiosClient.get(url, params)
    },
    getTvList: (type, params) => {
        const url = 'tv'+ tvType[type]
        return axiosClient.get(url, params)
    },
    getVideo: (cate, id) => {
        const url = category[cate] + '/'+ id + '/videos'
        return axiosClient.get(url, {params:{}})
    },
    search: (cate, params) => {
        const url = '/search'+ category[cate];
        return axiosClient.get(url, params)
    },
    detail: (cate, id,params) => {
        const url = category[cate] + '/' +id;
        return axiosClient.get(url, params)
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' +id +'/credits';
        return axiosClient.get(url, id)
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/simlar';
        return axiosClient.get(url, id)
    },
}
export default tmdbApi;