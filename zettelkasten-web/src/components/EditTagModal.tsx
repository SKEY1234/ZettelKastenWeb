import { Modal, Input, Space, ColorPicker } from "antd";
import { observer } from "mobx-react";
import { store } from "../store/Store";
import { useState } from "react";
import { DownOutlined } from '@ant-design/icons';
import { Color } from "antd/es/color-picker";

export interface IEditTagProps {
    tagId: string;
    name: string;
    color: string;
}

export const EditTagModal = observer((props: IEditTagProps) => {
    const [nameText, setNameText] = useState<string>(props.name);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [color, setColor] = useState<string>(props.color);

    const handleOk = async () => {
        setConfirmLoading(true);

        await store.updateTag({
            key: '',
            tagId: props.tagId,
            name: nameText,
            color: color,
            createdOn: new Date,
            checked: false
        });
        await store.getTags();
        store.setTagEditorModalVisible(false);
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        store.setTagEditorModalVisible(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameText(event.target.value);
    }

    const handleChangeColor = (color: Color, value: string) => {
        setColor(value);
    }

    return(
        <>
            <Modal
            title="Edit tag"
            open={store.tagEditorModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            >
                <Input 
                placeholder="Name" 
                style={{ marginBottom: 16 }} 
                value={nameText}
                onChange={handleTitleChange}
                />
                <Space direction="horizontal">
                    Color:
                    <ColorPicker
                        defaultValue={props.color}
                        //color={new Color()}
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
});