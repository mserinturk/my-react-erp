export const menu = [
  {
    id: "dashboard",
    key: "menu.dashboard",
    path: "/",
    icon: "home",
    children: [
      {
        key: "menu.home",
        path: "/",
        icon: "home",
      },
    ]
  },
  {
    id: "management",
    key: "menu.management",
    path: "/customer",
    icon: "briefcase",
    children: [
      {
        key: "menu.customer",
        path: "/customer",
        icon: "user-group"
      },
      {
        key: "menu.order",
        path: "/order",
        icon: "boxes"
      },
      {
        key: "menu.invoice",
        path: "/invoice",
        icon: "file-invoice"
      }
    ]
  }
]

export default menu