import React, { Component } from 'react';
import Footer from '../Footer';
import { getJobById, submitRecruiment } from '../../util/APIUtils';
import Alert from 'react-s-alert';

class JobDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobDetail: '',
            submit:'',

        };
        this.loadJobDetails = this.loadJobDetails.bind(this);
    }

    loadJobDetails() {
        getJobById(this.props.match.params.id)
            .then(response => {
                console.log("Response:", response)
                this.setState({
                    jobDetail: response,
                });
            }).catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    handleRecruitment = () => {
        submitRecruiment(this.props.match.params.id)
        .then(response => {
            Alert.success(response.message)
        })
        .catch(error => {
            Alert.error((error && error.message))
        })
    }

    componentDidMount() {

        this.loadJobDetails()
    }
    render() {

        const list = this.state.jobDetail;

        return (
            <main>


                <div class="slider-area ">
                    <div class="single-slider section-overly slider-height2 d-flex align-items-center" data-background="assets/img/hero/about.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>✨ Photographer ✨</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="job-post-company pt-120 pb-120">
                    <div class="container">
                        <div class="row justify-content-between">

                            <div class="col-xl-7 col-lg-8">

                                <div class="single-job-items mb-50">
                                    <div class="job-items">
                                        <div class="company-img company-img-details">
                                            <a href="#"><img src="../../../public/assets/img/icon/job-list3.png" alt="" /></a>
                                        </div>
                                        <div class="job-tittle">
                                            <a href="#">
                                                <h4>{list.jobTitle}</h4>
                                            </a>
                                            <ul>
                                                <li><i class="fas fa-map-marker-alt"></i>{list.address}</li>
                                                <li>{list.minSalary}$ - {list.maxSalary}$</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>


                                <div class="job-post-details">
                                    <div class="post-details1 mb-50">

                                        <div class="small-section-tittle">
                                            <h4>Mô Tả Công Việc:</h4>
                                        </div>
                                        <p>{list.description}</p>
                                    </div>
                                    <div class="post-details2  mb-50">

                                        <div class="small-section-tittle">
                                            <h4>Yêu Cầu:</h4>
                                        </div>
                                        <ul>
                                            <li>{list.requireJob}</li>
                                        </ul>
                                    </div>
                                    <div class="post-details2  mb-50">

                                        <div class="small-section-tittle">
                                            <h4>Phúc Lợi:</h4>
                                        </div>
                                        <ul>
                                            <li>{list.welfare}</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>

                            <div class="col-xl-4 col-lg-4">
                                <div class="post-details3  mb-50">

                                    <div class="small-section-tittle">
                                        <h4>Công việc:</h4>
                                    </div>
                                    <ul>
                                        <li>Địa chỉ : <span>{list.address}</span></li>
                                        <li>Level : <span>{list.level}</span></li>
                                        <li>Lương :  <span>{list.maxSalary}$</span></li>
                                        <li>Hạn ứng tuyển : <span>{new Date(list.deadline).getDay() + " - " + new Date(list.deadline).getMonth() + " - " + new Date(list.deadline).getFullYear()}</span></li>
                                    </ul>
                                    {this.props.authenticated ? (
                                        <div class="apply-btn2">
                                            <a href="#" className="btn" onClick={() => this.handleRecruitment()}>Ứng Tuyển</a>
                                        </div>
                                    ) : (
                                        "Vui lòng đăng nhập trước khi ứng tuyển."
                                    )}

                                </div>
                                <div class="post-details4  mb-50">

                                    <div class="small-section-tittle">
                                        <h4>Thông tin công ty</h4>
                                    </div>
                                    <span>Line Sky - Hành trình đồng hàng Photographer</span>
                                    <p>Hành trình tiến đến thành công</p>
                                    <ul>
                                        <li>Tên Công ty: <span>Photo Sky</span></li>
                                        <li>Website: <span>photoghapher.com</span></li>
                                        <li>Email: <span>company@gmail.com</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        )
    }
}

export default JobDetails;