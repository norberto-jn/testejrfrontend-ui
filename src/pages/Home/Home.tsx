import { TableColumnsType } from "antd";
import { TableCP } from "/src/components";
import { Layout } from 'antd';
import HeaderMenu from "/src/utils/HeaderMenu";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;

interface DataType {
    key: React.Key;
    Tarefa: string;
    description: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'ID', dataIndex: 'key' },
    { title: 'Tarefa', dataIndex: 'Tarefa' },
    { title: 'Descrição', dataIndex: 'description' },
];

const Home = () => {
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTarefas = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/auth/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/tarefas', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar tarefas');
            }

            const data = await response.json();

            const formattedData = data.map((item: any) => ({
                key: item.taskId,
                Tarefa: `Tarefa ${item.taskId}`,
                description: item.taskDescription,
            }));

            setDataSource(formattedData);
        } catch (error) {
            console.error('Erro ao buscar tarefas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTarefas();
    }, []);

    const handleReload = () => {
        setLoading(true);
        fetchTarefas();
    };

    const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
        console.log('Selected row keys:', selectedRowKeys);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', background: '#fff', padding: '0 24px' }}>
                <HeaderMenu />
            </Header>
            <Content style={{ padding: '24px' }}>
                <TableCP<DataType>
                    columns={columns}
                    dataSource={dataSource}
                    onReload={handleReload}
                    onSelectionChange={handleSelectionChange}
                    loading={loading}
                />
            </Content>
        </Layout>
    );
};

export default Home;