"use client";
import { Box, Container } from "@mui/material";
import NoteCard from "./_Components/noteCard";
import { useEffect, useState } from "react";
import { useAuth } from "./store/useAuth";
import { useRouter } from "next/navigation";

export default function Home() {
  const auth = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
  },[])
  
  useEffect(()=>{
    console.log(loading)
    if(!auth.token && loading){
      router.push('/login')
    }
  },[auth.token, router, loading])
  
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
