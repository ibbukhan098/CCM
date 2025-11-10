<template>
  <div class="q-ma-xl q-gutter-y-md knowledgebase">
   
    <q-item  v-ripple to="/knowledgebase/gettingstarted">
      <q-item-section side>
        <q-avatar>
           <q-icon name="mdi-airplane-takeoff" style="color: #5a68c2; font-size: 1.8em;" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="knowledgebase-header">Getting Started? </q-item-label>
        <q-item-label>A quick introduction to Catalog Manager and how to set everything up for utilizing the catalogs. </q-item-label>
      </q-item-section>
    </q-item>

    <q-item  v-ripple to="/knowledgebase/subscriptions">
      <q-item-section side>
        <q-avatar>
          <q-icon name="mdi-gesture-double-tap" style="color: #5a68c2; font-size: 1.8em;" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="knowledgebase-header">Subscriptions  </q-item-label>
        <q-item-label>Find out everything you need to start subscribing to the catalogs and sync your preferred supplier catalogs to your eCommerce store. </q-item-label>
      </q-item-section>
    </q-item>

    <q-item  v-ripple to="/knowledgebase/accountmanagement">
      <q-item-section side>
        <q-avatar rounded>
          <q-icon name="mdi-account-edit" style="color:#5a68c2; font-size: 1.8em;" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="knowledgebase-header">Account Management  </q-item-label>
        <q-item-label>Manage user access permissions, create new users, and manage your payment configurations.</q-item-label>
      </q-item-section>
    </q-item>

    <q-item  v-ripple to="/knowledgebase/apiintegration">
      <q-item-section side>
        <q-avatar rounded>
          <q-icon name="mdi-cogs" style="color: #5a68c2; font-size: 1.8em;" />
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="knowledgebase-header">API &amp; Integrations  </q-item-label>
        <q-item-label>Use Catalog Manager to sync your preferred supplier data feeds to your eCommerce store. </q-item-label>
      </q-item-section>
    </q-item>

   
  </div>
</template>
<style lang="scss" scoped>
.q-item__label.knowledgebase-header {
    color: $primary;
    font-size: 18px;
}
.knowledgebase{
  // background: #ebeef1;
    // padding: 15px 18px 25px;

}
.knowledgebase a.q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable {
    // background: #fff;
    padding:20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    margin: 20px 0;
}
</style>