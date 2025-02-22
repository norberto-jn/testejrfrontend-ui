import { Dropdown, MenuProps, Button, Avatar } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const HeaderMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth/login');
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Perfil',
            icon: <UserOutlined />,
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        },
    ];

    return (
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Button type="text" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar icon={<UserOutlined />} />
                Usuário
            </Button>
        </Dropdown>
    );
};

export default HeaderMenu;