import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import { deleteJobById, getAllJobOfRecruiter } from '../util/APIUtils';
import ModalBigContent from './modal/ModalBigContent';
import Alert from "react-s-alert"


class JobManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listJob: [],
            jobId: ''
        }

        this.loadJob = this.loadJob.bind(this);
    }

    loadJob() {
        getAllJobOfRecruiter()
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listJob: response.content,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleGetId = (id) => {
        this.setState({
            jobId: id
        })
    }

    handleDeleteById = (id) => {
        deleteJobById(id)
        .then().catch(message => {
            Alert.success("Ẩn công việc thành công")
            window.location.reload();
        });
        return <Redirect to={"/admin/job-manager"} />;
    }
    // componentDidUpdate(){
    //     this.loadJob();
    // }

    componentDidMount() {
        this.loadJob();

    }
    render() {
        if (!this.props.authenticated || this.props.roleName !== "ROLE_ADMIN") {
            return <Redirect
                to={{
                    pathname: "/login-admin",
                    state: { from: this.props.location }
                }} />;
        }
        console.log("DATA:", this.state.listJob)
        let list = this.state.listJob;

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
                                <h5 class="card-title">Quản lý công việc</h5>
                            </div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: "35%" }}>Tên Công Việc</th>
                                        <th style={{ width: "25%" }}>Level</th>
                                        <th class="d-none d-md-table-cell" style={{ width: "25%" }}>Địa Chỉ</th>
                                        <th style={{ width: "10%" }}>Tình Trạng</th>
                                        <th style={{ width: "25%" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map(job => {
                                        return (
                                            <tr>
                                                <td>{job.jobTitle}</td>
                                                <td>{job.level}</td>
                                                <td class="d-none d-md-table-cell">{job.address}</td>
                                                <td style={{ color: "green" }}>{job.status === "ENABLE" ? "Hiện Thị" : "Ẩn"}</td>
                                                <td class="table-action">
                                                     &nbsp; &nbsp;
                                                    <a href="#" onClick={() => this.handleGetId(job.id)} data-toggle="modal" data-target=".bd-example-modal-lg">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg> </a>
                                                    &nbsp;
                                                    <a href="#" onClick={() => this.handleDeleteById(job.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <ModalBigContent jobId={this.state.jobId} />


                    </main>
                </div>
            </div>
        )
    }
}

export default JobManager;