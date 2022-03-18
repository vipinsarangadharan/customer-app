import React, { useState } from "react";
import "../../scss/LightBox.scss";

const LightBox = ({ children, src, alt, Wrapper = "div" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper onClick={toggleIsOpen}>
      {children}
      {isOpen ? (
        <div onClick={toggleIsOpen} className="lightbox-container">
          <img src={src} alt={alt} className="lightbox-image" />
        </div>
      ) : null}
    </Wrapper>
  );
};

export default LightBox;
