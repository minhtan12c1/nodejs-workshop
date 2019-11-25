import ContentWrapper from '@/components/ContentWrapper';
import ipRoute from './ip';
import ipv6Route from './ipv6';

export default {
  path: 'networking',
  name: 'Networking',
  component: ContentWrapper,
  meta: {
    title: 'Networking',
  },
  children: [
    ipRoute,
    ipv6Route
  ],
};
