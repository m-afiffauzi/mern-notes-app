import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNoteStore } from "../store/noteStore";

const DeleteNote = ({ note }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteNote = useNoteStore((state) => state.deleteNote);
  const { user } = useAuthContext();

  const handleDeleteModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteOpen(!isDeleteOpen);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    if (!user) {
      toast.error("You must be logged in");
      setLoading(false);
      return;
    }
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      toast.error(json.error);
      setLoading(false);
    }
    if (response.ok) {
      deleteNote(json);
      toast.success("Note deleted");
      setLoading(false);
      setIsDeleteOpen(!isDeleteOpen);
    }
  };
  return (
    <>
      <button
        className="btn w-20 h-10 btn-sm btn-error rounded-full capitalize hover:bg-red-400 text-lg"
        onClick={handleDeleteModal}
      >
        Delete
      </button>
      <div
        className={`${
          isDeleteOpen ? "modal modal-open" : "modal"
        } modal-middle backdrop-brightness-50 backdrop-blur-sm`}
      >
        {/* Modal Content */}
        <div className="modal-box max-w-96 text-secondary-content">
          <div className="text-center">
            <h2 className="text-lg font-bold mb-4 text-red-500">Delete Note</h2>
            <p>Are you sure want to delete this note?</p>
          </div>
          {/* Modal Action */}
          <div className="modal-action flex w-full justify-center gap-x-4">
            <button
              onClick={handleDelete}
              className={`${
                loading ? "btn-disabled" : ""
              }btn btn-error btn-sm w-20 h-10 rounded-full capitalize hover:bg-red-400`}
            >
              {loading ? "..." : "Delete"}
            </button>
            <button
              onClick={handleDeleteModal}
              className="btn btn-secondary btn-sm w-20 h-10 rounded-full capitalize"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteNote;
