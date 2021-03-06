import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/voilet/antd/gcmdbUi/src/pages/.umi/LocaleWrapper.jsx'

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
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/newpass",
        "component": dynamic({ loader: () => import('../User/Newpass'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
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
            "component": dynamic({ loader: () => import('../gProject/ProTree/ListProjectTree'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
                "component": dynamic({ loader: () => import('../gResource/gIdc/idc/Listidc'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/resource/idc/provider",
                "name": "provider",
                "component": dynamic({ loader: () => import('../gResource/gIdc/provider/ProviderList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/resource/idc/ipresource",
                "name": "ipresource",
                "component": dynamic({ loader: () => import('../gResource/gIdc/ipresource/ipResourceList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/resource/idc/cabinet",
                "name": "cabinet",
                "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/cabinetHeader'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "routes": [
                  {
                    "path": "/resource/idc/cabinet/list",
                    "name": "list",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/CabinetList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/detail",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/BayDetail'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/edit",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/editCabinet'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/add",
                    "name": "add",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/addCabinet'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
                "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostHeader'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "routes": [
                  {
                    "path": "/resource/hardware/host/list",
                    "name": "list",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/detail",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostDetail'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/edit",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/editHost'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/add",
                    "name": "add",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/addHost'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/offline",
                    "name": "offline",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/offlineHost'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/clean",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/cleanHost'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/plan/ListPlan'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_cpu",
                    "name": "plan_cpu",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/cpu/Listcpu'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_memory",
                    "name": "plan_memory",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/memory/Listmemory'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_disk",
                    "name": "plan_disk",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/disk/Listdisk'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_power",
                    "name": "plan_power",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/power/Listpower'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_adaptor",
                    "name": "plan_adaptor",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/adaptor/Listadaptor'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../gProject/SearchList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/project/business/prolist",
                "name": "prolist",
                "component": dynamic({ loader: () => import('../gProject/Project/ListProject'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/project/business/grouplist",
                "name": "grouplist",
                "component": dynamic({ loader: () => import('../gProject/Progroup/ListProjectGroup'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/project/business/linelist",
                "name": "linelist",
                "component": dynamic({ loader: () => import('../gProject/Proline/ListProjectLine'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/project/business/proconfiglist",
                "name": "proconfiglist",
                "component": dynamic({ loader: () => import('../gProject/Project/ListProjectConfig'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../gPower/SearchList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/authmanage/user/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../gPower/User/userList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/authmanage/user/rolelist",
                "name": "rolelist",
                "component": dynamic({ loader: () => import('../gPower/Role/roleTable'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/authmanage/user/resourcelist",
                "name": "resourcelist",
                "component": dynamic({ loader: () => import('../gPower/Resource/resourceList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/authmanage/forthost",
            "name": "forthost",
            "component": dynamic({ loader: () => import('../gPower/ForthostIndex'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/authmanage/forthost/forthostlist",
                "name": "forthostlist",
                "component": dynamic({ loader: () => import('../gPower/Resource/forthostList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/authmanage/forthost/fortpermissionlist",
                "name": "fortpermissionlist",
                "component": dynamic({ loader: () => import('../gPower/Resource/forthostPermissionList'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Exception/403'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": dynamic({ loader: () => import('../Exception/404'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": dynamic({ loader: () => import('../Exception/500'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Account/Center/Center'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "routes": [
              {
                "path": "/account/center",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/center/articles",
                "component": dynamic({ loader: () => import('../Account/Center/Articles'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": dynamic({ loader: () => import('../Account/Center/Applications'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/info",
            "name": "info",
            "component": dynamic({ loader: () => import('../Account/Settings/Info'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/account/settings",
            "name": "infomodify",
            "component": dynamic({ loader: () => import('../Account/Settings/InfoModify'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/Users/voilet/antd/gcmdbUi/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/voilet/antd/gcmdbUi/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
