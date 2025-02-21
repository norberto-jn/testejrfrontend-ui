import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCP } from '/src/components';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        
        // Reseta o estado de erro antes de tentar o login
        setError(null);

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
                const token = data.token;

                localStorage.setItem('token', token);

                navigate('/home');
            } else {
                setError('Credenciais inválidas');
            }
        } catch (err) {
            setError('Não foi possível fazer o login');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>

            {error && (
                <NotificationCP message={error} type="error" />
            )}
        </div>
    );
};

export default Login;