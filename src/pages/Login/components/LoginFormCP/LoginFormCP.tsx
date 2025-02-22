import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Checkbox, Form, Input } from 'antd';
import { CSSProperties, useState } from 'react';
import { NotificationCP } from '/src/components';
import '/src/index.css';

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

const LoginForm = ({ onLogin, error, isLoading }: { onLogin: (email: string, password: string) => void, error: string | null, isLoading: boolean }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onLogin(email, password);
    };

    return (
        <div style={{ ...styles.formWrapper, display: isLoading ? 'none' : 'flex' }}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                style={{ width: '65%', height: '50%', marginTop: '8%' }}
                onFinish={handleSubmit}
            >
                <div style={styles.avatarContainer}>
                    <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
                </div>

                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Por favor, insira seu email!' }]}>
                    <Input prefix={<UserOutlined />} placeholder="Email" aria-label="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}>
                    <Input prefix={<LockOutlined />} type="password" aria-label="Digite sua senha" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Lembrar-me</Checkbox>
                        </Form.Item>
                        <a href="#">Esqueceu a senha?</a>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Entrar
                    </Button>
                    <div style={{ marginTop: '1.2rem', textAlign: 'center' }}>
                        Não tem uma conta? <a href="#">Registre-se!</a>
                    </div>
                </Form.Item>
            </Form>
            {error && (
                <NotificationCP message={error} type="error" placement='topLeft' />
            )}
        </div>
    );
};

export default LoginForm;