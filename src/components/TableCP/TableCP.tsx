import React, { useState } from 'react';
import { Button, Flex, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface TableCPProps<T extends object> {
  columns: TableColumnsType<T>;
  dataSource: T[];
  rowSelection?: TableRowSelection<T>;
  loading?: boolean;
  onReload?: () => void;
  onSelectionChange?: (selectedRowKeys: React.Key[]) => void;
}

const TableCP = <T extends object = any>({
  columns,
  dataSource,
  rowSelection: externalRowSelection,
  loading: externalLoading,
  onReload,
  onSelectionChange,
}: TableCPProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [internalLoading, setInternalLoading] = useState(false);

  const start = () => {
    
    setInternalLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setInternalLoading(false);
      if (onReload) onReload();
    }, 1000);

  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table<T>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
      />
    </Flex>
  );
};

export default TableCP;