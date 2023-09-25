import React, { memo, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteStore } from "../store/noteStore";
import MemoDelete from "./DeleteNote";

const EditNote = ({ nTitle, nBody, nId, nCreated, nUpdated, content }) => {
  const updateNote = useNoteStore((state) => state.updateNote);
  const mutate = useNoteStore((state) => state.mutate);
  const setMutate = useNoteStore((state) => state.setMutate);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(nTitle);
  const [body, setBody] = useState(nBody);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTitle(nTitle);
    setBody(nBody);
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    const NoteValue = { title, body };

    const response = await fetch("/api/notes/" + nId, {
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
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
    if (response.ok) {
      updateNote(json);
      setMutate(!mutate);
      toast.success("Note updated");
      setLoading(false);
      setIsOpen(!isOpen);
    }
  };

  const newDate = (date) => new Date(date);

  const createdDate = newDate(nCreated).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updatedDate = newDate(nUpdated).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <div onClick={handleModal}>{content}</div>
      <div
        className={`${
          isOpen ? "modal modal-open" : "modal"
        } modal-middle backdrop-brightness-50 backdrop-blur-sm`}
      >
        <div
          className={`modal-box w-11/12 md:w-2/3 xl:w-1/2 max-w-5xl flex flex-col gap-2`}
        >
          {/* Modal Header */}
          <div className="w-full flex justify-between">
            {/* Modal Title */}
            <h2 className="text-xl xl:text-2xl font-bold text-primary">
              {createdDate}
            </h2>
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
          <p className="-mt-2 text-center text-xs">Updated: {updatedDate}</p>
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
                className={`${
                  loading ? "btn-disabled" : ""
                }btn w-20 h-10 btn-sm btn-success rounded-full capitalize hover:bg-primary/50 text-lg`}
              >
                {loading ? "..." : "Update"}
              </button>
              <MemoDelete id={nId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MemoEdit = memo(EditNote);

export default MemoEdit;
