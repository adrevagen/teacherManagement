import { HomeIcon, UserIcon, ChartBarIcon, CalendarDaysIcon } from "@heroicons/vue/24/outline"
export interface MenuItem {
  id: string
  label: string
  icon?: any
  path?: any
  children?: MenuItem[] 
}

export const menuItems: MenuItem[] = [
  {
    id: "teacher",
    label: "Teachers",
    path: "/",
    icon: UserIcon
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: CalendarDaysIcon, 
    path: "/teacher-schedule",
  },
  //you can use this path if you want add child in sidebar menu
  // {
  //   id: "reports",
  //   label: "Reports",
  //   icon: ChartBarIcon,
  //   children: [
  //     { id: "presence", label: "Presence Report" },
  //     { id: "activity", label: "User Activity" },
  //   ],
  // },
]