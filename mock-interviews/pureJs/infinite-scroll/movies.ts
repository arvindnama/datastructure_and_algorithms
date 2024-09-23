export const TMDB_API_KEY =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTRiNTk5Njc3Mzk0Y2Q3OWE1ZmZmYWY2MzZlMWU0MCIsIm5iZiI6MTcyNDg3MTk4OC41NjE5MDMsInN1YiI6IjY2Y2Y3NDE0NmVhNDk0MTQzN2EwYTc4NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3uv-0Vnt6jgueVLw2IBVhB4htbjbKY2puFrvF-j7suk';

export interface MovieData {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

export const getMovies = async (page: number): Promise<MovieData[]> => {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
            headers: [
                ['Accept', 'application/json'],
                ['Authorization', `Bearer ${TMDB_API_KEY}`],
            ],
        }
    );
    return res.json().then((data) => data.results as MovieData[]);
};

export const getTitleImageUrl = (movie: MovieData) =>
    `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

export const createMovieCard = (movie: MovieData): Element => {
    const movieCard = document.createElement('div');
    movieCard.innerHTML = `
       <div class="movie-card">
            <img src = ${getTitleImageUrl(movie)} />
            <div class="movie-details">
                <div>
                   <span class="label">Name: </span>
                   <span>${movie.title}</span>
                </div>
                <div>
                    <span class="label">Overview: </span>
                    <span>${movie.overview}</span>
                </div>
            </div>
       </div>
    `;
    return movieCard;
};
