import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/home/share/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/dashboard/workplace",
    "exact": true
  },
  {
    "path": "/user",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/UserLayout'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/user/login",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/User/models/login.js').then(m => { return { namespace: 'login',...m.default}}),
  import('/home/share/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Login'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/User/models/login.js').then(m => { return { namespace: 'login',...m.default}}),
  import('/home/share/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Register'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/newpass",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/User/models/login.js').then(m => { return { namespace: 'login',...m.default}}),
  import('/home/share/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/Newpass'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/User/models/login.js').then(m => { return { namespace: 'login',...m.default}}),
  import('/home/share/src/pages/User/models/register.js').then(m => { return { namespace: 'register',...m.default}})
],
  component: () => import('../User/RegisterResult'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "routes": [
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/ProTree/ListProjectTree'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/resource",
        "name": "resource",
        "icon": "table",
        "routes": [
          {
            "path": "/resource/idc",
            "name": "idc",
            "icon": "table",
            "routes": [
              {
                "path": "/resource/idc/idclist",
                "name": "idclist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/idc/Listidc'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/resource/idc/provider",
                "name": "provider",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/provider/ProviderList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/resource/idc/ipresource",
                "name": "ipresource",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/ipresource/ipResourceList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/resource/idc/cabinet",
                "name": "cabinet",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/cabinet/cabinetHeader'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "routes": [
                  {
                    "path": "/resource/idc/cabinet/list",
                    "name": "list",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/cabinet/CabinetList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/detail",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/cabinet/BayDetail'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/edit",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/cabinet/editCabinet'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/add",
                    "name": "add",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gIdc/cabinet/addCabinet'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/resource/hardware",
            "name": "hardware",
            "icon": "table",
            "routes": [
              {
                "path": "/resource/hardware/host",
                "name": "host",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/hostHeader'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "routes": [
                  {
                    "path": "/resource/hardware/host/list",
                    "name": "list",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/hostList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/detail",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/hostDetail'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/edit",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/editHost'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/add",
                    "name": "add",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/addHost'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/offline",
                    "name": "offline",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/offlineHost'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/clean",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/hostInfo/cleanHost'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "path": "/resource/hardware/deviceplan",
                "name": "deviceplan",
                "icon": "table",
                "routes": [
                  {
                    "path": "/resource/hardware/deviceplan/compose_plan",
                    "name": "compose_plan",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/plan/ListPlan'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_cpu",
                    "name": "plan_cpu",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/cpu/Listcpu'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_memory",
                    "name": "plan_memory",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/memory/Listmemory'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_disk",
                    "name": "plan_disk",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/disk/Listdisk'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_power",
                    "name": "plan_power",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/power/Listpower'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_adaptor",
                    "name": "plan_adaptor",
                    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gResource/models/gdevice.js').then(m => { return { namespace: 'gdevice',...m.default}}),
  import('/home/share/src/pages/gResource/models/ghardware.js').then(m => { return { namespace: 'ghardware',...m.default}}),
  import('/home/share/src/pages/gResource/models/gidc.js').then(m => { return { namespace: 'gidc',...m.default}})
],
  component: () => import('../gResource/gHardware/setMeal/adaptor/Listadaptor'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/project",
        "name": "project",
        "icon": "profile",
        "routes": [
          {
            "path": "/project/business",
            "name": "business",
            "icon": "profile",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/SearchList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/project/business/prolist",
                "name": "prolist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/Project/ListProject'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/project/business/grouplist",
                "name": "grouplist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/Progroup/ListProjectGroup'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/project/business/linelist",
                "name": "linelist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/Proline/ListProjectLine'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/project/business/proconfiglist",
                "name": "proconfiglist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/Project/ListProjectConfig'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/project/treelist",
            "name": "treelist",
            "icon": "profile",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gProject/models/gappmanage.js').then(m => { return { namespace: 'gappmanage',...m.default}}),
  import('/home/share/src/pages/gProject/models/gproline.js').then(m => { return { namespace: 'gproline',...m.default}})
],
  component: () => import('../gProject/ProTree/ListProjectTree'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "power",
        "icon": "user",
        "path": "/authmanage",
        "routes": [
          {
            "path": "/authmanage/user",
            "name": "user",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/SearchList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/authmanage/user/list",
                "name": "list",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/User/userList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/authmanage/user/rolelist",
                "name": "rolelist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/Role/roleTable'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/authmanage/user/resourcelist",
                "name": "resourcelist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/Resource/resourceList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/authmanage/forthost",
            "name": "forthost",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/ForthostIndex'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/authmanage/forthost/forthostlist",
                "name": "forthostlist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/Resource/forthostList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/authmanage/forthost/fortpermissionlist",
                "name": "fortpermissionlist",
                "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/gPower/models/gforthost.js').then(m => { return { namespace: 'gforthost',...m.default}}),
  import('/home/share/src/pages/gPower/models/gresource.js').then(m => { return { namespace: 'gresource',...m.default}}),
  import('/home/share/src/pages/gPower/models/grole.js').then(m => { return { namespace: 'grole',...m.default}}),
  import('/home/share/src/pages/gPower/models/guser.js').then(m => { return { namespace: 'guser',...m.default}})
],
  component: () => import('../gPower/Resource/forthostPermissionList'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "hideInMenu": true,
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/403'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/404'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/500'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Exception/models/error.js').then(m => { return { namespace: 'error',...m.default}})
],
  component: () => import('../Exception/TriggerException'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Center'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/account/center",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Projects'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Articles'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Applications'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": _dvaDynamic({
  
  component: () => import('../Account/Center/Projects'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/info",
            "name": "info",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/Info'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/account/settings",
            "name": "infomodify",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('/home/share/src/pages/Account/Settings/models/geographic.js').then(m => { return { namespace: 'geographic',...m.default}})
],
  component: () => import('../Account/Settings/InfoModify'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('/home/share/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/home/share/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
