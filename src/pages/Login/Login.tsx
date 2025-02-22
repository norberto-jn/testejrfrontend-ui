import { CSSProperties, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageLinearGradientCP, SpinnerCP } from '/src/components';
import '/src/index.css';
import LoginForm from '/src/pages/Login/components/LoginFormCP/LoginFormCP';

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexWrap: 'wrap'
    } as CSSProperties,

    imageSection: {
        width: '71.5%',
        height: '100vh',
        background: `linear-gradient(rgba(80, 56, 238, 0.35), rgba(0, 0, 0, 0.3)), url('/img/escola.jpg')`,
        backgroundSize: 'cover',
    } as CSSProperties,

    formSection: {
        width: '28.5%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    } as CSSProperties,

    separatorLine: {
        width: '0.25%',
        height: '70vh',
        marginTop: '15vh',
        marginLeft: '-71.6%',
        backgroundColor: '#31baff',
    } as CSSProperties,

    formWrapper: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
    } as CSSProperties,

    loadingSpinner: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    } as CSSProperties,

    avatarContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3.5rem',
    } as React.CSSProperties,
}

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
        <main style={styles.container}>

            <div style={styles.formSection}>
                <LoginForm onLogin={handleLogin} error={error} isLoading={isLoading} />
                <div style={{ ...styles.loadingSpinner, display: isLoading ? 'flex' : 'none' }}>
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

            <div style={styles.separatorLine}></div>

        </main>
    );
};

export default Login;