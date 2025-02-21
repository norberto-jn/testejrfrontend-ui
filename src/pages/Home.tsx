import { TableColumnsType } from "antd";
import { TableCP } from "/src/components";


interface DataType {
    key: React.Key;
    Tarefa: string;
    description: string;
}

const columns: TableColumnsType<DataType> = [
    { title: 'id', dataIndex: 'id' },
    { title: 'Tarefa', dataIndex: 'Tarefa' },
    { title: 'Descrição', dataIndex: 'description' },
];

const dataSource: DataType[] = Array.from({ length: 11 }).map((_, i) => ({
    key: i,
    Tarefa: `Nome da Tarefa ${i}`,
    id: i + 1,
    description: `Aqui esta a decrição`,
}));

const Home = () => {

    const handleReload = () => {
        console.log('Reload button clicked');
    };

    const handleSelectionChange = (selectedRowKeys: React.Key[]) => {
        console.log('Selected row keys:', selectedRowKeys);
    };

    return (
        <>
            <TableCP<DataType>
                columns={columns}
                dataSource={dataSource}
                onReload={handleReload}
                onSelectionChange={handleSelectionChange}
            />
        </>
    )
}

export default Home