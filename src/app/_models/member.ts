export interface IPhoto {
  publicId: string;
  url: string;
  isMain: boolean;
}

export interface IMember {
  id: number;
  userName: string;
  age: number | string;
  gender: string;
  birthDate: Date;
  knownAs: string;
  created: Date;
  lastActive: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photoUrl: string;
  photos: IPhoto[];
}
