<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        Dashboard
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-danger  card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">My Mentor
                                    <i class="mdi mdi-account mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.approved || 0}}</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-info card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Pending Mentor
                                    <i class="mdi mdi-account-multiple mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">{{dashboardData.pending || 0}}</h2>
                                <!--<h6 class="card-text">Decreased by 10%</h6>-->
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 stretch-card grid-margin">
                        <div class="card bg-gradient-success card-img-holder text-white">
                            <div class="card-body">
                                <img src="../../assets/images/circle.svg" class="card-img-absolute"
                                     alt="circle-image"/>
                                <h4 class="font-weight-normal mb-3">Available Mentor
                                    <i class="mdi mdi-account-multiple mdi-24px float-right"></i>
                                </h4>
                                <h2 class="mb-5">0</h2>
                                <!--<h6 class="card-text">Increased by 5%</h6>-->
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div class="row" >
                    <div class="col-12 grid-margin">
                        <div class="card">
                            <div class="card-body">
                    <h4 class="card-title float-left">Schedules</h4>
                   <h4 class="float-right" style="cursor:pointer"><router-link style="color:#00B84A" to="/meeting-report">View All</router-link></h4>

                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Thumbs</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(schedule, index) in scheduleData" v-bind:key="index">
                            <td>
                              <img src="../../assets/images/firstImage.png" class="mr-2" alt="image"></td>
                            <td> {{schedule.invited.firstName}} {{schedule.invited.lastName}}</td>
                            <td> {{schedule.date}}</td>
                            <td>{{schedule.time}}</td>

                            <td >
                              <label class="badge badge badge-gradient-danger"  v-if="schedule.status === 'Pending'">Pending</label>
                            </td>
                          </tr>
                          
                        </tbody>
                      </table>
                    </div>
                  </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- content-wrapper ends -->
            <!-- partial:partials/_footer.html -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2019 CIBN. All rights reserved.</span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                            class="mdi mdi-heart text-danger"></i></span>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- main-panel ends -->
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import {dashboardService} from "../../services/Dashboard.Service";
    import {Scheduleservice} from "../../services/Schedule.service.js";
    import moment from 'moment'


    export default {
        name: "Dashboard",
        components: {Layout},
        data() {
            return {
                loading: true,
                dashboardData:"",
                scheduleData:[]
            }
        },
        mounted () {
          this.fetchStats();
          this.fetchSchedule()
        },

        methods:{
          fetchStats(){
              this.loadingText = "please wait...."
              this.isLoading = true;
              dashboardService.fetchStats().then((res) => {
              this.dashboardData = res;
              window.console.log("===============",res)
              this.isLoading= false;
              
            }).catch((err) => this.$toastr.error(err.message || "Dashboard statistic failed", "Error!", {timeOut: 5000}));

                    
            },

            fetchSchedule(){
                this.loadingText = "please wait...."
                this.loading = true;
                Scheduleservice.Schedule().then((res) => {
                this.scheduleData = res;
                window.console.log("************",res)
                this.loading= false;
              
            }).catch((err) => this.$toastr.error(err.message || " Schedule failed", "Error!", {timeOut: 5000}));


            }

        }
        
     
    }
</script>

<style scoped>
    .card .card-body {
        padding: 0.5rem 1.5rem;
   
    }
    .card-body > h4 {
        padding-top: 15px;

    }

    .badge {
        display: inline-block;
        padding: 0.70em 0.7em; 
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    }
    
   
</style>