import React from 'react';

export default function ContactMap() {
  return (
    <div className="bg-muted/50 flex h-[450px] items-center justify-center rounded-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.2746484528157!2d85.31953157508201!3d27.739673576164122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190062544c33%3A0xed709a0a87da6d8c!2sEverest%20k9%20and%20security%20training%20institutes!5e0!3m2!1sen!2snp!4v1758719845309!5m2!1sen!2snp"
        className="h-[450px] w-full"
        loading="lazy"
      ></iframe>
    </div>
  );
}
