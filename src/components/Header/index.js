import React, { PureComponent, Fragment } from 'react';
import { Layout,Menu, Icon, Spin, Tag, Button, Avatar, Divider, Row, Col, List, Form, Input, Dropdown } from 'antd';
import { Link } from 'dva/router';
import isEmpty from 'lodash/isEmpty';
import styles from "./index.less"
// import HomeIcon from '../../assets/home.svg';
// import LogoutIcon from '../../assets/logout.svg';
import UserProfile from  './UserProfile';

export default class Header extends PureComponent{
  state={showProfile:false}

  showProfile = e => {
    e.preventDefault();
    this.setState({showProfile: true})
  }

   render(){
    //  console.log(this.props)
     const currentUser={fullName:"张三"}
     const {logo,onMenuClick} =this.props
     const {showProfile}=this.state;
     return(
       <Layout.Header className={styles.header} style={{position:"fixed",zIndex: 1, width: '100%'}}>
         <div className={styles.left}>
            <Link to="/" className={styles.logo} key="logo">
              <img src={logo} alt="logo" width="100%" />
            </Link>
            <span className={styles.title}>禾健云临床营养管理系统</span>
            <span className={styles.subTitle}>在院患者<span className={styles.numInfo}>1</span></span>
            <span className={styles.subTitle}>已筛查患者<span className={styles.numInfo}>1</span></span>
            <span className={styles.subTitle}>风险患者<span className={styles.numInfo}>1</span></span>
            <span className={styles.subTitle}>申请会诊患者<span className={styles.numInfo}>1</span></span>
            <span className={styles.subTitle}>已会诊患者<span className={styles.numInfo}>1</span></span>
         </div>
         <div className={styles.right}>
            <Link to="/">
                <Icon className={styles.icon} type="home" />
            </Link>
            <Divider type="vertical" />
            <Icon onClick={() => onMenuClick({key: 'logout'})} className={styles.icon} type="logout" />
            {!isEmpty(currentUser) ? (
            <Fragment>
              <span onMouseEnter={(e) => this.showProfile(e)} className={`${styles.action} ${styles.account}`}>
                <span className={styles.name}>{currentUser.fullName} <Icon type="down" /></span>
              </span>
              <Avatar size="default" className={styles.avatar} src='/images/avatar.png' />
            </Fragment>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
         </div>
         { showProfile && (
          <UserProfile
            onMenuClick={onMenuClick}
            onHideProfile={() => {this.setState({showProfile: false})}}
            currentUser={currentUser}
          />
        )}
       </Layout.Header>
     )
   }
}
