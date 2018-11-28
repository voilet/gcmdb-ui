import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/root/gcmdbUi/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/account/center",
    "redirect": "/account/center/articles",
    "exact": true
  },
  {
    "path": "/account/settings",
    "redirect": "/account/settings/base",
    "exact": true
  },
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "routes": [
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
                "component": dynamic({ loader: () => import('../gResource/gIdc/idc/Listidc'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/resource/idc/provider",
                "name": "provider",
                "component": dynamic({ loader: () => import('../gResource/gIdc/provider/ProviderList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/resource/idc/ipresource",
                "name": "ipresource",
                "component": dynamic({ loader: () => import('../gResource/gIdc/ipresource/ipResourceList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/resource/idc/cabinet",
                "name": "cabinet",
                "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/cabinetHeader'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "routes": [
                  {
                    "path": "/resource/idc/cabinet/list",
                    "name": "list",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/CabinetList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/detail",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/BayDetail'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/edit",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/editCabinet'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/idc/cabinet/add",
                    "name": "add",
                    "component": dynamic({ loader: () => import('../gResource/gIdc/cabinet/addCabinet'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
                "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostHeader'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "routes": [
                  {
                    "path": "/resource/hardware/host/list",
                    "name": "list",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/detail",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/hostDetail'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/edit",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/editHost'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/add",
                    "name": "add",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/addHost'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/offline",
                    "name": "offline",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/offlineHost'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/host/clean",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/hostInfo/cleanHost'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/plan/ListPlan'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_cpu",
                    "name": "plan_cpu",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/cpu/Listcpu'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_memory",
                    "name": "plan_memory",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/memory/Listmemory'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_disk",
                    "name": "plan_disk",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/disk/Listdisk'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_power",
                    "name": "plan_power",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/power/Listpower'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "path": "/resource/hardware/deviceplan/plan_adaptor",
                    "name": "plan_adaptor",
                    "component": dynamic({ loader: () => import('../gResource/gHardware/setMeal/adaptor/Listadaptor'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                    "exact": true
                  },
                  {
                    "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
                  }
                ]
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../gProject/SearchList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/project/business/prolist",
                "name": "prolist",
                "component": dynamic({ loader: () => import('../gProject/Project/ListProject'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/project/business/grouplist",
                "name": "grouplist",
                "component": dynamic({ loader: () => import('../gProject/Progroup/ListProjectGroup'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/project/business/linelist",
                "name": "linelist",
                "component": dynamic({ loader: () => import('../gProject/Proline/ListProjectLine'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/project/treelist",
            "name": "treelist",
            "icon": "profile",
            "component": dynamic({ loader: () => import('../gProject/ProTree/ListProjectTree'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../gPower/SearchList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/authmanage/user/list",
                "name": "list",
                "component": dynamic({ loader: () => import('../gPower/User/userList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/authmanage/user/rolelist",
                "name": "rolelist",
                "component": dynamic({ loader: () => import('../gPower/Role/roleTable'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/authmanage/user/resourcelist",
                "name": "resourcelist",
                "component": dynamic({ loader: () => import('../gPower/Resource/resourceList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/authmanage/user/forthostlist",
                "name": "forthostlist",
                "component": dynamic({ loader: () => import('../gPower/Resource/forthostList'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": dynamic({ loader: () => import('../Result/Success'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": dynamic({ loader: () => import('../Result/Error'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": dynamic({ loader: () => import('../Exception/403'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": dynamic({ loader: () => import('../Exception/404'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": dynamic({ loader: () => import('../Exception/500'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../Account/Center/Center'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/center/articles",
                "component": dynamic({ loader: () => import('../Account/Center/Articles'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": dynamic({ loader: () => import('../Account/Center/Applications'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": dynamic({ loader: () => import('../Account/Settings/Info'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/settings/base",
                "component": dynamic({ loader: () => import('../Account/Settings/BaseView'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": dynamic({ loader: () => import('../Account/Settings/SecurityView'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": dynamic({ loader: () => import('../Account/Settings/BindingView'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": dynamic({ loader: () => import('../Account/Settings/NotificationView'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/root/gcmdbUi/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/root/gcmdbUi/node_modules/_umi-build-dev@1.1.2@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
