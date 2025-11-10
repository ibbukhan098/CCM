<template>
<div class="q-pl-sm q-mt-lg">
 <q-breadcrumbs class="q-pl-xl q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Back" icon="mdi-arrow-left-circle" :to="previosPage" class="contact-us-back-button"/>
      </q-breadcrumbs>
      <hr />
  </div>
  <div class="contactUsfont">
    <div class="contact-card row justify-between items-center q-pl-lg q-pr-xl">
            <div class="col-6 q-py-sm q-px-lg main" >
              <q-form @submit="contactApi" class="q-gutter-md">
                <div class="row">
                  <div class=" text-h6 addressTitle" style="padding:20px" >Contact</div>
                </div>
                <div class="row q-gutter-md">
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      First Name*
                    </p>
                    <q-input
                      standard
                      rounded
                      outlined
                      standout
                      dense
                      placeholder="John"
                      v-model="contactfirstName"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'First name is required',
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      Last Name*
                    </p>
                    <q-input
                      standard
                      rounded
                      outlined
                      standout
                      dense
                      placeholder="Doe"
                      v-model="contactlastName"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Last name is required',
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                </div>
                <div class="row q-gutter-md q-mt-none">
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      Company Name*
                    </p>
                    <q-input
                      v-model="contactcompanyName"
                      rounded
                      outlined
                      standout
                      dense
                      placeholder="SellersCommerce"
                      standard
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Company name is required',
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      Company URL*
                    </p>
                    <q-input
                      v-model="contactcompanyURL"
                      rounded
                      outlined
                      standout
                      dense
                      placeholder="www.xyz.com"
                      standard
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'Company URL is required',
                        isValidUrl,
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                </div>
                <div class="row q-gutter-md q-mt-none">
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      Email *
                    </p>
                    <q-input
                      standard
                      rounded
                      outlined
                      standout
                      dense
                      placeholder="abc@gmail.com"
                      autocomplete="off"
                      autocapitalize="off"
                      v-model="contactemail"
                      lazy-rules
                      :rules="[
                        (val) => !!val || 'Email is required',
                        isValidEmail,
                        isValidateDomain,
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                  <div class="col-5">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                     Phone number *
                    </p>
                    <q-input
                    standard
                    rounded
                    outlined
                    standout
                    dense
                    placeholder="1234567890"
                      type="tel"
                      v-model="contactbillPhone"
                      mask="##########"
                      :rules="[
                        (val) => (val && val.length === 10) || 'Phone number is required',
                      ]"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                </div>
                <div class="row q-gutter-md q-mt-none">
                  <div class="col-10">
                    <p class="text-bold text-body2 q-mb-sm q-pb-none">
                      Message
                    </p>
                    <q-input
                    standard
                    rounded
                    outlined
                    standout
                    class="contactusTextarea description"
                    v-model="contacttext"
                    type="textarea"
                    ><div style="display:none;">ada</div></q-input>
                  </div>
                </div>
                <div class="q-pa-md row justify-start">
                  <q-btn
                    rounded
                    label="Send Message"
                    type="submit"
                    class="contact-button"
                  />
                </div>
              </q-form>
            </div>
        <div class="contact-info q-pa-xl col-6">
          <div class="row justify-center text-h6 q-mb-md contact-footer-head ">
            Contact Information
          </div>
          <div
            class="text-weight-thin text-bold text-center contact-footer-fill"
          >
           Please fill the form and our team will get back to you soon.
          </div>
          <div class="q-pa-md q-ml-lg">
            <div class="row q-mt-lg">
              <div class="col-1 contact-icon">
                <i class="mdi mdi-phone"></i>
              </div>
              <div class="col-5 contact-icon-desc text-weight-thin">
                847-656-5770
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col-1 contact-icon">
                <i class="mdi mdi-email"></i>
              </div>
              <div class="col-5 contact-icon-desc text-weight-thin">
                support@sellerscommerce.com
              </div>
            </div>
            <div class="row q-mt-lg">
              <div class="col-1 contact-icon">
                <i class="mdi mdi-map-marker"></i>
              </div>
              <div class="col contact-icon-desc text-weight-thin">
                5600 N River Road Suite 800 Rosemont, IL 60018
              </div>
            </div>
          </div>
          <div class="row justify-center q-gutter-md q-pb-md">
            <a href="https://www.facebook.com/sellerscommerce" target="_blank">
            <div style="display:none;">ada</div>
              <div class="col-12 q-ml-lg contact-social-icon">
                <i class="mdi mdi-facebook"></i></div
            ></a>
            <a
              href="https://www.youtube.com/user/sellerscommerce/"
              target="_blank"
              ><div style="display:none;">ada</div><div class="col-12 q-ml-lg contact-social-icon">
                <i class="mdi mdi-youtube"></i></div
            ></a>
            <a
              href="https://www.linkedin.com/company/sellers-commerce/"
              target="_blank"
              ><div style="display:none;">ada</div><div class="col-12 q-ml-lg contact-social-icon">
                <i class="mdi mdi-linkedin"></i></div
            ></a>
            <a href="https://twitter.com/sellerscommerce" target="_blank"
              ><div style="display:none;">ada</div><div class="col-12 q-ml-lg contact-social-icon">
                <i class="mdi mdi-twitter"></i></div
            ></a>
          </div>
        </div>
    </div>
  </div>

  <div class="mobile">
    <q-card style="min-width: 350px">
      <q-toolbar>
        <q-toolbar-title>
          <span class="text-weight-bold flex justify-center">Contact Us</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-card-section>
        <div class="q-pa-md" style="max-width: 800px">
          <q-form @submit="contactApi" class="q-gutter-md">
            <q-input
              standard
              v-model="contactfirstName"
              label="First name*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'First Name is required',
              ]"
            />
            <q-input
              standard
              v-model="contactlastName"
              label="Last name*"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Last Name is required',
              ]"
            />
            <q-input
              standard
              autocomplete="off"
              autocapitalize="off"
              v-model="contactemail"
              label="Business Email *"
              lazy-rules
              :rules="[
                (val) => !!val || 'Email is required',
                isValidEmail,
                isValidateDomain,
                validateEmail,
              ]"
            />
            <q-input
            standard
            label="1234567890"
              type="tel"
              v-model="contactbillPhone"
              mask="##########"
              :rules="[
                (val) => (val && val.length === 10) || 'Phone Number is required',
              ]"
            />
            <q-input
              v-model="contactcompanyName"
              label="Company Name*"
              standard
              :rules="[
                (val) => (val && val.length > 0) || 'Company Name is required',
              ]"
            />
            <q-input
              v-model="contactcompanyURL"
              label="Company URL*"
              standard
              :rules="[
                (val) => (val && val.length > 0) || 'Company URL is required',
                isValidUrl,
              ]"
            />
            <q-input
              v-model="contacttext"
              filled
              type="textarea"
              label="Message*"
            />

            <div class="q-pa-md row justify-center">
              <q-btn
              rounded
                label="Send Message"
                type="submit"
                style="background-color: #5a68c2; color: #fff"
              />
            </div>
          </q-form>
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-pa-lg contact-mobile-info">
      <div class="row justify-center text-h6 q-mb-md contact-footer-head">
        Contact Information
      </div>
      <div class="text-weight-medium text-bold contact-footer-fill">
        Fill the form and our team will get back to you within 24hours.
      </div>
      <div class="q-pa-md q-pa-md">
        <div class="row q-mt-lg">
          <div class="col-2 contact-icon"><i class="mdi mdi-phone"></i></div>
          <div class="col-5 contact-icon-desc text-weight-medium text-h6">
            847-656-5770
          </div>
        </div>
        <div class="row q-mt-lg">
          <div class="col-2 contact-icon"><i class="mdi mdi-email"></i></div>
          <div class="col-5 contact-icon-desc text-weight-medium text-h6">
            support@sellerscommerce.com
          </div>
        </div>
        <div class="row q-mt-lg">
          <div class="col-2 contact-icon">
            <i class="mdi mdi-map-marker"></i>
          </div>
          <div
            class="col contact-icon-desc text-weight-medium text-h6"
            style="color: #ffffff; margin-top: 5px"
          >
            5600 N River Road Suite 800 Rosemont, IL 60018
          </div>
        </div>
      </div>
      <div class="contact-footer">
        <a href="https://www.facebook.com/sellerscommerce" target="_blank">
          <div class="col-12 q-ml-lg contact-social-icon">
            <i class="mdi mdi-facebook"></i></div
        ></a>
        <a href="https://www.youtube.com/user/sellerscommerce/" target="_blank"
          ><div class="col-12 q-ml-lg contact-social-icon">
            <i class="mdi mdi-youtube"></i></div
        ></a>
        <a
          href="https://www.linkedin.com/company/sellers-commerce/"
          target="_blank"
          ><div class="col-12 q-ml-lg contact-social-icon">
            <i class="mdi mdi-linkedin"></i></div
        ></a>
        <a href="https://twitter.com/sellerscommerce" target="_blank"
          ><div class="col-12 q-ml-lg contact-social-icon">
            <i class="mdi mdi-twitter"></i></div
        ></a>
      </div>
    </q-card>
  </div>
