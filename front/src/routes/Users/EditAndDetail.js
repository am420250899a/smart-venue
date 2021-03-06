import React, {PureComponent} from 'react';
import { connect } from 'dva';
import {
  Form, Input, Radio, Select, Button, Card, DatePicker, Icon, Tooltip,
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(state => ({
  currentPage: state.users.currentPage,
}))
@Form.create()
export default class EditAndDetail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      disabled: props.type === 'detail' ? true : false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.return();
      }
    });
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const user = this.state.user;
    
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const roleOptions = this.props.roles.map(role => (<Option key={role.id}>{role.name}</Option>));

    return (
      <Form
        onSubmit={this.handleSubmit}
        hideRequiredMark
        style={{ marginTop: 8 }}
      >
        <FormItem
          {...formItemLayout}
          label="用户名"
        >
          {getFieldDecorator('user_account', {
            initialValue: user.user_account,
            rules: [{
              required: true, message: '请输入用户名',
            }],
          })(
            <Input placeholder="请输入用户名" disabled/>
            )}
        </FormItem>
        <FormItem 
          {...formItemLayout}
          label="用户类型"
        >
          {getFieldDecorator('user_type', {
            initialValue: user.user_type,
            rules: [{ required: true, message: '请选择管理员' }],
          })(
            <Select placeholder="请选择用户类型" disabled={this.state.disabled}>
              {roleOptions}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('user_name', {
            initialValue: user.user_name,
            rules: [{
              required: true, message: '请输入姓名',
            }],
          })(
            <Input placeholder="请输入姓名"  disabled={this.state.disabled}/>
            )}
        </FormItem>
        <FormItem 
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex', {
            initialValue: user.sex,
            rules: [{ required: true, message: '请选择性别' }],
          })(
            <RadioGroup disabled={this.state.disabled}>
              <Radio value="m">男</Radio>
              <Radio value="f">女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            initialValue: user.email,
            rules: [{
              type: 'email', message: '邮箱格式不正确',
            }, {
              required: true, message: '请输入邮箱',
            }],
          })(
            <Input placeholder="请输入邮箱" type="email" disabled={this.state.disabled} />
            )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            initialValue: user.phone,
            rules: [{
              pattern: /^13[\d]{9}$/, message: '手机格式不正确',
            }, {
              required: true, message: '请输入手机号码',
            }],
          })(
            <Input placeholder="请输入手机号码" disabled={this.state.disabled} />
            )}
        </FormItem>
        <FormItem 
          {...formItemLayout}
          label="生日"
        >
          {getFieldDecorator('birthday', {
            initialValue: moment(user.birthday, 'YYYY-MM-DD'),
            rules: [{ required: true, message: '请选择生日' }],
          })(
            <DatePicker disabled={this.state.disabled} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址"
        >
          {getFieldDecorator('address', {
            initialValue: user.address,
          })(
            <Input placeholder="请输入地址" disabled={this.state.disabled} />
            )}
        </FormItem>
        
        
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          { !this.state.disabled &&
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          }
          <Button style={{ marginLeft: 8 }} onClick={this.props.return}>返回</Button>
        </FormItem>
      </Form>
    );
  }
}
