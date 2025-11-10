<template>
  <q-layout view="hHh lpR fFf" class="topDiv">
    <div class="row q-pa-sm q-px-lg lsp-logon-menu items-center">
      <div class="col">
         <img
            src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg" alt="logo" class="lsp-logon-logo" />
      </div>
    </div>
    <div class="row loginDiv justify-center items-center h-1">
      <div class="col-6">
        <div class="row h-100 items-center justify-center">
          <div class="col-6">
            <div class="confirmation-email">
              <div class="my-card container-box">
                <q-card-section class="text-center text-container">
                  <img class="email-image" src="~assets\images\payment-success.gif" alt="payment success" />
                  <h1 class="text-h3 text-bold q-mt-xs q-mb-lg">Success!</h1>
                  <p class="q-mb-lg text-bold">
                 Your payment has been processed successfully
                  </p>
                  <q-btn label="home" color="primary" to="/" />
                </q-card-section>
              </div>
            </div>
          </div>
          <div class="col-8">
            <p class="f-12 text-center q-pt-md q-mt-xs text-black">
              <span class="copyrights-content">© Copyright {{ year }} </span>
              <span class="powered-by">
                Catalog Manager | Powered by
                <a href="https://www.sellerscommerce.com/" target="_blank" class="text-black"
                  style="cursor: pointer;">SellersCommerce</a>
              </span>
            </p>
          </div>
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

    return {
      year,
    };
  }
};

</script>
<style lang="scss" scoped>
.topDiv {

  background-position: 50% -100%;
  background-size: 1800px;
  background-attachment: fixed;
}

.loginDiv {
  height: 91vh;

  .container-box {
    margin: 0;
    padding: 10px 50px;
    box-shadow: 0px 0px 16px 2px #6459b37d;
    background: #fff;
    border-radius: 1em;
  }

  .logo {
    height: 40px;
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

.lsp-logon-menu {
  .lsp-logon-logo {
    width: 200px;
    height: 35px;
  }

  .login-btn {
    width: 100px;
    // height:47px;
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

.confirmation-email {
  display: flex;
  justify-content: center;
  align-items: center;

  .my-card {
    padding: 16px 30px;

    .email-heading {
      margin-bottom: 20px;
    }
    .resend-email-text {
      text-decoration: underline;
    }

    .text-container {
      width: 350px;
      max-width: 600px;
    }

  }
}
@media (min-width: 1441px) {
  .topDiv {
    background-size: 2500px;
  }
}

@media (max-width: 550px) {
  .signup-text {
    display: none;
  }
  .my-card{
    padding: 0px !important;
  }
}
</style>

