import saaConfigScalar from '@/api/system/saa/global';
import componentName from '@/components/component-name';

const SCALARS = saaConfigScalar.SCALARS;

const dataModel = {
  groups: [
    {
      title: 'XML',
      scalar: SCALARS,
      sendChanged: true,
      fields: [
        {
          ...SCALARS.alaSaaXmlFeature.vars.alaSaaXmlStatus,
          component: componentName.MY_STATUS_SWITCH,
        },
        {
          ...SCALARS.alaSaaXmlFeature.vars.alaSaaXmlInterval,
        },

        {
          ...SCALARS.alaSaaXmlFeature.vars.alaSaaXmlFilename,
          component: componentName.MY_SELECT,
        },
      ],
    },
    {
      title: 'SPB',
      scalar: SCALARS,
      sendChanged: true,
      fields: [
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbAutoCreate,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbAutoStart,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbInterval,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbNumPkts,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbInterPktDelay,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbPayloadSize,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbDropEligible,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbJitterThreshold,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbRTTThreshold,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbKeep,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbReset,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbFlush,
        },
        {
          ...SCALARS.alaSaaSpbFeature.vars.alaSaaSpbPktData,
        },
      ],
    },
  ],

};

export default { dataModel };
