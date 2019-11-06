<template>
    <Layout>
         
       
        <!-- partial -->
        <div class="main-panel" slot="body">
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                <div class="page-header">
                    <h3 class="page-title">
                        Select  Meeting
                    </h3>
                </div>
                <div class="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="userData" :loading="loading" @GiveReport="GiveReport" @DeleteCategory="DeleteCategory" @openMusicModal="openMusicModal" :actions="actions"></Datatable>
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
    import moment from 'moment'
    import {Scheduleservice} from '../../services/Schedule.service.js';
    import {Reportservice} from '../../services/report.service.js'
    import router from '../../router.js'
    const action = [
        {
            class:'btn btn-primary',
            actionType: 'click',
            callback: 'GiveReport',
            args: ['AdminId'],
            text: 'Give Report',
        },
        
        
    ];
    export default {
        name: "Listuser",
        
        data() {
            return {
                title: "Listuser",
                columns: [ "FirstName",'Surname', 'Date','Time', 'Meeting Status'],
                perPage: 10,
                sortable: false,
                searchable: true,
                loading: true,
                userData: [],
                isLoading:false,
                actions: action,
                detailCategory:[],
                loadingText:"loading...",
                callbacks: ['test', 'DeleteCategory'],
                editData:{}
            }
        },
        async created() {
            await Scheduleservice.Schedule().then((response) => {
                response.forEach(element => {
                    console.log(element.invited);
                    this.userData.push({
                        // 'Thumbs':element.invited.displaypicture ?'<img src="'+cover+'">':`<img src="https://via.placeholder.com/150/b0f7cc"/>`,
                        FirstName:element.invited.firstName,
                        Surname: element.invited.lastName,
                       'Date': moment(element.date).format('LL'),
                       'Time': element.time,
                        'Meeting Status': element.status === "Pending"?'<label class="badge badge badge-gradient-danger">Pending</label>':'<label class="badge badge-gradient-info">Invited</label>',
                        AdminId: element.invited.adminId
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
            
            DeleteCategory(adminId){
                swal({
                        title: "Are you sure?",
                        text: "Are you sure you want to request for a mentor",
                        icon: "warning",
                        dangerMode: true,
				}).then(willDelete => {
                    if(willDelete){
                            this.loadingText = "requesting..."
                            this.isLoading = true;
                            ListCategoryservice.deleteCategory(adminId).then((res) => {
                            this.isLoading= false;
                            this.userData.splice(adminId, 1);
                            this.$toastr.success(res.message, {timeOut: 5000});
                        }).catch((error) => {
                            this.$toastr.error(error.message, "request Unsuccessfull!", {timeOut: 5000});
                            this.isLoading= false;
                        });
                    }
                })
                    
                            
            },
            EditCategory(adminId){
                    this.loadingText = "please wait..."
                    this.isLoading = true;
                    ListCategoryservice.editCategory(adminId).then((res) => {
                        this.isLoading= false;
                    this.$toastr.success(res.message, {timeOut: 5000});
                }).catch((err) => this.$toastr.error(err.message || "Edit failed", "Error!", {timeOut: 5000}));
            },
            GiveReport(){
                router.push({name:"GiveReport"})
                    
            }
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18
}
</style>
