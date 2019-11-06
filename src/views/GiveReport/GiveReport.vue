<template>
   <Layout>
     

        <!-- partial -->
        <div class="main-panel" slot="body">
            <div>
                <div class="page-header">
                    <h3 class="page-title">
                        <span class="page-title-icon bg-gradient-primary text-white mr-2"> <i
                                class="mdi mdi-cash-multiple"></i></span>
                       Give Report
                    </h3>
                </div>
            </div>
            <div class="content-wrapper">
            <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
            <div class="card"> 

                <div class="card-body">
                 <Loader v-if="loading" :show-full="true" loading-text="Reporting..."/>
                    <form class="forms-sample" @submit.prevent="GiveReport">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Learning Objectives</label>
                        <textarea type="text" class="form-control" v-model="objectives" placeholder="Summary of Discussion"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputEmail1">Learning Goals</label>
                        <textarea type="text" class="form-control" v-model="goals" placeholder="Summary of Discussion"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputPassword1">Summary of Discussion</label>
                        <textarea type="text" class="form-control" v-model="summary" placeholder="Summary of Discussion"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="exampleInputConfirmPassword1">Learning Outcome</label>
                        <textarea type="text" class="form-control" v-model="outcome" placeholder="Summary of Discussion"></textarea>
                      </div>
                      
                      <button type="submit" class="btn btn-gradient-primary mr-2">Send Report</button>
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
    import {Reportservice} from '../../services/report.service.js'
    
    export default {
        name: 'credit',
        components: {Loader, Layout},
        data: function () {
            return {    
                id:"5dc09b8c0c1f530017d780b1",
                objectives:"",
                goals:"",
                summary:"",
                outcome:"",
                loading: false
                }
        },
        
        methods: {
            // ...mapActions({loginUser: 'LOGIN'}),
            
            async GiveReport() {
                this.loading = true;
                await Reportservice.Report({
                    id:this.id,
                    objectives:this.objectives,
                    goals:this.goals,
                    summary:this.summary,
                    outcome:this.outcome,

                }).then((res)=>{
                    this.$toastr.success(res.status, "Report Created Successfully", {timeOut: 5000});
                }).catch((error) => {
                    this.$toastr.error(error.message, "Report failed!", {timeOut: 5000});
                });
                this.loading = false;
            }
            
        },
            
    }
</script>

<style scoped>
.form-control {
    display: block;
    width: 80%;
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