import { Input, Modal, Select, Tag } from "antd";
import { observer } from "mobx-react";
import { useState } from "react";
import { store } from "../store/Store";

export const CreateNoteModal = observer(() => {
    const [titleText, setTitleText] = useState<string>('');
    const [contentText, setContentText] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [tagIds, setTagIds] = useState<string[]>([]);

    const handleOk = async () => {
        setConfirmLoading(true);

        await store.createNote({
            noteId: undefined,
            title: titleText,
            content: contentText,
            createdOn: new Date,
            checked: false
        }, tagIds);

        await store.getNotes();
        await store.getNoteTagRelations();
        store.setNoteCreatorModalVisible(false);
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        store.setNoteCreatorModalVisible(false);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleText(event.target.value);
    }

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContentText(event.target.value);
    }

    const handleChangeTag = (value: string[]) => {
        setTagIds(value);
    };

    const tagRender = (props: any) => {
        const { value, closable, onClose } = props;
        const selectedTag = store.tags.filter(t => t.tagId === value).at(0);
        return (
            <Tag 
                color={selectedTag?.color} 
                closable={closable} 
                onClose={onClose}
            >
                {selectedTag?.name}
            </Tag>
        );
    }

    return (
        <>
            <Modal
            title="New note"
            open={store.noteCreatorModalVisible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            >
                <Input 
                placeholder="Title" 
                style={{ marginBottom: 16 }} 
                value={titleText}
                onChange={handleTitleChange}/>
                <Input.TextArea 
                style={{ marginBottom: 16 }} 
                value={contentText}
                onChange={handleContentChange}
                placeholder="Content"
                autoSize={{ minRows: 3, maxRows: 5 }}
                />
                <Select
                    mode="multiple"
                    tagRender={tagRender}
                    value={tagIds}
                    onChange={handleChangeTag}
                    style={{ width: '100%' }}
                >
                    {store.tags.map(tag => 
                        <Select.Option key={tag.tagId} value={tag.tagId} >
                            {tag.name}
                        </Select.Option>)}
                </Select>
            </Modal>
        </>
    )
})