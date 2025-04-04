

import { Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact", href: "#" },
  ],
  features: [
    { name: "Timer", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "Roadmap", href: "#" },
  ],
  resources: [
    { name: "Guide", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Support", href: "#" },
    { name: "API", href: "#" },
  ],
  docs: [
    { name: "Documentation", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Usage Examples", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-futuristic-black/80 border-t border-futuristic-purple/20 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              {footerLinks.features.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Docs</h3>
            <ul className="space-y-2">
              {footerLinks.docs.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-futuristic-text-secondary hover:text-futuristic-text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-futuristic-purple/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold bg-neon-gradient bg-clip-text text-transparent">
              FocusFlow
            </span>
            <p className="text-futuristic-text-secondary text-sm mt-2">
              © {new Date().getFullYear()} FocusFlow. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="text-futuristic-text-secondary hover:text-futuristic-purple transition-colors duration-200"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
