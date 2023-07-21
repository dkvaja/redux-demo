// ----------------------------------------------------------------------

const path = (root, subLink) => `${root}${subLink}`;

const BASE_PATH = "/";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: BASE_PATH,
  login: path(BASE_PATH, "login"),
  register: path(BASE_PATH, "register"),
};

export const PATH_PAGE = {
  page404: "/404",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
};
