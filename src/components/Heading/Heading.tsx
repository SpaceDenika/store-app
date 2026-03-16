import cn from 'classnames';
import styles from './Heading.module.css';
import { IHeadingProps } from './Heading.interface';

function Heading({ children, className, ...props }: IHeadingProps) {
  return (
    <h1 {...props} className={cn(styles['heading'], className)}>
      {children}
    </h1>
  );
}

export default Heading;
