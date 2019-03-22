import React, { Component } from 'react';
import {Form,Input,Modal} from "antd";
import { placeholder } from '@babel/types';
const FormItem = Form.Item;
const {TextArea} = Input

@Form.create()
export default class RoleForm extends Component {
  render() {
    const {modalVisible,formData,isEdit,form,handleModalVisible} =this.props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    return (
     <Modal
       title="新建角色"
       destroyOnClose
       visible={modalVisible}
       onCancel={() => handleModalVisible()}
      //  onOk
     >
      <FormItem label="角色名称" {...formItemLayout}>
        {
         getFieldDecorator("name",{
           rules:[{required:true,mesage:"角色名不能为空"}],
           initialValue:isEdit?formData.name:'',
         })(<Input placeholder="请输入"/>)
        }
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {
          getFieldDecorator('description',{
            rules:[{}],
            initialValue:isEdit?formData.description:'',
          })(<TextArea placeholder='请输入'/>)
        }
      </FormItem>
     </Modal>
    )
  }
}
