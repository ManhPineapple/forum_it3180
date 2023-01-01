export const adminMenu = [
    {
        name: 'Admin Service', menus: [
            { name: 'User Manage', link: '/admin/usermanage' },
            { name: 'Pending Post', link: '/admin/inspectpost' },
        ]
    },
];

export const userMenu = [
    {
        name: 'User Service', menus: [
            { name: 'HomePage', link: '/user/post' },
            { name: 'My post', link: '/user/mypost'},
            { name: 'Change profile', link: '/user/profile'}
        ]
    },
];

// export const exampleMenu = [
//     {
//         name: 'menu.system.header', menus: [
//             {
//                 name: 'menu.system.system-administrator.header',
//                 subMenus: [
//                     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
//                     { name: 'menu.system.system-administrator.product-manage', link: '/system/product-manage' },
//                     { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
//                 ]
//             },
//         ]
//     },
// ];