<template>
  <q-layout view="hHh lpR fFf">
   <q-card class="my-card q-mt-md q-ma-md" flat bordered>
      <q-card-section horizontal >
        <q-card-section class="catalogs-card">
        <div class="flex justify-between">
                <q-input
                    v-model="searchText"
                    @keyup="onSearch"
                    @clear="onClear"
                    rounded outlined standout
                    dense
                    clearable
                    debounce="300"
                    type="search"
                    placeholder="Search in Catalog Name"
                    style="width: 55%"
                    class="searchBox"
                >
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <q-btn-dropdown class="subDropdown modal-text" color="primary" style="width:150px" rounded outlined standout :label="filter">
                      <q-item clickable v-close-popup @click="onItemClick('All')">
                            <q-item-section>
                                <q-item-label>All</q-item-label>
                            </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick('Subscribed')">
                    <q-item-section>
                        <q-item-label>Subscribed</q-item-label>
                    </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="onItemClick('NonSubscribed')">
                    <q-item-section>
                        <q-item-label>NonSubscribed</q-item-label>
                    </q-item-section>
                     </q-item>

                     	
                     <q-item clickable v-close-popup @click="onItemClick('AwaitingApproval')">
                    <q-item-section>
                        <q-item-label>AwaitingApproval</q-item-label>
                    </q-item-section>
                     </q-item>

                 </q-btn-dropdown>
                 </div>
                 	    <div class="row justify-start q-ml-sm q-pt-md">
                             <div class="q-mr-lg"><span class="updates" style="background-color:#3c42ff;margin-bottom: -1px;"></span>  <span style="font-size:12px"> Monthly</span></div>
                             <div class="q-mr-lg"><span class="updates" style="background-color:#ffc521;margin-bottom: -1px;"></span>  <span style="font-size:12px"> Seasonal</span></div>
                             <div class="q-mr-lg"><span class="updates" style="background-color:#34ff34;margin-bottom: -1px;"></span>  <span style="font-size:12px"> Annual</span></div>
                        </div>
                <div class="suppliers-card">
                <div class="row items-start" v-show="showSkeleton"><q-skeleton width="98%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="98%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="98%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="100%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="100%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="100%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="100%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="100%" height="173px" class="q-mt-md my-card cardStyle-card" /><q-skeleton width="80%" height="100px" class="q-mt-md my-card cardStyle-card" /></div>  
                <div class="row items-start"  v-show="!showSkeleton" v-for="supplier in catalogs" :key="supplier" id="analyticsCard">
            
                    <q-card class="q-mt-md my-card cardStyle" flat bordered box-shadow>
                    <div class="monthly flex justify-end"> 
                           <span class="dot"  :style="supplier.updatesType=='Monthly'?'background-color:#3c42ff' : 
                                                        supplier.updatesType=='Seasonal'?'background-color:#ffc521' : 'background-color:#34ff34'
                            ">                            
                            </span>
                    </div>
                 
                        <q-card-section horizontal>
                            <q-card-section class="col-5 flex flex-center analatics-image">
                                <q-img
                                    class="rounded-borders box-shadow cursor-pointer "
                                    :src='"https://az777500.vo.msecnd.net/images/"+supplier?.logo' 
                                />
                            </q-card-section>
                            <q-card-section class="q-pt-lg" style="width:60%">
                             <p class="q-mb-sm"> 
        
                                     <a :href="supplier.storeURL" target="_blank"  class="text-subtitle2 text-bold"> {{supplier.name}} </a>
                                    <q-icon
                                            name="mdi-information-outline"
                                            size="xs"
                                            color="primary"
                                            class="cursor-pointer q-ml-sm"
                                             style="margin-bottom: 2px"
                                        >
                                        <q-menu
                                            transition-show="scale"
                                            transition-hide="scale"
                                            max-width="750px"
                                            style="border-radius:12px"
                                        >
                                         <div class="q-pa-md">
                                                <p class="text-subtitle1 text-primary">Details</p>
                                                <div
                                                v-html="supplier.description"
                                                class="modal-text"
                                                ></div>
                                                <q-separator />
                                                <div class="row">
                                                <table class="detailsTable" style="width: 100%;">
                                                    <thead>
                                                    <th>Brands</th>
                                                    <th>Categories</th>
                                                    <th>Products</th>
                                                    <th>SKU's</th>
                                                    <th>Pricing</th>
                                                    <th>Catalog Updates</th>
                                                    <th>Approval</th>
                                                    <th>Last Published</th>
                                                    </thead>
                                                    <tbody>
                                                    <td class="text-center">{{ supplier.brands }}</td>
                                                    <td class="text-center">{{ supplier.categories }}</td>
                                                    <td class="text-center">{{ supplier.products }}</td>
                                                    <td class="text-center">{{ supplier.skus }}</td>
                                                    <td class="text-center">MSRP</td>
                                                    <td class="text-center">{{ supplier.updatesType }}</td>
                                                    <td class="text-center">{{ supplier.approvalType }}</td>
                                                    <td class="text-center">{{ getDate(supplier.lastPublished)}}</td>
                                                    </tbody>
                                                </table>
                                                </div>
                                                <q-separator />
                                            </div>
                                        
                                         </q-menu>
                                    </q-icon>
                             </p> 
                                <div class="col" style="display:flex">
                                        <p class="q-mb-sm q-mr-xs"> 
                                            <q-badge
                                                    style="height: 25px; max-width: 90px; justify-content: center; font-size:9px"
                                                    :color="getColor(supplier.enableInventory)"
                                                    label=Inventory
                                                    :text-color="getTextColor(supplier.enableInventory)"
                                                >
                                            </q-badge> 
                                        </p>
                                            <p class="q-mb-sm q-mr-xs"> 
                                            <q-badge
                                                    style="height: 25px; max-width: 90px justify-content: center; font-size:9px"
                                                    :color="getAutoApprovalColor(supplier.approvalType)"
                                                    :label="getlabel(supplier.approvalType)"
                                                    :text-color="getAutoApprovalTextColor(supplier.approvalType)"
                                                >
                                            </q-badge>
                                            </p>
                                </div>
                                 <div class="Flex row">
                                 <div class="">
                                    <div>
                                         <!-- <q-btn
                                            label="Upgrade Plan"
                                            color="primary"
                                            size="sm"
                                            rounded outlined standout
                                            padding="q-pl-sm"
                                            v-if="activeAccountData?.plan?.isTrail"
                                            to="/account/plan"
                                        >
                                        <q-badge rounded floating class="upgrade">
                                            <i class="mdi mdi-crown"/>
                                        </q-badge>
                                        </q-btn> -->

                                        <!-- <q-btn
                                            class="q-mr-sm "
                                            label="Subscribe"
                                            color="primary"
                                            style="width: 100%;"
                                            size="sm"
                                            rounded outlined standout
                                            icon="mdi-plus-circle-multiple-outline"
                                            v-if="supplier.subscription != 'Subscribed' && supplier.subscription != 'Requested' && !activeAccountData?.plan?.isTrail"
                                        >
                                            <q-menu
                                            transition-show="scale"
                                            transition-hide="scale"
                                            max-width="300px"
                                           
                                            @show="onReset()"
                                            >
                                            <div class="q-pa-md q-mt-sm">
                                                <q-form
                                                @submit="onSubmitSubscribe(supplier)"
                                                @reset="onReset"
                                                >
                                                <p class="text-subtitle2 text-primary">
                                                    Subscription Request
                                                </p>
                                                <q-input
                                                    rounded outlined dense standout
                                                    v-model="accountID"
                                                    label="Account ID *"
                                                    lazy-rules
                                                    :rules="[(val) => !!val || 'ACCOUNT ID IS MISSING']"
                                                />
                                                <q-input
                                                    rounded outlined standout
                                                    v-model="notes"
                                                    label="Notes"                        
                                                    type="textarea"
                                                />
                                                <div class="q-pt-sm">
                                                    <p class="dark">
                                                    Are you sure you want to request the catalog from <b>{{supplier.name}}</b>?
                                                    </p>
                                                </div>
                                                <div>
                                                    <div class="row">
                                                    <div class="col">
                                                        <q-btn label="No" rounded outlined standout color="warning" class="q-mr-sm" v-close-popup/>
                                                    </div>
                                                    <div class="">
                                                        <q-btn v-if="supplier.approvalType != 'ApprovalRequired'"
                                                        rounded outlined standout
                                                        label="Yes" type="submit" color="primary" />
                                                        <q-btn v-if="supplier.approvalType == 'ApprovalRequired'"
                                                        rounded outlined standout
                                                        label="Request" type="submit" color="primary" v-close-popup= check />
                                                    </div>
                                                    </div>
                                                </div>
                                                </q-form>
                                            </div>
                                            </q-menu>
                                        </q-btn> -->

                                        <!-- <q-btn
                                            class="no-pointer-events q-mr-sm "
                                            size="sm"
                                            label="Subscribed"
                                             icon="mdi-check-all"
                                            rounded outlined standout
                                            style="color: green; width: 100%;"
                                            v-if="supplier.subscription == 'Subscribed' && !activeAccountData?.plan?.isTrail"
                                        >
                                        </q-btn>
                                        <q-btn
                                            class="no-pointer-events "
                                            size="sm"
                                            icon="mdi-help-circle-outline"
                                            color="warning"
                                            label="Awaiting Approval"
                                            style="width: 100%;"
                                            rounded outlined standout
                                            v-if="supplier.subscription == 'Requested' && !activeAccountData?.plan?.isTrail"
                                        >
                                        </q-btn> -->
                                    </div>  
                                    </div>
                                     <div class="row" style="display:flex;flex-wrap: nowrap;">
                                                <p class="q-mb-sm q-mr-sm"> 
                                                   <q-btn
                                                        class="subscribe-note"
                                                        rounded outlined standout 
                                                         :color="getSubscribeColor(supplier.subscribe)"
                                                         :label="getSubscribeLabel(supplier.subscribe)"
                                                         text-color="white"
                                                >
                                        </q-btn>
                                        </p>
                                    <div>
                                        
                                         <q-btn
                                            label="Upgrade Plan"
                                            color="primary"
                                            style="font-size:9px;width:130px"
                                            rounded outlined standout
                                            padding="q-pl-sm"
                                            v-if="activeAccountData?.plan?.isTrail"
                                            to="/account/plan"
                                        >
                                        <q-badge rounded floating class="upgrade">
                                            <i class="mdi mdi-crown"/>
                                        </q-badge>
                                        </q-btn>
                                        <q-btn
                                        v-else
                                            class="cursor-pointer"
                                            label="View Catalog"
                                             icon="mdi-gesture-tap"
                                            rounded outlined standout 
                                            style="color: primary;font-size:9px;width:130px"
                                            @click="viewCatalog(supplier)"
                                        >
                                        </q-btn>

                                    </div>
                                 </div>
                            </div>
                             </q-card-section>
                        </q-card-section>
                    </q-card>
                </div>
               </div> 
             
        </q-card-section>

        <q-separator vertical />
           
        <q-card-section  v-if='categoriesCard' style="width:100%">
                <div class="flex justify-between">
                     <p class="text-h6 text-bold q-ml-md"> {{catalog.name}} </p>
 <div class="Flex row q-mr-md">

                                    <!-- <div class="Flex column"> -->
                                 <!-- <div class="q-mr-sm full catlog-badge">
                                    <div> -->
                                        <div class="q-mr-sm" v-if="activeAccountData?.plan?.isTrail">
                                            <q-btn
                                                label="Upgrade Plan"
                                                color="primary"
                                                size="sm"
                                                rounded outlined standout
                                                padding="q-pl-sm"
                                                v-if="activeAccountData?.plan?.isTrail"
                                                to="/account/plan"
                                            >
                                            <q-badge rounded floating class="upgrade">
                                                <i class="mdi mdi-crown"/>
                                            </q-badge>
                                            </q-btn>
                                        </div>
                                        <div class="q-mr-sm">
                                            <q-btn
                                            class="no-pointer-events"
                                             size="sm"
                                            icon="mdi-help-circle-outline"
                                            color="warning"
                                           label="Awaiting Approval"
                                            rounded outlined standout
                                            style="width: 100%;height: 33px "  
                                            v-if="isCatalogSubscribed && approvalRequired && subscribeType"
                                        ></q-btn>
                                        </div>
                                    <div class="q-mr-sm">

                                         <q-btn
                                            class="cursor-pointer q-mr-sm "
                                            size="sm"
                                            icon="mdi-check-all"
                                            label="Subscribe"
                                            @click="subscribe(0)"
                                            rounded outlined standout
                                            style="color: green; width: 100%;height: 33px"  
                                            v-if="isCatalogSubscribed">
                                        </q-btn>
                                        </div>
                                        <div class="q-mr-sm">
                                         <q-btn
                                            class="cursor-pointer q-mr-sm "
                                            size="sm"
                                            icon="mdi-check-all"
                                            label="Subscribe"
                                            color="primary"
                                            rounded outlined standout
                                            @click="subscribe(0)"
                                            style="color: green; width: 100%;height: 33px"  
                                            v-if="!isCatalogSubscribed && !activeAccountData?.plan?.isTrail"                                          
                                        >
                                        </q-btn>
                                     </div>  
                                      <div>
                                          <q-btn
                                             size="sm"
                                            class=" cursor-pointer "
                                            icon="mdi-check"
                                            color="primary"
                                            style="height: 33px"
                                            label="Subscribe Partial Catalog"
                                            rounded unelevated 
                                            @click="subscribe(1)"
                                         >
                                        </q-btn>
                                    </div>
                                </div>
                  </div>
                    <div v-show="showCatalogSkeleton" class="row">
                    <q-skeleton
                    class="my-card catalog-grid q-ma-lg"
                    height="65vh"
                    width="45%"
                    square
                    animation="blink"
                    />
                    <q-skeleton
                    class="my-card catalog-grid q-mt-lg"
                    height="65vh"
                    width="45%"
                    square
                    animation="blink"
                    />
                </div>
                        <q-card-section horizontal v-show="!showCatalogSkeleton"  >
                                <div class="catalog-grid q-pa-md row q-gutter-md">
                                <q-card style="width:100%" >                            
                                      <q-input
                                         ref="filterRef"
                                        v-model="filterCategory"
                                        @clear="onClear"
                                         standout
                                         filled
                                        dense
                                        clearable
                                        debounce="300"
                                        type="search"
                                        color="white"
                                        bg-color="primary"
                                        placeholder="Search Category"
                                        style="min-width:260px"
                                        class="searchProduct"                                        
                                    >
                                        <template v-slot:append>
                                            <q-icon color="white" name="search" />
                                        </template>
                                    </q-input>
                                 
                                    <q-separator />

                                    <q-card-actions class="category-tree" >
                                   
                                         <!-- <q-tree class="sub-tree"
                                            :nodes="lazy"
                                            node-key="label"
                                            tick-strategy="strict"
                                            :ticked.sync="ticked"       
                                            :selected.sync = "selectedlabel"
                                            default-expand-all
                                            :filter="filterCategory"
                                            :filter-method="myFilterMethod"
                                            v-model:selected="selected"
                                            v-model:ticked="ticked"
                                            v-model:expanded="expanded"                                    
                                            @lazy-load="onLazyLoad"
                                            
                                            /> -->
                                            <div  v-if="nodes.length==0">
                                              <q-item class="sub-tree">
                                                <q-item-label>
                                                        No Categories Found
                                                </q-item-label>
                                            </q-item>
                                            </div>
                                            <div v-else>
                                            <q-tree class="sub-tree"
                                            :nodes="lazy"
                                            :filter="filterCategory"
                                            node-key="categoryID"
                                            @update:selected="getProduct"
                                            @update:ticked="updateTicked"
                                            tick-strategy="leaf"
                                            v-model:selected="selected"
                                            v-model:ticked="ticked"
                                            v-model:expanded="expanded"
                                            ref="nodeRef"
                                            />
                                            </div>
                                    </q-card-actions>
                                </q-card>
                                </div>
                             
                                <div class="q-pa-md row q-gutter-md catalog-grid">
                                <q-card  style="width:100%" >
                                  <!-- <div class="q-pa-md  q-mr-sm"> -->
                                  <div class="option-card"  v-if="products.length!=0">
                                                <q-expansion-item
                                                 v-model="optionExpand"
                                                class="shadow-1 expandHeader"
                                                icon="mdi-arrange-bring-to-front"
                                                label="Options"
                                                header-class="text-white"
                                                expand-icon-class="text-white"
                                                >
                                                <q-card class="expandOption">
                                                    <q-card-section class="q-ml-md "> 
                                                    <draggable v-model="optionitems"  >
                                                        <template v-slot:item="{item}">
                                                            <!-- example -->
                                                            <div class="sortList q-mb-sm">
                                                                <div class="q-ml-sm" >{{item}}</div>
                                                                <div class="sortIcon q-mr-sm"> <i class="mdi mdi-menu"/></div>
                                                            </div>
                                                            <!-- or your own template -->
                                                        </template>
                                                    </draggable>
                                                    <div class="flex justify-end q-mr-sm">
                                                        <p v-if="optionSaved" class="q-mb-sm q-mr-sm q-mt-lg"> 
                                                                <q-badge
                                                                        class="saved"
                                                                        color="light-green-2"
                                                                        label=Saved
                                                                        text-color="green-10"
                                                                    >
                                                                </q-badge> 
                                                            </p>
                                                    <q-btn
                                                        class="cursor-pointer q-mt-lg"
                                                        size="sm"
                                                        label="save"
                                                        icon="mdi-content-save"
                                                        rounded outlined standout 
                                                        style="color: primary;height:10px;"
                                                        @click="addOptions()"
                                                    />
                                                    </div>
                                                    
                                                    </q-card-section>
                                                </q-card>
                                                </q-expansion-item>
                                            </div>
                                            <!-- </div>  -->
                                        <div style="height:100%">
                                         <q-input
                                            v-model="searchProductIn"
                                            @keyup="onSearchProducts"
                                            @clear="onClearProducts"
                                           standout
                                            dense
                                            clearable
                                            color="white" bg-color="primary" filled
                                            type="search"
                                            :placeholder="categoryName"
                                            style="min-width: 260px;"
                                            class="searchProduct"
                                        >
                                         <template v-slot:append>
                                            <q-icon color="white" name="search" />
                                        </template>
                                        </q-input>
                                    <q-separator />

                                    <q-card-actions class="category-tree" :style="!optionExpand ? 'height:56vh !important':'height:28vh !important'">
                                     <div v-show="showProductSkeleton" class="row">
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 40px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 80px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 120px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 160px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 200px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 240px"
                                            />
                                            </q-item-label>
                                            <q-item-label>
                                            <q-skeleton
                                                type="text"
                                                animation="blink"
                                                class="product-tree q-item q-ml-md"
                                                width="90%"
                                                style="margin-top: 280px"
                                            />
                                            </q-item-label>
                                        </div>
                                     <div class="product-tree" v-show="!showProductSkeleton">
                                        <q-item class="q-pa-sm" v-if="products.length==0">
                                        <q-item-label class="q-mt-sm q-ml-sm" >
                                                No Products Found
                                        </q-item-label>
                                        </q-item>
                                    <div v-else>
                                          
                                     <q-item tag="label" v-ripple v-for="(product, index) in products" >
                                            
                                            <q-item-section side top >
                                            <q-checkbox 
                                            v-model="checkProduct[categoryIndex]['SCProductCode'][product['SCProductCode']]" 
                                            @update:model-value="checks(product,checkProduct[categoryIndex])"
                                            />
                                            </q-item-section>

                                            <q-item-section >
                                            <q-item-label>
                                                {{product.Name}}({{product.SCProductCode}})
                                            </q-item-label>
                                              
                                            </q-item-section>    
                                    </q-item> 
                                      </div> 
                                    </div>              
                                    </q-card-actions>
                                          </div>
                                </q-card>
                                </div>
                          
                           
                        </q-card-section>
                                       
                        </q-card-section>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
