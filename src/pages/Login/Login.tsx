import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageLinearGradientCP, SpinnerCP } from '/src/components';
import '/src/index.css';
import LoginForm from '/src/pages/Login/components/LoginFormCP/LoginFormCP';
import '/src/pages/Login/css/login-style.css';

const useLogin = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);

        try {

            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                setError('Credenciais inválidas');
            }

        } catch (err) {
            setError('Não foi possível fazer o login');
        } finally {
            setIsLoading(false);
        }
    };

    return { handleLogin, error, isLoading };
};

const Login = () => {
    const { handleLogin, error, isLoading } = useLogin();

    return (
        <main className="container">

            <div className="formSection">
                <LoginForm onLogin={handleLogin} error={error} isLoading={isLoading} />
                <div className="loadingSpinner" style={{ display: isLoading ? 'flex' : 'none' }}>
                    <SpinnerCP size={32} />
                </div>
            </div>

            <ImageLinearGradientCP
                width={'71.5%'}
                height={'100vh'}
                backgroundSize={'cover'}
                img='/fundo.jpg'
                primaryRgba={{
                    red: 80,
                    green: 56,
                    blue: 238,
                    opacity: 0.35
                }}
                secondaryRgba={{
                    red: 0,
                    green: 0,
                    blue: 0,
                    opacity: 0.3
                }}
            />

            <div className="separatorLine"></div>

        </main>
    );
};

export default Login;