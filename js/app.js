import { Router } from './vendor/vjs/router/router.js';
import { LandingPage } from './component/landing-page/landing-page.js';
import { LogListPage } from './component/log-list-page/log-list-page.js';
import { LogDetailPage} from './component/log-detail-page/log-detail-page.js';
import { ErrorPage } from './component/error-page/error-page.js';

const options = {
  container: document.querySelector('#app'),
  routes: [
    { path: '/', component: 'landing-page', },
    { path: '/log', component: 'log-list-page', },
    { path: '/log/:id/:mode?', component: 'log-detail-page', },
    { path: '.*', component: 'error-page', },
  ],
  anchorScan: document.querySelector('body'),
  debug: true,
}
const router = new Router(options);
router.goTo('/');