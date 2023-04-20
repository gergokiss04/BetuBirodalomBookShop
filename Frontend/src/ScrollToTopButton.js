import React from "react";

function ScrollToTopButton() {
  function scrollToTop() {
    //Jobb oldalon található gombra kattintva felugrik az oldal tetejére
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      title="up"
      id="up"
      className="scroll-to-top-button"
      onClick={scrollToTop}
    >
      <i className="bi bi-arrow-up-square"></i>
    </button>
  );
}

export default ScrollToTopButton;
