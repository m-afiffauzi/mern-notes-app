import { useNotesContext } from "../hooks/useNotesContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const NoteDetails = ({ note }) => {
  const { dispatch } = useNotesContext();

  const handleDelete = async () => {
    const response = await fetch("/api/notes/" + note._id, {
      method: "DELETE"
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTE", payload: json });
    }
  };

  return (
    <div className="note-details">
      <h4>{note.title}</h4>
      <h2><strong>{note.body}</strong></h2>
      <p>{formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined">edit</span>
      <span className="material-symbols-outlined" onClick={handleDelete}>delete</span>
    </div>
  );
};

export default NoteDetails 
