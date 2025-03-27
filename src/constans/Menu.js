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
      {
        key: "menu.user",
        path: "/user",
        icon: "user",
      },
      {
        key: "menu.todo",
        path: "/todo",
        icon: "check",
      }
    ]
  },
  {
    id: "operation",
    key: "menu.operation",
    path: "/operation",
    icon: "user",
    children: [
      {
        key: "menu.operation1",
        path: "/operation",
        icon: "clock",
      },
    ]
  }
]

export default menu