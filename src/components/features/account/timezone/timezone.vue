<template>
    <q-card class="time">
        <div class="row">
            <p class="Timezone"> Time Zone : </p>
             <div class="q-pa-md" style="min-width: 500px; min-height: 100px">
    <div class="q-gutter-md">
        <q-select  outlined v-model="timezone" :options="timezones"  @update:model-value="Onchange()" />
    </div>
    </div>
        </div>
    </q-card>
</template>
<script>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from "vuex";

export default {
  setup () {
        const $store = useStore();
        const timezone = ref(null);

        onBeforeMount(() => {
            $store.dispatch("common/getTimeZone");
             })

              const Onchange = () => {
        let time = {
            timezone: timezone.value
        }
        $store.dispatch("common/getTime", time)
     }

    return {
      timezone,
            Onchange,
       timezones: computed(() => $store.getters["common/getTimezone"]),
    }
  }
}
</script>

<style lang="scss" scoped>
  .time {
      width: 40vw;
      height: 20vh;
      margin-top: 25px;
      margin-left: 35px;
      padding: 20px;
  }
 .Timezone {
     padding: 28px;
     color: $primary;
     font-size: 16px;
     font-weight: bold;
 }
 </style>