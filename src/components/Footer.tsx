import styles from '../styles/footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faXTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.branding}>
        <img src="logo (1).svg" className={styles.logo} alt="" />
          <p className={styles.tagline}>Sua saúde em boas mãos</p>
        </div>
        <div className={styles.navigation}>
          <a href="/about">Sobre</a>
          <a href="/services">Serviços</a>
          <a href="/contact">Contato</a>
          <a href="/privacy">Privacidade</a>
        </div>
        <div className={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2024 HealthMate. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
