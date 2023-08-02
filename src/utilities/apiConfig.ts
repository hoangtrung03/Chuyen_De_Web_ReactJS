const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apikey: '1cc28d7cb8202fa7566afa98c4asb9f4',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}
export default apiConfig