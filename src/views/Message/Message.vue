<template>
<Layout>
<div slot="body">
    <div id="app">
        <div class="sidebars">
            <card></card>
            <list></list>
        </div>
        <div class="main">
            <message></message>
        <div class="container">
            <div class="row">
                <div class="col-md-10">
                    <input class="form-control" type="text" placeholder="Type a Message..." v-model="content" @keyup="onKeyup">
                </div>
                <div class="col-md-1">
                <router-link to="/requested-schedule">
                    <img  class="float-right" src="../../assets/images/scheduler.svg"/>
                </router-link>
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
    import Card from '../../components/card/card.vue';
    import List from '../../components/list/list.vue';
    import Text from '../../components/text/text.vue';
    import Message from '../../components/message/message.vue';
    import { actions } from '../../store/store.js';



    export default {
        name: "Dashboard",
        components: {Layout, Card, List, Text, Message},
        vuex: {
            actions: actions
        },
        created () {
            this.initData();
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

#app {
  margin: 72px auto;
  width: 800px;
  height: 600px;
  overflow: hidden;
  border-radius: 3px;
  
}
#app .sidebars,
#app .main {
    height: 100%;
}
#app .sidebars {
  float: left;
  width: 200px;
  color: black;
background-color:"#ffffff"
}
#app .main {
  position: relative;
  overflow: hidden;
  background-color: #eee;
}
#app .text {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
}
#app .message {
  height: calc(-60%);
}
.text {
  height: 160px;
  padding-top:10px
}
.text textarea {
  padding: 10px;
  height: 100%;
  width: 100%;
  outline: none;
  resize: none;
  border: 0.5px solid #707070;
  border-radius:3px;
}
.textarea{
    
}
.container{
    padding-top:85%;
    height:100px;
    border-radius:5px
}


</style>