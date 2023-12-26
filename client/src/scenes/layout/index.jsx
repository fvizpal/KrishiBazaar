import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";

const Layout = () => {
    const isDesktop = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const user = useSelector((state) => state.user);
    const { role } = user;
    const isAdmin = role === "admin";

    return (
        <Box
            display={isDesktop ? "flex" : "block"}
            width="100%"
            height={"100%"}
        >
            <Sidebar
                isAdmin={isAdmin}
                isDesktop={isDesktop}
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar
                    user={user}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
                <Outlet />
            </Box>
        </Box>
    );
};

export default Layout;
