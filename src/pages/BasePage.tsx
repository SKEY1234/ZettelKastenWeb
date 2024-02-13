import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FileOutlined,
    TagOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, Button, Input, theme, Col, Card, Row, Spin } from 'antd';
import { useState } from 'react';
import { Note } from '../components/Note';
import { NoteTable } from '../components/NoteTable';
import { store } from '../store/Store';
import { observer } from 'mobx-react';
import { useMount } from 'ahooks';
import { NoteTableControlPanel } from '../components/NoteTableControlPanel';
import { CreateNoteModal } from '../components/CreateNoteModal';
import { TagTable } from '../components/TagTable';
import { TagTableControlPanel } from '../components/TagTableControlPanel';

export const BasePage: React.FC = observer(() => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [tabNum, setTabNum] = useState<number>(1);

    useMount(async () => {
        await store.getNotes();
        await store.getTags();
        await store.getNoteTagRelations();
    })

    const handleTabChange = (event: any) => {//(event: React.FormEvent<HTMLUListElement>) => {
        console.log(event);
        setTabNum(event.key);
    }

    const handleInput = (event: React.FormEvent<HTMLElement>) => {
        console.log(event.target);
    }

    return(
        <Layout style={{ height: '100vh' }}>
            <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                //onChange={handleTabChange}
                onClick={handleTabChange}
                items={[
                    {
                    key: 1,
                    icon: <FileOutlined />,
                    label: 'Notes',
                    },
                    {
                    key: 2,
                    icon: <TagOutlined />,
                    label: 'Tags',
                    }
                ]}
                />
            </Layout.Sider>
        <Layout>
            <Layout.Header style={{ padding: 0, background: colorBgContainer }} >
                <div style={{ display: 'flex' }}>
                    <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                    />
                    <Input.Search style={{ padding: '16px' }} placeholder="input search loading with enterButton" 
                    loading={false} enterButton onInput={handleInput}
                    />
                </div>
            </Layout.Header>
            <Layout.Content
                style={{
                    margin: '16px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
                >
                
                {store.isLoading && <Spin  />}
                {/* style={{ display: store.isLoading ? 'none' : undefined }}> */}
                {!store.isLoading && tabNum == 1 && 
                <div>
                    <NoteTableControlPanel />
                    <NoteTable />
                </div>}
                {!store.isLoading && tabNum == 2 && 
                <div>
                    <TagTableControlPanel />
                    <TagTable />
                </div>}
            </Layout.Content>
            </Layout>
        </Layout>
    )
})