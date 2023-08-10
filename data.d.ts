interface userType {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: addressType;
  company: companyType;
}

interface addressType {
  street: string;
  suite: string;
  city: string;
  zip: string;
  geo: geoType;
}

interface geoType {
  lat: string;
  lng: string;
}

interface companyType {
  name: string;
  catchPhrase: string;
  bs: string;
}
