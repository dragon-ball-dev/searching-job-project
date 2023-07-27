import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../Footer';
import { getAllJobs } from '../../util/APIUtils';

class JobList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listJob: [],
            jobName: '',
            level: '',
            minSalary: '',
            maxSalary: '',
            companyName: '',
            numberOfElements:''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadJob = this.loadJob.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }


    loadJob() {

        getAllJobs(1, 10, this.state.level, this.state.minSalary, this.state.maxSalary, this.state.jobName, this.state.companyName)
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    listJob: response.content,
                    numberOfElements: response.numberOfElements,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    componentDidUpdate() {
        this.loadJob();
    }

    componentDidMount() {
        this.loadJob();

    }
    render() {
        console.log("DATA:", this.state.listJob)
        let list = this.state.listJob;
        const number = this.state.numberOfElements;
        list.map(job => console.log(job))
        console.log("Name", this.state.jobName)

        return (
            <main>


                <div class="slider-area ">
                    <div class="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Nhận công việc của bạn ❤</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="job-listing-area pt-120 pb-120">
                    <div class="container">
                        {/* Filter */}
                        <div class="row">

                            <div class="col-xl-3 col-lg-3 col-md-4">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="small-section-tittle2 mb-45">
                                            <div class="ion"> <svg
                                                xmlns="https://www.google.com/url?sa=i&url=https%3A%2F%2Farena.fpt.edu.vn%2Fphotography%2F&psig=AOvVaw1MH6oWxcG5JohlCQ1u-JO5&ust=1690190745781000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjC96fBpIADFQAAAAAdAAAAABAI"
                                                xmlnsXlink="https://www.google.com/url?sa=i&url=https%3A%2F%2Farena.fpt.edu.vn%2Fphotography%2F&psig=AOvVaw1MH6oWxcG5JohlCQ1u-JO5&ust=1690190745781000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOjC96fBpIADFQAAAAAdAAAAABAI"
                                                width="20px" height="12px">
                                                <path fill-rule="evenodd" fill="rgb(27, 207, 107)"
                                                    d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z" />
                                            </svg>
                                            </div>
                                            <h4>Lọc công việc</h4>
                                        </div>
                                    </div>
                                </div>

                                <div class="job-category-listing mb-50">

                                    <div class="single-listing">
                                        <div class="small-section-tittle2">
                                            <h4>Tên công việc</h4>
                                        </div>
                                        <div class="select-job-items2">
                                            <input type="text" class="js-input-from" name='jobName' value={this.state.jobName} onChange={this.handleInputChange} readonly />
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div class="single-listing">
                                        <div class="small-section-tittle2">
                                            <h4>Level</h4>
                                        </div>
                                        <div class="select-job-items2">
                                            <input type="text" class="js-input-from" name='level' value={this.state.level} onChange={this.handleInputChange} readonly />
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div class="single-listing">
                                        <div class="small-section-tittle2">
                                            <h4>Lương nhỏ nhấp</h4>
                                        </div>
                                        <div class="select-job-items2">
                                            <input type="text" class="js-input-from" name='minSalary' value={this.state.minSalary} onChange={this.handleInputChange} readonly />
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div class="single-listing">
                                        <div class="small-section-tittle2">
                                            <h4>Lương cao nhất</h4>
                                        </div>
                                        <div class="select-job-items2">
                                            <input type="text" class="js-input-from" name='maxSalary' value={this.state.maxSalary} onChange={this.handleInputChange} readonly />
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div class="single-listing">
                                        <div class="small-section-tittle2">
                                            <h4>Tên Công Ty</h4>
                                        </div>
                                        <div class="select-job-items2">
                                            <input type="text" class="js-input-from" name='companyName' value={this.state.companyName} onChange={this.handleInputChange} readonly />
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-xl-9 col-lg-9 col-md-8">

                                <section class="featured-job-area">
                                    <div class="container">

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="count-job mb-35">
                                                    <span>{number} công việc</span>
                                                </div>
                                            </div>
                                        </div>
                                        {list.map(job => {
                                            if (job.status === "ENABLE") {
                                                return (
                                                    <div class="single-job-items mb-30">

                                                        <div class="job-items">
                                                            <div class="company-img">
                                                                <Link to="/job-detail"><img src="assets/img/icon/job-list1.png" alt="" /></Link>
                                                            </div>
                                                            <div class="job-tittle job-tittle2">

                                                                <Link to={`/job-detail/${job.id}`}><h4>{job.jobTitle}</h4></Link>

                                                                <ul>
                                                                    <li>{job.recruiter.company.name}</li>
                                                                    <li><i class="fas fa-map-marker-alt"></i>{job.address}</li>
                                                                    <li>{job.minSalary}$ - {job.maxSalary}$</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div class="items-link items-link2 f-right">
                                                            <Link to={`/job-detail/${job.id}`}>{job.level}</Link>
                                                            <span>{"Hạn: " + new Date(job.deadline).getDay() + " - " + new Date(job.deadline).getMonth() + " - " + new Date(job.deadline).getFullYear()}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>

                {/* <div class="pagination-area pb-115 text-center">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-12">
                                <div class="single-wrap d-flex justify-content-center">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination justify-content-start">
                                            <li class="page-item active"><a class="page-link" href="#">01</a></li>
                                            <li class="page-item"><a class="page-link" href="#">02</a></li>
                                            <li class="page-item"><a class="page-link" href="#">03</a></li>
                                            <li class="page-item"><a class="page-link" href="#"><span class="ti-angle-right"></span></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <Footer />
            </main>
        )
    }
}

export default JobList;