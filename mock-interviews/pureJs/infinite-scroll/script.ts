import './styles.css';
import { getMovies, createMovieCard } from './movies';

const container = document.body.querySelector('.harness-container');

if (container) {
    container.innerHTML = `
    <div class="movie-container"></div>
    <div class="loading">....Loading</div>
`;
}

let pageNo = 1;
let fetchInProgress = false;
const movieContainer = document.querySelector('.movie-container')!;
const loadingEl = document.querySelector('.loading')!;

const loadingBuffer = 500;

const loadMovies = async (pageNo: number) => {
    fetchInProgress = true;
    loadingEl.classList.remove('hide');
    const movies = await getMovies(pageNo);

    movies.forEach((movie) => {
        const movieCardEl = createMovieCard(movie);
        movieContainer.appendChild(movieCardEl);
    });
    fetchInProgress = false;
    loadingEl.classList.add('hide');
};

loadMovies(pageNo);

movieContainer.addEventListener('scroll', (e: any) => {
    if (fetchInProgress) {
        // fetching movies in progress
        // avoid any fetches
    }
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    const curClientEndPosInPx = scrollTop + clientHeight;

    if (scrollHeight - curClientEndPosInPx <= loadingBuffer) {
        //console.log(scrollTop, scrollHeight, clientHeight);
        // start fetching
        loadMovies(pageNo++);
    }
});
