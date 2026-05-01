import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-foreground border-t border-solid border-border">
      <section className="py-10 grid grid-cols-2 gap-6 sm:gap-0 sm:grid-cols-4 place-items-center l-container">
        <div>
          <Logo />
          <p className="mt-4 xs:text-sm text-muted leading-[1.6] text-xs">
            Welcome to TripNest, your gateway to unforgettable adventures and
            immersive travel experiences. Explore with us and let your journey
            begin!
          </p>
        </div>
        <div>
          <p className="text-base xs:text-lg text-navy font-bold">Company</p>
          <div className="mt-4 flex flex-col gap-3 text-xs xs:text-sm text-muted">
            <p>About Us</p>
            <p>Careers</p>
            <p>Travel Guides</p>
            <p>Destinations</p>
            <p>Contact Now</p>
          </div>
        </div>
        <div>
          <p className="text-base xs:text-lg text-navy font-bold">Services</p>
          <div className="mt-4 flex flex-col gap-3 text-xs xs:text-sm text-muted">
            <p>Tour Listing</p>
            <p>Tour Booking</p>
            <p>Traveler Reviews</p>
            <p>Travel Agents</p>
            <p>Help</p>
          </div>
        </div>
        <div>
          <p className="text-base xs:text-lg text-navy font-bold">Services</p>
          <div className="mt-4 flex flex-col gap-3 text-xs xs:text-sm text-muted">
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Sitemap</p>
            <p>Legal Notice</p>
            <p>Promotions</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
