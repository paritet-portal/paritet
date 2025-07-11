
'use client';

import { ClientRegistrationForm } from '@paritet/feature-register-client';
import { SpecialistRegistrationForm } from '@paritet/feature-register-specialist';

interface RegistrationWrapperProps {
  userType: string; 
}

export default function RegistrationWrapper({ userType }: RegistrationWrapperProps) {


  if (userType === 'specialist') {
    return <SpecialistRegistrationForm />;
  }

  if (userType === 'client') {
    return <ClientRegistrationForm />;
  }

  return <div>Недійсний тип користувача</div>;
}