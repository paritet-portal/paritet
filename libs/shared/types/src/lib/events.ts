
export enum UserRole {
  CLIENT = 'CLIENT',
  SPECIALIST = 'SPECIALIST',
  ADMIN = 'ADMIN',
}

export interface ClientProfileData {
  fullName: string;
  phoneNumber?: string;

}

export interface ClientRegisteredEvent {
  userId: string;
  email: string;
  role: UserRole;
  clientProfileData?: ClientProfileData;
}



export interface SpecialistProfileData {
  fullName: string;
  phoneNumber?: string;
  specialistType: string;
  locationCountry: string;
  locationCity: string;
  countryCode: string;
  licenseNumber: string;
  referrer?: string;
}

export interface SpecialistRegisteredEvent {
  userId: string;
  email: string;
  role: UserRole;
  specialistProfileData?: SpecialistProfileData;

}


