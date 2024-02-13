import { Space, Table, Tag } from "antd";
import { observer } from "mobx-react";
import { ITag } from "../models/ITag";
import { ColumnsType } from "antd/es/table";
import { store } from "../store/Store";
import moment from 'moment';
import { useState } from "react";

const columns: ColumnsType<ITag> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sortDirections: ['ascend', 'descend'],
        width: '30%',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'CreatedOn',
        dataIndex: 'createdOn',
        sortDirections: ['ascend', 'descend'],
        width: '30%',
        render: (date: string) => getLocaleDate(date),
        sorter: (a, b) => moment(a.createdOn).unix() - moment(b.createdOn).unix(),
    },
    {
        title: 'Color',
        dataIndex: 'color',
        width: '30%',
        render: (color: string) => <Tag color={color}>-----</Tag>
    }
]

const getLocaleDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString();
}

export const TagTable = observer(() => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        store.tags.forEach(t => store.setCheckedTag(t.key, false));
        newSelectedRowKeys.forEach(key => store.setCheckedTag(key, true));
      };
    
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };

    return (
        <>
            <Table rowSelection={rowSelection} columns={columns} dataSource={store.tags} scroll={{ y: '75vh' }} pagination={false}/>
        </>
    )
});