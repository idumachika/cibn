<template>
    <Layout>
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                      Profile
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div  class="border-bottom text-center pb-4">
                                            <img src="https://via.placeholder.com/150/b0f7cc" alt="profile" class="img-lg rounded-circle mb-3">
                                            <p>Bureau Oberhaeuser is a design bureau focused on Information- and Interface Des</p>
                                                        
                                        </div>
                                
                                        <div  class="py-4">
                                                <p style="color:#00B84A" class="clearfix">
                                            
                                                <span class="float-left">
                                                                    Membership ID
                                                </span> 
                                                <span  class="float-right text-muted">
                                                                    {{items.membershipId}}
                                                </span>
                                                </p> 
                                                <p style="color:#00B84A" class="clearfix">
                                            
                                                <span class="float-left">
                                                                    Status
                                                </span> 
                                                <span  class="float-right text-muted">
                                                                    Active
                                                </span>
                                                </p> 
                                                <p style="color:#00B84A" class="clearfix"><span  class="float-left">
                                                                    Phone
                                                </span> 
                                                <span  class="float-right text-muted">{{items.countryCode}}{{items.phoneNumber}}
                                                </span>
                                                </p> 
                                                <p style="color:#00B84A"  class="clearfix"><span class="float-left">
                                                                    Mail
                                                </span> <span  class="float-right text-muted">
                                                                    {{items.email}}
                                                </span>
                                                </p> 
                                                <p style="color:#00B84A"  class="clearfix"><span class="float-left">
                                                                    Organization
                                                </span> <span style="color:#00B84A"  class="float-right text-muted">{{items.organization}}</span>
                                                </p> 
                                                <p style="color:#00B84A" class="clearfix"><span class="float-left">
                                                                    State
                                                </span> <span  class="float-right text-muted">{{items.state}}</span>
                                                </p>
                                                </div>
                                        </div>


                                       <div class="col-lg-8">
                                            <div class="d-flex justify-content-between">
                                                <div>
                                                    <h3>{{items.firstName}} {{items.lastName}}</h3>
                                                        <div class="d-flex align-items-center">
                                                        <h5 class="mb-0 mr-2 text-muted">{{items.country}}</h5>
                                                        </div>
                                                </div>
                                                <div>
                                                    <button class="btn btn-gradient-primary"  @click='RequestMentor(items._id)'>Request Mentor</button>
                                                </div>
                                            </div>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
    import Layout from '../../components/Layout';
    import Datatable from '../../components/Datatable/Datatable';
    import Loader from '../../components/Loader/Loader';
    import swal from 'sweetalert';
    import {Mentorservice} from '../../services/Mentor.service.js';
    import router from '../../router.js'
    const action = [
        {
            class: 'btn-primary',
            actionType: 'click',
            callback: 'GiveReport',
            args: ['AdminId'],
            text: 'Give Report',
        },
        
        
    ];
    export default {
        name: "Listuser",
        props: ['items'],
        

        
        data() {
            return {
                title: "Listuser",
                columns: [ "AdminId","Thumb", "Mentor", 'Date','Time', 'Meeting Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                isLoading:false,
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'DeleteCategory'],
                editData:{}
            }
        },
        
        async created() {
            await Mentorservice.mentorCategory().then((response) => {
                response.forEach(({displayPicture:cover,firstName:first_name,lastName:last_name, yearsOfExperience:years, areaOfSpecialization:skill, status:status_readable, _id:adminId}) => {
                    this.userData.push({
                        "Thumb":'<img src="'+cover+'">',
                        Mentor: first_name,
                        Date:last_name,
                        'Time':years,
                        'Meeting Status': status_readable,
                        AdminId:adminId
                        
                        
                    });
                    console.log("///////////",AdminId)
                });
                this.loading = false;
            }).catch((err) => window.console.log(err));
        },
        methods: {
            test(adminId) {
                    window.console.log("Userid: " + adminId);
            },
            blockUser() {
                    window.alert('Blocked User');
            },
            closeCategory() {
                this.$modal.hide('music_details');
            },
            openMusicModal(AdminId,Name, Description ) {
	
				this.$modal.show('music_details', {AdminId: AdminId,Name: Name, Description: Description});
            },
            beforeOpen(event) {
				this.editData = event.params;
            },
            RequestMentor(AdminId){
                swal({
                    title: "Are you sure?",
                    text: "Are you sure you want to request for a mentor",
                    icon: "warning",
                    dangerMode: true,
				}).then(willDelete => {
                    if(willDelete){
                            this.loadingText = "requesting..."
                            this.isLoading = true;
                            Mentorservice.RequestMentor(AdminId).then((res) => {
                            this.isLoading= false;
                            this.$toastr.success(res.message|| "Request has been sent", "Success",  {timeOut: 5000});
                        }).catch((error) => {
                            this.$toastr.error(error.message, "Request Unsuccessfull!", "Error!", {timeOut: 5000});
                            this.isLoading= false;
                        });
                    }
                })
                    
                            
            },
           
            
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18
}
.badge-outline-dark {
    color: #3e4b5b !important;
    border: 1px solid #3e4b5b !important;
    
}
.badge {
    border-radius: .125rem;
    font-size: 11px;
    font-weight: 400;
    line-height: 1;
    padding: .375rem .5625rem;
    font-family: ubuntu-medium,sans-serif;
}
.badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
}
.badge {
    
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}

.badge {
    border-radius: .125rem;
    font-size: 11px;
    font-weight: initial;
    line-height: 1;
    padding: .375rem .5625rem;
    font-family: "ubuntu-medium", sans-serif;
}


pb-4, .py-4 {
    padding-bottom: 1.5rem!important;
}
.pt-4, .py-4 {
    padding-top: 1.5rem!important;
}
.border-bottom {
    border-bottom: 1px solid #ebedf2!important;
}
.justify-content-between {
    justify-content: space-between!important;
}
.d-flex{
    display:flex !important
}
.align-items-center{
    align-items:center !important
}
label {
    display: inline-block;
    margin-bottom: .5rem;
}
</style>
