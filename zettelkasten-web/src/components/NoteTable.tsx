import { Col, Row } from "antd"
import { Note } from "./Note"
import React, { useEffect, useState } from "react";
import { useMount } from "ahooks";
import { store } from "../store/Store";
import { observer } from "mobx-react";

export const NoteTable: React.FC = observer(() => {
    const [rows, setRows] = useState<React.ReactElement[]>([]);
    //const [columnsNum, setColumnsNum] = useState<number>(2);
    
    useMount(() => {
        drawTable();
    })

    useEffect(() => {
        drawTable();
    }, [store.noteTableColumnsNum])

    const drawTable = () => {
        const columns: React.ReactElement[] = [];
        const rows: React.ReactElement[] = [];
        const wholeRows: number = store.notes.length / store.noteTableColumnsNum;

        for (let i = 0; i < store.notes.length; i++) {
            columns.push(
            <Col span={24 / store.noteTableColumnsNum} key={'col-' + i}>
                <Note noteId={store.notes[i].noteId!} title={store.notes[i].title} content={store.notes[i].content}/>
            </Col>);
        }
    
        for (let i = 0, j = 0;  i < wholeRows; i++) {
            rows.push(
                <Row gutter={16} key={'row-' + i}>
                    {columns.slice(j, j + store.noteTableColumnsNum)}
                </Row>);
            j += store.noteTableColumnsNum;
        }

        setRows(rows);
        //this.forceUpdate();
    }

    //drawTable();
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: '80vh', width: '100%' }}>
            {rows}
        </div>
    )
})