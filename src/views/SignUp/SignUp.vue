<template>
  <div class="container-fluid">
      <mdb-navbar dark position='top' expand='medium' class="navbar" style="background: green; width: 100vw;"> 
       <mdb-navbar-brand waves >
          <router-link to="/"> <img src="../../assets/images/logos.png" alt=""></router-link>
       </mdb-navbar-brand>

    </mdb-navbar>
    <div class="container parent d-flex float-left ml-5" style="margin-top: 120px; justify-content: space-around ; width: 30%;" >
      <div class="mentee" style="cursor: pointer;" @click="mentee" v-bind:class="{active:isActive1}">Mentee</div>
       <div class="mentor" style="cursor: pointer;" @click="mentor" v-bind:class="{active:isActive2}">Mentor</div>
    </div>

    <div class="container router-view"> 
      <router-view></router-view>
    </div>


    
    
  
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import{mdbNavbar, mdbBtn, mdbContainer, mdbNavItem, mdbNavbarNav,  mdbDropdown,mdbDropdownItem,mdbDropdownMenu, mdbDropdownToggle,mdbNavbarToggler, mdbNavbarBrand, mdbModal, mdbModalHeader, mdbModalBody, mdbModalTitle, mdbModalFooter } from 'mdbvue'
export default {
name:'signUpNavbar',
components:{
    mdbBtn,
    mdbNavbar,
    mdbNavItem, 
    mdbNavbarNav,
    mdbNavbarToggler, 
    mdbNavbarBrand,
    mdbContainer,
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbModal, 
      mdbModalHeader, 
      mdbModalBody, 
      mdbModalTitle, 
      mdbModalFooter
},
data() {
  return {

  }
},
methods:{
  mentee () {
    this.$store.dispatch('menteeSignup');
    this.$router.push('/mentee')
  },
  mentor () {
    this.$store.dispatch('mentorSignup');
    this.$router.push('/mentor')
  }
},
computed : {
  ...mapGetters (['isActive1', 'isActive2'])
},

}
</script>

<style scoped>
.active{
  border-bottom: 5px solid green;
}
.router-view {
  position: absolute;
  /* border: 2px solid black; */
  margin-top:190px;
  margin-left: 50px;
  /* width: auto;  */
  height: auto;
}
</style>