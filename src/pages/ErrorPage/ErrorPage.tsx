import styles from './ErrorPage.module.css';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ROUTE_PATHS } from '@/router/routes';
import NavButton from '@/components/NavButton/NavButton';

function ErrorPage() {
  const error = useRouteError();

  let errorMessage: string;
  let errorStatusCode: number | string = 'Ошибка';

  if (isRouteErrorResponse(error)) {
    errorStatusCode = error.status;
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = 'Неизвестная ошибка';
  }

  return (
    <section className={styles['error-page']}>
      <div className={styles['error-page__container']}>
        <img className={styles['error-page__image']} src={import.meta.env.BASE_URL + '/logo.svg'} alt="Логотип" />
        <p className={styles['error-page__text']}>Ой! {errorStatusCode}</p>
        <p className={styles['error-page__text']}>Произошло что-то непредвиденное.</p>
        <i>{errorMessage}</i>
        <NavButton to={ROUTE_PATHS.CATALOG} large>
          Перейти в каталог
        </NavButton>
      </div>
    </section>
  );
}

export default ErrorPage;
