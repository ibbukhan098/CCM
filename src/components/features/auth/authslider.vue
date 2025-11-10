<template>
    <q-carousel v-model="slide" swipeable animated :navigation-position="navPos" navigation padding infinite
        :autoplay="autoplay">
        <q-carousel-slide :name="1">
            <img v-if="!$q.platform.is?.mobile" 
            src="~assets/images/Catalog-Manager-Master.png" alt="catlogmanager-master">
            <div class="slider-text">
                <div class="q-mt-lg text-center ">
                    <p class="text-bold text-white text-h6">Catalog Management Simplified </p>
                    <p class="text-white text-h10">Subscribe and receive standardized product updates on your eCommerce
                        store.
                    </p>
                </div>
            </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2">
            <img v-if="!$q.platform.is?.mobile" src="~assets/images/Catalog-Manager-Feeds.png" alt="catlogmanager-feed">
            <div class="slider-text">
                <div class="q-mt-lg text-center ">
                    <p class="text-bold text-white text-h6">Convert Messy Data to Ready-to-Sell Catalogs in a Click </p>
                    <p class="text-white text-h10">Catalog Manager scrubs supplier catalogs to provide clean,
                        standardized product data
                        without manual intervention.
                    </p>
                </div>
            </div>
        </q-carousel-slide>
        <q-carousel-slide :name="3">
            <img v-if="!$q.platform.is?.mobile" src="~assets/images/catlog-manager-apps.png" alt="catlogmanager-apps">
            <div class="slider-text">
                <div class="q-mt-lg text-center ">
                    <p class="text-bold text-white text-h6">Platform Agnostic Solution </p>
                    <p class="text-white text-h10">Works seamlessly with Shopify, Volusion, WooCommerce & BigCommerce

                    </p>
                </div>
            </div>
        </q-carousel-slide>
        <q-carousel-slide :name="4">
            <img v-if="!$q.platform.is?.mobile" src="~assets/images/Catalog-Manager-Sync.png" alt="catlogmanager-sync">
            <div class="slider-text">
                <div class="q-mt-lg text-center ">
                    <p class="text-bold text-white text-h6">Schedule Updates or Get On Demand </p>
                    <p class="text-white text-h10">Choose to receive catalog updates automatically or download them
                        manually.
                        store.
                    </p>
                </div>
            </div>
        </q-carousel-slide>
    </q-carousel>
</template>
<script>
import { onBeforeMount, ref } from 'vue'
import { useQuasar } from "quasar";

export default {
    setup() {
            const $q = useQuasar();
        return {
            slide: ref(1),
            autoplay: ref(true),

        }
    }
}
</script>

<style lang="scss" scoped>
.q-carousel {
    background: none;
    width: 100%;
    height: auto;

    img {
        // width:60%;
        height: 380px;
    }

}

.slider-text {
    width: 50%;
    margin: 0 auto;
    height: 170px;
}

@media screen and (min-width: 1024px) and (max-width: 1366px) {
    .q-carousel {
        img {
            height: 280px;
        }

    }
    .slider-text {
           
            height: 190px;
        }
}

@media screen and (max-width:766px) {
    .q-carousel {
        img {

            height: 170px;
            // display:none;

        }

        .slider-text {
            width: 80%;
            margin: 0 auto;
            height: 190px;
        }
    }
}
</style>