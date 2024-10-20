"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "../css/ContactLinks.css";
import "../css/index.css";
import { ContactData } from "../types/ContactTypes";



// Fetch contact data without caching (ensures fresh data every time)
async function fetchContactData(): Promise<ContactData | null> {
  const response = await fetch("https://sumitake.ca/portfolio-data/wp-json/wp/v2/pages?slug=contact", {
    cache: "no-store",  // Ensure no caching is used
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data && data.length > 0 ? data[0] : null;
}

const Contact = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const fetchedData = await fetchContactData();
      setContactData(fetchedData);
      setLoading(false);
    }
    getData();
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
    </div>
  );
};

export default Contact;
