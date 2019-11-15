import ContentWrapper from '@/components/ContentWrapper';
import saa from './saa';

export default {
  path: 'layer2',
  name: 'Layer2',
  component: ContentWrapper,
  meta: {
    title: 'Layer2',
  },
  children: [
    saa,
  ],
};