import { ref, computed, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useQuasar} from "quasar";
import { date, QSpinnerPuff } from "quasar";
import { uniqBy, differenceBy, differenceWith, isEqual } from "lodash"
import Draggable from "vue3-draggable";

export default {
setup(){
    const $store = useStore();
    const $q = useQuasar();
    const accountID = ref(null);
    let suppliers=ref(null);
    let subscribed=ref(null);
    let unsubscribed=ref(null);
    let catalogs=ref(null);
    let catalog=ref(null);
    let filter=ref("All");
    let check = ref(false);
    let subscribeType = ref(false);
    let notes = ref("");
    let flag=ref(false);
    let categoriesCard=ref(false);
    let nodes=ref([]);
    let filteredArray=ref([]);
    let uniqueNodes=ref([]);
    let catalogsArray=ref([]);
    let lazy = ref(nodes);
    let ticked=ref([]);
    let selectedlabel=ref(null);
    const searchText = ref("");
    let CategoryID=ref(null);
    let ProviderID=ref(null);
    let products=ref([]);
    let checkProduct=ref([]);
    let currentCatID = ref(null);
    let categoryIndex = ref(null);
    let supplierId=ref(null);
    let supplierData=ref(null);
    let filterCategory=ref(null);
    let scCode=ref({});
    const filterRef=ref(null)
    const parentCat = ref([]);
    const mappedData = ref([]);
    let approvalRequired = ref(false)
    let searchProductIn=ref(null);
    let copyOfProducts=ref(null);
    let categoryName=ref(null);
     const tickedBackup = ref([])
 const accountDetails = ref(null)
 let categoriesSearch=ref(null);
 const isCatalogSubscribed = ref(false)
    let awaitingApproval=ref(null);
    const showSkeleton = ref(false);
    const showProductSkeleton=ref(false);
    const showCatalogSkeleton = ref(false);
    const nodeRef=ref(null);
    let filterData=ref([]);
    let clickedNode=ref(null);
    let optionitems=ref([]);
    let optionExpand=ref(false);
    let optionMap=ref([]);
    let categoryId=ref(null);
    let isOptionSelected=ref(false);
    let selected=ref([]);
    let optionSaved=ref(false);
    const getCatalogDetails=ref([]);
    const filtercatalogs=ref([]);
    const allCats = ref([]);
    const mergedList=ref([]);
    const activeAccountData = computed(() => $store.getters["auth/getAccountData"])
    onBeforeMount(async()=>{   
    showSkeleton.value = true
    isOptionSelected.value=false
     accountDetails.value=await $store.dispatch('auth/getAccount')
     suppliers.value=await $store.dispatch("products/getAllSuppliers");
    //  subscribed.value=suppliers.value.filter(x=> x.subscription == 'Subscribed')
    //  unsubscribed.value=suppliers.value.filter(x=> x.subscription == 'Subscribe')
    //  awaitingApproval.value=suppliers.value.filter(x=>x.subscription=='Requested')
    getCatalogDetails.value= await $store.dispatch("home/getCatalogDetails")
    for (let i in getCatalogDetails.value){
        if(getCatalogDetails.value[i].isApprovalRequired==false){
            let data={
                catalogID:getCatalogDetails.value[i].catalogId,
                subscribe:"Subscribed"
            }
            filtercatalogs.value.push(data)
        } else {
            let data={
                catalogID:getCatalogDetails.value[i].catalogId,
                subscribe:"Requested"
            }
            filtercatalogs.value.push(data)

        }
    }
    console.log(filtercatalogs.value)
    const temp=[]
    let a1=suppliers.value
    let a2=filtercatalogs.value
    const mergeHelper = new Map(a1.map(x => [x.catalogID, x]));

    for (const x of a2) {
        if (mergeHelper.has(x.catalogID)) {
            const item = mergeHelper.get(x.catalogID);
            mergeHelper.set(x.catalogID, {...item, ...x});
        } else {
            mergeHelper.set(x.catalogID, x);
        }
    }

    mergedList.value = [...mergeHelper.values()];
    console.log(mergedList.value)
     subscribed.value=mergedList.value.filter(x=> x.subscribe == 'Subscribed')
     unsubscribed.value=mergedList.value.filter(x=> x.subscribe == undefined)
     awaitingApproval.value=mergedList.value.filter(x=>x.subscribe=='Requested')
    catalogs.value=mergedList.value
    showSkeleton.value = false
    })
    const onItemClick=(elm)=>{
         categoriesCard.value=false
        if(elm=="All"){
            showSkeleton.value = true
            filter.value="All"
            catalogs.value=mergedList.value
               showSkeleton.value = false
        } else if(elm=="Subscribed") {
            showSkeleton.value = true
            filter.value="Subscribed"
            catalogs.value=subscribed.value
               showSkeleton.value = false
        } else if(elm=="NonSubscribed") {
            showSkeleton.value = true
            filter.value="NonSubscribed"
            catalogs.value= unsubscribed.value
               showSkeleton.value = false
        }  else if(elm=="AwaitingApproval"){
            showSkeleton.value = true
            filter.value="AwaitingApproval"
            catalogs.value=awaitingApproval.value
               showSkeleton.value = false
        }
    }
    const addOptions=()=>{
        optionSaved.value=false
        const filterIndex=optionMap.value.findIndex(x=>x.categoryId==categoryId.value)
        if(filterIndex==-1){
            let data={
            categoryId:categoryId.value,
            optionPreference:optionitems.value
        }
        optionMap.value.push(data)
        } else {
           optionMap.value[filterIndex].optionPreference=optionitems.value
        }
        let res=checkProduct.value
        isOptionSelected.value=true 
        setTimeout(() =>{
          optionSaved.value=true 
        }, 1000)   
    }
    const viewCatalog=async(supplier)=>{
        selected.value = []
        console.log(selected.value)
        filterCategory.value=null
        searchProductIn.value=null
        isOptionSelected.value=false
        optionMap.value=[]
        let payload = {
            catalogId: supplier.catalogID,
            accountId: parseInt(localStorage.getItem("accountId"))
        };
        let checkingcatalog = await $store.dispatch("products/checkCatalogId", payload)
        if (checkingcatalog != '' && checkingcatalog?.catalogId == supplier.catalogID) {
            subscribeType.value = checkingcatalog.isEntireCatalog
            isCatalogSubscribed.value = true
            approvalRequired.value = checkingcatalog.isApprovalRequired 
        } else {
            isCatalogSubscribed.value = false
        }
        filterCategory.value=null
        tickedBackup.value = [] 
        showCatalogSkeleton.value=true
        products.value = []
        ticked.value = []
        nodes.value.length=0
        supplierData.value=supplier
        filteredArray.value.length=0
        uniqueNodes.value.length=0 
        checkProduct.value = []
        categoryName.value="Search Products"
        supplierId.value=supplier.catalogID ? supplier.catalogID :supplier.id
        let result=await $store.dispatch("products/getCategories", supplierId.value);
        filterData.value=result.categories
        catalog.value=catalogs.value.find(x=>x.catalogID==supplier.catalogID)
            nodes.value = result.data?.categoryData
            allCats.value = result.data?.allCats
            ProviderID.value = nodes.value[0]?.providerID
            ticked.value = result.data?.tickedData
            categoriesCard.value=true  
        parentCat.value = nodes.value
        let accountdata={
            AccountID:parseInt(localStorage.getItem('accountId')),
            CatalogID:supplierId.value
        } 
        mappedData.value=await $store.dispatch("products/getCatalogMap",accountdata)
        if(mappedData.value.data!=null){
        let mappedOptionData=mappedData.value.data.category
          for(let i in mappedOptionData){
                let data={
                    categoryId:mappedOptionData[i].categoryID,
                    optionPreference:mappedOptionData[i].optionPreference
                }
                optionMap.value.push(data)
            }
        }
        if(mappedData.value.data != null){
            
            let mapdata = mappedData.value.data.category
            mapdata.forEach(cat => {
                ticked.value.push(cat.categoryID)                
                 let obj = {}
                 let array=[]
                 cat.productCSV.forEach(product => {
                    obj[product] = true
                 });
                  checkProduct.value.push({
                    categoryID : cat.categoryID,
                    SCProductCode : obj,
                    optionPreference:array
                 })
            });            
        }
        ticked.value = uniqBy(ticked.value)
        checkProduct.value = uniqBy(checkProduct.value, 'categoryID')
        tickedBackup.value = ticked.value
        nodeRef.value?.expandAll();
         showCatalogSkeleton.value=false
    }
    const updateTicked = async(data)=>{  
        if(ticked.value.length<data.length){
                let addArr = data.filter(function(obj) { return ticked.value.indexOf(obj) == -1; });
                for(let i in addArr){
                      let index=checkProduct.value.findIndex(x=>x.categoryID==addArr[i])
                         Object.keys(checkProduct.value[index].SCProductCode).forEach(code=>{
                    checkProduct.value[index].SCProductCode[code]=true
                })
                console.log(checkProduct.value)
                }
        }else {   
        let spliceList = []
        checkProduct.value.forEach((cat,index)=>{
            let indexTick = data.findIndex(x=> x == cat.categoryID)
            if(indexTick == -1){
                spliceList.push(index)
            }
        })
            spliceList.forEach(index=>{
            Object.keys(checkProduct.value[index].SCProductCode).forEach(code => {
                checkProduct.value[index].SCProductCode[code] = false
            });                                    
        })
        }
    }

    const getProduct=async(id)=>{
        categoryId.value=id
        products.value.length=0
        showProductSkeleton.value = true;
         optionSaved.value=false;
        if(id!=null){   
        let parentNode = filterData.value.filter((x) => x.ParentID == id);
        if (parentNode.length != 0) {
        clickedNode.value = parentNode;
        categoryName.value = "Search in " + parentNode[0].ParentName;
        } else {
        let childNode = filterData.value.filter((x) => x.ChildID == id);
        clickedNode.value = childNode;
        categoryName.value = "Search in " + childNode[0].ChildName;
        }
        scCode.value={}
         let data={
        CategoryID:id,
        ProviderID:nodes.value[0].providerID
        }
        let result=await $store.dispatch("products/getProducts",data);
        let options=await $store.dispatch("products/getOptions",data);
        let findProduct= optionMap.value.find(x=>x.categoryId==categoryId.value)
        let mappedProduct=mappedData.value.data?.category.find(x=>x.categoryID== categoryId.value)
            if(mappedProduct!=undefined ){
                if(mappedProduct.optionPreference?.length==0 || mappedProduct.optionPreference==undefined){
                    optionitems.value=options.data 
                } else {
                    optionitems.value=mappedProduct.optionPreference
                     optionSaved.value=true 
                }
            }else if(findProduct!=undefined ) {
                if(findProduct.optionPreference?.length==0){
                    optionitems.value=options.data
                }else{
                    optionitems.value=findProduct.optionPreference
                     optionSaved.value=true 
                }
            } else {
                     optionitems.value=options.data
            }
        if(result.data.length > 0){
            products.value = result.data
            copyOfProducts.value=products.value
                for(let i in result.data){
                    let scid=result.data[i].SCProductCode
                    let isIDTicked = ticked.value.filter(x=> x == id)
                    scCode.value[`${scid}`]=  isIDTicked.length > 0 ? true : false
                }
                let index = mappedData.value.data?.category?.findIndex(x=>x.categoryID==id)
                //  let scProductdata
                    let mappedResult
                    if(index == -1 || !index){
                        mappedResult = scCode.value
                    }
                    else{
                        //mappedData.value.data.category
                        mappedData.value.data.category.splice(index, 1)
                       mappedResult = mappedData.value.data.category[index]?.SCProductCode
                    }
                    products.value=result.data
                    // result.data.forEach(cat => {

                    //     let falseData = Object.keys(mappedResult).filter(k => k == cat.SCProductCode)
                                        //     if(falseData.length == 0){
                                        //        mappedResult[cat.SCProductCode] = false
                                        //     }
                                        // });
                    let catIndex = checkProduct.value.findIndex(x=> x.categoryID == id)
                    if(catIndex == -1){  
                         checkProduct.value.push({
                            categoryID : id,
                            SCProductCode : mappedResult,
                            optionPreference:[]                
                        })
                        categoryIndex.value = checkProduct.value.findIndex(x=> x.categoryID == id)                     
                    }
                    else{
                        let difference = differenceWith(Object.keys(scCode.value), 
                        Object.keys(checkProduct.value[catIndex].SCProductCode), isEqual)
                        if(difference.length > 0){
                            difference.forEach(code=>{
                               checkProduct.value[catIndex].SCProductCode[code] = false
                            })                            
                        }
                        categoryIndex.value = catIndex
                    }
                 } 
         else{
            products.value=[]
         }
         showProductSkeleton.value = false;
          } else {
            showProductSkeleton.value = false;
          }  
            }
        const generateInitialSubscribeData = async()=>{
            let parent
            for (let parent = 0; i < parentCat.value.length; parent++) {

            }
        }
        const subscribe = async(bool)=>{
            $q.loading.show({
                spinner: QSpinnerPuff,
                spinnerColor: "indigo",
                backgroundColor: "white",
            })
            let isFirstSubscribe = mappedData.value.data == null ? true : false
            checkProduct.value.forEach(category=>{
                category['productCSV'] = Object.keys(category.SCProductCode).filter(k => category.SCProductCode[k])
            })
            let tickedForm = [];
            ticked.value.forEach(cat=>{
                tickedForm.push({
                    categoryID : cat
                })
            })
            let removableValues = differenceBy(checkProduct.value,tickedForm,'categoryID')
            removableValues.forEach(cat => {
                let tickIndex = checkProduct.value.findIndex(x=>x.categoryID == cat.categoryID)
                if(tickIndex >= 0){
                 checkProduct.value.splice(tickIndex, 1)
                }                
            });
                        
            if(ticked.value.length == 0){ 
                 checkProduct.value = []
                  $q.notify({
                        type: 'warning',
                        position: 'top',
                        message: "No catagories selected",
                  })
                  $q.loading.hide()
                  return
            }
            if(ticked.value.length == 1){
                if(filterData.value[0].ParentID == ticked.value[0]){
                    checkProduct.value = []
                    $q.notify({
                            type: 'warning',
                            position: 'top',
                            message: "No catagories selected",
                    })
                    $q.loading.hide()
                    return
                }
            }
            for (let i in optionMap.value){
               let optionData=checkProduct.value.find(x=>x.categoryID== optionMap.value[i].categoryId)
               let optionsIndex=checkProduct.value.findIndex(x=>x.categoryID== optionMap.value[i].categoryId)
               if(optionData != undefined) {
                if(optionData.optionPreference==undefined){
                    checkProduct.value[optionsIndex].optionPreference=[]
                } else {
                    checkProduct.value[optionsIndex].optionPreference=optionMap.value[i].optionPreference
                }
               }
            }  
            if(mappedData.value.data!==null){
                isOptionSelected.value=mappedData.value.data.isOptionSelected
            } 
        
            let catalogData = {
                catalogId : catalog.value.catalogID,
                catalogName : catalog.value.name,
                accountId : parseInt(localStorage.getItem('accountId')),
                category : checkProduct.value,
                isFirstSubscribe,
                categoryIDs : bool == 0 ? allCats.value : ticked.value,
                catalogSubcriptionId : 1,
                isOptionSelected:isOptionSelected.value,
                ProviderID : ProviderID.value,
                isEntireCatalog : bool == 0 ? true: false,
                isApprovalRequired : catalog.value.approvalType == "ApprovalRequired" ? true : false,
                enableDropship : catalog.value.enableDropship,
                enableInventory : catalog.value.enableInventory,
                logo : catalog.value.logo,
                storeURL : catalog.value.storeURL,
                account : {
                    plan : parseInt(accountDetails.value?.plan?.id),
                    catalogLimit : parseInt(accountDetails.value?.plan?.detail.CatalogLimit),
                    skuLimit : accountDetails.value?.plan?.detail.sKUsLimit
                }
            }
            let subscribeData = await $store.dispatch('products/subscribePartial', catalogData)
            let entireCheck = bool == 0 ? true: false;
            if (entireCheck) {
                subscribeType.value = true

            } else {
                subscribeType.value = false
            }
            if(subscribeData.message == 'success'){
                if (catalog.value.approvalType == "ApprovalRequired") {
                    $q.notify({
                    type: 'positive',
                    position: 'top',
                    message: "Requested Succesfully",
                })
                    isCatalogSubscribed.value = true
                    approvalRequired.value = catalog.value.approvalType == "ApprovalRequired" ? true : false
                } else {
                    $q.notify({
                    type: 'positive',
                    position: 'top',
                    message: "Subscribed Succesfully",
                })
                    isCatalogSubscribed.value = true
                    approvalRequired.value = catalog.value.approvalType == "ApprovalRequired" ? true : false
                }
        }
        else{
            $q.notify({
                type: 'warning',
                position: 'top',
                message: subscribeData.message,
            })
        }
        viewCatalog(supplierData.value)
        }

             const onSearchProducts=()=>{
                 if (event.target.value == "" || event.target.value == null){
                    products.value=copyOfProducts.value
                 }else{
                    products.value=copyOfProducts.value.filter((x)=>
                    x.SCProductCode.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    x.Name.toLowerCase().includes(event.target.value.toLowerCase())
                    )
                 }
            }
            const onClearProducts=()=>{ 
                products.value=copyOfProducts.value
            }
    return {
        allCats,
        selected,
        ticked,
        onclick,
        subscribeType,
        expanded: ref([ ]),
        nodes,
        approvalRequired,
        lazy,
        flag,
        catalogsArray,
        uniqueNodes,
        filteredArray,
        CategoryID,
        ProviderID,
        checkProduct,
        tickedBackup,
        currentCatID,
        categoryIndex,
        subscribe,
        supplierId,
        supplierData,
        filterCategory,
        scCode,
        mappedData,
        parentCat,
        generateInitialSubscribeData,
        getProduct,
        filterRef,
        copyOfProducts,
        categoryName,
        categoryName,
        searchProductIn,
        onSearchProducts,
        onClearProducts,
        categoriesSearch,
        awaitingApproval,
        showSkeleton,
        showProductSkeleton,
        copyOfProducts,
        categoryName,
        updateTicked,
        accountDetails,
        isCatalogSubscribed,
        showCatalogSkeleton,
        nodeRef,
        filterData,
        clickedNode,
        optionMap,
        optionSaved,
        getCatalogDetails,
        filtercatalogs,
        mergedList,
        checks(product, category){
            let checkForFalse = Object.keys(category.SCProductCode).filter(k => category.SCProductCode[k] == true)
            let index = ticked.value.findIndex(x=> x == category.categoryID)
            if(checkForFalse.length == 0){
                ticked.value.splice(index, 1)
            }
            else if(index == -1){
                ticked.value.push(category.categoryID)
            }
        },
        optionitems,
        optionExpand,
        onLazyLoad ({node, key, done, fail}){            
            let childrens=[]
            let uniqueChildren=[]
            let Id
            if(node.parentElm==true){
                 Id=node.ParentID
            }else {
                 Id=node.ChildID
          }  
            for(let i in catalogsArray.value){
                childrens = catalogsArray.value.filter(x=>x.ParentID == Id)
            } 
            for (let j in childrens){
                 const existingChild=uniqueChildren.find(x=>x.ChildID == childrens[j].ChildID)           
                if(!existingChild){
                        uniqueChildren.push(childrens[j])
                }
            }
            setTimeout(() => {
                let treeNodes = [];
                uniqueChildren.forEach(element => {
                    let lazyValue
                    let childrenIndex = catalogsArray.value.filter(x=>x.ParentID==element.ChildID)
                    let matchData = mappedData?.value?.data?.category.filter(x=>x.categoryID == element.ChildID)
                    if(childrenIndex.length > 0){
                        lazyValue=true
                    } else {
                        lazyValue=false
                    }
                    matchData?.length > 0 || mappedData.value.data == null ? ticked.value.push(element.ChildName) : ''
                    
                    treeNodes.push({
                         label: element.ChildName,
                         ParentID:element.ParentID,
                         ChildID:element.ChildID,
                         ParentName:element.ParentName,
                         lazy: lazyValue,
                         })
        
                });
                done(treeNodes);   
              }, 1000)
               //let res=onclick(node)
        },
        viewCatalog,
        categoriesCard,
        catalog,
        suppliers,
        subscribed,
        unsubscribed,
        catalogs,
        searchText,
        filter,
        onItemClick,
        activeAccountData,
        accountID,
        check,
        notes,
        selectedlabel,
        products,
        addOptions,
        categoryId,
        // expandedNodes,
        getColor: (value) => (value ? "light-green-2" : "red-2"),
       getlabel: (value) => (value=="AutoApproval" ? "Auto Approval" : "Approval Required"),
        getTextColor: (value) => (value ? "green-10" : "red-10"),
        getAutoApprovalColor:(value)=>(value=="AutoApproval" ? "light-green-2" : "red-2" ),
        getAutoApprovalTextColor:(value)=>(value=="AutoApproval" ? "green-10" : "red-10"),
        getSubscribeColor:(value)=>(value=='Subscribed'?'positive':value=='Requested' ? 'warning':'accent'),
        getSubscribeLabel:(value)=>(value=='Subscribed'?'Subscribed':value=='Requested' ? 'Awaiting Approval' :'Non Subscribed'),
        onSearch(){
            
            if (event.target.value == "" || event.target.value == null){
                if(filter.value=="All"){
                catalogs.value=mergedList.value
                } else if(filter.value=="Subscribed"){
                    catalogs.value=subscribed.value
                }else if(filter.value="AwaitingApproval"){
                    catalogs.value=awaitingApproval.value
                }
            } else {
                if(filter.value=="All"){
                catalogs.value=mergedList.value.filter((x) =>
                x.name.toLowerCase().includes(event.target.value.toLowerCase()))
                }
                else if(filter.value=="Subscribed"){
                 catalogs.value=subscribed.value.filter((x) =>
                    x.name.toLowerCase().includes(event.target.value.toLowerCase()))
                } else if(filter.value=="NonSubscribed"){
                 catalogs.value=unsubscribed.value.filter((x) =>
                    x.name.toLowerCase().includes(event.target.value.toLowerCase()))
                }  else if(filter.value="AwaitingApproval"){
                   catalogs.value=awaitingApproval.value.filter((x)=>
                    x.name.toLowerCase().includes(event.target.value.toLowerCase()))
                }
                } 
        },
        onClear(){
            if(filter.value=="All"){
            catalogs.value=mergedList.value
            }  else if(filter.value=="Subscribed"){
                    catalogs.value=subscribed.value
                } else if(filter.value=="NonSubscribed"){
                    catalogs.value=unsubscribed.value
                } else if(filter.value=="AwaitingApproval"){
                    catalogs.value=awaitingApproval.value
                }
        },
        getDate(pDate){
        return date.formatDate(pDate, 'MM-DD-YYYY')
      },
        onSubmitSubscribe(row) {
        if (row.approvalType == 'ApprovalRequired') {
          row.subscription = 'Requested'
        } else {
          row.subscription = 'Subscribed'
        }
        if (accountID.value != '') {
          check.value = true
        } else {
          check.value = false
        }
        let subscribeData = {
          catalogID: row.catalogID,
          catalogAccountID: accountID.value,
          notes: notes.value == null ? "" : notes.value,
        }

        $store
          .dispatch("products/subscribeData", subscribeData)
          .then((response) => {
            if(row.approvalType == 'ApprovalRequired' && response.status == "Success"){
               $q.notify({
                type: "positive",
                position: "top",
                message: "Catalog requested successfully",
              });
            }
             else if (row.approvalType != 'ApprovalRequired' && response.status == "Success") {
              $q.notify({
                type: "positive",
                position: "top",
                message: "Catalog subscribed successfully",
              });
            }
            else{
              accountID.value = '';
              notes.value = ''
              $q.notify({
                type: "negative",
                position: "top",
                message: "Your Catalog/SKU's limit exceeded",
              });
               router.push('/account/plan')

            }
          });
      },
        onReset(){
        accountID.value = '';
        notes.value = ''
      }
    }
},
 components: {
    Draggable,
  },
  
};
</script>

