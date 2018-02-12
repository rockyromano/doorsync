import delay from './delay';

const deals = [
  {
    portalId: 62515,
    dealId: 18039629,
    isDeleted: false,
    associations: {
      associatedVids: [393873, 734934],
      associatedCompanyIds: [237892],
      associatedDealIds: [],
    },
    properties: {
      dealname: {
        value: 'Company 1',
        timestamp: 1457040864519,
        source: 'API',
        sourceId: null,
        versions: [
          {
            name: 'dealname',
            value: 'Company Name',
            timestamp: 1457040864519,
            source: 'API',
            sourceVid: [],
          },
        ],
      },
      num_associated_contacts: {
        value: '2',
        timestamp: 0,
        source: 'CALCULATED',
        sourceId: null,
        versions: [
          {
            name: 'num_associated_contacts',
            value: '2',
            source: 'CALCULATED',
            sourceVid: [],
          },
        ],
      },
    },
    imports: [],
  },
  // Deal 2
  {
    portalId: 62519,
    dealId: 18040854,
    isDeleted: false,
    associations: {
      associatedVids: [],
      associatedCompanyIds: [],
      associatedDealIds: [],
    },
    properties: {
      dealname: {
        value: 'Company 2',
        timestamp: 1457042290572,
        source: 'API',
        sourceId: null,
        versions: [
          {
            name: 'Company 2',
            value: '5678',
            timestamp: 1457042290572,
            source: 'API',
            sourceVid: [],
          },
        ],
      },
      num_associated_contacts: {
        value: '0',
        timestamp: 0,
        source: 'CALCULATED',
        sourceId: null,
        versions: [
          {
            name: 'num_associated_contacts',
            value: '0',
            source: 'CALCULATED',
            sourceVid: [],
          },
        ],
      },
    },
    imports: [],
  },
];

class DealsApi {
  static getAllDeals() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          deals: Object.assign([], deals),
          hasMore: true,
          offset: 18040854,
        });
      }, delay);
    });
  }
}

export default DealsApi;
