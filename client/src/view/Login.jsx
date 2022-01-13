import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Form, Input, Button, Spin } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  //state
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  //context
  const {
    auth: { isAuthenticated, authLoading },
    error: { isShow, content },
    loginUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    // Check auth user
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async () => {
    setLoading(true);
    await loginUser(form.getFieldValue());
    setLoading(false);
  };

  let body;

  if (authLoading) {
    body = <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />;
  } else {
    body = (
      <div className="w-full max-w-md px-16 py-10 bg-white rounded-lg">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Log in to your account 🔐
        </h1>

        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          className="flex flex-col items-center"
        >
          {/* Error handle */}
          {isShow && <span className="text-red-500 ">{content}</span>}
          {/* Error handle */}

          <Form.Item
            name="username"
            className="w-full mb-2"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="pr-2 border-r" />}
              className="px-4 py-2 rounded-md "
              placeholder="Your Username"
              autoFocus
            />
          </Form.Item>
          <Form.Item
            className="w-full mb-4"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="pr-2 border-r" />}
              className="px-4 py-2 text-sm rounded-md "
              placeholder="Your Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="px-4 py-1 text-white bg-green-500 border-none rounded hover:bg-green-600"
              type="primary"
              htmlType="submit"
            >
              {loading ? (
                <LoadingOutlined style={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-between">
          <p>Do not have an account?</p>
          <Link to="/register">
            <button className="px-4 py-1 text-sm text-white transition duration-300 bg-green-500 rounded hover:bg-green-600 ease">
              Register
            </button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-700">
      {body}
    </div>
  );
};

export default Login;