<style lang="scss" scoped>
.suppliers-card{
    overflow-y: auto;
    overflow-x: hidden;
    margin: 8px;
    height: 80vh;
    width: 100%;
}
#analyticsCard {
    .analatics-image{
        max-width: 200px;
         width: 30%;
    }
    .cardStyle {
        min-width: 400px;
        max-width: 90%;
        background-color: #ffffff !important;
        border-radius: 10px;  
    }

    .discription {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

}
.my-card{
    border-radius:10px;
    .catalogs-card{
      min-width: 455px;
        max-width: 90%;
    }
    .catalog-grid{
    width: 52%;
    height: 80vh;
    }
    .category-tree{
        height: 65vh;
        overflow-y: auto;
        overflow-x:hidden;
        position: relative;
    .sub-tree{
      position: absolute;
      top: 0;
      word-break: break-all;
    }
    .product-tree{
    position: absolute;
    top: 0;
}
    }
  
}
.modal-text {
  font-size: 10px;
}
.q-btn-dropdown :deep(.q-btn__content) {
    display:flex !important;
    justify-content:space-between !important; 
}
.q-card__actions :deep(.q-item-type) {
    width:100%;   
}

.partial :deep(.q-btn__content){
    font-size: 10px;
    padding: 4px;
}
.full :deep(.q-btn__content){
    font-size: 10px;
    padding: 4px;
}
.monthly{
    margin-bottom:-30px;
    padding: 5px;
    margin-right: 5px;
    .dot {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        display: inline-block;
        }
}
 .updates {
        height: 12px;
        width: 12px;
        border-radius: 50%;
        display: inline-block;
        }
