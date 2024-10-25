import VDiscography from '~/pages/VDiscography.vue';
import VReference from '~/pages/VReference.vue';
import VConcerts from '../pages/VConcerts.vue';
import VContact from '../pages/VContact.vue';
import VGallery from '../pages/VGallery.vue';
import VHome from '../pages/VHome.vue';
import VMembers from '../pages/VMembers.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: VHome,
  },
  {
    path: '/discography',
    name: 'discography',
    component: VDiscography,
  },
  {
    path: '/concerts',
    name: 'concerts',
    component: VConcerts,
  },
  {
    path: '/members',
    name: 'members',
    component: VMembers,
  },
  {
    path: '/reference',
    name: 'reference',
    component: VReference,
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: VGallery,
  },
  {
    path: '/contact',
    name: 'contact',
    component: VContact,
  },
];

export default routes;
