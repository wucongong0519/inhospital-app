import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Modal, Input, Select } from 'antd';
import map from 'lodash/map';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create({
  mapPropsToFields(props) {
    if (props.formData && props.isEdit) {
      const { formData: { userName, fullName, gender, userType, roles, departments, groups, phone, mobile, qq, wechat } } = props;
      return {
        userName: Form.createFormField({ value: userName }),
        fullName: Form.createFormField({ value: fullName }),
        gender: Form.createFormField({ value: gender.id }),
        userType: Form.createFormField({ value: userType.id }),
        roles: Form.createFormField({ value: map(roles, 'id') }),
        departments: Form.createFormField({ value: departments && departments.length ? departments[departments.length - 1].id : [] }),
        groups: Form.createFormField({ value: groups && groups.length ? groups[groups.length - 1].id : null }),
        phone: Form.createFormField({ value: phone }),
        mobile: Form.createFormField({ value: mobile }),
        qq: Form.createFormField({ value: qq }),
        wechat: Form.createFormField({ value: wechat }),
      };
    } else {
      return {};
    }
  },
})

class UserForm extends Component {
  static propTypes = {
    // 确定处理方法
    handleAdd: PropTypes.func.isRequired,
    // 取消处理方法
    handleModalVisible: PropTypes.func.isRequired,
    // 是否隐藏模态框属性
    modalVisible: PropTypes.bool.isRequired,
    // 编辑表单数据（编辑时候使用）
    formData: PropTypes.object,
    // isEdit
    isEdit: PropTypes.bool.isRequired,

    // 用户类型列表
    // genderList: PropTypes.any.isRequired,
  };

  static defaultProps = {
    formData: {},
  };

  static contextTypes = {
    genderList: PropTypes.array,
    userTypeList: PropTypes.array,
    roleList: PropTypes.array,
    groupList: PropTypes.array,
    departmentList: PropTypes.array,
  };

  okHandle = () => {
    const { form, handleAdd, formData } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd({ ...formData, ...fieldsValue });
    });
  };

  render() {
    const { modalVisible, form, handleModalVisible, isEdit } = this.props;

    const { genderList, userTypeList, roleList, groupList, departmentList } = this.context;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <Modal
        destroyOnClose
        maskClosable={false}
        title="新建用户"
        visible={modalVisible}
        onOk={this.okHandle}
        onCancel={() => handleModalVisible()}
      >
        <FormItem {...formItemLayout} label="工号">
          {form.getFieldDecorator('userName', {
            rules: [{ required: true, message: '工号不能为空' }],
            // initialValue: isEdit ? formData.userName : null,
          })(<Input disabled={isEdit} placeholder="请输入" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="姓名">
          {form.getFieldDecorator('fullName', {
            rules: [{ required: true, message: '姓名不能为空' }],
            // initialValue: isEdit ? formData.fullName : null, // 设置初始值
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="性别">
          {form.getFieldDecorator('gender', {
            rules: [{ required: true, message: '性别不能为空' }],
            // initialValue: isEdit ? formData.gender && formData.gender.id ? formData.gender.id : null : null,
          })(
            <Select allowClear style={{ width: '100%' }} placeholder="请选择性别">
              {genderList&&genderList.map(gender => (
                <Option key={gender.value} value={gender.value}>
                  {gender.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="类型">
          {form.getFieldDecorator('userType', {
            rules: [{ required: true, message: '类型不能为空' }],
            // initialValue: isEdit ? formData.userType && formData.userType.id ? formData.userType.id : null : null,
          })(
            <Select allowClear style={{ width: '100%' }} placeholder="请选择类型">
              {userTypeList&&userTypeList.map(userType => (
                <Option key={userType.value} value={userType.value}>
                  {userType.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="角色">
          {form.getFieldDecorator('roles', {
            rules: [{ required: true, message: '角色不能为空' }],
            // initialValue: isEdit ? map(formData.roles, 'id') : [],
          })(
            <Select mode='multiple' allowClear style={{ width: '100%' }} placeholder="请选择角色">
              {roleList&&roleList.map(roles => (
                <Option key={roles.value} value={roles.value}>
                  {roles.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="所属群组">
          {form.getFieldDecorator('groups', {
            rules: [{ required: true, message: '所属群组不能为空' }],
            // initialValue: isEdit ? (formData.groups && formData.groups.length ? formData.groups[formData.groups.length - 1].id : null) : null,
          })(
            <Select allowClear style={{ width: '100%' }} placeholder="请选择群组">
              {groupList&&groupList.map(groups => (
                <Option key={groups.value} value={groups.value}>
                  {groups.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="所属科室">
          {form.getFieldDecorator('departments', {
            rules: [{ required: true, message: '所属科室不能为空' }],
            // initialValue: isEdit ? (formData.departments && formData.departments.length ? formData.departments[formData.departments.length - 1].id : null) : null,
          })(
            <Select mode='multiple' allowClear style={{ width: '100%' }} placeholder="请选择科室">
              {departmentList&&departmentList.map(departments => (
                <Option key={departments.value} value={departments.value}>
                  {departments.text}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="联系电话">
          {form.getFieldDecorator('phone', {
            rules: [],
            // initialValue: isEdit ? formData.phone : null,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="手机号码">
          {form.getFieldDecorator('mobile', {
            rules: [],
            // initialValue: isEdit ? formData.mobile : null,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="QQ">
          {form.getFieldDecorator('qq', {
            rules: [],
            // initialValue: isEdit ? formData.qq : null,
          })(<Input placeholder="请输入" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="微信">
          {form.getFieldDecorator('wechat', {
            rules: [],
            // initialValue: isEdit ? formData.wechat : null,
          })(<Input placeholder="请输入" />)}
        </FormItem>
      </Modal>
    );
  }
}
export default UserForm;
