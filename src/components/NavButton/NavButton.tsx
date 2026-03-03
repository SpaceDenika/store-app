import cn from 'classnames';
import styles from './NavButton.module.css';
import { INavButton } from './NavButton.interface';
import { Link } from 'react-router-dom';

function NavButton({ children, large, withIcon, ...props }: INavButton) {
  return (
    <Link
      {...props}
      className={cn(props.className, styles['nav-button'], {
        [styles['nav-button_large']]: large,
        [styles['nav-button_with-icon']]: withIcon,
      })}
    >
      {children}
    </Link>
  );
}

export default NavButton;
