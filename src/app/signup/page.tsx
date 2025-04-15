"use client";
import {
  Box,
  Button,
  Container,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  async function signup(values: {
    name: string;
    email: string;
    password: string;
    age: string;
    phone: string;
  }) {
    try {
      let response = await fetch(
        `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      let data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  let { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit: signup,
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
          <Typography variant="h3" sx={{ fontWeight: "700" }}>
            Come Join Us
          </Typography>

          <Typography
            sx={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}
          >
            We are so excited to have you here.If you haven't already, create an
            account to get access to exclusive offers, rewards, and discounts.
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
            Already have an account?{" "}
            <span>
              <Link href={"/login"}>Sign in</Link>
            </span>
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{
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
            Signup
          </Typography>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            value={values.name}
            onChange={handleChange}
          />
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
          <TextField
            id="age"
            label="Age"
            variant="outlined"
            value={values.age}
            onChange={handleChange}
          />
          <TextField
            id="phone"
            label="Phone"
            variant="outlined"
            value={values.phone}
            onChange={handleChange}
          />
          <Button
            id="submit"
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#295F98" }}
          >
            Sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
}
