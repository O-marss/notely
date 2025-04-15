"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Container } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../store/useAuth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const auth = useAuth();
  const isLoggedIn = Boolean(auth.token);
  const router = useRouter();
  const handleLogout = () => {
    auth.clearToken();
    router.push(`/`);
  };
  return (
    <Box sx={{ flexGrow: 1, position:'relative', zIndex:'99999' }}>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ color: "#fff" }}>
          <Toolbar>
            <Link href={`/`} id="logo" className="logo">
              NOTIFY
            </Link>
            <Box sx={{ display: "flex", gap: "15px" }}>
              {isLoggedIn ? (
                <Button
                  sx={{ padding: "0", color: "#fff" }}
                  onClick={handleLogout}
                >
                  <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                    Logout
                  </Typography>
                </Button>
              ) : (
                <Box>
                  <Link href={"/login"}>
                    <Typography
                      sx={{ color: "inherit", textDecoration: "none" }}
                    >
                      Login
                    </Typography>
                  </Link>
                  <Link href={"/signup"}>
                    <Typography
                      sx={{ color: "inherit", textDecoration: "none" }}
                    >
                      Sign up
                    </Typography>
                  </Link>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
