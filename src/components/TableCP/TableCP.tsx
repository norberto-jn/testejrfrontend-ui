import type { TableColumnsType, TableProps } from 'antd';
import { Button, Flex, Form, Input, message, Table } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import DrawerCP from '/src/components/Drawer/DrawerCP';
import NotificationCP from '/src/components/NotificationCP/NotificationCP';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface TableCPProps<T extends object> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  rowSelection?: TableRowSelection<T>;
  loading?: boolean;
  onReload?: () => void;
  onSelectionChange?: (selectedRowKeys: React.Key[]) => void;
}

interface Task {
  key: React.Key;
  description: string;
}

interface CreateTaskFormValues {
  newTaskDescription: string;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationCPProps {
  message: string;
  type: NotificationType;
  placement?: 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';
  description?: string;
}

const TableCP = <T extends Task>({
  columns,
  dataSource,
  rowSelection: externalRowSelection,
  loading: externalLoading,
  onReload,
  onSelectionChange,
}: TableCPProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<T | null>(null);
  const [form] = Form.useForm();
  const [notification, setNotification] = useState<NotificationCPProps | null>(null);

  const openCreateDrawer = () => {
    setIsEditing(false);
    setEditingTask(null);
    form.resetFields();
    setDrawerVisible(true);
  };

  const openEditDrawer = (record: T) => {
    setIsEditing(true);
    setEditingTask(record);
    form.setFieldsValue({
      newTaskDescription: record.description,
    });
    setDrawerVisible(true);
  };

  const handleSubmit = async (values: CreateTaskFormValues) => {
    setNotification(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Token não encontrado. Faça login novamente.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEditing && editingTask) {
        const response = await axios.put(
          `http://172.18.21.218:8080/tarefas/${editingTask.key}`,
          {
            TaskDescription: values.newTaskDescription,
          },
          config
        );

        if (response.status === 200) {
          setNotification({ message: 'Tarefa atualizada com sucesso!', type: 'success' });
        }
      } else {
        const response = await axios.post(
          'http://172.18.21.218:8080/tarefas',
          {
            TaskDescription: values.newTaskDescription,
          },
          config
        );

        if (response.status === 200) {
          setNotification({ message: 'Tarefa criada com sucesso!', type: 'success' });
        }
      }

      setDrawerVisible(false);
      form.resetFields();
      if (onReload) onReload();
    } catch (error) {
      setNotification({ message: 'Erro ao salvar tarefa.', type: 'error' });
      console.error(error);
    }
  };

  const handleDelete = async (record: T) => {
    setNotification(null);
    try {
      setInternalLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Token não encontrado. Faça login novamente.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://172.18.21.218:8080/tarefas/${record.key}`,
        config
      );

      if (response.status === 200) {
        setNotification({ message: 'Tarefa deletada com sucesso!', type: 'success' });
        if (onReload) onReload();
      }
      setInternalLoading(false);
    } catch (error) {
      setNotification({ message: 'Erro ao deletar tarefa.', type: 'error' });
      console.error(error);
      setInternalLoading(false);
    }
  };

  const columnsWithActions: TableColumnsType<T> = [
    ...columns,
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Flex gap="small">
          <Button type="link" onClick={() => openEditDrawer(record)}>
            Editar
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record)}>
            Deletar
          </Button>
        </Flex>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (onSelectionChange) onSelectionChange(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<T> = externalRowSelection || {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const loading = externalLoading || internalLoading;

  return (
    <Flex gap="middle" vertical>

      <Flex align="center" gap="middle">
        <Button type="primary" onClick={openCreateDrawer} loading={loading}>
          Criar Tarefa
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>

      <Table<T>
        rowSelection={rowSelection}
        columns={columnsWithActions}
        dataSource={dataSource}
        loading={loading}
      />

      <DrawerCP
        title={isEditing ? 'Editar Tarefa' : 'Criar Nova Tarefa'}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      >
        {isEditing && (
          <Form.Item
            name="oldTaskDescription"
            label="Descrição Atual"
          >
            <Input
              placeholder={editingTask ? editingTask.description : ''}
              disabled
            />
          </Form.Item>
        )}
        <Form.Item
          name="newTaskDescription"
          label={isEditing ? 'Nova Descrição' : 'Descrição da Tarefa'}
          rules={[{ required: true, message: 'Por favor, insira a descrição da tarefa!' }]}
        >
          <Input placeholder="Ex: Pular Corda" />
        </Form.Item>
      </DrawerCP>

      {notification && (
        <NotificationCP
          message={notification.message}
          type={notification.type}
          placement="topRight"
        />
      )}
    </Flex>
  );
};

export default TableCP;