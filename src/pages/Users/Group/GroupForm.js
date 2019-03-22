import React, { Component } from 'react';
import {Form,Input,Modal,Select} from "antd";
import { placeholder } from '@babel/types';
const FormItem = Form.Item;
const {TextArea} = Input
const {Option} = Select;

@Form.create()
class GroupForm extends Component {
  render() {
    const {modalVisible,formData,isEdit,form,handleModalVisible,stockList} =this.props
    const {getFieldDecorator} = form
    const formItemLayout = {
      labelCol:{span:5},
      wrapperCol:{span:15}
    }
    return (
      <Modal
        title="新建群组"
        destroyOnClose
        visible={modalVisible}
        onCancel={() => handleModalVisible()}
      //  onOk
      >
        <FormItem label="组编码" {...formItemLayout}>
          {
          getFieldDecorator("code",{
            rules:[{required:true,message:"组编码不能为空"}],
            initialValue:isEdit?formData.code:'',
          })(<Input placeholder="请输入"/>)
          }
        </FormItem>
        <FormItem label="组名称" {...formItemLayout}>
          {
          getFieldDecorator("name",{
            rules:[{required:true,message:"组名称不能为空"}],
            initialValue:isEdit?formData.name:'',
          })(<Input placeholder="请输入"/>)
          }
        </FormItem>
        <FormItem label="仓库" {...formItemLayout}>
          {
          getFieldDecorator("store",{
            rules:[{required:true,message:"仓库不能为空"}],
            initialValue:isEdit&&formData.stock?formData.stock.id:'',
          })(
           <Select style={{width:"100%"}} placeholder="请选择仓库">
             {
               stockList.map(store=>(
                 <Option key={store.value} value={store.value}>
                     {store.text}
                 </Option>
               ))
             }
           </Select>)
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
export default GroupForm
