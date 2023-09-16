import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteStore } from "../store/noteStore";
import DeleteNote from "./DeleteNote";

const EditNote = ({ isOpen, setIsOpen, note }) => {
  const updateNote = useNoteStore((state) => state.updateNote);
  const mutate = useNoteStore((state) => state.mutate);
  const setMutate = useNoteStore((state) => state.setMutate);
  const { user } = useAuthContext();
  const [title, setTitle] = useState(note ? note.title : "");
  const [body, setBody] = useState(note.body);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    setTitle(note.title);
    setBody(note.body);
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const NoteValue = { title, body };

    const response = await fetch("/api/notes/" + note._id, {
      method: "PATCH",
      body: JSON.stringify(NoteValue),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    if (response.ok) {
      updateNote(json);
      setMutate(!mutate);
      toast.success("Note updated");
      setIsOpen(!isOpen);
    }
  };

  const date = new Date(note.createdAt);
  const formatedDate = date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className={`${
        isOpen ? "modal modal-open" : "modal"
      } modal-middle backdrop-brightness-50 backdrop-blur-sm`}
    >
      <div
        className={`modal-box w-11/12 md:w-3/4 xl:w-1/2 max-w-5xl flex flex-col gap-2`}
      >
        {/* Modal Header */}
        <div className="w-full flex justify-between">
          {/* Modal Title */}
          <h3 className="text-xl xl:text-2xl font-bold text-primary">
            {formatedDate}
          </h3>
          {/* Close Button */}
          <button
            onClick={handleCancel}
            className="btn btn-sm btn-circle btn-accent"
          >
            ✕
          </button>
        </div>
        {/* Modal Body */}
        <form className="flex flex-col justify-center items-start gap-2">
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
            className="input input-bordered input-primary w-full text-lg xl:text-xl font-semibold"
          />
          <textarea
            name="note"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="textarea textarea-primary w-full h-60 text-sm xl:text-base"
            placeholder="Note"
          ></textarea>
        </form>
        {/* Modal Action Button */}
        <div className="w-full flex justify-end">
          <div className="card-actions relative">
            {error && (
              <div className="fixed sm:relative text-start bg-error ms-auto px-5 py-2 rounded-full text-red-600 capitalize">
                {error}
              </div>
            )}
            <button
              onClick={handleSubmit}
              className="btn w-20 h-10 btn-sm btn-success rounded-full capitalize hover:bg-primary/50 text-lg"
            >
              Update
            </button>
            <DeleteNote note={note} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
