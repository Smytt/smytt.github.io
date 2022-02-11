var tmdb = (() => {

    const BASE = 'https://api.themoviedb.org/3';

    const API_CMD = '?api_key=';
    const API_KEY = 'b75a086ec6e11c142e5abb302788ad20';

    const SEARCH_MOVIE = '/search/movie';
    const FIND_ONE_MOVIE = '/movie/';
    const FIND_ONE_ACTOR = '/person/';
    const CREDITS = '/credits';
    const DISCOVER = '/discover/movie'

    const QUERY_CMD = '&query=';
    const PAGE_CMD = '&page=';
    const SORT_CMD = '&sort_by=popularity.desc';

    var search = (title, pageNum) => {
        $.ajax({
            type: 'GET',
            url: BASE + SEARCH_MOVIE + API_CMD + API_KEY + QUERY_CMD + title + PAGE_CMD + pageNum,
            success: (response) => {
                render.results(response);
            },
            error: () => {
                console.log("Could not retrieve movie list");
            },
        })
    }

    var findActorById = (id) => {
        $.ajax({
            type: 'GET',
            url: BASE + FIND_ONE_ACTOR + id + API_CMD + API_KEY,
            success: (response) => {
                render.actor(response);
            },
            error: () => {
                console.log("Could not retrieve actor details");
            },
        })
    }

    var findMovieById = (id) => {

        var requestMovieDetails = (response) => {
            $.ajax({
                type: 'GET',
                url: BASE + FIND_ONE_MOVIE + id + API_CMD + API_KEY,
                success: (data) => {
                    render.movie(data, response);
                },
                error: () => {
                    console.log("Could not retrieve movie details");
                },
            })
        }

        var requestCastAndCrew = () => {
            $.ajax({
                type: 'GET',
                url: BASE + FIND_ONE_MOVIE + id + CREDITS + API_CMD + API_KEY,
                success: requestMovieDetails,
                error: () => {
                    console.log("Could not retrieve movie cast and crew");
                },
            })
        }

        requestCastAndCrew();

    }

    var getRandomId = (page, item) => {
        $.ajax({
            type: 'GET',
            url: BASE + DISCOVER + API_CMD + API_KEY + SORT_CMD + PAGE_CMD + page,
            success: (data) => {
                var randomId = data['results'][item]['id'];
                findMovieById(randomId);
            },
            error: () => {
                console.log("Could not retrieve total movies count, can't generate random id");
            },
        })
    }

    return {
        search,
        findMovieById,
        findActorById,
        getRandomId
    }
})();