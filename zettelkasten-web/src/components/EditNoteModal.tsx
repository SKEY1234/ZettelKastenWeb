import { Modal, Input, Select, Tag } from "antd";
import { observer } from "mobx-react";
import { store } from "../store/Store";
import { useState } from "react";
import { INote } from "../models/INote";

export interface IEditNoteProps {
    note: INote;
}

export const EditNoteModal = observer((props: IEditNoteProps) => {
    const [titleText, setTitleText] = useState<string>(props.note.title);
    const [contentText, setContentText] = useState<string>(props.note.content);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [tagIds, setTagIds] = useState<string[]>(store.noteTagRealtions
        .filter(r => r.noteId === props.note.noteId)
        .map(r => r.tagId));

    const handleOk = async () => {
        setConfirmLoading(true);

        await store.updateNote({
            noteId: props.note.noteId,
            title: titleText,
            content: contentText,
            createdOn: new Date,
            checked: false
        }, tagIds);
        await store.getNotes();
        await store.getNoteTagRelations();
        store.setNoteEditorModalVisible(false);
        setConfirmLoading(false);
    };
    
    const handleCancel = () => {
        store.setNoteEditorModalVisible(false);
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

    return(
        <>
            <Modal
            title="Edit note"
            open={store.noteEditorModalVisible}
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
});