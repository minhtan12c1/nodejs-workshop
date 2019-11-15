import ContentWrapper from '@/components/ContentWrapper';
import ipRoute from './ip';

export default {
  path: 'networking',
  name: 'Networking',
  component: ContentWrapper,
  meta: {
    title: 'Networking',
  },
  children: [
    ipRoute,
  ],
};
