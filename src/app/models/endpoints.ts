import { environment } from 'src/environments/environment';

const { serverUrl: API_URL } = environment.api;
const ENDPOINTS = {
  NEWS: {
    ALL: `${ API_URL }/noticias`,
    CREATE: `${ API_URL }/registro`,
    PROGRAMS: `${ API_URL }/programas`
  }
} as const;
Object.freeze(ENDPOINTS);

export { API_URL, ENDPOINTS };
