import { configure } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import 'utils/MockServer/node';

require('jest-canvas-mock');

jest.setTimeout(20000);
beforeAll(() => {
  configure({ asyncUtilTimeout: 6000 });
});
