import { Button, Modal, } from "antd";
import { observer } from "mobx-react";
import { store } from "../store/Store";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { EditTagModal } from "./EditTagModal";
import { CreateTagModal } from "./CreateTagModal";

export const TagTableControlPanel = observer(() => {

    const handleDelete = async () => {
        Modal.confirm({
            title: 'Do you want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            content: 'When clicked the OK button, the specified items will be deleted permanently',
            async onOk() {
                await store.deleteTags();
            },
            onCancel() {},
            async afterClose() {
                await store.getTags();
            }
          });
    }

    return (
        <>
            <div style={{ paddingBottom: 20 }}>
                <Button style={{ 
                    float: 'right', 
                    marginLeft: 10 
                }} 
                type="primary"
                onClick={() => store.setTagCreatorModalVisible(true)}
                >
                    Create
                </Button>
                <Button style={{ 
                    display: store.tags.filter(n => n.checked).length != 1 ? 'none' : undefined, 
                    float: 'right', marginLeft: 10, backgroundColor: '#26bf8a' 
                    }} 
                    type="primary"
                    onClick={() => store.setTagEditorModalVisible(true)}
                >
                    Edit
                </Button>
                <Button style={{ 
                    display: !store.tags.some(n => n.checked) ? 'none' : undefined, 
                    float: 'right' 
                    }} 
                    type="primary" danger onClick={handleDelete}
                >
                    Delete
                </Button>
                <CreateTagModal />
                {store.tags.filter(n => n.checked).length == 1 && <EditTagModal 
                    tagId={store.tags.filter(n => n.checked).at(0)?.tagId!}
                    name={store.tags.filter(n => n.checked).at(0)?.name!} 
                    color={store.tags.filter(n => n.checked).at(0)?.color!}
                />}
            </div>
        </>
    )
});