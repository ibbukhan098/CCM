import Store from '../store/index.js';

const routes = [{
        path: '/',
        component: () =>
            import ('src/layouts/home/layout.vue'),
        redirect: { name: "home" },
        beforeEnter:async (to, from, next) => {
            let pages = await Store().dispatch('auth/getPages')
            let isTrailEnded = await Store().getters['auth/getIsTrailEnded']
            if(isTrailEnded && !to.fullPath.includes('plan')){
                next('/account/plan')
            }

            //Restricting the pages
            if(
            to.fullPath.includes('profile') ||
            to.fullPath.includes('knowledgebase') ||
            to.fullPath.includes('faqs') ||
            to.fullPath.includes('contactus') ||
            to.fullPath.includes('catalogs') ||
            to.fullPath.includes('generate-shopify-api-access-token')
            ){
                next()
            }
            if(pages){
                let allowedPages = pages.filter(x=> to.fullPath.includes(x.PageUrl))
                //=await Store().dispatch("shopify/getShopifyCredentials")
                //let wooCred=await Store().dispatch("woocommerce/getCredentials")
                // if(shopifyCred?.statusCode==200 && to.fullPath.includes('woocommerce')){
                //     next('/settings/apps')
                // }
                //  else if(wooCred?.statusCode==200 && to.fullPath.includes('shopify')) {
                //     next('/settings/abpps')
                // }
                if(allowedPages.length == 0){
                    next(from.fullPath)
                }
                if (Store().getters['auth/getToken'] == '') {
                    next('/login')
                } else {
                    next()
                }
            }
            else{
                next('/login')
            }
        // }
        },

        children: [{
                path: 'home',
                name: "home",
                component: () =>
                    import ('pages/home/home.vue')
            },
            {
                path: 'settings',
                component: () =>
                    import ('pages/settings/settings.vue'),
                children: [
                    { path: '', redirect: { name: "configuration" } },
                    // {
                    //     path: 'users',
                    //     name: "users",
                    //     component: () =>
                    //         import ('pages/settings/users/users.vue')
                    // },
                    // {
                    //     path: 'roles',
                    //     name: "roles",
                    //     component: () =>
                    //         import ('pages/settings/roles/roles.vue')
                    // },
                    {
                        path: 'configurations',
                        name: "configuration",
                        component: () =>
                            import ('pages/settings/configurations/configurations.vue')
                    },
                    {
                        path: 'apps',
                        name: 'apps',
                        component: () =>
                            import ('pages/settings/apps/app-config.vue'),
                    },
                ]
            },

            {
                path: 'contactus',
                component: () =>
                    import ('pages/contact-us/contactus.vue')
            },

            {
                path: 'products',
                component: () =>
                    import ('pages/products/suppliers.vue'),
                children: [{
                        path: '',
                        redirect: { name: "subscribed" },
                        component: () =>
                            import ('pages/products/suppliers.vue')
                    },
                    {
                        path: 'subscribed',
                        name: "subscribed",
                        component: () =>
                            import ('src/components/features/products/suppliers/suppliers.vue')
                    },
                    {
                        path: 'subscriptions',
                        component: () =>
                            import ('src/components/features/products/subscriptions.vue')
                    },
                    {
                        path: 'history',
                        component: () =>
                            import ('src/components/features/products/history/history.vue')
                    }
                ]
            },
            {
                path: 'account',
                component: () =>
                    import ('pages/account/account.vue'),
                    children: [
                        { path: '', redirect: { name: "accountsetting" } },
                        {
                            path: 'settings',
                            name: "accountsetting",
                            component: () =>
                                import ('pages/account/accountsetting/account-setting.vue')
                        },
                        {
                            path: 'plan',
                            name: "plan",
                            component: () =>
                                import ('pages/account/plan/plan.vue')
                        },
                        {
                            path: 'roles',
                            name: "roles",
                            component: () =>
                                import ('pages/settings/roles/roles.vue')
                        },
                        {
                            path: 'users',
                            name: "users",
                            component: () =>
                                import ('pages/settings/users/users.vue')
                        },
                        {
                            path: 'invoice',
                            name: "invoce",
                            component: () =>
                                import ('pages/account/invoices/invoice.vue')
                        },
                    ]
            },
            {
                path:'products/managesubscriptions',
                component:()=>
                import ('pages/products/catalogs.vue')
             },
            {
                path: 'profile',
                component: () =>
                    import ('pages/profile/profile.vue')
            },
            {
                path: 'sync',
                component: () =>
                    import ('pages/app/woocommerce.vue')
            },
            // { path: 'shopify', component: () => import('pages/app/shopify.vue') },
            {
                path: 'faqs',
                component: () =>
                    import ('pages/faqs/faqs.vue')
            },
            {
                path: 'settings/apps/shopify',
                component: () =>
                    import ('pages/settings/apps/app-settings/app-settings.vue')
            },
            {
                path: 'settings/apps/woocommerce',
                component: () =>
                    import ('pages/settings/apps/woocommerce/woo-settings.vue')
            },
            {
                path: 'knowledgebase',
                component: () =>
                    import ('pages/knowledgebase/knowledgebase-home.vue'),
                children: [{
                        path: '',
                        component: () =>
                            import ('pages/knowledgebase/knowledgebase.vue'),
                    },
                    {
                        path: 'gettingstarted',
                        component: () =>
                            import ('src/components/features/knowledgebase/gettingstarted.vue'),
                    },
                    {
                        path: 'subscriptions',
                        component: () =>
                            import ('src/components/features/knowledgebase/subscriptions.vue'),
                    },
                    {
                        path: 'accountmanagement',
                        component: () =>
                            import ('src/components/features/knowledgebase/accountmanagement.vue'),
                    },
                    {
                        path: 'apiintegration',
                        component: () =>
                            import ('src/components/features/knowledgebase/apiintegration.vue'),
                    },
                    {
                        path: 'apiintegration/generate-shopify-api-access-token',
                        component: () =>
                            import ('pages/shopify-page/shopify.vue')
                    }

                ]
            },
        ]
    },
    {
        path: '/login',
        component: () =>
            import ('src/layouts/login/login.vue'),
        children: [{
            path: '',
            component: () =>
                import ('src/pages/login-new/login.vue')
        }],
    },
    {
        path: '/signup',
        component: () =>
            import ('src/layouts/login/login.vue'),
        children: [{
            path: '',
            component: () =>
                import ('src/pages/login-new/signup.vue')
        }],
    },
    {
        path: '/verified',
        component: () =>
            import ('src/layouts/login/login.vue'),
        children: [{
            path: '',
            component: () =>
                import ('src/pages/login-new/verified.vue')
        }]
    },
    {
        path: '/forgot',
        component: () =>
            import ('src/layouts/login/login.vue'),
        children: [{
                path: '',
                component: () =>
                    import ('src/pages/auth/new-forgot.vue')
            },
            {
                path: ':username',
                component: () =>
                    import ('src/pages/auth/new-forgot.vue')
            }
        ],
    },

    {
        path: '/successful',
        component: () =>
            import ('src/pages/paymentVerified.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')

    }, {
        path: '/maintenance',
        name: "maintenance",
        component: () =>
            import ('pages/home/maintenance.vue')
    },
]

export default routes
