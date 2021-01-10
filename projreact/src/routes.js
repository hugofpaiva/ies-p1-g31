import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import MainLayout from "src/layouts/MainLayout";
import AccountView from "src/views/account/AccountView";
import CustomerListView from "src/views/customer/CustomerListView";
import CustomerInListView from "src/views/customer/CustomerInListView";
import NotificationView from "src/views/reports/NotificationView";
import LoginView from "src/views/auth/LoginView";
import NotFoundView from "src/views/errors/NotFoundView";
import ProductListView from "src/views/product/ProductListView";
import SettingsView from "src/views/settings/SettingsView";
import TasksView from "src/views/tasks/TasksView";
import DashboardEmployeeView from "src/views/reports/DashboardEmployeeView";
import ShoppingHistoricView from 'src/views/shopping/ShoppingHistoricView';
import ManagerView from 'src/views/reports/ManagerView'


const routes = [
	{
		path: "admin",
		element: <DashboardLayout persona="admin" />,
		children: [
			{ path: "account", element: <AccountView /> },
			{ path: "customers", element: <CustomerListView /> },
			{ path: "customers/in_store", element: <CustomerInListView /> },
			{ path: "orders", element: <ShoppingHistoricView /> },
			{ path: "/", element: <ManagerView /> },
			{ path: "products", element: <ProductListView persona="admin" /> },
			{ path: "settings", element: <SettingsView persona="admin" /> },
			{ path: "notifications", element: <NotificationView /> },
			{ path: "*", element: <Navigate to="/404" /> },
		],
	},
	{
		path: "employee",
		element: <DashboardLayout persona="employee" />,
		children: [
			{ path: "/", element: <DashboardEmployeeView /> },
			{ path: "help", element: <TasksView /> },
			{ path: "products", element: <ProductListView persona="employee" /> },
			{ path: "settings", element: <SettingsView persona="employee" /> },
		],
	},

	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "login", element: <LoginView /> },
			{ path: "404", element: <NotFoundView /> },
			{ path: "/", element: <Navigate to="/login" /> },
			{ path: "*", element: <Navigate to="/404" /> },
		],
	},
];

export default routes;
