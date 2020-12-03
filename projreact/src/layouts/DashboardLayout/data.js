import {
    BarChart as BarChartIcon,
    Settings as SettingsIcon,
    ShoppingBag as CustomersInIcon,
    Package as ShoppingBagIcon,
    Bell as NotificationsIcon,
    Users as UsersIcon,
    DollarSign as LatestOrders,
    Users as Users,
} from "react-feather";

const personas = {
    'admin': {
        avatar: "/static/images/avatars/avatar_2.png",
        jobTitle: "Manager",
        name: "Amélia Rodrigues",
        menu: [
            {
                href: "/admin/",
                icon: BarChartIcon,
                title: "Dashboard",
            },
            {
                href: "/admin/customers/",
                icon: UsersIcon,
                title: "Customers",
            },
            {
                href: "/admin/customers/in_store",
                icon: CustomersInIcon,
                title: "Customers in Store",
            },
            {
                href: "/admin/orders/",
                icon: LatestOrders,
                title: "Latest Purchases",
            },
            {
                href: "/admin/products/",
                icon: ShoppingBagIcon,
                title: "Products",
            },
            {
                href: "/admin/notifications/",
                icon: NotificationsIcon,
                title: "Notifications",
            },
            {
                href: "/admin/settings/",
                icon: SettingsIcon,
                title: "Settings",
            },
        ]
    },
    'employee': {
        avatar: "/static/images/avatars/avatar_1.png",
        jobTitle: "Employee",
        name: "Pedro Paulo",
        menu: [
            {
                href: "/employee/",
                icon: BarChartIcon,
                title: "Dashboard",
            },
            {
                href: "/employee/help",
                icon: Users,
                title: "Help Requests",
            },
            {
                href: "/employee/products/",
                icon: ShoppingBagIcon,
                title: "Products",
            },
            {
                href: "/employee/settings/",
                icon: SettingsIcon,
                title: "Settings",
            },
        ]
    },
};

export default personas;