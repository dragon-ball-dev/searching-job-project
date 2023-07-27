import React from "react";
import { getJobById } from "../../util/APIUtils";

class ModalBigContent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            jobDetail: '',
            submit:'',

        };
        
        this.loadJobDetails = this.loadJobDetails.bind(this);
    }

    loadJobDetails() {
        getJobById(this.props.jobId)
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

    componentDidUpdate(){
        this.loadJobDetails();
    }

    render() {
        
        const list = this.state.jobDetail;
    
        return (
            
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
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

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalBigContent;