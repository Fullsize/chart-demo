/*
 * @Author: sungy
 * @Date: 2023-09-14 11:07:00
 * @LastEditors: sungy
 * @LastEditTime: 2024-06-17 17:25:45
 * @Description: 退出登录
 */

import { F14 } from '@/components/Indicator';
import { getLoginUser } from '@/service/request';
import icon_user from '@images/icons/user.png';
import { useEffect, useState } from 'react';
import { Menu, Dropdown, Modal, Form, Input, message } from 'antd';
import { useEcApiPost } from '@/service';

export default function UserInfo() {
    const [visible, setVisible] = useState(false); // 控制弹框显示状态
    const [form] = Form.useForm(); // 表单实例
    const [resPasswordUpdate, updatePassword] = useEcApiPost('/api/service/admin/user/update/password'); // 修改请求的URL

    // 菜单点击事件
    const handleMenuClick = (e: any) => {
        if (e.key === 'changePassword') {
            setVisible(true); // 打开弹框
        }
    };

    // 点击确定按钮，校验表单并处理提交
    const handleOk = () => {
        form.validateFields()
            .then((values) => {
                updatePassword({
                    userId: getLoginUser()?.userId,
                    oldPassword: values.oldPassword, // 原密码
                    userPassword: values.userPassword, // 新密码
                    userPassword2: values.userPassword2, // 确认密码
                });
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    useEffect(() => {
        if (resPasswordUpdate?.sign) {
            if (resPasswordUpdate?.ok) {
                message.success('密码修改成功!');
                setVisible(false);
                form.resetFields();
            } else {
                message.error(resPasswordUpdate?.error?.data?.msg);
            }
        }
    }, [resPasswordUpdate]);

    // 点击取消按钮，关闭弹框并重置表单
    const handleCancel = () => {
        setVisible(false);
        form.resetFields();
    };
    // 密码校验规则
    const passwordRules = [
        {
            required: true,
            message: '请输入密码!',
        },
        {
            min: 6,
            max: 20,
            message: '密码长度必须是6-20个字符!',
        },
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,20}$/,
            message: '密码必须包含大小写字母、数字和特殊字符，且长度在6到20个字符之间!',
        },
    ];

    // 定义下拉菜单
    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="changePassword">修改密码</Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} trigger={['hover']}>
                <div style={{ paddingLeft: 32, position: 'relative', cursor: 'pointer' }}>
                    <img
                        src={icon_user}
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: -8,
                        }}
                    />
                    <F14 height="16px">{getLoginUser()?.userName}</F14>
                </div>
            </Dropdown>

            <Modal title="修改密码" visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item name="oldPassword" label="原密码" rules={[{ required: true, message: '请输入原密码!' }]}>
                        <Input.Password placeholder="请输入原密码" />
                    </Form.Item>
                    <Form.Item name="userPassword" label="新密码" rules={passwordRules}>
                        <Input.Password placeholder="请输入新密码" />
                    </Form.Item>
                    <Form.Item
                        name="userPassword2"
                        label="再次输入新密码"
                        dependencies={['userPassword']}
                        rules={[
                            {
                                required: true,
                                message: '请再次输入新密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('userPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两次输入的密码不一致!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="请再次输入新密码" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
