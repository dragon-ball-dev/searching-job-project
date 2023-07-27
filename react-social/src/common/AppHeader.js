import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class AppHeader extends Component {
    render() {
        return (
            

            <header>
                <div class="header-area header-transparrent">
                    <div class="headder-top header-sticky">
                        <div class="container">
                            <div class="row align-items-center">
                                <div class="col-lg-3 col-md-2">

                                    <div class="logo">
                                        <a href="index.html"><img src="../assets/img/logo/logo.png" alt="" /></a>
                                    </div>
                                </div>
                                <div class="col-lg-9 col-md-9">
                                    
                                        <div class="menu-wrapper">

                                            <div class="main-menu">
                                                <nav class="d-none d-lg-block">

                                                    <ul id="navigation">
                                                        <li>
                                                            <NavLink to="/">Trang chủ</NavLink>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/job-list">Việc làm</NavLink>
                                                        </li>
                                                        <li><a href="#">Thông tin</a>
                                                            <ul class="submenu">
                                                                <li><NavLink to="/advertisement">Quảng Cáo</NavLink>  </li>
                                                           
                                                            </ul>
                                                        </li>
                                                        <li>
                                                            <NavLink to="/contact">Liên hệ</NavLink>
                                                        </li>
                                                    </ul>

                                                </nav>
                                            </div>
                                        {!this.props.authenticated ? (
                                            <div class="header-btn d-none f-right d-lg-block">
                                                <NavLink to="/login" className="btn head-btn1">Đăng Nhập</NavLink>
                                                <NavLink to="/signup" className="btn head-btn1">Đăng Kí</NavLink>
                                                <NavLink to="/signup-recruiter" className="btn btn-primary head-btn2">Đăng kí tuyển dụng</NavLink>
                                            </div>
                                        ) : (
                                            <div class="header-btn d-none f-right d-lg-block">
                                            <NavLink to="/profile" className="btn head-btn1">Profile</NavLink>
                                            <a className="btn head-btn1" onClick={this.props.onLogout}>Logout</a>
                                        </div>
                                        )}
                                        </div>
                                    
                                </div>


                                <div class="col-12">
                                    <div class="mobile_menu d-block d-lg-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </header>
        )
        
    }
}

export default AppHeader;