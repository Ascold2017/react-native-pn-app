import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Axios from 'axios';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_LIST = 'SET_LIST';
export const SET_TYPE = 'SET_TYPE';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_PAGE = 'SET_PAGE';
export const SET_SORTING = 'SET_SORTING';

const initialState = {
  sorting: 'latest',
  page: 1,
  search: '',
  type: 1,
  list: [],
  isLoading: false,
};

export const submitSearch = () => async (dispatch, getState) => {
  dispatch({type: SET_IS_LOADING, payload: true});
  const {search, page, type, sorting} = getState();
  console.log(sorting);
  const {
    data: {videos},
  } = await Axios.get(
    `https://www.eporner.com/api/v2/video/search/?query=${search}&per_page=10&page=${page}&thumbsize=big&order=${sorting}&gay=${type}&lq=1&format=json`,
  );

  dispatch({type: SET_LIST, payload: videos});
};

export const nextPage = () => async (dispatch, getState) => {
  dispatch({type: SET_PAGE, payload: getState().page + 1});
  dispatch(submitSearch());
};

export const setType = type => async dispatch => {
  dispatch({type: SET_PAGE, payload: 1});
  dispatch({type: SET_TYPE, payload: type});
  dispatch(submitSearch());
};

export const submitSorting = sorting => async dispatch => {
  console.log(sorting);
  dispatch({type: SET_SORTING, payload: sorting});
  dispatch({type: SET_PAGE, payload: 1});
  dispatch(submitSearch());
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING: {
      return {...state, isLoading: action.payload};
    }
    case SET_LIST: {
      return {...state, list: [...action.payload], isLoading: false};
    }
    case SET_SEARCH: {
      return {...state, search: action.payload};
    }
    case SET_PAGE: {
      return {...state, page: action.payload};
    }
    case SET_TYPE: {
      return {...state, type: action.payload};
    }
    case SET_SORTING: {
      return {...state, sorting: action.payload};
    }
    default:
      return state;
  }
};

export const store = createStore(rootReducer, applyMiddleware(thunk));
