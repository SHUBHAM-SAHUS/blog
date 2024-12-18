export const API_ENDPOINTS = {
  PUBLIC: {},
  AUTH: {
    SIGN_UP: '/users',
    LOGIN: '/users',
    USERS: '/users',
    // UPDATE_USER:'',
  },
  POST: {
    GET_ALL_POSTS: '/posts',
    CREATE_POST: '/posts',
    DELETE_POST: '/posts',
    GET_USER_POSTS: '/posts',
    UPDATE_USER: '/users',
  },
  COMMENT: {
    GET_ALL_COMMENTS: '/comments',
    GET_COMMENT: '/comments',
    CREATE_COMMENT: '/comments',
    UPDATE_COMMENT: '/comments',
    DELETE_COMMENT: '/comments',
    GET_COMMENTS_FOR_POST: '/comments',
  },
  USERS: {
    GET_ALL_USERS: '/users',
    GET_USER_BY_ID: '/users',
    UPDATE_USER: '/users/',
  },
} as const;

export const BASE_API_URL = 'http://localhost:5000';
