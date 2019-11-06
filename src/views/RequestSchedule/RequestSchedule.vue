<template>
    <Layout>
        <div slot="head">
            <modal name="music_details" :height="200">
                <div class="modaly"></div>
                <div class="modal-footer">
                    <button @click="closeCategory" class="btn btn-primary mx-auto">Close</button>
                </div>
            </modal>
        </div>
        
                <!-- partial -->
        <div class="main-panel" slot="body">
               
            <Loader v-if="isLoading" :showFull=true :loading-text="loadingText"/>
            <div class="content-wrapper">
                
           <div class="row">
                <nav>
					<div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
						<a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Requested Schedule</a>
                        <router-link to="/NewSchedule">
						<a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">New Schedule</a>
                        </router-link>
					</div>
				</nav>
                
               <div class="col-lg-12 grid-margin stretch-card top-down">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"></h4>
                                <!-- <Datatable :fields="fields" :data="paymentsData" :perPage="1"> -->
                                <!-- </Datatable> -->
                                <Datatable :columns="columns" :data="userData" :loading="loading" @ViewCategory="ViewCategory" @DeleteCategory="DeleteCategory" @openMusicModal="openMusicModal" :actions="actions"></Datatable>
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
    import {Scheduleservice} from '../../services/Schedule.service.js'
    const action = [
        {
            class: 'btn btn-primary',
            actionType: 'click',
            callback: 'ViewCategory',
            args: ['AdminId'],
            text: 'Review',
        },
        
        
    ];
    export default {
        name: "Listuser",
        
        data() {
            return {
                title: "Listuser",
                columns: ["FirstName", "Surname", 'Date','Time','Status'],
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
                        FirstName:element.invited.firstName,
                       Surname: element.invited.lastName,
                       'Date': moment(element.date).format('LL'),
                       'Time': element.time,
                        Status: element.status === "Pending"?'<label class="badge badge badge-gradient-danger">Pending</label>':'<label class="badge badge-gradient-info">Invited</label>',
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
            
            
        },
        components: {Layout,Loader, Datatable}
    }
</script>

<style scoped>
.textSize{
    font-size: 18
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
.top-down{
    margin-top:15px
}


</style>