</template>
<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar, QSpinnerPuff } from "quasar";
import { useRouter } from "vue-router";
export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const router = useRouter();
    const contactfirstName = ref(null);
    const contactlastName = ref(null);
    const contactemail = ref(null);
    const contactbillPhone = ref(null);
    const contactcompanyName = ref(null);
    const contactcompanyURL = ref(null);
    const contacttext = ref("");
    let secondary_source = ref(null);
    let previosPage = ref('')
    // let contact = computed(() => $store.getters['common/getContactApi'])
    onBeforeMount(() => {
      previosPage.value = history.state.back
    })
    const contactApi = () => {
      if(localStorage.secondary_source=="CCMEP"){
        secondary_source="CCMEP"
      } else if(localStorage.secondary_source=="CCMCU") {
        secondary_source="CCMCU"
      }
      let data = {
        properties: {
          firstname: contactfirstName.value,
          lastname: contactlastName.value,
          phone: contactbillPhone.value,
          email: contactemail.value,
          company: contactcompanyName.value,
          website: contactcompanyURL.value,
          message: contacttext.value,
          
          hs_analytics_source: "REFERRALS",
          contact_lead_source: "Catalog Communication Manager",
          secondary_lead_source: secondary_source,
        },
      };
      $q.loading.show({
        spinner: QSpinnerPuff,
        spinnerColor: "indigo",
        backgroundColor: "white",
      });
      $store.dispatch("auth/contactapi", data).then((val) => {
        if (val == "Success") {
          localStorage.removeItem("secondary_source")
          router.push("/");
          $q.loading.hide();
          $q.notify({
            type: "positive",
            position: "top",
            classes: "notifyClass",
            message: "We will contact you soon",
            timeout: 3000,
          });

        } else if(typeof(val) == "number") {
          let payload = {
            data: data,
            val: val,
          };
          $q.loading.show({
            spinner: QSpinnerPuff,
            spinnerColor: "indigo",
            backgroundColor: "white",
          });
          $store.dispatch("auth/updatecontactapi", payload).then((val) => {
            if (val == "Success") {
              localStorage.removeItem("secondary_source")
              router.push("/");
              $q.loading.hide();
              $q.notify({
                type: "positive",
                position: "top",
                classes: "notifyClass",
                message: "We will contact you Soon",
                timeout: 3000,
              });

            }
          });
        } else {
           $q.loading.hide();
           $q.notify({
            type: "negative",
            position: "top",
            classes: "notifyClass",
            message: "There was an error trying to send your message. Please try again later ",
            timeout: 5500,
          });
        }
      });
    };

    return {
      contactApi,
      previosPage,
      // contact,
      contactfirstName,
      contactlastName,
      contactemail,
      contactbillPhone,
      contactcompanyName,
      contactcompanyURL,
      contacttext,
      secondary_source,
      isValidEmail(val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "Invalid email";
      },
      isValidateDomain(val) {
        var domain =
          /.+@(gmail|yahoo|gmx|aol|icloud|mailfence|outlook|hotmail|livemail)\.(com|net|in)$/;
        return !domain.test(val) || "Enter the Valid Business Domain";
      },
      isValidUrl(val) {
        const urlPattern =
          /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
        return urlPattern.test(val) || "Invalid Url";
      },
    };
  },
};
</script>
<style lang="scss" scoped>
/* .q-card__section--vert{
    padding: 0px
} */

