import React from "react";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { useAuthDispatch, useAuthState } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAuthDispatch();
    const { authenticated } = useAuthState();

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button
                            key="home"
                            onClick={() => navigate("/")}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            Home
                        </Button>
                    </Box>
                    {authenticated ? (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Button
                                key="home"
                                onClick={() => dispatch({ type: "LOGOUT" })}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                Log out
                            </Button>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            <Button
                                key="home"
                                onClick={() => navigate("/login")}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "block",
                                }}
                            >
                                Login
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
