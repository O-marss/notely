"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useNote from "../store/useNote";
import { Button, Typography } from "@mui/material";
import { EditCardProps } from "../interfaces";
import { useEffect } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import { useAuth } from "../store/useAuth";
import { useRouter } from "next/navigation";

export default function NoteInput({
  editing,
  setEditing,
  note,
  setNote,
}: EditCardProps) {
  const { addResponse, updateResponse } = useNote();

  const { handleSubmit, handleChange, values, setValues } =
    useFormik({
      initialValues: {
        title: "",
        content: "",
      },
      onSubmit: (values) => {
        editing
          ? updateResponse.mutate({ values, noteId: note._id })
          : addResponse.mutate(values);
      },
    });
  const auth = useAuth();
  const isLoggedIn = Boolean(auth.token);
  const router = useRouter();
  const handleLogout = () => {
    auth.clearToken();
    router.push(`/`);
  };

  const handleExit = () => {
    setValues({
      title: '',
      content: '',
    });
    setEditing(false)
  };

  useEffect(() => {
    if (editing && note) {
      setValues({
        title: note.title,
        content: note.content,
      });
    }
  }, [ editing,note]);

  return (
    <Box
      sx={{
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
          NOTELY
        </Typography>
      </Box>
      <Box
        component={"form"}
        noValidate
        autoComplete="off"
        width={"100%"}
        onSubmit={handleSubmit}
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
            id="title"
            name="title"
            label="Note Title"
            variant="outlined"
            value={values.title}
            onChange={handleChange}
            sx={{ width: "50%", backgroundColor: "#fff" }}
          />
          <TextField
            id="content"
            name="content"
            label="Note"
            multiline
            rows={20}
            variant="outlined"
            sx={{ width: "100%", backgroundColor: "#fff" }}
            value={values.content}
            onChange={handleChange}
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
            {isLoggedIn ? (
              <>
                <Box sx={{display:'flex', gap:'20px'}}>
                  <Button
                    id="submit"
                    type="submit"
                    sx={{
                      padding: "10px 30px",
                      backgroundColor: "#121212",
                      color: "#fff",
                    }}
                    disabled={addResponse.isPending}
                  >
                    {editing ? "Update" : "Add"}
                  </Button>
                  {editing && (
                    <Button
                      onClick={handleExit}
                      sx={{
                        alignSelf: "start",
                        padding: "10px 30px",
                        backgroundColor: "#121212",
                        color: "#fff",
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
                <Button
                  sx={{
                    color: "#f50057",
                  }}
                  onClick={handleLogout}
                >
                  <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                    Logout
                  </Typography>
                </Button>
              </>
            ) : (
              <Box>
                <Link href={"/login"}>
                  <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                    Login
                  </Typography>
                </Link>
                <Link href={"/signup"}>
                  <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                    Sign up
                  </Typography>
                </Link>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
