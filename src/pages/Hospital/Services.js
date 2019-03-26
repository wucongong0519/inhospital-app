import React, { Component } from 'react';
import {List,Icon,Button,Card} from 'antd';
import PageHeaderWrapper from "@/components/PageHeaderWrapper";

export default class Services extends Component {

  componentDidMount(){}

  render() {
    const data =[
      {
        address: "南区11号",
        code: "DEFAULT",
        createdTime: "2019-01-30 13:10:48.503",
        id: 2,
        name: "南区",
        updatedTime: "2019-01-30 13:10:48.503",
      },
    ]
    return (
      <PageHeaderWrapper title="服务列表" hiddenBreadcrumb>
        <div className>
          <List
            dataSource={[...data,'']}
            renderItem={
              item=>item ? (
                <List.Item key={item.id}>
                   {/* <Card>
                     <Card.Meta/>
                   </Card> */}
                </List.Item>
              ) : (
                <List.Item>
                  <Button>
                    <Icon type="plus"/>新增院区
                  </Button>
                </List.Item>
              )
            }
          />
        </div>
      </PageHeaderWrapper>
    )
  }
}
