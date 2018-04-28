import { isUrl } from '../utils/utils';

const menuData = [{
  name: 'dashboard',
  icon: 'dashboard',
  path: 'dashboard',
  children: [{
    name: '分析页',
    path: 'analysis',
  }, {
    name: '监控页',
    path: 'monitor',
  }, {
    name: '工作台',
    path: 'workplace',
    // hideInBreadcrumb: true,
    // hideInMenu: true,
  }],
}, {
  name: '资源管理',
  icon: 'table',
  path: 'resource',
  children: [{
    name: '机房管理',
    icon: 'table',
    path: 'idc',
    children: [
      {
        name: '机房列表',
        path: 'idclist',
      },{
        name: '运营商管理',
        path: 'provider',
      },{
        name: 'IP资源管理',
        path: 'ipresource',
      },{
        name: '机柜管理',
        path: 'cabinet',
      }
    ]
  }],
}, {
  name: '项目管理',
  icon: 'profile',
  path: 'project',
  children: [
    {
        name: '产品线列表',
        path: 'listline',
    },
    {
      name: '项目组列表',
      path: 'listgroup',
    },
    {
      name: '项目列表',
      path: 'listpro',
    }, {
      name: '发布信息',
      path: 'carving',
      hideInMenu: true,
    },
  ],
},{
  name: '发布日志',
  icon: 'rocket',
  path: 'push',
  children: [{
    name: '日志列表',
    path: 'success',
    icon: "eye"
  }],
}, {
  name: '配置中心',
  icon: 'key',
  path: 'conf',
  hideInMenu: true,
  children: [{
    name: '配置列表',
    path: 'success',
  }, {
    name: '添加配置',
    path: 'fail',
  }],
}, {
  name: '工单系统',
  icon: 'medicine-box',
  path: 'case',
  children: [{
    name: '工单列表',
    path: 'list',
    ico: 'idcard',
  }, {
    name: '创建工单',
    path: 'create',
    ico: 'user-add',
  }],
}, {
  name: '故障管理',
  icon: 'warning',
  path: 'exception',
  children: [{
    name: '我的故障',
    path: '403',
  }, {
    name: '添加故障',
    path: '403',
  }, {
    name: '故障列表',
    path: '404',
  }, {
    name: '待处理故障',
    path: '500',
  }, {
    name: '已处理故障',
    path: '500',
  }, {
    name: '精典案例',
    path: 'trigger',
    hideInMenu: true,
  }],
}, {
  name: '堡垒机',
  icon: 'hourglass',
  path: 'jumpserver',
  children: [{
    name: '我的主机列表',
    path: '403',
  }, {
    name: '连接主机',
    path: '403',
  }],
}, {
  name: '回收站',
  icon: 'profile',
  path: 'recycle',
  children: [
    {
        name: '回收列表',
        path: 'recyclelist',
    }
  ],
},{
  name: '账户',
  icon: 'user',
  path: 'user',
  authority: 'guest',
  children: [{
    name: '登录',
    path: 'login',
  }, {
    name: '注册',
    path: 'register',
  }, {
    name: '注册结果',
    path: 'register-result',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
