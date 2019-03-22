import React, { Component, Fragment } from 'react';
import {Card,Divider,Popconfirm,Button,Select,Input, Badge} from "antd";
// import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import StandardTable from "@/components/StandardTable"
import Ellipsis from '@/components//Ellipsis';
import moment from 'moment';
import styles from './Group.less';
import find from "lodash/find";
import get from "lodash/get"
import GroupForm from "./GroupForm"

class Group extends Component {
  constructor(props){
    super(props)
    this.state ={
      modalVisible:false,
      isEdit:false,
      currentFormData:{},
      data:{
        list:[
          {code: "test-0003",
          createdTime: 1548880563323,
          description: "123",
          id: 4,
          name: "test-0003A",
          permissions: null,
          roles: null,
          stock: {id: 1, status: 0},
          updatedTime: 1550636699083,}
        ],
        pagination:{firstPage: true,
          hasNextPage: false,
          lastPage: true,
          pageNum: 1,
          pageSize: 10,
          pages: 1,
          total: 3,}
      },
      stockList:[
        {
          text: "test-0001",
          value: 1,
        },
        {
          text: "test-00012",
          value: 2,
        },
       {
          text: "test-00013",
          value: 3,
        },
      ]
    }


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
   const {currentFormData,isEdit,modalVisible,data,stockList} = this.state

  const columns = [
    {
      title:"组编码",
      dataIndex:"code",
    },
    {
      title:"组名称",
      dataIndex:"name",
    },
    {
      title:"申请库房",
      dataIndex:"stock",
      render:val=>{

        if(val){
          const stockObj = find(stockList,['value',val.id])
          return get(stockObj,'text','--')
        }
        return '--'
      }
    },
    {
      title:"职能描述",
      dataIndex:"description",
      render:(val)=>{
        return <Ellipsis tooltip length={10}>{val}</Ellipsis>
      }
    },
    // {
    //   title:"添加时间",
    //   dataIndex:"createdTime",
    //   render:val=>{
    //     return (<span>{moment(val).format("YYYY-MM-DD:HH:mm:ss")}</span>)
    //   }
    // },
    // {
    //   title:"是否启用",
    //   dataIndex:"status",
    //   render:val=>{
    //      return(
    //        <Badge
    //          status={val===1?'success':'error'}
    //          text={val===1?'已激活':'已停用'}
    //        />
    //      )
    //   }
    // },
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
              {/* {enableOrDisable} */}
              <Popconfirm title="确认删除该条记录">
                <a>删除</a>
              </Popconfirm>
            </Fragment>
          )
      }
    },
  ]
    return (
      <PageHeaderWrapper title="角色管理" hiddenBreadcrumb>
        <Card bordered={false}>
           <div  className={styles.tableList}>
             <div className={styles.tableListOperator}>
               <Button icon="plus" type="primary" onClick={()=>{this.handleModalVisible(true)}}>新增</Button>
               <Button type="primary" ghost>刷新</Button>
             </div>
             <StandardTable
               columns={columns}
               useRowSelection={false}
               rowSelection={false}
               data={data}
             />
           </div>
        </Card>
        {/* 新增模态框 */}
        <GroupForm
          {...parentMethods}
          modalVisible={modalVisible}
          isEdit={isEdit}
          formData={currentFormData}
          stockList={stockList}
        />
      </PageHeaderWrapper>
    )
  }
}
export default Group;
