import React, { PureComponent, Fragment } from 'react';
import { Icon, Button, Avatar, Row, Col, List, Form, Input, Modal, message } from 'antd';
import PropTypes from 'prop-types';
import Bind from 'lodash-decorators/bind';
import map from 'lodash/map';
import { connect } from 'dva';
import Debounce from 'lodash-decorators/debounce';
// import LogoutIcon from 'assets/logout.svg';

import styles from './index.less';

const FormItem = Form.Item;

@Form.create()
@connect()
export default class UserProfile extends PureComponent {
  static propTypes = {
    //
    onMenuClick: PropTypes.func.isRequired,
    onHideProfile: PropTypes.func.isRequired,
    currentUser: PropTypes.object.isRequired,
  }

  state = {
    editProfile: false,
    showPasswordModal: false,
  }

  componentDidMount() {
    document.getElementById('profileForm').addEventListener('mouseleave', this.triggerMouseLeaveEvent);
  }

  componentWillUnmount() {
  }

  saveProfile = (e) => {
    e.preventDefault();
    const { form, dispatch, currentUser } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      dispatch({
        type: 'user/updateProfile',
        payload: {
          id: currentUser.id,
          ...fieldsValue,
        },
        callback: () => {
          this.setState({ editProfile: false})
        },
      })
    });
  }

  showEditProfile = (e) => {
    e.preventDefault();
    this.setState({editProfile: true})
  }

  handleUpdatePassword = () => {
    const { dispatch, form, currentUser } = this.props;
    const password = form.getFieldValue('newPassword');
    if (!password || password.length < 4) {
      return message.error('密码不得少于4位');
    }
    dispatch({
      type: 'user/updatePassword',
      payload: {
        userId: currentUser.id,
        password,
      },
    })
    this.setState({
      showPasswordModal: false,
    })
  }

  showUpdatePasswordModal = () => {
    this.setState({
      showPasswordModal: true,
    })
  }

  /* eslint-disable*/
  @Bind()
  @Debounce(600)
  triggerMouseLeaveEvent = () => {
    const { editProfile, showPasswordModal } = this.state;
    const { onHideProfile } = this.props;
    if (!editProfile && !showPasswordModal){
      onHideProfile();
    }
  }

  render() {
    const { currentUser, form, onMenuClick } = this.props;
    const { editProfile, showPasswordModal } = this.state;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 15,
      },
    };
    return (
      <Fragment>
        { showPasswordModal && (
          <Modal
            title="更新密码"
            visible={showPasswordModal}
            onOk={this.handleUpdatePassword}
            onCancel={() => {this.setState({showPasswordModal: false})}}
          >
            <div>
              <Form>
                <FormItem label="新密码">
                  {form.getFieldDecorator('newPassword', {
                    // rules: [
                    //   {required: true, message: '密码不能为空'},
                    //   {type: 'number', min: 4, message: '密码不得少于4位'},
                    // ],
                  })
                    (<Input />)
                  }
                </FormItem>
              </Form>
            </div>
          </Modal>
        )}

        <Form className={styles.profile} id="profileForm" onSubmit={(e) => this.saveProfile(e)} layout="horizontal">
          <List  itemLayout="vertical" bordered={false} split={false}>
            <Row>
              <div style={{lineHeight: '32px', marginBottom: 10, position: 'relative'}}>
                <Icon onClick={() => onMenuClick({key: 'logout'})} className={styles.blackIcon} type="logout" />
                <span style={{position: 'absolute', right: 60}} className={`${styles.action} ${styles.account}`}>
                  <span className={styles.name}>{currentUser.name} <Icon type="down" /></span>
                </span>
                <Avatar style={{position: 'absolute', top: 0, right: 20}} size="default" className={styles.avatar} src='/images/avatar.png' />
              </div>
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="工号：">
                  {currentUser.userName}
                </FormItem>
              ):(
                null
                // <FormItem style={{marginBottom: 0}} {...formItemLayout} label="工号：">
                //   {getFieldDecorator('userName',
                //     {
                //       // rules: [
                //     //   {required: true, message: '昵称不能为空'},
                //     // ],
                //     initialValue: currentUser.userName,
                //   })
                //     (<Input />)
                //   }
                // </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="姓名：">
                  {currentUser.fullName}
                </FormItem>
              ):(
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="姓名：">
                  {getFieldDecorator('fullName',
                    {
                      // rules: [
                      //   {required: true, message: '姓名不能为空'},
                      // ],
                    initialValue: currentUser.fullName,
                  })
                    (<Input />)
                  }
                </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="科室：">
                  {map(currentUser.departments || [], 'name').join(',')}
                </FormItem>
              ):(
                null
                // <FormItem style={{marginBottom: 0}} {...formItemLayout} label="科室：">
                //   {getFieldDecorator('department',
                //     {
                //       // rules: [
                //       //   {required: true, message: '姓名不能为空'},
                //       // ],
                //     initialValue: map(currentUser.departments || [], 'name').join(','),
                //   })
                //     (<Input disabled />)
                //   }
                // </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="群组：">
                  {map(currentUser.groups || [], 'name').join(',')}
                </FormItem>
              ):(
                null
                // <FormItem style={{marginBottom: 0}} {...formItemLayout} label="群组：">
                //   {getFieldDecorator('groups',
                //     {
                //       // rules: [
                //       //   {required: true, message: '姓名不能为空'},
                //       // ],
                //     initialValue: map(currentUser.groups || [], 'name').join(','),
                //   })
                //     (<Input disabled />)
                //   }
                // </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="固话：">
                  {currentUser.phone}
                </FormItem>
              ):(
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="固话：">
                  {getFieldDecorator('phone',
                    {
                      // rules: [
                      //   {required: true, message: '姓名不能为空'},
                      // ],
                    initialValue: currentUser.phone,
                  })
                    (<Input />)
                  }
                </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="手机：">
                  {currentUser.mobile}
                </FormItem>
              ):(
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="手机：">
                  {getFieldDecorator('mobile',
                    {
                      // rules: [
                      //   {required: true, message: '姓名不能为空'},
                      // ],
                    initialValue: currentUser.mobile,
                  })
                    (<Input />)
                  }
                </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="QQ：">
                  {currentUser.qq}
                </FormItem>
              ):(
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="QQ：">
                  {getFieldDecorator('qq',
                    {
                    initialValue: currentUser.qq,
                  })
                    (<Input />)
                  }
                </FormItem>
              )}
            </Row>
            <Row>
              { !editProfile ? (
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="微信：">
                  {currentUser.wechat}
                </FormItem>
              ):(
                <FormItem style={{marginBottom: 0}} {...formItemLayout} label="微信：">
                  {getFieldDecorator('wechat',
                    {
                    initialValue: currentUser.wechat,
                  })
                    (<Input />)
                  }
                </FormItem>
              )}
            </Row>
            <Row style={{marginBottom: 20}} justify="center" type="flex">
              {editProfile ? (
                <Col>
                  <Button type="primary" onClick={() => this.setState({editProfile: false})}>
                    返回
                  </Button>
                  <Button style={{marginLeft: 8}} type="primary" htmlType="submit">
                    保存
                  </Button>
                </Col>
              ) : (
                <Col>
                  <Button type="primary" onClick={(e) => {this.showUpdatePasswordModal(e)}}>
                    修改密码
                  </Button>
                  <Button style={{marginLeft: 8}} type="primary" onClick={(e) => {this.showEditProfile(e)}}>
                    修改资料
                  </Button>
                </Col>
              )}
            </Row>
          </List>
        </Form>
      </Fragment>
    )
  }
}
