import { IFoo, NewFoo } from './foo.model';

export const sampleWithRequiredData: IFoo = {
  id: 75191,
  fooName: '24/7 sky HTTP',
  address: 'PNG',
  mobile: 'Intranet AI',
  fooNo: 'Car static synthesizing',
};

export const sampleWithPartialData: IFoo = {
  id: 68339,
  fooName: 'virtual payment fuchsia',
  address: 'Security ivory Car',
  mobile: 'Legacy Engineer',
  fooNo: 'payment capacity',
};

export const sampleWithFullData: IFoo = {
  id: 95847,
  fooName: 'Kids',
  address: 'auxiliary',
  mobile: 'Loan Chips',
  fooNo: 'Mall Forward auxiliary',
};

export const sampleWithNewData: NewFoo = {
  fooName: 'Division Buckinghamshire Security',
  address: 'fresh-thinking Buckinghamshire Fresh',
  mobile: 'Bhutan',
  fooNo: 'methodologies Data',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
