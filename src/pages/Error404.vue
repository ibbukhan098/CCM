<template>
<div>
     <div class="row q-pa-sm q-px-lg lsp-logon-menu items-center">
      <div class="col">
        <img class="lsp-logon-logo" src="https://ccmweb.blob.core.windows.net/ccm/Um-Full.svg" alt="logo" />
      </div>
      <div class="col-lg-4 col-md-4 text-right">
        <div v-if="!isLoggedIn">
        <span class="q-mr-sm signup-text">Have an account?</span>
        <q-btn
          color="primary"
          type="submit"
          size="md"
          padding="sm"
          class="login-btn bg-primary-gradient"
          rounded
          label="Login"
          to="/login"
        />
        </div>
      </div>
    </div>
    <div class="not-found-main-container">
      <div class="not-found-container">
          <img class="not-found-image" src="~assets/images/2663506.jpg" alt="404"/>
      <div class="text-container">
            <p class="oops-text">
                Oops! Page Not Found
            </p>
            <p>
                The page you are looking for seems to have disappeared...
                The navigation above or the links below might help get you
                back on track.
            </p>
            <p>
                Please shoot us a note if we made a mistake
                <a href = "mailto: support@sellerscommerce.com">support@sellerscommerce.com</a>
            </p>
            <q-btn v-if="isLoggedIn"
            color="primary"
            type="submit"
            size="md"
            class="login-btn bg-primary-gradient q-px-lg q-py-sm q-mt-sm"
            rounded
            label="Back to home"
            to="/home"
            />
          </div>
      </div>
      </div>
      </div>
</template>

<script>
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  setup() {
    let isLoggedIn = ref(false)
    onBeforeMount(() => {
    const isToken = localStorage.getItem('token');
    if(isToken !== null){
        isLoggedIn.value = true
    }
    })
    return{
        isLoggedIn,
    }
  }
}
</script>

<style scoped lang="scss">
.not-found-main-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.lsp-logon-menu {
  .lsp-logon-logo {
    width: 220px;
    height: auto;
  }

  .login-btn {
    width: 100px;
    // height:47px;
  }
}

.not-found-container{
    height: 90vh;
    width: 40%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .not-found-image{
        height: 260px;
    }
     .not-found-heading {
        font-size: 75px;
        font-weight: bold;
        color: #242a35;
        margin-bottom: 0;
    }
    .oops-text{
        font-size: 36px;
        font-weight: bold;
    }
    .text-container{
        max-width: 660px;
    }
}
@media (max-width: 550px) {
  .signup-text {
    display: none;
  }
}
@media (min-width: 768px) and (max-width: 1024px){
    .not-found-container{
    height: 80vh;
    width: 70%;
    .not-found-image{
        height: 400px;
        margin-bottom: 0;
    }
     .not-found-heading {
        font-size: 65px;
        margin-bottom: 0;
        margin-top: 0;
    }
     .text-container{
        max-width: 660px;
        font-size: 18px;
    }
    .oops-text{
        font-size: 26px;
        font-weight: bold;
    }
}
}
@media (max-width: 768px){
   .not-found-container{
        height: 80vh;
        width: 90%;
    .not-found-image{
        height: 220px;
        margin-bottom: 0;
    }
     .not-found-heading {
        font-size: 65px;
        margin-bottom: 0;
        margin-top: 0;
    }
     .text-container{
        max-width: 660px;
        font-size: 14px;
    }
    .oops-text{
        font-size: 26px;
        font-weight: bold;
    }
}
}
@media (max-height: 768px){
  .not-found-container{
        height: 80vh;
        width: 90%;
    .not-found-image{
        height: 220px;
        margin-bottom: 0;
    }
     .not-found-heading {
        font-size: 56px;
        margin-bottom: 0;
        margin-top: 0;
    }
     .text-container{
        max-width: 660px;
        font-size: 14px;
    }
    .oops-text{
        font-size: 26px;
        font-weight: bold;
    }
}
}
</style>
