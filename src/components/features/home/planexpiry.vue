<template>
    <q-card style="width: 900px; max-width: 80vw" class="price-popup">
        <div class="row items-center">
            <h1 class="text-h5 text-bold text-center q-px-xl q-pt-md" style="width:100%">Thank you for choosing Catlog
                Manager!</h1>
            <p class="q-px-xl text-center" style="width:100%">If you like Catalog Manager and wish to continue using
                it, please subscribe to a paid plan.</p>
            <div class="power-plan q-px-xl q-py-md" style="width:100%">
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <span>Power plan</span>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <span>All Powerful features to get organized</span>
                    </div>
                </div>
            </div>
            <div class="power-plan-price q-px-xl q-py-md" style="width:100%">
                <div class="row">
                    <div class="col-xs-12 col-md-6 self-center">
                        <div class="price">
                            <span class="text-medium text-h3">$199</span>
                            <p>per month</p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <div class="price-content">
                            <ul>
                                <li>Subscribe up to 20 catalogs</li>
                                <li>Manage 250,000 SKUs</li>
                                <li>FREE Shopify and WooCommerce plugins</li>
                                <li>Excel, CSV, FTP</li>
                                <li>Inventory updates</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="helpline q-px-xl q-py-md">
            <div class="row">
                <div class="col-xs-12 col-md-7">
                    <p style="word-break: break-word;margin:0">Do you have any questions? Reach out to us at mailto:support@sellerscommerce.com or give us a call at +1
                        847-656-3374</p>
                </div>
                <div class="col-xs-12 col-md-5 text-right self-center">
                    <q-btn label="Start Subscription" @click="closePopup"
                        no-caps rounded outlined standout v-close-popup class="q-mr-md q-px-lg q-py-xs subscribe_btn" />
                </div>
            </div>
        </div>
    </q-card>
</template>
<script>
import {useStore} from 'vuex';
import {ref} from 'vue';
export default {
    setup() {
        const $store = useStore()

        const closePopup = () => {
            $store.dispatch('auth/closeFreePopup',true)
        }
        return {
            closePopup
        }
    },
}
</script>
<style lang="scss" scoped>
.q-field--with-bottom {
    padding-bottom: 0px;
}

.price-popup {
    p {
        font-size: 17px;
    }

    .power-plan {
        background: $primary;
        color: #fff;
        font-size: 18px;
    }

    .power-plan-price {
        background-color: #dcedc8;
        font-size: 18px;

        p {
            margin-bottom: 2px;
        }

        ul {
            padding-left: 20px;
        }
    }
    .helpline{
        p{
            font-size:18px;
        }
        .subscribe_btn{
            background:#f0404c;
            color:#fff;
            font-size: 16px;
        }
    }

}
@media(max-width:766px){
.price-popup .q-px-xl{
    padding:15px;
}
.subscribe_btn, .power-plan, .power-plan-price, .helpline{
    text-align: center;
}
.subscribe_btn{
    text-align: center !important;
}
.price-content ul li{
    list-style: none;
}
}
</style>