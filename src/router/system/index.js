import ContentWrapper from '@/components/ContentWrapper';
import saa from './saa';

export default {
  path: 'system',
  name: 'System',
  component: ContentWrapper,
  meta: {
    title: 'System',
  },
  children: [
    saa,
  ],
};
