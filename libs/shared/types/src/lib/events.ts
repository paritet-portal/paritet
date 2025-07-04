
export enum UserRole {
    CLIENT = 'CLIENT',
    SPECIALIST = 'SPECIALIST',
    ADMIN = 'ADMIN',
}

export interface UserProfileData {
    fullName: string;
    licenseNumber?: string;
    phoneNumber?: string;
}

export interface UserRegisteredEvent {
    userId: string;
    email: string;
    role: UserRole;
    profileData?: UserProfileData;
}

