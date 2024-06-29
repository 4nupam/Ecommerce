import React from "react";
import './Contact.css'

const Contact = () => {

  return (
    <div className="contact-page">
      <section className="contact-form">
        
        <form>
          <label>
            Your Name *
            <input type="text" name="name" required />
          </label>
          <label>
            Your Email *
            <input type="email" name="email" required />
          </label>
          <label>
            Your Phone *
            <input type="tel" name="phone" required />
          </label>
          <button type="submit">Send Message</button>
        </form>
      </section>

      <section className="contact-info">
        <h3>Call To Us</h3>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>

        <h3>Write To Us</h3>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@exclusive.com</p>
        <p>Emails: support@exclusive.com</p>
      </section>
    </div>
  );
};

export default Contact;
