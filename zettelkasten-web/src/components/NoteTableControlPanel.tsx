import { Button, Dropdown, MenuProps, Modal, Space, Typography } from "antd";
import { observer } from "mobx-react";
import { store } from "../store/Store";
import { DownOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { CreateNoteModal } from "./CreateNoteModal";
import { EditNoteModal } from "./EditNoteModal";

const items: MenuProps['items'] = [
    {
        key: 1,
        label: 'large',
    },
    {
        key: 2,
        label: 'medium',
    },
    {
        key: 3,
        label: 'small',
    },
];

export const NoteTableControlPanel = observer(() => {
    const handleSizeClick = (event: any) => {
        console.log(event);
        store.setNoteTableColumnsNum(event.key);
    }

    const handleDelete = async () => {
        Modal.confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, the specified items will be deleted permanently',
            async onOk() {
                await store.deleteNotes();
            },
            onCancel() {},
            async afterClose() {
                await store.getNotes();
            }
          });
    }

    const getCheckedNote = () => {
        const checkedNote = store.notes.filter(n => n.checked).at(0);

        if (!checkedNote)
            throw new Error('Не выбрана заметка');

        return checkedNote;
    }

    return (
        <>
            <div style={{ paddingBottom: 20 }}>
                <Dropdown
                    menu={{
                    items,
                    selectable: true,
                    defaultSelectedKeys: ['2'],
                    onClick: handleSizeClick
                    }}
                >
                    <Typography.Link>
                        <Space>
                            Size
                            <DownOutlined />
                        </Space>
                    </Typography.Link>
                </Dropdown>
                <Button style={{ 
                    float: 'right', 
                    marginLeft: 10 
                }} 
                type="primary"
                onClick={() => store.setNoteCreatorModalVisible(true)}
                >
                    Create
                </Button>
                <Button style={{ 
                    display: store.notes.filter(n => n.checked).length != 1 ? 'none' : undefined, 
                    float: 'right', marginLeft: 10, backgroundColor: '#26bf8a' 
                    }} 
                    type="primary"
                    onClick={() => store.setNoteEditorModalVisible(true)}
                >
                    Edit
                </Button>
                <Button style={{ 
                    display: !store.notes.some(n => n.checked) ? 'none' : undefined, 
                    float: 'right' 
                    }} 
                    type="primary" danger onClick={handleDelete}
                >
                    Delete
                </Button>
                <CreateNoteModal />
                {store.notes.filter(n => n.checked).length == 1 && <EditNoteModal 
                    note={getCheckedNote()}
                />}
            </div>
        </>
    )
});