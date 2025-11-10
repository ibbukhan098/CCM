<template>
  <div class="q-px-xl">
    <h1 class="text-h4">API & Integration </h1>
    <p>How to generate and find your API Access token in your Shopify Store</p>
    <p>When connecting your Shopify Store with any custom app, you will need to manage API access tokens from your Shopify Store. In order to use our Shopify integration you will need the URL of your Shopify Store and an API access token. In this article you will learn how to generate and find this API access token within your Shopify Store</p>
    <h2  class="text-h6">Enabling custom app development within Shopify </h2>
    <p>You can enable a custom app from your Shopify owner’s account. To do this:</p>
    
        <p>
            Log in to your Shopify Store as the store owner.
        </p>
        <p>
            Click on <strong>‘Apps’</strong> in the admin section on the left sidebar.

        </p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/shopify-app.png" alt="shopify-app" class="kb-image" />

        <p>A drop down menu will appear. Click on <strong>'Apps and sales channels settings'</strong>.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/apps-sales-channel.png" alt="sales-channel" class="kb-image" />

        
        <p>In the next window that appears click on <strong>'Develop Apps for your store'</strong>. Then <strong>’Create an app’</strong>.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/create-app.png" alt="create-app" class="kb-image" />

        <p>You'll be asked to give your <strong>app a name</strong>, and add your email in the <strong>"App developer"</strong> text box.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/app-name.png" alt="app-name" class="kb-image" />

        <p>Once you've created an app, navigate to the <strong>'Configuration'</strong> tab and select <strong>'Configure'</strong> in the "Admin API Integration" section.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/configuration.png" alt="configurationo" class="kb-image" />

        <p>Under "Admin API access scopes" you'll see many categories. Scroll down until you reach "Products." Here, you'll click to tick the boxes for <strong>'write_products'</strong> and<strong> 'read_products'</strong>, then click the<strong> 'Save' </strong>button.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/admin-api-access.png" alt="admin-api" class="kb-image" />
        
             <h2  class="text-h6">Generating API Access Token from the Shopify admin</h2>
        <p>To generate your access token:</p>
        
            <p>Head to the tab <strong>‘API Credentials’</strong>.</p>
            <p>Click on ‘Install’ in the “Access tokens” box.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/api-credentials.png" alt="api-credentials" class="kb-image" />

            <p>Confirm the installation by clicking on<strong>'Install'</strong>  in the window that appears.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/api-credentials.png" alt="api-credentials" class="kb-image" />

            <p>Now you will see your Admin API Access Token has been generated. Click on <strong>'Reveal token once'</strong> and you will see the token. </p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/reveal-token.png" alt="reveal-token" class="kb-image" />

            
            
            <h2  class="text-h6">
                <strong>Using Your Token to Connect a Shopify Channel</strong></h2>

                
<p>From the Catalog Manager tab, click on the ‘Apps’ .</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/app-integration.png" alt="ccm roles" class="kb-image" />

<p>In the window that appears, select “Shopify” Open Shopify.</p>
            <img src="https://ccmweb.blob.core.windows.net/ccm/images/app-configuration.png" alt="ccm roles" class="kb-image" />
            
            </div>
</template>
<style>
.kb-image{
  padding-bottom: 25px;
}
</style>