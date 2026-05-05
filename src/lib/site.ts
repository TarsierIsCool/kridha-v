// Centralized site config — change these to rebrand quickly.
export const site = {
  name: "Kridha",
  tagline: "Software Solutions Pvt. Ltd.",
  // Update these to your real numbers/email before publishing.
  whatsapp: "8309816381", // intl format, no + or spaces
  email: "tarsieriscool@gmail.com",
  phoneDisplay: "+91 8309816381",
  feeINR: 35000,
  batch: "2026",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const mailLink = (subject: string, body: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
