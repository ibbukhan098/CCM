<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" style="width:100%;box-shadow:none;">
      <div class="q-pa-md">
        <q-list>
          <h5 class="text-center q-ma-sm">Catalog Communication Manager</h5>
          <h4 class="text-center q-ma-md">Frequently asked questions (FAQs)</h4>
          <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="q-pa-md my-card q-mb-lg" style="width:100%;" id="gettingstarted">
              <h6 class="q-ma-md">GETTING STARTED</h6>
              <q-expansion-item default-opened group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How to subscribe to more catalogs than allowed in my plan?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>You can add more catalogs to your store from the next billing cycle. Reach out to our
                    customer success at <a href="mailto:support@sellerscommerce.com">support@sellerscommerce.com</a> or
                    call us at +1 847-656-3374.</q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How can I switch my plan?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>You can switch to any other plan that suits your business requirements. Reach out to
                    our customer success at <a href="mailto:support@sellerscommerce.com">support@sellerscommerce.com</a>
                    or call us at +1 847-656-5770.</q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do you offer trial account?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Currently, we don't offer any trial accounts. But we offer a free demo covering all
                    the modules and take up any questions you may have.</q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />
              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do I get any discount for annual package?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Yes! you can reach out to our customer success team at support@sellerscommerce.com.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />
              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do you help us in getting connections with the suppliers?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>While we work with the suppliers, we don't act as a middleman between your business
                    and the suppliers. Catalog Communication Manager, powered by SellersCommerce is a software provider
                    that supports the PIM system. We encourage you to form your relationship with the suppliers before
                    subscribing to the catalogs and selling them.</q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />
              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How does your service work?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Learn more about how our service work here.</q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
            <q-card class="q-pa-md my-card q-mb-lg" style="width:100%" id="catalogs">
              <h6 class="q-ma-md">CATALOGS</h6>
              <q-expansion-item default-opened group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How can I validate the data?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>
                    You can validate our supplier's data through our catalog websites. All of our catalog websites are
                    publicly available. For more information about the catalogs, we support checking
                    <a href="https://www.uniformmarket.com/uniform-manufacturer-catalogs" target="_blank">our website
                      here.</a>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Are Shopify and WooCommerce plugins free of cost?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Absolutely! Our Shopify and WooCommerce integrations are available without any
                    additional cost. We currently support direct integration with these platforms and an import-ready
                    format to these platforms.</q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How frequently is the inventory updated?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>We update the supplier's inventory daily for most of the suppliers. Not many suppliers
                    can offer the daily inventory feeds. For more information about the supplier's inventory, check our
                    <a href="https://www.uniformmarket.com/uniform-manufacturer-catalogs" target="_blank">website link
                      here.</a></q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do you support Drop ship?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>We have Dropship support on our native SellersCommerce eCommerce platform.
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />
              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How often is the data pushed to my website?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>We push the data to your preferred location as soon as the supplier feed is cleaned
                    up. We currently support suppliers that share the feeds on a daily, monthly, and quarterly basis.
                  </q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />
              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do I need to customize my store to use your service?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>No! You don't need to change anything in your store. If you are using Shopify or
                    WooCommerce, we support direct integration, or you can use our import-ready feeds.</q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
            <q-card class="q-pa-md my-card q-mb-lg" style="width:100%" id="shopifyintegration">
              <h6 class="q-ma-md">SHOPIFY INTEGRATION</h6>
              <q-expansion-item default-opened group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do you push the products to my store so they are visible on the website?
                  </q-item-section>
                </template>
                <q-card>
                  <q-card-section>We don't directly publish the products to your website. All the data we push to your
                    store will be created in a draft mode. You need to verify the data and publish the products on your
                    own.</q-card-section>
                </q-card>
              </q-expansion-item>
              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>How do I customize the data such as updating the product name, price, description as
                    such?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>All the products synchronization will have an update checkbox while mapping the fields
                    between the Catalog Communication Manager (CCM) and your Shopify store that defines if a product
                    field needs to be updated or keep it as is.</q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Do you push all the products to my Shopify store or is there any restrictions on the
                    data?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Shopify supports products that have less than 3 options and less than 100 variants. So
                    any product from your subscribed suppliers that has more options or variants is not pushed to the
                    Shopify store. Alternatively, you can download the Shopify ready import format from CCM and upload
                    it on your own by splitting the products into multiple products.</q-card-section>
                </q-card>
              </q-expansion-item>

              <q-separator />

              <q-expansion-item group="somegroup">
                <template v-slot:header>
                  <!-- <q-item-section avatar>
            <q-icon color="primary" name="mdi-help-circle" />
                  </q-item-section>-->
                  <q-item-section>Where do I get my Shopify API keys?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>You need to create an app on your Shopify store and get the API keys that you can
                    configure in CCM. For more information about how to create a custom app on Shopify <a
                      href="https://help.shopify.com/en/manual/apps/custom-apps" target="_blank">check this
                      document.</a></q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
            <q-card class="q-pa-md my-card q-mb-lg" style="width:100%" id="payments">
              <h6 class="q-ma-md">PAYMENTS</h6>
              <q-expansion-item group="somegroup">
                <template v-slot:header>

                  <q-item-section>How are the prorated amounts calculated?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Changes to a subscription such as upgrade/ downgrade can result in prorated charges.
                    Our proration charges are applied as follow:
                    <ol style="padding-left:16px">
                      <li>The credit for unused time at the previous price.</li>
                      <li>The cost for time spent at the new price.</li>
                      <li>The difference of additional amount will be the prorated charges.</li>
                    </ol>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
            <q-card class="q-pa-md my-card q-mb-lg" style="width:100%" id="others">
              <h6 class="q-ma-md">OTHERS</h6>
              <q-expansion-item group="somegroup">
                <template v-slot:header>

                  <q-item-section>Do you offer any customization to the software?</q-item-section>
                </template>
                <q-card>
                  <q-card-section>Yes! we can do any customization to the platform that is specific to your business
                    needs.</q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card>
          </div>
        </q-list>
      </div>
      <div class="text-center"><a href="javascript:void(0)" class="bg-primary text-white text-bold faqContactus"
          @click="contactSupport">Contact Us</a></div>
      <q-dialog v-model="toolbar">
        <q-card>
          <q-toolbar>
            <q-toolbar-title><span class="text-weight-bold">Contact us </span>
            </q-toolbar-title>
            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-card-section>
            <hubspotform />
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-card>
  </div>
</template>
<script>
import { ref } from 'vue';
import { useRouter } from "vue-router";
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
      toolbar: ref(false),
      contactSupport,
    }
  },
})
</script>

<style lang="scss" scoped>
.q-item__section {
  color: #000000;
  font-weight: 500;
}

.faqContactus {
  border-radius: 4px;
  padding: 12px 24px;
  margin-bottom: 16px;
  display: inline-block;
}
</style>
