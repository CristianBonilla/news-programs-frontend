import { Event, NavigationEnd } from '@angular/router';

const APP_ROUTES = {
  HOME: {
    MAIN: 'home',
    NEWS: {
      MAIN: '/home',
      CREATE: '/home/create',
      DETAILS: '/home/details'
    }
  }
} as const;

const { HOME: ROUTES } = APP_ROUTES;

type HomeRoutes = {
  [K in keyof typeof ROUTES]: string;
};

const SIDEBAR_ROUTES: HomeRoutes = {
  MAIN: ROUTES.MAIN,
  NEWS: ROUTES.NEWS.MAIN
};

Object.freeze(APP_ROUTES);
Object.freeze(SIDEBAR_ROUTES);

const sidebarRouteValues = Object.values(SIDEBAR_ROUTES);

function routeFromSidebar(event: Event) {
  return event instanceof NavigationEnd && sidebarRouteValues.some(route => route === event.url);
}

export {
  APP_ROUTES,
  SIDEBAR_ROUTES,
  routeFromSidebar
};
