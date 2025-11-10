<template>
    <div class="q-pa-md q-gutter-md main">
        <div class="text-h6 addressTitle" style="padding: 20px"> Contact us </div>
        <q-card class="Contact">
            <div id="hubspotForm" v-once></div>
        </q-card>
    </div>
</template>



<script>
import {  onBeforeMount, onMounted } from "vue";
import { useQuasar,Dialog ,QSpinnerPuff, LocalStorage} from "quasar";

// import AOS from "aos";
// import "aos/dist/aos.css";
export default {
    setup(){
        const $q = useQuasar()
        onBeforeMount(() => {

            $q.loading.show({
                spinner: QSpinnerPuff,
                spinnerColor: "indigo",
                backgroundColor: "white",
            })
           if (window.hbspt) {
             window.hbspt.forms.create({
                region: "na1",
                portalId: "1839515",
                formId: "7cedece1-9d73-438d-84a8-3e81ad7e7ec1",
                target: "#hubspotForm"
            });
           }

        setTimeout(()=>{
          $q.loading.hide()

        },2000)
    });

    }
}
</script>

<style lang="scss" scoped>
  .addressTitle{
          padding: 30px 0 8px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
           left: 6%;
    bottom: 17px;
    width: 97px;
            height: 3px;
            transform: skew(-12deg) translateX(-50%);
            background: $primary;
            z-index: -1;
          }
        }
  .Contact {
      width: 70%;
      margin-top: 25px;
      margin-left: 35px;
      padding: 20px;
  }
 .text {
     margin-top: 28px;
     color: $primary;
      margin: 8px;
    margin-left: 29px;
 }
</style>