.addressTitle{
          padding: 30px 0 8px;
          position: relative;
          &::before {
            content: "";
            position: absolute;
           left: 50%;
    bottom: 17px;
    width: 97px;
            height: 3px;
            transform: skew(-12deg) translateX(-50%);
            background: $primary;
            z-index: -1;
          }
        }

.contactus-card {
  width: 100%;
  height: 90vh;
}
.title {
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
  box-shadow: inset 0 -0.175em white, inset 0 -0.3em #5a68c2;
}

.contact-info {
  background-color: $primary;
  max-width: 500px;
  border-radius: 10px;
}
.contact-mobile-info {
  background-color: $primary;
}
.contact-fields {
  background-color: #ffffff; 
  width: 500px;
}
.contact-footer {
  display: flex;
  justify-content: center;
}
.q-btn__content {
  margin-right: 0px;
}
.contact-border {
  /* display: block; */
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  box-shadow: 0px 0px 10px 0px #62667e;
}
.contact-footer-head {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.contact-footer-fill {
  color: #fff;
  font-size: 14px;
  font-weight: 100;
}
.contact-icon {
  color: #fff;
  font-size: 25px;
}
.contact-icon-desc {
  color: #ffffff;
  margin-top: 5px;
  font-size:14px;
}
.contact-social-icon {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
}
.contact-button {
  background-color: $primary;
  color: #fff;
}

hr {
  width: 93%;
  border: 0;
  clear: both;
  display: block; 
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  transition: background 0.3s, opacity 0.3s;
}
@media only screen and (min-width: 320px) and (max-width: 992px) {
  .contact-border {
    display: block;
  }
  .contactUsfont {
    display: none;
  }
  .mobile {
    display: block;
  }
  .contact-footer-fill {
    display: flex;
    justify-content: center;
    font-weight: 800;
  }
}
@media only screen and (min-width: 1024px) {
  .mobile {
    display: none;
  }
}
</style>
