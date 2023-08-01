import BrandingSection from "../components/BrandingSection";
import FormSection from "../components/FormSection";
import "./LandingPage.css";
import React from "react";

export default function LandingPage() {
  return (
    <article className="signup-article">
      <BrandingSection />
      <FormSection />
    </article>
  );
}
