import "./BrandingSection.css";
import { TypeAnimation } from "react-type-animation";
import React from "react";

export default function BrandingSection() {
  return (
    <div className="signup-info" style={{ marginTop: "20%", marginLeft: "5%"}}>
      <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          "Welcome to 🗒 EverWrite.",
          2000,
          "Capture and organize your thoughts.",
          1000,
          "Capture and organize your ideas.",
          1000,
          "Capture and organize your information.",
          1000,
        ]}
        speed={50}
        style={{ fontSize: "3em", color: "white", fontFamily: "sans-serif", fontWeight: "bold", display: 'block' }}
        repeat={Infinity}
      />
    </div>
  );
}
