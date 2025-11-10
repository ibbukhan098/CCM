<template>
      <q-layout class="authBody" view="hHh lpR fFf">
     <img class="loginLeftImg" src="~assets/vectors/loginDesign.png"/>
    <img class="loginRightImg" src="~assets/vectors/loginDesign.png"/>
  <div class="fixed-center loginWidth">
      <forgot></forgot>   
  </div>
  <q-footer none class="bg-transparent text-primary footer" >
    <div class="row footer1">
       <div class="col-12 text-center">
           <span class="copyrights-content">© Copyright {{ year }}  </span>
           <p class="powered-by"> Catalog Communication Manager powered by <a href="https://www.sellerscommerce.com/" target="_blank"  style="cursor: pointer; color: #161616;">SellersCommerce</a></p>
       </div>
   
     </div>
     
 </q-footer>
  </q-layout>

</template>

<script>
  import { ref, onBeforeMount } from 'vue'

export default {
  setup(){
    const date = ref(new Date());
       let year = ref(date.value.getFullYear());
       return{
         date,
         year
       }
  },
  components:{    
      forgot : require('src/components/features/auth/forgot.vue').default
  },

}
</script>

<style>
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
</style>