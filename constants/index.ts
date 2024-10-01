export const HOST = process.env.SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;

export const USER_ROUTES = "api/users";
export const ADD_FRIEND_ROUTE = `${USER_ROUTES}/add-friend`;
export const GET_USER_FRIENDS = `${USER_ROUTES}/friends`;

export const MATCH_ROUTES = "api/matches";
export const CREATE_MATCH_ROUTE = `${MATCH_ROUTES}/create`;
export const GET_MATCH_ROUTE = `${MATCH_ROUTES}/`;
export const GET_NEXT_QUESTION_ROUTE = `${MATCH_ROUTES}/`;
export const SUBMIT_ANSWER_ROUTE = `${MATCH_ROUTES}/`;
export const GET_ONGOING_MATCHES = `${MATCH_ROUTES}/ongoing`;
export const GET_PLAYER_BY_ID = `${MATCH_ROUTES}/get-player`;