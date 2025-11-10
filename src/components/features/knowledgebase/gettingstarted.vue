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
          label="Getting Started"
          icon="mdi-airplane-takeoff"
        />
      </q-breadcrumbs>
      <hr>
                        <q-card class="q-pa-md my-card q-mb-lg getting-started" style="width:100%;">
                        <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How does CCM work?
                                    </q-item-section>
                                </template>
                                <q-card>
                                     <q-img src="https://az777500.vo.msecnd.net/images/3554/howdoesccmwork.jpg" class="kb-image" alt="ccm working model image"></q-img>
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item  group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How to subscribe to a supplier catalog?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>To subscribe to a supplier catalog, go to the Catalogs and then Manage Subscriptions. In the Manage Subscriptions tab you can see all the supplier catalogs that we currently support.</q-card-section>
                                     <q-img :src='imageURL+"catalogsubscription.png"' alt="catalog subscription image" class="kb-image"></q-img>
                                     <q-card-section>Use the search to browse for the supplier that you want to subscribe to. Hit on the “Subscribe” button to give us your Account ID with the supplier. We will use this Supplier ID to communicate further with the supplier in case it’s required.</q-card-section>
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How do I add more SKUs to my plan?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>To add more SKUs to your plan, you need to upgrade your plan to the next level. Catalog Manager will ignore if your supplier adds more SKUs after you subscribe to a supplier that falls within the limit.</q-card-section>
                                </q-card>
                            </q-expansion-item>


                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How do I validate the catalog data before I subscribe for it?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>You can validate the catalog by clicking on the information icon that is displayed just beside the supplier's name. This will take you to a new tab with the complete catalog along with the categories and images.
                                    </q-card-section>
                                    <q-img :src='imageURL+"cataloginfo.png"' alt="catalog info image" class="kb-image"></q-img>
                                </q-card>
                            </q-expansion-item>

                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>How to subscribe to a specific brand from a supplier?</q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Once a supplier catalog is subscribed, you will be able to utilize all the brands of the supplier without any restrictions on the catalog. We will be releasing an update soon that will allow you to subscribe only to specific brands.</q-card-section>
                                </q-card>
                            </q-expansion-item>
                            <q-expansion-item group="somegroup">
                                <template v-slot:header>
                                    <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                                    <q-item-section>What are “Approval Required” catalogs?
                                    </q-item-section>
                                </template>
                                <q-card>
                                    <q-card-section>Certain catalogs require authorization from the supplier to access the feeds. Catalogs that have the “approval required” tag will be sent to the supplier for approval before allowing you to access the feeds.</q-card-section>
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
</style>
