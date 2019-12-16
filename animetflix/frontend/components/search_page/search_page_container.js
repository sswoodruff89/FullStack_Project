import { connect } from 'react-redux';
import { requestSearchedMovies } from "../../actions/movies_actions";
import {sortBySearch} from "../../reducers/sort_selector";
import SearchPage from "./search_page";

const msp = (state, ownProps) => {
  let {search} = state.entities;
  // if (search.length > 0) {
  //   movies = search.map((searchId) => {
  //     return state.entities.movies[searchId];
  //   });
  //   movies = sortBySearch(movies, ownProps.match.params.searchQuery);
  // }

  let movieIds = sortBySearch(state.entities.movies, search, ownProps.match.params.searchQuery);
  return {
    // movies: movies,
    // matches: "",
    movieIds,
    errors: state.errors.search
  };
};

const mdp = dispatch => {
  return {
    requestSearchedMovies: (searchQuery) => {
      dispatch(requestSearchedMovies(searchQuery));
    }
  };
};


export default connect(msp, mdp)(SearchPage);