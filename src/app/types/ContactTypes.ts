// Define the types for the API response
export interface Contact {
  contact_url?: string;
  contact_icon: {
    url: string;
    alt: string;
  };
}

export interface ACFFields {
  contact: Contact[];
  email: string;
  email_icon: {
    url: string;
    alt: string;
  };
}

export interface ContactData {
  id: number;
  title: {
    rendered: string;
  };
  acf: ACFFields;
}
