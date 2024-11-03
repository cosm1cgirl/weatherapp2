import React from "react";
import "./App.css";

function Footer() {
  return (
    <footer className="footer">
      <p>
        Coded By{" "}
        <a
          href="https://github.com/cosm1cgirl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mary-Anne Schaffers
        </a>{" "}
        | Hosted on{" "}
        <a
          href="https://github.com/cosm1cgirl/weatherapp2"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        &{" "}
        <a
          href="https://weatherjs2.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Netlify
        </a>
      </p>
    </footer>
  );
}

export default Footer;
