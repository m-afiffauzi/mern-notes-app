import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer footer-center p-4 bg-accent-content text-accent">
      <aside>
        <p>
          Copyright © {year} -{" "}
          <a
            href="https://m-afiffauzi.vercel.app/"
            rel="noreferrer"
            target="_black"
            className="text-white hover:underline"
          >
            Muhammad Afif Fauzi
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
