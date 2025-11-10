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
          label="API & Integrations "
          icon="mdi-cogs"
        />
      </q-breadcrumbs>
      <hr>
                        <q-card class="q-pa-md my-card q-mb-lg getting-started" style="width:100%;">
                            <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Are Shopify and WooCommerce plugins free?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, Shopify and WooCommerce plugins are free to use. If you have any custom request on how you can sync your products using these plugins, you can reach out to our customer success team here</q-card-section>
                                     
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Will the products be pushed to my Shopify/ WooCommerce store directly?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Products will be pushed to your Shopify/ WooCommerce store directly without any manual interaction. But all the products that are pushed from Catalog Manager will be created in Draft mode in case of Shopify and “inactive” in case of WooCommerce.</q-card-section>
                                    <q-card-section>This is to make sure you can verify the data before making them live. Once an update is pushed to your store, you will receive an email notification with the catalog name.</q-card-section>

                                </q-card>
                            </q-expansion-item>


                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I download a file from Catalog Manager in Shopify/ WooCommerce format?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, you can download the catalog file in Shopify and WooCommerce formats. With these files you can simply download from Catalog Manager and upload them to your eCommerce store without cleaning or converting the formats.
                                    </q-card-section>
        
                                </q-card>
                            </q-expansion-item>

                         
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I download the inventory information of a supplier?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Inventory information about a supplier can be accessed only on Power and Premium plans. Inventory information can be accessed using the APIs.</q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Will you push all the image assets to Shopify including videos if any?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, we do push all the assets of a product to your Shopify and WooCommerce stores.</q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I access the APIs of Catalog Manager?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>APIs of Catalog Manager can be accessed provided you are in either Power or Premium plans. If you are on either of these plans, go to <strong>Settings --> Configurations --> APIs</strong>. Click on the Generate Tokenbutton to generate Username and Password for your account.</q-card-section>
                                    <img :src='imageURL+"ccmapi.jpg"' alt="ccm api integrations" />
                                </q-card>
                            </q-expansion-item>
                             <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How to generate an access token for connecting to your Shopify store?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>To generate an access token you need to create an app in your Shopify store and generate a one-time token. <a href="/knowledgebase/apiintegration/generate-shopify-api-access-token" target="_blank">Check this document</a> on how to generate a access token.</q-card-section>
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
.kb-image {
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
</style>
