import React, { useEffect, useRef, useState } from 'react';
import { bootstrapReactApp } from '../../../libs/react/bootstrap';

import { TMDB_API_KEY } from './constants';
import './app.css';

interface MovieData {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
}

const MovieCard = ({ movie }: { movie: MovieData }) => {
    const url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    return (
        <div className="movieCard">
            <img src={url} height={400}></img>
            <div>
                <h1>{movie.title}</h1>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};

const App = () => {
    const movieContainerRef = useRef<HTMLDivElement>(null);
    const [movies, setMovies] = useState<MovieData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const getMovies = async (page: number): Promise<MovieData[]> => {
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
    const loadMovies = async (page: number) => {
        const movies = await getMovies(page);
        setMovies((prev) => {
            return [...prev, ...movies];
        });
        setLoading(false);
    };

    useEffect(() => {
        loadMovies(page);
    }, [page]); // trigger page updates;

    const onScroll = (/*e: any*/) => {
        // need to know the total height of the view
        // how much we have scrolled
        // if we are reached the end of the viewHeight , we fetch more

        /**
         * scrollHeight ---> height of the content including the content that is hidden
         * clientHeight ---> height of the view that is visible
         * scrollTop ----> no. of pixels scrolled from top element
         *
         *     --------------------
         *    |                    |
         *    |                    |
         *  |------------------------|
         *  | |                    | |
         *  | |                    | |
         *  | |                    | |
         *  |------------------------|
         *    |                    |
         *    |                    |
         *     --------------------
         *  Outer box : scroll height
         *  Inner box : client height
         *  Top of InnerBox: scrollTop
         */

        //if moviecontainer is not available(not possible) or we are
        // still loading don't act on the scroll functionality
        if (!movieContainerRef.current || loading) return;

        const { scrollTop, clientHeight, scrollHeight } =
            movieContainerRef.current;

        const currentScrollPos = scrollTop + clientHeight; // scrollTop is top of the clientView

        /**
         * Let fetch the next page when we have some more room to scroll
         * let that be 300px  i.e  when we are 300px away from end of the original height
         * we start fetching.
         */
        const viewBuffer = 300;
        if (currentScrollPos > scrollHeight - viewBuffer) {
            // lets bring next page.
            console.log('loading next page');
            setPage(page + 1);
            setLoading(true);
        }
    };

    return (
        <>
            <div className="app">
                <h1>Demonstration of Infinite Scrolling</h1>
                {movies.length > 0 && (
                    <div
                        className="movieContainer"
                        ref={movieContainerRef}
                        onScroll={onScroll}
                    >
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie}></MovieCard>
                        ))}
                    </div>
                )}

                {loading && <div> Loading...</div>}
            </div>
        </>
    );
};
bootstrapReactApp(<App />);
