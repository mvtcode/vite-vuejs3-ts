export interface User {
  mobile: string;
  name: string;
  userId: string;
  companyCode: string;
  dateOfBirth: string;
  typeSale: string;
  username: string;
}

export interface UserLogin extends User {
  adminLocations: string[];
  region: string[];
  token: string;
}
