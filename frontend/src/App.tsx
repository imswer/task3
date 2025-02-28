import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Modal, Table, Form, Space, Typography, message, Layout, Card } from "antd";
import { PlayCircleOutlined, EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Header, Content } = Layout;

interface Command {
  id: number;
  name: string;
  command: string;
  description?: string;
  output?: string;
}

const App: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [search, setSearch] = useState("");
  const [output, setOutput] = useState<string | null>(null);
  const [outputVisible, setOutputVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCommands();
  }, []);

  const fetchCommands = async () => {
    const { data } = await axios.get("http://localhost:5000/commands");
    setCommands(data);
  };

  const addCommand = async (values: { name: string; command: string; description?: string }) => {
    setLoading(true);
    await axios.post("http://localhost:5000/commands", values);
    setVisible(false);
    form.resetFields();
    message.success("Command added successfully!");
    fetchCommands();
    setLoading(false);
  };

  const deleteCommand = async (id: number) => {
    await axios.delete(`http://localhost:5000/commands/${id}`);
    message.success("Command deleted!");
    fetchCommands();
  };

  const executeCommand = async (id: number) => {
    setLoading(true);
    await axios.post(`http://localhost:5000/execute/${id}`);
    message.success("Command executed!");
    fetchCommands();
    setLoading(false);
  };

  const showOutput = (output: string | undefined) => {
    setOutput(output || "No output available");
    setOutputVisible(true);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Header style={{ background: "#1890ff", padding: "15px 30px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#fff", margin: 0 }}>⚡ Command Manager</Title>
      </Header>
      <Content style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
        <Card>
          <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: 15 }}>
            <Input.Search placeholder="🔍 Search Commands..." onChange={(e) => setSearch(e.target.value)} />
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>Add Command</Button>
          </Space>
          <Table
            dataSource={commands.filter((cmd) => cmd.name.toLowerCase().includes(search.toLowerCase()))}
            rowKey="id"
            bordered
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Command", dataIndex: "command" },
              { title: "Description", dataIndex: "description" },
              {
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    <Button type="primary" icon={<PlayCircleOutlined />} onClick={() => executeCommand(record.id)} loading={loading}>Run</Button>
                    <Button icon={<EyeOutlined />} onClick={() => showOutput(record.output)}>View Output</Button>
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteCommand(record.id)}>Delete</Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      </Content>

      <Modal open={visible} onCancel={() => setVisible(false)} footer={null}>
        <Title level={3}>➕ Add New Command</Title>
        <Form form={form} onFinish={addCommand} layout="vertical">
          <Form.Item name="name" label="Command Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="command" label="Command" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>Save</Button>
        </Form>
      </Modal>

      <Modal open={outputVisible} onCancel={() => setOutputVisible(false)} footer={null}>
        <Title level={3}>📜 Command Output</Title>
        <pre style={{ background: "#000", color: "#0f0", padding: "15px", borderRadius: "5px", whiteSpace: "pre-wrap" }}>
          {output}
        </pre>
      </Modal>
    </Layout>
  );
};

export default App;
