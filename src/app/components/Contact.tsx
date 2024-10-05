"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingComponent from "../components/LoadingComponent";
import "../css/ContactLinks.css";
import "../css/index.css"; // Define types for API response and ACF fields

interface Contact {
  contact_url: string;
  contact_icon: {
    url: string;
    alt: string;
  };
}

interface ACFFields {
  contact: Contact[];
}

interface ContactData {
  id: number;
  title: {
    rendered: string;
  };
  acf: ACFFields;
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sumitake.ca/portfolio-data/wp-json/wp/v2/pages?slug=contact")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setContactData(data[0]);
        }
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contactData || !contactData.acf) {
    return <div>No Contact data found</div>;
  }

  const { contact } = contactData.acf;

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <section className="contact">
          {contact &&
            contact.map((contact, index) => (
              <a href={contact.contact_url}>
                <Image
                  src={contact.contact_icon.url}
                  alt={contact.contact_url || "contact"}
                  width={50}
                  height={50}
                />
              </a>
            ))}
        </section>
      )}
    </div>
  );
};

export default Contact;
