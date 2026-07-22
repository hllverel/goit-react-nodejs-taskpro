import { Link } from 'react-router-dom';
import styles from './WelcomePage.module.css';

function WelcomePage() {
  return (
    <div className={styles.welcomePage}>
      <h1>Task Pro</h1>
      <p>Organize your work and life, finally.</p>
      <div className={styles.actions}>
        <Link to="/auth/register" className={`${styles.button} ${styles.buttonPrimary}`}>
          Registration
        </Link>
        <Link to="/auth/login" className={`${styles.button} ${styles.buttonSecondary}`}>
          Log In
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
