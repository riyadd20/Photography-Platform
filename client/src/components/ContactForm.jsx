import React from 'react';
// import styled from "styled-components"
import "./ContactForm.css";

const ContactForm = () => {

  // const Wrapper =styled.section`
  
  
  
  // `;
  return (
    
      <div className="contact">
      <p>Book Your Appointment Now</p>
      
      <div className="maps">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0060393298677!2d72.83500021469794!3d19.107390987069934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x75f29a4205098f99!2sSVKM&#39;s%20Dwarkadas%20J.%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1678573306101!5m2!1sen!2sin" 
      width="100%" 
      height="450" 
      style={{border:0}} 
      allowFullScreen="" 
      loading="lazy" 
      referrerpolicy="no-referrer-when-downgrade">

      </iframe>
      </div>


      <div className="container">
        <div className="contact-form">
        <form action="#" method="POST" className="contact-inputs">
        <section>

            <input type="text" name="Username" placeholder='Username' autoComplete='off' required/>
            <br/>
            <input type="email" name="Email" placeholder='Email' autoComplete='off' required/>
            <br/>
            <input type="tel" name="PhoneNumber" placeholder='PhoneNumber' autoComplete='off' required/>
            <br/>
            <input type="date" name="Date" placeholder='Date'  required/>
            <br/>
            <textarea name="message" placeholder='Queries Here' cols="30" rows="6" autoComplete='off' required></textarea>
            <br/>
            <button type="submit" className="secondary-button">Submit</button>
        </section>
        </form>
        </div>
      </div>
     

      </div>
  );
};

export default ContactForm;
