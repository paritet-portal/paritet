import { render } from '@testing-library/react';

import ClientRegistrationForm from './ClientRegistrationForm.js';

describe('ClientRegistrationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientRegistrationForm />);
    expect(baseElement).toBeTruthy();
  });
});
