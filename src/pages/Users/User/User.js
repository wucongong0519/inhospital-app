import React, { Component,Fragment } from 'react';
import { connect } from 'dva';
import {Divider,Form,Popconfirm,Button,Card, Row, Col,Select,Input} from "antd";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import StandardTable from '@/components/StandardTable';
import UserForm from "./UserForm";
import styles from './User.less'
class User extends Component {

  constructor(props){
    super(props)
    this.state={
      isEdit: false,
      currentFormData: {},
      formValues: {}, // 搜索表单内容
      modalVisible: false, // 是否展示新增模态框
      data:{
        list:[
          {
           birthday: null,
           createdTime: 1548861056883,
           datasource: {
             code: null,
             createdTime: null,
             description: null,
             id: 4,
             name: null,
             updatedTime: null,
           },
           departments: null,
           email: null,
           fullName: "111",
           gender: {id: 1, name: "男"},
           groups: null,
           id: 7,
           mobile: null,
           phone: "1111",
           qq: null,
           roles: null,
           status: 1,
           updatedTime: 1548868225227,
           userName: "zhongqi",
           userType: {id: 2, code: "admin", name: "系统管理员", description: null, createdTime: null},
           wechat: null,
          },
        ],
        pagination:{
         firstPage: true,
         hasNextPage: false,
         lastPage: true,
         pageNum: 1,
         pageSize: 10,
         pages: 1,
         total: 10,
        }
       }
    }
  }

  state = {

  }

  handleAdd = fields => {
    const { dispatch } = this.props;
    const { isEdit } = this.state;


  };

  handleModalVisible = flag => {
    this.setState(prevState => {
      return {
        modalVisible: !!flag,
        isEdit: !flag ? false : prevState.isEdit,
        currentFormData: !flag ? {} : prevState.currentFormData,
      }
    })
  };

  // 编辑修改信息
  editForm=(record)=>{
    this.setState({
      isEdit: true,
      currentFormData: record,
      // formValues: {}, // 搜索表单内容
      modalVisible: true, // 是否展示新增模态框
    })
  }

  render() {
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const {data,modalVisible,isEdit,currentFormData} = this.state
    console.log(data)
     // 表格字段定义
     const columns = [
      {
        title: '工号',
        dataIndex: 'userName',
      },
      {
        title: '姓名',
        dataIndex: 'fullName',
      },
      {
        title: '性别',
        dataIndex: 'gender',
        render: val => {
          if (!val || !val.id) return '--';
          // const sexObj = find(genderList, ['value', val.id]);
          // return get(sexObj, 'text', '--');
        },
      },
      {
        title: '类型',
        dataIndex: 'userType',
        render: val => {
          if (!val || !val.id) return '--';
          // const userTypeObj = find(userTypeList, ['value', val.id]);
          // return get(userTypeObj, 'text', '--');
        },
      },
      {
        title: '科室',
        dataIndex: 'departments',
        render: value => {
          // const roles = [];
          // const keys = map(value, 'id'); // [{id: 1, ...}, {id: 3, ...}] => [1, 3]
          // map(keys, (val) => {
          //   const departmentObj = find(departmentList, ['value', parseInt(val, 10)]);
          //   roles.push(departmentObj ? departmentObj.text : '--');
          // });
          // return roles.join(',');
        },
      },
      {
        title: '角色',
        dataIndex: 'roles',
        //  filters: roleList,
        render: value => {
          // const roles = [];
          // const keys = map(value, 'id'); // [{id: 1, ...}, {id: 3, ...}] => [1, 3]
          // map(keys, (val) => {
          //   const userTypeObj = find(roleList, ['value', parseInt(val, 10)]);
          //   roles.push(userTypeObj ? userTypeObj.text : '--');
          // });
          // return roles.join(',');
        },
      },
      {
        title: '所属群组',
        dataIndex: 'groups',
        render: val => {
          // 群组返回一个数组，取最后一条记录
          const value = val && val.length ? val[val.length - 1] : '';
          if (!val) return '--';
          // const userGroupObj = find(groupList, ['value', value.id]);
          // return get(userGroupObj, 'text', '--');
        },
      },
      {
        title: '数据来源',
        dataIndex: 'datasource',
        render: val => {
          if (!val) return '--';
          // const dataSourceObj = find(dataSourceList, ['value', val.id]);
          // return get(dataSourceObj, 'text', '--');
        },
      },
      {
        title: '操作',
        render: (value, record) => (
          <Fragment>
            <Popconfirm title="确认重置该用户密码?" onConfirm={() => this.resetUserPassword(record)}>
              <a>重置密码</a>
            </Popconfirm>
            <Divider type="vertical" />
            <a onClick={() => this.editForm(record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除该条记录?" onConfirm={() => this.removeRecord(record)}>
              <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderWrapper title="用户管理" hiddenBreadcrumb>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={()=>this.handleModalVisible(true)}>新增</Button>
            </div>
            <StandardTable
              rowKey="id"
              useRowSelection={false}
              data={data}
              columns={columns}
              rowSelection={false}
            />
          </div>
        </Card>
        {/* 新增模态框 */}
        <UserForm
          {...parentMethods}
          modalVisible={modalVisible}
          isEdit={isEdit}
          formData={currentFormData}

        />
      </PageHeaderWrapper>
    );
  }
}

export default User;
