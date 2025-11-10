<template>
  <q-layout class="authBody" view="hHh lpR fFf">
    <img class="loginLeftImg" src="~assets/vectors/loginDesign.png"/>
    <img class="loginRightImg" src="~assets/vectors/loginDesign.png"/>
    <div class="fixed-center loginWidth">
      <!-- <div class="fixed-center"> -->
      <q-splitter
        style="height: 400px;"
        v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            indicator-color = "primary"
            active-bg-color = "white">
            <q-tab name="login" icon="mdi-login" label="Login" class="mt-50 bg-white text-primary">
            <!-- <q-icon name="mdi-login" size="lg"/> -->
            </q-tab>
            <q-tab name="signup" icon="mdi-account-plus" label="signup" class="bg-white text-primary" />
            <!-- <q-tab name="forgot" icon="mail" label="forgot" /> -->
            <!-- <q-tab name="forgot" icon="mdi-account-plus" label="forgot" class="bg-white text-primary" /> -->
            <!-- <q-tab name="forgot" icon="mail" label="forgot" /> -->
          </q-tabs>
        </template>
        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up">
            <q-tab-panel name="login">
              <login></login>
            </q-tab-panel>
            <q-tab-panel name="signup">
              <signup></signup>
            </q-tab-panel>
              <q-tab-panel name="forgot">
              <forgot></forgot>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
    <q-footer none class="bg-transparent text-primary footer" >
      <div class="row footer1">
         <div class="col-12 text-center">
             <span class="copyrights-content">© Copyright {{ year }}  </span>
             <p class="powered-by"> Catalog Communication Manager Powered by <a href="https://www.sellerscommerce.com/" target="_blank"  style="cursor: pointer; color: #161616;">SellersCommerce</a></p>
         </div>
     
       </div>
       
   </q-footer>
  </q-layout>

</template>
  
<script>
  import { ref, onBeforeMount } from 'vue'
  import { useStore } from "vuex";
  
  export default {
     setup () {
       const $store = useStore();
       const date = ref(new Date());
       let year = ref(date.value.getFullYear());
      onBeforeMount(() => {
        $store.dispatch('auth/getProgramID', window.location.origin)
      })
      return {
        tab: ref('login'),
        date,
        year,
        splitterModel: ref(20)
      }
    },
    components:{
        login : require('src/components/features/auth/login.vue').default,
        signup : require('src/components/features/auth/signup.vue').default,
        forgot : require('src/components/features/auth/forgot.vue').default
    }
  }
</script>

<style lang="scss">
.login-img {
      width: 4%;
    margin: auto;
    margin-right: 5px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
}
.footer1{
  margin-bottom: 0.1%;
}
.footerImg {
  text-align: right;
}
.copyrights-content {
     color: #161616;
    font-size: 12px;
    opacity: 0.9;
    line-height: 10px;
    font-weight: 300;
    margin-right: 10px;
    margin-left: 10px;
    position: relative;
    /* top: 50%; */
    transform: translateY(-30%);
    display: inline-block;
}
.powered-by{
  color: #161616;
    font-size: 12px;
    opacity: 0.9;
    line-height: 10px;
    font-weight: 300;
    margin-right: 10px;
    position: relative;
    /* top: 50%; */
    transform: translateY(-30%);
    display: inline-block;
}
.footerLogo{
  height: 19px;
}
.sc{
  color: #404349;
  font-size: 15px;
  font-weight: 300;
  font-weight: 800;
}
.footer-tabs{
  position: fixed;
  bottom: 0;
  width: 100%;
}
.authBody{
  height: 100%;
  background-color: $background;
  overflow: hidden;
  .q-splitter__before, .q-splitter__after{
    overflow: unset;
  }
  .mt-50{
    margin-top: 55%;
  }
  .q-panel-parent{
    overflow: visible;
    .scroll{
      overflow: unset;
    }
  }
  .q-tab{
    padding: 40px 20px;
    .q-tab__icon{
      width: 40px;
      height: 40px;
      font-size: 40px;
    }
  }
  .q-tab-panel{
    padding: unset;
  }
  .loginLeftImg{
    position: absolute;
    top: -7%;
    left: -9%;
    width: 30%;
  }
  .loginRightImg{
    position: absolute;
    bottom: -14%;
    right: -7%;
    width: 30%;
  }
  .splitterDiv{
    height: 400px;
    width: 80%;
  }
  .loginWidth{
    width: 85%;
  }
  .absolute-right{
    left: 0;
  }
  .q-splitter__panel{
    width: 10% !important;
  }
}
</style>
