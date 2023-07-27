import React, { Component } from 'react';
import Footer from './Footer';
import JobFeatures from './JobFeatures';
import { Link, NavLink } from 'react-router-dom';
import AdvertisementFeater from './AdvertisementFeater';

class Home extends Component {
    render() {
        return (
            <main>

            
            <div class="slider-area ">
                
                <div class="slider-active">
                    <div class="single-slider slider-height d-flex align-items-center" data-background="../../public/assets/img/hero/h1_hero.jpg">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-9 col-md-10">
                                    <div class="hero__caption">
                                        <h1>Tìm kiếm một công việc nhiếp ảnh gia✨✨✨</h1>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <section class="featured-job-area feature-padding">
                <div class="container">
                
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-tittle text-center">
                                <span>✨✨✨</span>
                                <h2>Công Việc Nổi Bật</h2>
                            </div>
                        </div>
                    </div>
                <JobFeatures/>
                </div>
            </section>

            <div class="apply-process-area apply-bg pt-150 pb-150" data-background="../../public/assets/img/gallery/how-applybg.png">
                <div class="container">
             
                    <div class="row">
                        <div class="col-lg-4 col-md-6">
                            <div class="single-process text-center mb-30">
                                <div class="process-ion">
                                    <span class="flaticon-search"></span>
                                </div>
                                <div class="process-cap">
                                   <h5>1. Tìm kiếm công việc</h5>
                                   <p>Nhanh chóng dễ dàng</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="single-process text-center mb-30">
                                <div class="process-ion">
                                    <span class="flaticon-curriculum-vitae"></span>
                                </div>
                                <div class="process-cap">
                                   <h5>2. Ứng tuyển công việc</h5>
                                   <p>Tốc độ siêu nhanh</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="single-process text-center mb-30">
                                <div class="process-ion">
                                    <span class="flaticon-tour"></span>
                                </div>
                                <div class="process-cap">
                                   <h5>3. Phù hợp với bạn</h5>
                                   <p>Hợp tính cách, tầm hồn và bản thân</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
      
         
             <div class="support-company-area support-padding fix">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-xl-6 col-lg-6">
                            <div class="right-caption">
            
                                <div class="section-tittle section-tittle2">
                                    <span>Chúng tôi đang làm gì</span>
                                    <h2>Nơi tìm kiếm việc làm</h2>
                                </div>
                                <div class="support-caption">
                                    <p class="pera-top">Nơi cơ hội dành cho mọi người, góp phần tăng số lương nhưng người có việc làm một cách nhanh nhất</p>
                                    <p>Hãy đăng lí nhà tuyển dụng để tìm tới những ứng viên tài năng</p>
                                
                                    <Link className="btn post-btn" to="/login-recruiter">Đăng Tuyển</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6">
                            <div class="support-location-img">
                                <img src="assets/img/service/support-img.jpg" alt=""/>
                                <div class="support-img-cap text-center">
                                    <p>Since</p>
                                    <span>2023</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-blog-area blog-h-padding">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="section-tittle text-center">
                                <span>Quảng Cáo</span>
                                <h2>Quảng cáo gần đây</h2>
                            </div>
                        </div>
                    </div>
                    
                        <AdvertisementFeater />
                  
                </div>
            </div>
            <Footer/>

        </main>

        )
    }
}

export default Home;