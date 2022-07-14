const NoteDetails = ({note}) => {
  return (
    <div className="note-details">
        <h4>{note.title}</h4>
        <p><strong>Description:</strong></p>
        <h5>{note.body}</h5>
        <p>{note.createdAt}</p>
    </div>
  );
};

export default NoteDetails 
