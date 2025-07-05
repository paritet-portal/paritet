// app/(auth)/register/[userType]/page.tsx
import { notFound } from 'next/navigation';
import RegistrationWrapper from './RegistrationWrapper';

interface RegistrationPageParams {
  userType: string;
}

export default async function RegistrationPage({ params }: { params: RegistrationPageParams }) {
  const { userType } = await params;

  if (userType === 'specialist' || userType === 'client') {
    return <RegistrationWrapper userType={userType} />;
  }

  return  notFound();
}
