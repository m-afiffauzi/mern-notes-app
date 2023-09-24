import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteStore } from "../store/noteStore";

const AddNote = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const addNote = useNoteStore((state) => state.addNote);
  const { user } = useAuthContext();

  const handleAddModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddOpen(!isAddOpen);
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

    const note = { title, body };

    const response = await fetch(`/api/notes`, {
      method: "POST",
      body: JSON.stringify(note),
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
      setTitle("");
      setBody("");
      setError(null);
      addNote(json);
      toast.success("Note added");
      setLoading(false);
      setIsAddOpen(!isAddOpen);
    }
  };
  return (
    <>
      <button
        className="btn btn-sm w-24 h-10 btn-outline bg-white text-primary hover:bg-primary-focus hover:border-none rounded-full capitalize"
        onClick={handleAddModal}
      >
        Add
      </button>
      <div
        className={`${
          isAddOpen ? "modal modal-open" : "modal"
        } modal-middle backdrop-blur-sm backdrop-brightness-50`}
      >
        <div className="modal-box w-11/12 md:w-3/4 xl:w-1/2 max-w-5xl flex flex-col gap-2">
          {/* Modal Header */}
          <div className="w-full flex justify-between">
            {/* Modal Title */}
            <h2 className="text-xl xl:text-2xl font-bold text-primary">
              Add Note
            </h2>
            {/* Close Button */}
            <button
              onClick={handleAddModal}
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
            {/* Modal Action Button */}
          </form>
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
                {loading ? "..." : "Save"}
              </button>
              <button
                onClick={handleAddModal}
                className="btn w-20 h-10 btn-sm btn-secondary rounded-full capitalize text-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNote;
