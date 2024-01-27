import { IFooter } from './Footer.interface';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

function Footer({ question, linkText, linkPath } : IFooter) {
	return (
		<footer className={styles['footer']}>
			<div className={styles['footer__container']}>
				<p className={styles['footer__question']}>{question}</p>
				<Link className={styles['footer__link']} to={linkPath}>{linkText}</Link>
			</div>
		</footer>
	);
}

export default Footer;