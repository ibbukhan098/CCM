<template>
    <div class="q-pa-md row items-start q-gutter-md ">
        <q-card class="my-card" style="width:100%;box-shadow:none;">
            <div class="q-pa-md">
                <q-list>

                    <div class="q-pa-md row items-start q-gutter-md">
 <q-breadcrumbs class="q-pb-md text-primary">
        <template v-slot:separator>
          <q-icon size="1.5em" name="chevron_right" color="primary" />
        </template>
        <q-breadcrumbs-el label="Knowledge Base" icon="apps" to="/knowledgebase" />
        <q-breadcrumbs-el
          label="Account Management "
          icon="mdi-account-edit"
        />
      </q-breadcrumbs>
      <hr>
                        <q-card class="q-pa-md my-card q-mb-lg getting-started" style="width:100%;">
                        <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I cancel my subscription at any time?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, you are able to cancel your subscription at any time during the term of your agreement. However, the cancellation will only take effect at the end of your subscription term and at that point, you will no longer be charged. </q-card-section>
                                </q-card>
                            </q-expansion-item>
                        
                            <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I add new users to Catalog Manager?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, new users can be added to the Catalog Manager and assign a new role to restrict access to certain modules within the application. Additionally, roles can be created using the Roles section.</q-card-section>
                                     <img :src='imageURL+"ccmroles.png"' alt="ccm roles" class="kb-image" />
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I define my own roles or are these predefined roles?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, you can define your own roles and give them access to various other sections of Catalog Manager.</q-card-section>
                                </q-card>
                            </q-expansion-item>


                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I update my credit card file?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Credit cards can be updated from “My Profile” section of the website.
                                    </q-card-section>
        
                                </q-card>
                            </q-expansion-item>

                            
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Where can I see my past invoices?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Past invoices can be viewed from Profile --> Invoices.</q-card-section>
                                    <img :src='imageURL+"ccminvoice.png"' class="kb-image" alt="ccm invoice" />
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I upgrade to a new plan?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>You can upgrade to a new plan at any point in time. The license fee (if applicable) will be charged on a prorated basis, and you will be moved immediately to your new plan.</q-card-section>
                                </q-card>
                            </q-expansion-item>
                        </q-card>

                    </div>
                </q-list>
            </div>
        </q-card>
    </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { imageURL } from 'boot/axios'

export default ({
    components: {
        hubspotform: require("src/components/HubspotForm.vue").default,
    },
    setup() {
        const router = useRouter();
        const contactSupport = () => {
            localStorage.setItem('secondary_source', "CCMCU")
            router.push('/contactus')
        }
        return {
            imageURL,
            toolbar: ref(false),
            contactSupport,
        }
    },
})
</script>

<style lang="scss" scoped>
.kb-breadcrumbs{
    display:flex
}
.arrow{
    padding:0 10px;
    }
.q-item__section {
    color: $primary;
    font-weight: 500;
}
// .getting-started{
//     // background: #ebeef1;
// }
// .q-expansion-item.q-item-type.q-expansion-item--collapsed.q-expansion-item--standard {
//     // background: #fff;
//     // margin-bottom: 20px;
// }
.q-card.q-pa-md.my-card.q-mb-lg.getting-started {
    box-shadow: none;
    margin: 0;
}
.q-expansion-item.q-item-type.q-expansion-item--collapsed.q-expansion-item--standard {
   
    margin: 10px 0;
    box-shadow: rgb(99 99 99 / 20%) 0px 2px 8px 0px;
}
.q-img.q-img--menu.kb-image {
    width: 50%;
}
hr {
  border: 0;
  clear: both;
  display: block;
  width: 98%;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  margin: 0 auto;
  transition: background 0.3s, opacity 0.3s;
  flex-shrink: 0;
}
.kb-image {
    width: 50%;
}
</style>
