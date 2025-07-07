import { render } from '@testing-library/react';

import SpecialistRegistrationForm from './SpecialistRegistrationForm.js';

describe('SpecialistRegistrationForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SpecialistRegistrationForm />);
    expect(baseElement).toBeTruthy();
  });
});
