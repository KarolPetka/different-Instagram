export interface Account {
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: {
      lat?: string;
      lng?: string;
    };
  };
  company?: {
    bs?: string;
    catchPhrase?: string;
    name?: string;
  };
  email?: string;
  name?: string;
  phone?: string;
  username?: string;
  website?: string;
  avatar?: string;
}