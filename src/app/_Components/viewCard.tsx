"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import {ViewCardProps } from "../interfaces";

export default function ViewCard({ setReading, note }: ViewCardProps) {

  const handleExit = () => {
    setReading(false);
  };

  return (
    <Box sx={{position:'fixed', inset:'0', backgroundColor: '#f9f9f9', display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', zIndex:'999999'}}>
      <Box
        sx={{
          width:'50%',
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
          paddingBlock: "0 50px",
          backgroundColor: "#fff",
          borderRadius: "30px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#3f50b5",
            widht: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 0px",
            borderRadius: "30px 30px 0 0",
            marginBottom: "20px",
          }}
        >
          <Typography className="subLogo" sx={{ margin: "auto" }}>
            NOTIFY
          </Typography>
        </Box>
        <Box
          component={"form"}
          noValidate
          autoComplete="off"
          width={"100%"}
          sx={{
            position: "relative",
            zIndex: "9999",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              width: "70%",
              gap: "30px",
            }}
          >
            <TextField
              id="content"
              name="content"
              label="Note"
              multiline
              rows={20}
              variant="outlined"
              sx={{ width: "100%", backgroundColor: "#fff" }}
              value={note.content}
            />
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                paddingRight: "30px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={handleExit}>Exit</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
