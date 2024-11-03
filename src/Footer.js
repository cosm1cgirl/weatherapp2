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
          href="https://github.com/your-repo-link" // Replace with your GitHub repo link
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>{" "}
        &{" "}
        <a
          href="https://your-netlify-link.netlify.app" // Replace with your Netlify site link
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
