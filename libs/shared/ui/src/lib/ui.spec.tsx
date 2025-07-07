import { render } from '@testing-library/react';

import ParitetSharedUi from './ui';

describe('ParitetSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ParitetSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
