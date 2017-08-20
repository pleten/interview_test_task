import {$, ElementFinder} from 'protractor';

export class DataProvider {
  public static profilePageElements: any = {
    'Name': {element: (): ElementFinder => $('.inline-panel div:nth-of-type(1) .description'),
      expectedResult: 'Vasya Pupkin'
    },
    'Email': {element: (): ElementFinder => $('.inline-panel div:nth-of-type(2) .description'),
      expectedResult: 'ssls.automation+5@gmail.com'
    },
    'Password': {element: (): ElementFinder => $('.inline-panel div:nth-of-type(3) .description'),
      expectedResult: '*****'
    },
    'Phone': {element: (): ElementFinder => $('.inline-panel div:nth-of-type(4) .description'),
      expectedResult: '+380 57123456789'
    },
    'Address': {element: (): ElementFinder => $('.inline-panel div:nth-of-type(5) .description'),
      expectedResult: 'Diagon alley 2, Misto, Uryupinsk 612120, Ukraine'
    },
    'Newsletter': {
      element: (): ElementFinder => $('.inline-panel div:nth-of-type(7) .description'),
      expectedResult: 'Include in mailing list'
    },
  };
}
