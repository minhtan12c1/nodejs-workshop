
const SCALARS = {
  alaSaaXmlFeature: {
    name: 'alaSaaXmlFeature',
    vars: {
      alaSaaXmlStatus: {
        name: 'alaSaaXmlStatus',
        label: 'Status',
        hint: 'Enable the XML file feature',
      },
      alaSaaXmlInterval: {
        name: 'alaSaaXmlInterval',
        hint: 'Interval where SAA will save the file. The value is in minutes',
        label: 'Interval',
      },
      alaSaaXmlFilename: {
        name: 'alaSaaXmlFilename',
        label: 'File Name',
        hint: 'Save file location.',
      },
    },
  },
  alaSaaSpbFeature: {
    name: 'alaSaaSpbFeature',
    vars: {
      alaSaaSpbAutoCreate: {
        name: 'alaSaaSpbAutoCreate',
        label: 'Auto Create',
        hint: 'Determines if the SPB VLANs are automatically configured',
      },
      alaSaaSpbAutoStart: {
        name: 'alaSaaSpbAutoStart',
        label: 'Auto Start',
        hint: 'Determines if the SPB VLANs are automatically started.',
      },
      alaSaaSpbInterval: {
        name: 'alaSaaSpbInterval',
        label: 'Interval (min)',
        hint: 'Interval, in minutes, between two iterations of the SAA test.Valid values are 1, 2, 5 and 10-1500.',
      },
      alaSaaSpbNumPkts: {
        name: 'alaSaaSpbNumPkts',
        label: 'Number of Packets',
        hint: 'The number of packets to be sent in one iteration of Eth-LB/DMM test.',
      },
      alaSaaSpbInterPktDelay: {
        name: 'alaSaaSpbInterPktDelay',
        label: 'Inter-packet Delay (ms)',
        hint: 'Specifies the delay between two consecutive packets transmitted during an iteration. The value specified should be a multiple of 100.',
      },
      alaSaaSpbPayloadSize: {
        name: 'alaSaaSpbPayloadSize',
        label: 'Payload Size',
        hint: 'Specifies the size of the MAC-Ping payload to be used for the MAC-Ping operation.',
      },
    
      alaSaaSpbDropEligible: {
        name: 'alaSaaSpbDropEligible',
        label: 'Drop Eligible',
        hint: 'Drop Enable bit value to be used in the VLAN tag, if present in the transmitted frame.',
      },
      alaSaaSpbJitterThreshold: {
        name: 'alaSaaSpbJitterThreshold',
        label: 'Jitter Threshold (ms)',
        hint: 'Trap is generated when the Jitter Threshold is crossed. 0 indicates it is diabled.',
      },
      alaSaaSpbRTTThreshold: {
        name: 'alaSaaSpbRTTThreshold',
        label: 'RTT Threshold (ms)',
        hint: 'Trap is generated when the RTT Threshold is crossed. 0 indicates it is diabled.',
      },
      alaSaaSpbKeep: {
        name: 'alaSaaSpbKeep',
        label: 'Keep Sessions',
        hint: 'When set on, SPB sessions will not be deallocated when SPB indicates a MAC or VLAN went away.',
      },
      alaSaaSpbReset: {
        name: 'alaSaaSpbReset',
        label: 'Reset Config',
        hint: 'When set TRUE, will set the alaSaaSpbFeature variables to the defualts.',
      },
      alaSaaSpbFlush: {
        name: 'alaSaaSpbFlush',
        label: 'Flush Sessions',
        hint: 'When set TRUE, SPB sessions will be flushed and reallocated with the current SPB MACs and VLANs.',
      },
      alaSaaSpbPktData: {
        name: 'alaSaaSpbPktData',
        label: 'Packet Data',
        hint: 'An arbitrary amount of data to be included in the Data TLV, if the Data TLV is selected to be sent.',
      },
    },
  },
};

export default { SCALARS };
