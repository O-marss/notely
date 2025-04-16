"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "../store/useAuth";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const auth = useAuth();
  async function login(values: { email: string; password: string }) {
    const response = await fetch(
      `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    return await response.json();
  }

  const loginResponse = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      auth.setToken(data.token);
      router.push(`/`);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => loginResponse.mutate(values),
  });

  return (
    <Container
      sx={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <Box
        height={"600px"}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          width={"50%"}
          height={"100%"}
          sx={{
            backgroundColor: "#295F98",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "50px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "700", minWidth: "600px", textAlign: "center" }}
          >
            Welcome Back
          </Typography>

          <Typography
            sx={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}
          >
            We are so excited to have you here.
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              backgroundColor: "#003092",
              padding: "10px 20px",
              borderRadius: "20px",
              marginTop: "30px",
            }}
          >
            Don't have an account? <Link href={`/signup`}>Sign up here</Link>
          </Typography>
        </Box>
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            padding: "40px",
            backgroundColor: "#F7F7F7",
          }}
        >
          <Typography
            variant="h2"
            sx={{ color: "#121212", textAlign: "center", fontWeight: "700" }}
          >
            Signin
          </Typography>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
          />

          <Button
            id="submit"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#295F98" }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
