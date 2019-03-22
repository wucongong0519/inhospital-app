import React, { Component, Fragment } from 'react';
import {Card,Divider,Popconfirm,Button,Select,Input, Badge} from "antd";
// import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import StandardTable from "@/components/StandardTable"
import Ellipsis from '@/components//Ellipsis';
import moment from 'moment';
import styles from './Roles.less';
import RoleForm from "./RoleForm"


class Roles extends Component {
  constructor(props){
    super(props)
    this.state ={
      modalVisible:false,
      isEdit:false,
      currentFormData:{},
      data:{
        list:[
          {createdTime: 1548880659023,
            description: "test-03",
            id: 3,
            name: "test-03",
            status: 1,
            updatedTime: 1548880821917,}
        ],
        pagination:{firstPage: true,
          hasNextPage: false,
          lastPage: true,
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 3,}
      }
    }

    this.columns = [
      {
        title:"角色名称",
        dataIndex:"name",
      },
      {
        title:"职能描述",
        dataIndex:"description",
        render:(val)=>{
          return <Ellipsis tooltip length={10}>{val}</Ellipsis>
        }
      },
      {
        title:"添加时间",
        dataIndex:"createdTime",
        render:val=>{
          return (<span>{moment(val).format("YYYY-MM-DD:HH:mm:ss")}</span>)
        }
      },
      {
        title:"是否启用",
        dataIndex:"status",
        render:val=>{
           return(
             <Badge
               status={val===1?'success':'error'}
               text={val===1?'已激活':'已停用'}
             />
           )
        }
      },
      {
        title:"操作",
        render:(value,record)=>{
        const enableOrDisable = record.status === 0 ? (
          <Popconfirm title="确认激活该条记录">
            <a>激活</a>
          </Popconfirm>
        ):(
          <Popconfirm title="确认停用该条记录">
            <a>停用</a>
          </Popconfirm>
        )
            return (
              <Fragment>
                <Divider type="vertical" />
                <a onClick={()=>{this.editForm(record)}}>编辑</a>
                <Divider type="vertical" />
                {enableOrDisable}
              </Fragment>
            )
        }
      },
    ]
  }

  handleModalVisible=flag=>{
    const {isEdit} = this.state;
    this.setState({
      modalVisible:flag,
      isEdit:flag ? false:isEdit
    })
  }

  editForm = record=>{
    this.setState({
      isEdit:true,
      modalVisible:true,
      currentFormData:record,
    })
  }

  render() {
    const parentMethods = {
      handleModalVisible:this.handleModalVisible,
      editForm:this.editForm,
    }
   const {currentFormData,isEdit,modalVisible,data} = this.state

    return (
      <PageHeaderWrapper title="角色管理" hiddenBreadcrumb>
        <Card bordered={false}>
           <div  className={styles.tableList}>
             <div className={styles.tableListOperator}>
               <Button icon="plus" type="primary" onClick={()=>{this.handleModalVisible(true)}}>新增</Button>
               <Button type="primary" ghost>刷新</Button>
             </div>
             <StandardTable
               columns={this.columns}
               useRowSelection={false}
               rowSelection={false}
               data={data}
             />
           </div>
        </Card>
        {/* 新增模态框 */}
        <RoleForm
          {...parentMethods}
          modalVisible={modalVisible}
          isEdit={isEdit}
          formData={currentFormData}
        />
      </PageHeaderWrapper>
    )
  }
}
export default Roles;
