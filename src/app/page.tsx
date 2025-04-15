"use client";
import { Box, Container } from "@mui/material";
import styles from "./page.module.css";
import NoteCard from "./_Components/noteCard";
import { useEffect } from "react";
import { useAuth } from "./store/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const auth = useAuth()
  const router = useRouter()

  useEffect(()=>{
    if(!auth.isAuthenticated){
      router.push('/login')
    }
  },[])
  
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        gap: "40px",
      }}
    >
      <Box sx={{ width: "85%" }}>
        <NoteCard />
      </Box>
    </Container>
  );
}
