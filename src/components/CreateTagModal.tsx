import { ColorPicker, Input, Modal, Space } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import { store } from "../store/Store";
import { DownOutlined } from '@ant-design/icons';
import { Color } from "antd/es/color-picker";

export const CreateTagModal = observer(() => {
    const [nameText, setNameText] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>('');
    
    const handleOk = async () => {
        setConfirmLoading(true);

        await store.createTag({
            key: '',
            tagId: undefined,
            name: nameText,
            color: color,
            createdOn: new Date(),
            checked: false
        });
        await store.getTags();
        store.setTagCreatorModalVisible(false);
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        store.setTagCreatorModalVisible(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameText(event.target.value);
    }

    const handleChangeColor = (color: Color, value: string) => {
        setColor(value);
    }

    return (
        <>
            <Modal
            title="New tag"
            open={store.tagCreatorModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            >
                <Input 
                placeholder="Title" 
                style={{ marginBottom: 16 }} 
                value={nameText}
                onChange={handleTitleChange}
                />
                <Space direction="horizontal">
                    Color:
                    <ColorPicker
                        //defaultValue={'#f5faf8'}
                        //color={}
                        value={color}
                        open={open}
                        onOpenChange={setOpen}
                        onChange={handleChangeColor}
                        showText={() => (
                        <DownOutlined
                            rotate={open ? 180 : 0}
                            style={{
                            color: 'rgba(0, 0, 0, 0.25)',
                            }}
                        />
                        )}
                    />
                </Space>
            </Modal>
        </>
    )
})