import React from 'react';
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";

export  const Adminbardata = [
    {
        title: 'แดชบอร์ด',
        path: '/Admin',
        icon:<FaIcons.FaChartBar className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    },
    {
        title: 'รายการสั่งซื้อ',
        icon:<RiIcons.RiFilePaper2Fill className="Admin-sidebar-icon"/>,
        path: '/Admin/ManageOrders',
        cName: 'nav-text-admin'
    },
    {
        title: 'จัดการหมวดหมู่',
        path: '/Admin/ManageCategory',
        icon:<MdIcons.MdDashboard className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    },
    {
        title: 'จัดการแบรนด์',
        path: '/Admin/ManageBrand',
        icon:<FaIcons.FaCopyright className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    },
    {
        title: 'จัดการสินค้า',
        path: '/Admin/ManageProduct',
        icon:<RiIcons.RiShirtLine className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    },
    {
        title: 'จัดการลูกค้า',
        path: '/Admin/ManageCustomer',
        icon:<RiIcons.RiUserFill className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    },
    {
        title: 'จัดการโปรโมชัน',
        path: '/Admin/ManagePromotion',
        icon:<RiIcons.RiMoneyDollarCircleFill className="Admin-sidebar-icon"/>,
        cName: 'nav-text-admin'
    }
]