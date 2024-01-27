import { ILabel } from './Label.interface';
import styles from './Label.module.css';

function Label({ children, ...props }: ILabel) {
	return (
		<label className={styles['label']} {...props}>{children}</label>
	);
}

export default Label;