import { Card } from "antd"
import { useEffect, useState } from "react";
import { store } from "../store/Store";
import { observer } from "mobx-react";

export interface INoteProps {
    noteId: string;
    title: string;
    content: string;
}

export const Note: React.FC<INoteProps> = observer((props: INoteProps) => {
    const [checked, setChecked] = useState<boolean>(false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setChecked(!checked);
    }

    useEffect(() => {
        store.setCheckedNote(props.noteId, checked);
    }, [checked])

    return(
        <div style={{ paddingBottom: 16 }} >
        <Card title={props.title} bordered={true} onClick={handleClick} style={{ 
            borderColor: checked ? '#5ea1ff' : '#d9d9d9',
            borderWidth: checked ? 2 : 1
            }}>
            {props.content}
        </Card>
        </div>
    )
})