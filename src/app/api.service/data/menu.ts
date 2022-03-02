export const menu = [
  {
    // level: 1,
    title: 'ElementTree',
    icon: 'mail',
    // open: false,
    // selected: false,
    // disabled: false,
    children: [
      {
        // level: 2,
        title: 'Element Tree Config',
        icon: 'bars',
        // open: false,
        // selected: false,
        // disabled: false,
        router: '/pages/elementTree/elementTreeConfig'
      },
      {
        // level: 2,
        title: 'Field Base List',
        icon: 'bars',
        // open: false,
        // selected: false,
        // disabled: false,
        router: '/pages/elementTree/fieldType'
      },
      {
        // level: 2,
        title: 'Element List',
        icon: 'bars',
        router: '/pages/elementTree/elementList'
      }
    ]
  },
  {
    // level: 1,
    title: 'File',
    icon: 'team',
    // open: false,
    // selected: false,
    // disabled: false,
    children: [
      {
        // level: 2,
        title: 'list',
        icon: 'user',
        // selected: false,
        // disabled: false,
        router: '/pages/file/font.list'
      }
    ]
  },
  {
    // level: 1,
    title: 'Admin Auth',
    icon: 'team',
    // open: false,
    // selected: false,
    // disabled: false,
    children: [
      {
        // level: 2,
        title: 'Router Auth List',
        icon: 'user',
        // selected: false,
        // disabled: false,
        router: '/pages/auth/adminRouterAuthList'
      },
      {
        // level: 2,
        title: 'Admin List',
        icon: 'user',
        // selected: false,
        // disabled: false,
        router: '/pages/auth/adminList'
      },
      {
        // level: 2,
        title: 'API Auth List',
        icon: 'user',
        // selected: false,
        // disabled: false,
        router: '/pages/auth/adminAPIAuthList'
      },
      {
        // level: 2,
        title: 'Role List',
        icon: 'user',
        // selected: false,
        // disabled: false,
        router: '/pages/auth/adminRoleList'
      }
    ]
  }
];
