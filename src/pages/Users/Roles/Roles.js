import React, { Component } from 'react';
import {Card,Divider,Popconfirm,Button,Select,Input} from "antd";
// import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import StandardTable from "@/components/StandardTable"
import Ellipsis from '@/components//Ellipsis';

class Roles extends Component {
  constructor(props){
    super(props)
    this.columns = [
      {
        title:"角色名称",
        dataIndex:"name",
      },
      {
        title:"职能描述",
        dataIndex:"description",
        render:(val)=>{
          return <Ellipsis tooltip  />
        }
      },
      {
        title:"角色名称",
        dataIndex:"name",
      },
    ]
  }

  render() {
    // const columns=[
    //   {

    //   }
    // ],

    return (
      <PageHeaderWrapper title="角色管理" hiddenBreadcrumb>
        <Card bordered={false}>
           <div>
             <div>
               <Button icon="plus" type="primary">新增</Button>
               <Button type="primary" ghost>刷新</Button>
             </div>
             <StandardTable

             />
           </div>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Roles;
