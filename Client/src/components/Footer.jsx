import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-400 text-white border-t border-emerald-500">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Section 1 - À propos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">404.js Blog</h3>
            <p className="text-emerald-100 text-sm">
              Plateforme de partage de connaissances et d'articles techniques pour la communauté des développeurs.
            </p>
          </div>

          {/* Section 2 - Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><a href="/articles" className="hover:text-white transition">Articles</a></li>
              <li><a href="/categories" className="hover:text-white transition">Catégories</a></li>
              <li><a href="/about" className="hover:text-white transition">À propos</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Section 3 - Ressources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm text-emerald-100">
              <li><a href="/docs" className="hover:text-white transition">Documentation</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/faq" className="hover:text-white transition">FAQ</a></li>
              <li><a href="/privacy" className="hover:text-white transition">Confidentialité</a></li>
            </ul>
          </div>

          {/* Section 4 - Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contactez-nous</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition">
                <FaTwitter className="text-xl" />
              </a>
              <a href="mailto:contact@articlehub.com" className="text-emerald-100 hover:text-white transition">
                <FaEnvelope className="text-xl" />
              </a>
            </div>
            <p className="text-sm text-emerald-100">
              contact@404js.com<br />
              (+212) 690815605
            </p>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="border-t border-emerald-500 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-emerald-100 mb-4 md:mb-0">
            © {currentYear} 404.js Blog. Tous droits réservés.
          </p>
          <p className="text-sm text-emerald-100 flex items-center">
            Fait avec <FaHeart className="text-red-400 mx-1" /> par l'équipe 404.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;