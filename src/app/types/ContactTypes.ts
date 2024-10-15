// Define the types for the API response
interface Contact {
    contact_url?: string;
    contact_icon: {
      url: string;
      alt: string;
    };
  }
  
  interface ACFFields {
    contact: Contact[];
    email: string;
    email_icon: {
      url: string;
      alt: string;
    };
  }
  
  interface ContactData {
    id: number;
    title: {
      rendered: string;
    };
    acf: ACFFields;
  }