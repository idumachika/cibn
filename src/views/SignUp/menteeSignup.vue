<template>
  <div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <div class="card" style="margin-top:0%; margin-bottom:1%;">
                <div class="card-body">Fill in the fields below to register successfully with CIBN for Mentorship as a <strong>MENTEE</strong></div>
            </div>
            <div class="card">
                <div class="card-header"  style="background-color: #b46e48; color: #fff;">Membership Application Form</div>
                    <div class="card-body">
                        <ValidationObserver v-slot="{ passes }">  
                            <form  @submit.prevent="passes(postMentee)"  style="width:80%">

                              <div class="row">
                                 <div class="form-group col-md-6">
                                    <ValidationProvider name="membershipId" rules="required"  v-slot="{ errors }">
                                        <label for="member" class="label-control">Membership Number</label>
                                        <input v-model='membership_number' name="membershipId" type="text" class="form-control" id="member">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                 </div>
                                 <div class="col-md-6">
                                     <label for="" class="label-control active">Category</label>
                                     <div>
                                        <div>
                                            <b-form-checkbox  disabled switch  v-model="checked" value='mentee'>Mentee</b-form-checkbox>
                                        </div>
                                     </div>
                                </div>
                              </div>

                              <div class="row">
                                <div class="form-group col-md-6 col-sm-12">
                                   <ValidationProvider name="title" rules="required" v-slot="{ errors }">
                                        <label for="">Title</label><br>
                                        <select v-model="title" name="title" class="custom-select custom-select-sm " style="width:100%; height: 50%;">
                                            <option value="male">Mr</option>
                                            <option value="female">Mrs</option>
                                            <option value="Dr">Dr</option>
                                            <option value="Prof">Prof</option>
                                            <option value="Sir">Sir</option>
                                            <option value="Sir">Miss</option>

                                        </select>
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                   
                                </div>
                                <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="lastname" rules="required" v-slot="{ errors }">
                                        <label for="lastname">Surname</label>
                                        <input v-model="lastname" name="lastname" type="text" class="form-control" id="lastname">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider> 
                                </div>
                                <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="firstname" rules="required" v-slot="{ errors }">
                                        <label for="firstname">First Name</label>
                                        <input v-model="firstname" type="text" name="firstname" class="form-control" id="firstname">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>   
                                </div>
                                <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="middlename" rules="" v-slot="{ errors }">
                                        <label for="middlename">Middle Name</label>
                                        <input v-model="middlename" name="middlename" type="text" class="form-control" id="middlename">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                    
                                </div>
                                
                                <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                                        <label for="email">Email</label>
                                        <input v-model="email" type="email" class="form-control" id="email">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>   
                                </div>
                                <div class="form-group col-md-6 col-sm-12">
                                   <ValidationProvider name="phoneNumber" rules="required|numeric|min:11|max:11" v-slot="{ errors }">
                                        <label for="phone">Phone Number</label>
                                        <input v-model="phone" name="phoneNumber" type="number" class="form-control" id="phone">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="DOB" rules="required" v-slot="{ errors }">
                                        <label for="dob">Date of Birth</label>
                                        <input v-model="dob" name="DOB" type="date" class="form-control" id="dob">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider  name="address" rules="required" v-slot="{ errors }">
                                        <label for="address">Address</label>
                                        <input v-model="address" type="text" name="address" class="form-control" id="address">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="sex" rules="required" v-slot="{ errors }">
                                        <label for="">Sex</label><br>
                                        <select v-model="sex" name="sex" class="custom-select custom-select-sm " style="width:100%; height: 50%;">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider> 
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="organization" rules="required" v-slot="{ errors }">
                                        <label for="organ">Organization</label>
                                        <input v-model="organization" type="text" class="form-control" id="organ">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="password" rules="required|min:6" ref="password" v-slot="{ errors }">
                                        <label for="password">Password</label>
                                        <input v-model="password" type="password" name="password" class="form-control" id="password">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group col-md-6 col-sm-12">
                                    <ValidationProvider name="password confirmation" rules="required|confirmed:password" v-slot="{ errors }">
                                        <label for="password">Confirm Password</label>
                                        <input v-model="password1" name="password confirmation" type="password" class="form-control" id="password1">
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                    </ValidationProvider> 
                                  </div>
                            </div>
                            <div class="card-header"  style="background-color: #b46e48; color: #fff;">Area of Interest</div>
                                <div class="" >
                                  <ValidationProvider name="primary interest" rules="required" v-slot="{ errors }"> 
                                    <label for="">Primary interest</label><br>
                                    <select v-model="primary_interest" name="primary interest" class="custom-select custom-select-sm " style="width:50%; height: 50%;">
                                        <option selected>Select Interest</option>
                                        <option value="name1">Options</option>
                                        <option value="name2">Options</option>
                                        <option value="name3">Options</option>
                                    </select> <br>
                                    <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                  </ValidationProvider>  
                                </div><br>
                                <div class="mb-3" >
                                   <ValidationProvider name="secondary interest" rules="required" v-slot="{ errors }">  
                                        <label for="">Secondary interest</label><br>
                                        <select v-model="secondary_interest" class="custom-select custom-select-sm " style="width:50%; height: 50%;">
                                            <option selected>Select Interest</option>
                                            <option value="name1">Options</option>
                                            <option value="name2">Options</option>
                                            <option value="name3">Options</option>
                                        </select> <br>
                                        <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                                   </ValidationProvider> 
                                </div>
                          <div class="form-group">
                            <ValidationProvider name="years of experience" rules="required" v-slot="{ errors }">
                              <label for="" class="label-control">Area of specialisation </label>
                              <textarea v-model="areaOfSpecialization" type="text" class="form-control"  style="width: 50%; height: 100%;" placeholder="Not more than 100 characters"></textarea> <br>
                              <span style="font-size:13px; color:red"> <span v-if="errors[0]"><i class="fas fa-ban"></i></span> {{ errors[0] }}</span>
                            </ValidationProvider>
                          </div>
                           <div class="d-flex" style="justify-content:space-between">
                              <button type="submit" class="btn btn-primary" style="background-color:#e3e3e3 !important; border:1px solid grey; margin-top: 10px;"><a href="#" style="color:#000;">Cancel</a></button>
                              <button type="submit" class="btn btn-success" style="margin-left: 75%; color:#fff;">Submit</button>
                         </div>
                      </form>
                     </ValidationObserver> 
                 </div>
              </div>
            </div>
      </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
name:'menteeSignUp',
components : {
    ValidationObserver,
    ValidationProvider
},

data () {
    return {
        membership_number:'',
        title:'',
        firstname:"",
        lastname:'',
        middlename:"",
        checked:'mentee',
        phone:"",
        email:"",
        password:'',
        dob:'',
        address:'',
        sex:'',
        organization:'',
        primary_interest:'',
        secondary_interest:'',
        areaOfSpecialization:''

    }
},

methods : {
    postMentee () {
        
        this.$store.dispatch('postMentee', {
        membership_id:this.membership_number,
        title:this.title,
        firstName:this.firstname,
        lastName:this.lastname,
        middleName:this.middlename,
        phoneNumber:this.phone,
        email:this.email,
        password:this.password,
        category : this.checked,
        display_picture:this.display_picture,
        DOB:this.dob,
        address:this.address,
        category:this.checked,
        sex:this.sex,
        organization:this.organization,
        interest1:this.primary_interest,
        interest2:this.secondary_interest,
        specialization:this.areaOfSpecialization
        
        })
    },
  },

   mounted () {
       this.$store.dispatch('menteeSignup');
  }
}
</script>

<style>

</style>