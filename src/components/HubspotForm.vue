<template>
    <div id="hubspotForm" v-once></div>
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
