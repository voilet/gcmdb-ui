export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {path: '/user', redirect: '/user/login'},
      {path: '/user/login', component: './User/Login'},
      {path: '/user/register', component: './User/Register'},
      {path: '/user/newpass', component: './User/Newpass'},
      {path: '/user/register-result', component: './User/RegisterResult'},
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        "path": "/",
        "redirect": "/dashboard/workplace",
        "exact": true,
      },
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            component: './gProject/ProTree/ListProjectTree',
          },

        ],
      },
      {
        path: '/resource',
        name: 'resource',
        icon: 'table',

        routes: [
          {
            path: '/resource/idc',
            name: 'idc',
            icon: 'table',
            routes: [
              {
                path: '/resource/idc/idclist',
                name: 'idclist',
                component: './gResource/gIdc/idc/Listidc',
              },
              {
                path: '/resource/idc/provider',
                name: 'provider',
                component: './gResource/gIdc/provider/ProviderList',
              },
              {
                path: '/resource/idc/ipresource',
                name: 'ipresource',
                component: './gResource/gIdc/ipresource/ipResourceList',
              },
              {
                path: '/resource/idc/cabinet',
                name: 'cabinet',
                component: './gResource/gIdc/cabinet/cabinetHeader',
                routes: [
                  {
                    path: '/resource/idc/cabinet/list',
                    name: 'list',
                    component: './gResource/gIdc/cabinet/CabinetList',
                  },
                  {
                    path: '/resource/idc/cabinet/detail',
                    component: './gResource/gIdc/cabinet/BayDetail',
                  },
                  {
                    path: '/resource/idc/cabinet/edit',
                    component: './gResource/gIdc/cabinet/editCabinet',
                  },
                  {
                    path: '/resource/idc/cabinet/add',
                    name: 'add',
                    component: './gResource/gIdc/cabinet/addCabinet',
                  },
                ],
              },
            ],
          },
          {
            path: '/resource/hardware',
            name: 'hardware',
            icon: 'table',
            routes: [
              {
                path: '/resource/hardware/host',
                name: 'host',
                component: './gResource/gHardware/hostInfo/hostHeader',
                routes: [
                  {
                    path: '/resource/hardware/host/list',
                    name: 'list',
                    component: './gResource/gHardware/hostInfo/hostList',
                  },
                  {
                    path: '/resource/hardware/host/detail',
                    component: './gResource/gHardware/hostInfo/hostDetail',
                  },
                  {
                    path: '/resource/hardware/host/edit',
                    component: './gResource/gHardware/hostInfo/editHost',
                  },
                  {
                    path: '/resource/hardware/host/add',
                    name: 'add',
                    component: './gResource/gHardware/hostInfo/addHost',
                  },
                  {
                    path: '/resource/hardware/host/offline',
                    name: 'offline',
                    component: './gResource/gHardware/hostInfo/offlineHost',
                  },
                  {
                    path: '/resource/hardware/host/clean',
                    component: './gResource/gHardware/hostInfo/cleanHost',
                  }
                ],
              },
              {
                path: '/resource/hardware/deviceplan',
                name: 'deviceplan',
                icon: 'table',
                routes: [
                  {
                    path: '/resource/hardware/deviceplan/compose_plan',
                    name: 'compose_plan',
                    component: './gResource/gHardware/setMeal/plan/ListPlan',
                  },
                  {
                    path: '/resource/hardware/deviceplan/plan_cpu',
                    name: 'plan_cpu',
                    component: './gResource/gHardware/setMeal/cpu/Listcpu',
                  },
                  {
                    path: '/resource/hardware/deviceplan/plan_memory',
                    name: 'plan_memory',
                    component: './gResource/gHardware/setMeal/memory/Listmemory',
                  },
                  {
                    path: '/resource/hardware/deviceplan/plan_disk',
                    name: 'plan_disk',
                    component: './gResource/gHardware/setMeal/disk/Listdisk',
                  },
                  {
                    path: '/resource/hardware/deviceplan/plan_power',
                    name: 'plan_power',
                    component: './gResource/gHardware/setMeal/power/Listpower',
                  },
                  {
                    path: '/resource/hardware/deviceplan/plan_adaptor',
                    name: 'plan_adaptor',
                    component: './gResource/gHardware/setMeal/adaptor/Listadaptor',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/project',
        name: 'project',
        icon: 'profile',
        routes: [
          {
            path: '/project/business',
            name: 'business',
            icon: 'profile',
            component: './gProject/SearchList',
            routes: [
              {
                path: '/project/business/prolist',
                name: 'prolist',
                component: './gProject/Project/ListProject',
              },
              {
                path: '/project/business/grouplist',
                name: 'grouplist',
                component: './gProject/Progroup/ListProjectGroup',
              },
              {
                path: '/project/business/linelist',
                name: 'linelist',
                component: './gProject/Proline/ListProjectLine',
              },
              {
                path: '/project/business/proconfiglist',
                name: 'proconfiglist',
                component: './gProject/Project/ListProjectConfig',
              },
            ],
          },
        ],
      },
      {
        name: 'power',
        icon: 'user',
        path: '/authmanage',
        routes: [
          {
            path: '/authmanage/user',
            name: 'user',
            component: './gPower/SearchList',
            routes: [
              {
                path: '/authmanage/user/list',
                name: 'list',
                component: './gPower/User/userList',
              },
              {
                path: '/authmanage/user/rolelist',
                name: 'rolelist',
                component: './gPower/Role/roleTable',
              },
              {
                path: '/authmanage/user/resourcelist',
                name: 'resourcelist',
                component: './gPower/Resource/resourceList',
              },
            ],
          },
          {
            path: '/authmanage/forthost',
            name: 'forthost',
            component: './gPower/ForthostIndex',
            /*Routes: ['src/pages/Authorized'],
            authority: ['admin', 'user'],*/
            routes: [
              {
                path: '/authmanage/forthost/forthostlist',
                name: 'forthostlist',
                component: './gPower/Resource/forthostList',
              },
              {
                path: '/authmanage/forthost/fortpermissionlist',
                name: 'fortpermissionlist',
                component: './gPower/Resource/forthostPermissionList',
              },
            ],
          },



        ],
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                component: './Account/Center/Projects',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/info',
            name: 'info',
            component: './Account/Settings/Info'

          },
          {
            path: '/account/settings',
            name: 'infomodify',
            component: './Account/Settings/InfoModify'

          }
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
