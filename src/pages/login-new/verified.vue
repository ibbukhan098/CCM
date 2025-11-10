<template>
  <q-layout view="hHh lpR fFf">
    <div class="row loginDiv h-2">
      <div class="col-6">
        <div class="row items-center justify-center">
          <div class="col-8">
             <div class="confirmation-email">
              <div class="my-card">
                <q-card-section class="text-center">
                  <img class="email-image" src="~assets/images/emailVerified.gif" alt="verified"/>
                  <h1 class="text-h5 text-bold q-mb-lg">Verified</h1>
                  <p class="q-mb-lg">
                     Your email has been verified
                  <br />
                       Your account is now active. Please use the link below to login your account
                  </p>
                   <div>
         <q-btn label="Login To your account" class="full-width q-btn--rounded" @click="loginAccount()" color="primary"/>
         </div>
                  <!-- <hr color="#E1E1E1" class="q-mb-sm"/>
                  <p class="q-mt-md text-underline">If you not get any email <a href="" class="resend-email-text"> Resend email notification </a> </p> -->
                </q-card-section>
              </div>
            </div>
          </div>


          <div class="col-8">
            <p class="f-12 text-center q-pt-lg q-mt-xs">
              <span class="copyrights-content">© Copyright {{ year }} </span>
              <span class="powered-by">
                Catalog Manager | Powered by
                <a
                  href="https://www.sellerscommerce.com/"
                  target="_blank"
                  style="cursor: pointer; color: #161616"
                  >SellersCommerce</a
                >
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-6 bg-primary text-center">
        <div class="row items-center justify-center" style="height: 100%">
          <img class="" src="~assets/images/login.svg" alt="login" />
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script>
import { useQuasar } from "quasar";
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
      const $store=useStore();
      const router=useRouter();
      let year = ref((new Date()).getFullYear());
    onBeforeMount(() => {
      $store.dispatch("auth/getProgramID", window.location.origin);
    });
    const loginAccount=()=>{
        router.push('/login')
    }
    return {
      year,
      loginAccount,
    };
  }
};

</script>
<style lang="scss" scoped>
.h-1 {
  height: 92vh;
}
.h-2 {
  height: 92vh;
}
.loginDiv {
  position: relative;
  .container-box {
    width: 100%;
    position: absolute;
    margin: 0;
    top: 10%;
  }
  .logo {
    height: 35px;
  }
  .light-text {
    font-size: 12px;
    color: #605b79;
  }
  .linkText {
    &:hover {
      text-decoration: underline;
    }
  }
}

.mt-50 {
  margin-top: 80px;
}
.pt-50 {
  padding-top: 10%;
}
.pt-30 {
  padding-top: 30%;
}
.h-100 {
  height: 100%;
}
.confirmation-email{
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .my-card{
    padding: 100px;
      .email-heading{
        margin-bottom: 20px;
      }
      .email-image{
      max-height: 200px;
      max-width: 200px;
      margin-bottom: 25px;
    }
    .resend-email-text{
      text-decoration: underline;
    }
  }
}
</style>
