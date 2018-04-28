import { isUrl } from '../utils/utils';

const menuData = [{
  name: '仪表盘',
  icon: 'dashboard',
  path: 'dashboard',
  children: [
  {
    name: '工作台',
    path: 'workplace',
    // hideInMenu: true,
  }],
}, {
  name: '资产管理',
  icon: 'form',
  path: 'assets',
  children: [
    {
      name: '设备管理',
      path: 'host',
      children: [
        {
          name: '设备列表',
          path: 'list',
          icon: 'hdd',
        },
        {
          name: '添加设备',
          path: 'add',
          icon: "plus-circle-o",
        },
      ],
    },
    {
      name: '硬件厂商',
      path: 'hadiry',
      children: [
        {
          name: '设备列表',
          path: 'list',
          icon: 'hdd',
        },
        {
          name: '添加设备',
          path: 'add',
          icon: "plus-circle-o",
        },
      ],
    },
    {
      name: '硬件类型',
      path: 'hadirytype',
      children: [
        {
          name: '设备列表',
          path: 'list',
          icon: 'hdd',
        },
        {
          name: '添加设备',
          path: 'add',
          icon: "plus-circle-o",
        },
      ],
    },
    {
      name: '系统类型',
      path: 'os',
      children: [
        {
          name: '设备列表',
          path: 'list',
          icon: 'hdd',
        },
        {
          name: '添加设备',
          path: 'add',
          icon: "plus-circle-o",
        },
      ],
    },
    {
      name: '设备环境',
      path: 'env',
      children: [
        {
          name: '设备列表',
          path: 'list',
          icon: 'hdd',
        },
        {
          name: '添加设备',
          path: 'add',
          icon: "plus-circle-o",
        },
      ],
    },
  ],
}, {
  name: '机房管理',
  icon: 'table',
  path: 'idc',
  children: [{
    name: '机房列表',
    path: 'list',
  }, {
    name: '添加机房',
    path: 'add',
  }],
}, {
  name: '产品管理',
  icon: 'profile',
  path: 'project',
  children: [{
    name: '项目管理',
    path: 'pro',
    children:[
    {
      name: '项目列表',
      path: 'listpro',
    }, {
      name: '项目组列表',
      path: 'listgroup',
    }, {
      name: '发布信息',
      path: 'carving',
      hideInMenu: true,
    }],
  }],
}, {
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
  name: '用户管理',
  icon: 'layout',
  path: 'users',
  children: [{
    name: '用户列表',
    path: 'list',
    ico: 'idcard',
  }, {
    name: '添加用户',
    path: 'add',
    ico: 'user-add',
  }],
},{
  name: '用户中心',
  icon: 'user',
  path: 'cuser',
  children: [{
    name: '个人信息',
    path: 'info',
    ico: 'idcard',
  }],
}, {
  name: '使用文档',
  icon: 'book',
  path: 'http://blog.kukafei520.net',
  target: '_blank',
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
