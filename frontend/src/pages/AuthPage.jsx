import { useParams, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm/RegisterForm.jsx';

function AuthPage() {
  const { id } = useParams();

  if (id !== 'login' && id !== 'register') {
    return <Navigate to="/auth/login" replace />;
  }

  return id === 'login' ? <LoginForm /> : <RegisterForm />;
};

export default AuthPage;
