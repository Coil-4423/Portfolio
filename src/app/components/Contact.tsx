"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import LoadingComponent from "../components/LoadingComponent";
import "../css/ContactLinks.css";
import "../css/index.css"; // Define types for API response and ACF fields

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

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sumitake.ca/portfolio-data/wp-json/wp/v2/pages?slug=contact")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setContactData(data[0]);
          console.log(data[0]);
        }
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

  const { contact, email, email_icon } = contactData.acf;

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <section className="contact">
          {contact &&
            contact.map((contact, index) => (
              <div key={index} className="contact-item">
                {contact.contact_url && (
                  <a href={contact.contact_url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={contact.contact_icon.url}
                      alt={contact.contact_icon.alt || "contact"}
                      width={50}
                      height={50}
                    />
                  </a>
                )}
              </div>
            ))}
          {/* Rendering the email and email icon */}
          {email && email_icon && (
            <div className="email-item">
              <a href={`mailto:${email}`}>
                <Image
                  src={email_icon.url}
                  alt={email_icon.alt || "email"}
                  width={50}
                  height={50}
                />
              </a>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Contact;