.searchProduct :deep(.q-field__control){
    height:50px;
}
.searchProduct :deep(.q-icon){
    margin-bottom:-8px
}
.searchProduct :deep(.q-field__native){
    font-weight:500;
    color:#ffff;
}
.product-tree :deep(.q-item){
    min-height:0px;
    padding:0px;
}
.subscribe_btn {
    width: 60%;
    // margin-right: 0;
    margin-top:10px;
}
.upgrade{
  padding: 5px;
  margin: -5px;
  background: #fbbe28;
}
.expandHeader{
    border-radius:6px;
    min-width: 330px;
    background-color:#5563B8;
    margin-bottom: 1px;
    .expandOption{
     max-height: 28vh;
    overflow-y: auto;
    }  
}
.expandHeader :deep(.q-item){
    height:50px;
    padding:5px
}
.sortList {
display:flex;
justify-content: space-between;
width: 100%;
border: 1px solid #e7eaff;
height: 30px;
padding: 5px;
background-color: #F5F5F5;
font-size: 12px;
  
}
.option-card :deep(.q-expansion-item .q-item-type .q-expansion-item--collapsed){
    height: 181px; 
    overflow-y: scroll;
}
.catlog-badge{
    position:relative;
}
.saved-option{
    border-style: solid;
    border-width: thin;
    border-radius: 5px;
}
.saved{
    height: 25px;
    width: 75px;
    justify-content: center;
    font-size: 10px;
    border-radius: 26px;
    padding: 13px;
}
.subscribe-note{
    height: 25px; 
     justify-content: center;
      font-size:8px;
      width:117px;
      cursor:auto;    
}
</style>