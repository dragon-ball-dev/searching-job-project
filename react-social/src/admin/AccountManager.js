import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { getAllAccount, lockedAccount } from '../util/APIUtils';
import Alert from 'react-s-alert';


class AccountManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAccount: [],
        }

        this.loadAccount = this.loadAccount.bind(this);
    }

    loadAccount() {
        getAllAccount()
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listAccount: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleDisableAccount = (id) => {
        lockedAccount(id)
        .then(response => {
            console.log(response);
       
        }).catch(
            Alert.success("Cập nhật khóa thành công!!!")
        );

    }
    componentDidUpdate(){
        this.loadAccount()
    }


    componentDidMount() {
        this.loadAccount();

    }

    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
          return <Redirect
            to={{
              pathname: "/login-admin",
              state: { from: this.props.location }
            }} />;
        }
        console.log("DATA:", this.state.listAccount)
        let account = this.state.listAccount;

        return (
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">ADMIN PRO</span>
                        </a>
                        <SidebarNav />
                    </div>
                </nav>

                <div className="main">
                    <Nav onLogout={this.props.onLogout} />

                    <main className="content">
                        <div className="container-fluid p-0">
                            <h1 className="h3 mb-3"><strong>Dashboard</strong></h1>

                        </div>

                        <div class="card">
                            <div class="card-header">
                                <h5 class="card-title">Quản lý tài khoản </h5>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "40%" }}>Tên Tài Khoản</th>
                                        <th style={{ width: "25%" }}>Email</th>
                                        <th class="d-none d-md-table-cell" style={{ width: "25%" }}>Số điện thoại</th>
                                        <th style={{ width: "25%" }}>Khóa</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {account.map(account => {
                                        return (
                                            <tr>
                                                <td>{account.name}</td>
                                                <td>{account.email}</td>
                                                <td class="d-none d-md-table-cell">{
                                                    account.recruiter ? account.recruiter.phone : account.jobseeker.phone
                                                }</td>
                                                <td>{
                                                    account.isLocked === false ?
                                                        <button type="button" onClick={() => this.handleDisableAccount(account.id)} class="btn btn-success">Khóa</button>
                                                        :
                                                        <button type="button" onClick={() => this.handleDisableAccount(account.id)} class="btn btn-primary">Mở</button>
                                                }</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default AccountManager;