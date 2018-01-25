import { baseURL } from './baseurl';

//function for setting the default restangular config
export function RestangularConfigFactory (RestangularProvider) {
    RestangularProvider.setBaseUrl(baseURL);
}