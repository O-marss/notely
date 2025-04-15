"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useNote from "../store/useNote";
import { Note } from "../interfaces";
import { Box } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import ViewCard from "./viewCard";
import NoteInput from "./noteInput";

export default function NoteCard() {
  let {notesData: { data },deleteResponse, addResponse} = useNote();
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    createdAt: "",
    createdBy: "",
    _id: "",
    updatedAt: "",
    __v: 0,
  });
  const [reading, setReading] = useState(false);

  const handleEdit = (note: Note) => {
    setEditing(true);
    setNote(note);
  };

  const handleRead = (note: Note)=>{
    setReading(true);
    setNote(note)
  }

  const handeDelete = (noteId: string) => {
    deleteResponse.mutate(noteId);
  };

  return (
    <>
    {reading && <ViewCard reading={reading} setReading={setReading} note={note} setNote={setNote}/>}
    <NoteInput setEditing={setEditing} editing={editing} note={note} setNote={setNote}/>
      {data?.notes ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexWrap: "wrap",
            gap: "20px",
            marginTop:'50px'
          }}
        >
          {data.notes.map((note: Note) => (
            <Card key={note._id} sx={{ minWidth: 275, maxWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{
                    color: "text.secondary",
                    fontSize: 14,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{textTransform:'capitalize'}}> {note.title}</span>
                  <span>{moment(note.createdAt).format("LL")}</span>
                </Typography>
                <Typography variant="body2">{note.content}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={()=>handleRead(note)}>Read</Button>
                <Button
                  size="small"
                  sx={{ color: "green" }}
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  sx={{ color: "red" }}
                  onClick={() => handeDelete(note._id)}
                  disabled = {addResponse.isPending}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      ) : (''
      )}
    </>
  );
}
