import Image from "next/image";
import Link from "next/link";
import {
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  const socialIcons = [
    { icon: <FaFacebookF />, name: "Facebook", href: "#" },
    { icon: <FaInstagram />, name: "Instagram", href: "#" },
    { icon: <FaDribbble />, name: "Dribbble", href: "#" },
    { icon: <FaLinkedinIn />, name: "LinkedIn", href: "#" },
    { icon: <FaTwitter />, name: "Twitter", href: "#" },
  ];

  const aboutLinks = [
    "Companies",
    "Pricing",
    "Terms",
    "Advice",
    "Privacy Policy",
  ];

  const resourcesLinks = ["Help Docs", "Guide", "Updates", "Contact us"];

  return (
    <footer className="bg-[#202430] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="QuickHire Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-xl">QuickHire</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">About</h4>
            <ul className="space-y-3">
              {aboutLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-3">
              {resourcesLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 text-sm hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-2 text-sm">
              Get job notifications
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              The latest job listings, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 bg-white text-primary border border-white/20 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none"
              />
              <button className="btn-primary text-sm py-2 px-4">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            2026 &copy; QuickHire. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialIcons.map(({ icon, name, href }) => (
              <Link
                key={name}
                href={href}
                aria-label={name}
                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-sm text-white"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
