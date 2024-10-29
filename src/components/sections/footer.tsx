type SocialLink = {
  name: string;
  icon: string;
  href: string;
};

type FooterProps = {
  socialLinks: SocialLink[];
  disclaimer: string;
};

export const Footer = ({ socialLinks, disclaimer }: FooterProps) => {
  return (
    <footer className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
      <div className="mt-10 flex justify-center space-x-10">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">{link.name}</span>
            <i className={`bi bi-${link.icon} footer-icon`}></i>
          </a>
        ))}
      </div>
      <p className="mt-10 text-center text-xs leading-5 text-gray-500">
        {disclaimer}
      </p>
    </footer>
  );
};
