import React from "react";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-accent-content text-accent">
      <aside>
        <p>
          Copyright © {year} - All right reserved by{" "}
          <a
            href="https://m-afiffauzi.vercel.app/"
            rel="noreferrer"
            target="_black"
            className="text-primary hover:underline"
          >
            Muhammad Afif Fauzi
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
