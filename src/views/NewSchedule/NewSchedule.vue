<template>
   <Layout>

        <!-- partial -->
        <div class="main-panel" slot="body">
            <div class="">
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                                New Schedule
                    </h3>
                </div>
            </div>
            <div class="content-wrapper">
               
            <div class="row">
            <nav>
				<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <router-link to="/requested-schedule">
						<a class="nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Requested Schedule</a>
                    </router-link>
                      
					<a class="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">New Schedule</a>
                       
				</div>
			</nav>
                
            <div class="col-md-12 grid-margin stretch-card top-down">
            <Loader v-if="loading" :show-full="true" loading-text="Scheduling..."/>

            <div class="card"> 

                <div class="card-body">
                    <form class="forms-sample" @submit.prevent="Schedule">
                      <div class="form-group">
                        <label for="exampleInputCity1">Set Date</label>
                            <input type="date" class="form-control" v-model="date"></input>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputCity1">Set Time</label>
                            <input type="time" class="form-control" v-model="time"></input>
                      </div>
                      <div class="form-group">
                        <label for="exampleTextarea1">Topic</label>
                        <textarea class="form-control" v-model="topic" placeholder="Comment Here...." rows="4"></textarea>
                      </div>
                        <div class="form-group">
                        <label for="exampleTextarea1">Note</label>
                        <textarea class="form-control" v-model="notes" placeholder="Comment Here...."  rows="4"></textarea>
                      </div>
                      <button type="submit" class="btn btn-gradient-primary mr-2">Schedule</button>
                      <button class="btn btn-light">Cancel</button>
                    </form>
                </div>
              </div>
            </div>
            </div>
            </div>
        
        </div>
        
    </Layout>
</template>

<script>
    import Loader from "../../components/Loader/Loader";
    import Layout from '../../components/Layout';
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import {Scheduleservice} from '../../services/Schedule.service.js';
    import {Mentorservice} from '../../services/Mentor.service.js';
    
    export default {
        name: 'credit',
        components: {Loader, Layout,DatePick},
        data: function () {
            return {    
                id:"5dc09b8c0c1f530017d780b1",
                time:"",
                date:"",
                topic:"",
                notes:"",
                loading: false,
                date: '2019-01-01'

            }
        },
        
        methods: {
            async Schedule() {
                this.loading = true;
                await Scheduleservice.RequestSchedule({
                    id:this.id,
                    time:this.time,
                    date:this.date,
                    topic:this.topic,
                    notes:this.notes,
                }).then((res)=>{
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.topic, "schedule failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
        ViewProfile(){
            this.loadingText = "please wait...."
            this.isLoading = true;
            Mentorservice.mentorCategory().then((res) => {
            this.detailCategory = res;
            window.console.log('**********', this.detailCategory)
            this.isLoading= false;                 

        }).catch((err) => this.$toastr.error(err.message || "View Profile failed", "Error!", {timeOut: 5000}));
                    
        },
            
    }
</script>


<style scoped>
.top-down{
    margin-top:15px
}
#tabs{
	background: #ed1212;
    color: black;
}
#tabs h6.section-title{
    color: black;
}

#tabs .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #00B84A;
    background-color: transparent;
    border-color: transparent transparent #f3f3f3;
    border-bottom: 4px solid !important;
    font-size: 13px;
    font-weight: bold;
}
#tabs .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    color: #ed1212;
    font-size: 15px;
}
a {
    color:#000000;
     text-decoration: none;
    background-color: transparent;
    font-size:13px
}
.form-control {
    display: block;
    width: 90%;
    padding: 0.94rem 1.375rem;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1;
    color: #495057;
    background-color: #ffffff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 2px;
    -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
    
</style>