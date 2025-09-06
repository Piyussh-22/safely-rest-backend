import { Instagram, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="w-full border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-2 px-4 py-2">
        {/* Social Media */}
        <div className="flex gap-4 p-2 blink-border rounded-lg border-2 transition-all duration-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.8)]">
          <a
            href="https://instagram.com/piyush.raj.22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-pink-500 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://linkedin.com/in/piyush-raj-tech"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://twitter.com/piyussh_22"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter / X"
            className="hover:text-sky-500 transition"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=piyushraj4734@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
            className="hover:text-red-500 transition"
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Brand */}
        <div className="font-semibold text-center md:text-left">
          Copyright © {new Date().getFullYear()} Safely Rest. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
