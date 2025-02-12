import React, { ReactNode } from "react";

// *** ASSETS ***
import LogoSVG from "../../assets/header/logo.svg";

// *** STYLES ***
import styles from "./Footer.module.scss";
import Link from "../Link/Link.tsx";

// *** INTERFACES ***
interface FooterProps {
  test?: boolean;
}
interface footerLink {
  href: string;
  text: string;
  disabled?: boolean;
}
interface footerColumn {
  title: string | ReactNode;
  linksArray: footerLink[] | null;
}

const footerArray: footerColumn[] = [
  {
    title: "Private Links",
    linksArray: [
      { href: "/profile", text: "Profile", disabled: false },
      { href: "/createQuiz", text: "Create Quiz", disabled: false },
    ],
  },
  {
    title: "Public Links",
    linksArray: [
      { href: "/register", text: "Register", disabled: false },
      { href: "/login", text: "Log In", disabled: false },
    ],
  },
  {
    title: <img src={LogoSVG} />,
    linksArray: [],
    // linksArray: [{ href: "/test2", text: "smth2", disabled: true }],
  },
];

const Footer = (props: FooterProps) => {
  const {} = props;
  return (
    <footer className={styles.footer}>
      {footerArray?.map((column, index) => (
        <div key={index} className={styles.footer_column}>
          <h4 className={styles.footer_column_title}>{column.title}</h4>
          {column.linksArray.map((link: footerLink) => (
            <div key={link.href} className={styles.footer_column_elem}>
              <Link href={link.href}>{link.text}</Link>
            </div>
          ))}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
