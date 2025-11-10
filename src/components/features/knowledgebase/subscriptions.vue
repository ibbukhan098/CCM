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
          label="Subscriptions"
          icon="mdi-gesture-double-tap"
        />
      </q-breadcrumbs>
      <hr>
                        <q-card class="q-pa-md my-card q-mb-lg getting-started" style="width:100%;">
                            <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How do I subscribe to a catalog?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>To subscribe to a supplier catalog, go to the Catalogs and then <strong>Manage Subscriptions</strong>. In the Manage Subscriptions tab you can see all the supplier catalogs that we currently support.</q-card-section>
                                     <img :src='imageURL+"catalogsubscription.png"' alt="catlog subscription" class="kb-image" />
                                     <q-card-section>Use the search to browse for the supplier that you want to subscribe to. Hit on the “Subscribe” button to give us your Account ID with the supplier. We will use this Supplier ID to communicate further with the supplier in case it’s required.</q-card-section>
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I remove a subscription to a catalog?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Currently, the subscription removal is not available on Catalog Manager. In order to add more catalogs to the plan use the balance limit or upgrade to a new plan.</q-card-section>
                                </q-card>
                            </q-expansion-item>


                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How can I switch suppliers that I subscribed to?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Currently, Catalog Manager doesn’t support switching suppliers as there is a limit on the number of catalogs for every plan.
                                    </q-card-section>
                                    
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How do I know if a catalog is updated?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>If any of your subscribed suppliers releases a new update, you will receive an email notification about the update and the updated date will be visible in your Dashboard.</q-card-section>
                                <img :src='imageURL+"catalogupdate.png"' alt="catlogupdate" class="kb-image" />
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How do I get the inventory of my preferred supplier?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Inventory is available on <strong>Power</strong> and <strong>Premium</strong> plans and can be consumed through the APIs. To get access to the APIs, you can go to <strong>Settings --> Configurations --> API</strong>. Click on the Generate Token button to generate username and password for your account.</q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How does Dropship work?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Currently, Dropship is supported for UniformMarket’s eCommerce platform. We will roll it out to other eCommerce systems at a later point. Try out our UniformMarket’s eCommerce platform if you need a Dropship connection. Please <a href="https://www.uniformmarket.com/get-a-demo" target="_blank">book an appointment</a> to talk to our sales expert.</q-card-section>
                                <img :src='imageURL+"catalogupdate.png"' alt="catlogupdate" class="kb-image" />
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I see the sample data of suppliers?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Yes, you can see the complete data of suppliers by clicking on the supplier's name in <strong>Manage Subscriptions</strong> or <strong>Subscribed Catalogs</strong> sections. Clicking on the supplier's name takes you to the supplier catalog website where you can browse and search for products. Clicking on the product will take you to the product detail page showing all the images, content, pricing, etc.</q-card-section>
                                <img :src='imageURL+"catalogview.png"' alt="catlogview" class="kb-image" />
                                <img :src='imageURL+"catalogwebsite.png"' alt="catalogwebsite" class="kb-image" />

                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>Can I add my own brand to Catalog Manager?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Adding a new brand to Catalog Manager to publish your brand to multiple other retailers is a possibility. Check out our <a href="https://www.uniformmarket.com/catalog-syndication-program" target="_blank">Brand Syndication program</a></q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How many days would it take to approve a catalog request?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Typically, it takes us around 2-3 days to approve a catalog. Since we need to reach out to your preferred supplier and get confirmation which could delay things at the time. We suggest you request approval a week before you want to use the catalog.</q-card-section>
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
