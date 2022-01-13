import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Form, Input, Button } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const Register = () => {
  //state
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  //context
  const {
    auth: { isAuthenticated },
    error: { isShow, content },
    registerUser,
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
    const formData = {
      username: form.getFieldValue("username"),
      password: form.getFieldValue("password"),
    };
    await registerUser(formData);
    setLoading(false);
  };
  return (
    <div className="flex h-screen bg-gray-700">
      <div className="w-full max-w-md px-16 py-10 m-auto bg-white rounded-lg">
        <h1 className="mt-4 mb-12 text-2xl font-medium text-center text-primary">
          Register your account 🔐
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
            />
          </Form.Item>

          <Form.Item
            className="w-full mb-2"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="pr-2 border-r" />}
              className="px-4 py-2 text-sm rounded-md "
              placeholder="Your Password"
            />
          </Form.Item>

          <Form.Item
            className="w-full mb-4"
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="pr-2 border-r" />}
              className="px-4 py-2 text-sm rounded-md "
              placeholder="Confirm Password"
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
                "Register"
              )}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-between">
          <p>Already have an account?</p>
          <Link to="/login">
            <button className="px-4 py-1 text-sm text-white bg-green-500 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
