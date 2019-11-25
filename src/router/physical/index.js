import ContentWrapper from '@/components/ContentWrapper';
import ethernet from './ethernet';

export default {
  path: 'physical',
  name: 'Physical',
  component: ContentWrapper,
  meta: {
    title: 'Physical',
  },
  children: [
    ethernet,
  ],
};
