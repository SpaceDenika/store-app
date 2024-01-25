import cn from 'classnames';
import styles from './Heading.module.css';
import { IHeading } from './Heading.interface';

function Heading({ children, ...props }: IHeading) {
	return (
		<h1 {...props} className={cn(props.className, styles['heading'])}>{children}</h1>
	);
}

export default Heading;