"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { queryCLient } from "../_Components/providers/tanstack";
import { Note, Root } from "../interfaces";

export default function useNote() {
  let { token } = useAuth();
  async function getNotes() {
    let response = await fetch(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        method: "GET",
        headers: token ? { token: `3b8ny__${token}` } : {},
      }
    );

    return await response.json();
  }

  let notesData = useQuery({
    queryKey: ["getUserNotes"],
    queryFn: getNotes,
    enabled: !!token,
  });

  async function addNote(values: { title: string; content: string }) {
    const response = fetch(`https://note-sigma-black.vercel.app/api/v1/notes`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: token
        ? { "Content-type": "application/json", token: `3b8ny__${token}` }
        : {},
    });

    return (await response).json();
  }

  let addResponse = useMutation({
    mutationFn: addNote,
    onMutate:({title, content})=>{
      const oldData = queryCLient.getQueryData<Root>(["getUserNotes"]);
      queryCLient.setQueryData(['getUserNotes'], {...oldData, notes:[...(oldData?.notes ?? []), {title, content, _id:0}]})
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function updateNote({
    values,
    noteId,
  }: {
    values: { title: string; content: string };
    noteId: string;
  }) {
    const response = fetch(
      `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
      {
        method: "PUT",
        body: JSON.stringify(values),
        headers: token
          ? { "Content-type": "application/json", token: `3b8ny__${token}` }
          : {},
      }
    );
    return (await response).json();
  }

  const updateResponse = useMutation({
    mutationFn: updateNote,
    onMutate: ({values, noteId}) => {
      const oldData = queryCLient.getQueryData<Root>(["getUserNotes"]);
      const selectedIndex = oldData?.notes?.findIndex((note)=> note._id === noteId)
      const newData = structuredClone(oldData);
      if(newData && selectedIndex !== undefined){
        newData.notes[selectedIndex].title = values.title;
        newData.notes[selectedIndex].content = values.content;
      }
      queryCLient.setQueryData(['getUserNotes'], newData ?? oldData)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function deleteNote(noteId: string) {
    const response = fetch(
      `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
      {
        method: "DELETE",
        headers: token
          ? { "Content-type": "application/json", token: `3b8ny__${token}` }
          : {},
      }
    );
  }

  const deleteResponse = useMutation({
    mutationFn: deleteNote,
    onMutate: (noteId) => {
      const oldData = queryCLient.getQueryData<Root>(['getUserNotes']);
      const newData = oldData?.notes.filter((note)=> note._id !== noteId)

      queryCLient.setQueryData(['getUserNotes'], {...oldData, notes:[...newData ?? []]})
    },
    onError: (error) => {
      console.log(error);
    },
  })

  return { notesData, addResponse, updateResponse, deleteResponse };
}
