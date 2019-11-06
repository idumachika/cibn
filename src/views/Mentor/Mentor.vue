<template>
    <Layout>
        
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        Choose Mentor
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="userData" :loading="loading" @ViewProfile="ViewProfile" @openMusicModal="openMusicModal" :actions="actions"></Datatable>
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

    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewProfile',
            args: ['AdminId'],
            text: 'View Profile ',
        },
        
        
    ];
    export default {
        name: "Listuser",
       
       
        
        data() {
            return {
                title: "Listuser",
                columns: [ "Thumbs", "Name", 'Surname','Year of Exp','Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                isLoading:false,
                detailCategory:[],
                actions: action,
                loadingText:"loading...",
                callbacks: ['test', 'DeleteCategory'],
                editData:{},
                props:[]
            }
        },
        async created() {
            await Mentorservice.mentorCategory().then((response) => {
                response.forEach(({displayPicture:cover, firstName:first_name, lastName:last_name, yearsOfExperience:years, areaOfSpecialization:skill, isVerified:status_readable, _id:adminId}) => {
                    this.userData.push({
                        "Thumbs":cover ?'<img src="'+cover+'">':`<img src="https://via.placeholder.com/150/b0f7cc"/>`,
                        Name: first_name,
                        Surname:last_name,
                        'Year of Exp':years,
                         Status:status_readable === false ?'<label class="badge badge-gradient-success">Active</label>':'<label class="badge badge-gradient-info">Invited</label>',
                        AdminId: adminId
                        
                        
                    });
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
            
            ViewProfile(adminId){
                    this.loadingText = "please wait...."
                    this.isLoading = true;
                    Mentorservice.viewProfile(adminId).then((res) => {
                        this.detailCategory = res;
                        window.console.log('**********', this.detailCategory)
                        this.isLoading= false;
                        this.$router.push({
                            name: 'Profile',
                            params: {
                                items:res
                            }
                        });                        

                    }).catch((err) => this.$toastr.error(err.message || "View Profile failed", "Error!", {timeOut: 5000}));

                    
            },
            
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18
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
