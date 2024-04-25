/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API
 * authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after a successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The default redirect if the user is not authorized to access a route.
 * @type {string}
 */
export const DEFALT_UNAUTHORIZED_REDIRECT = "/login";
