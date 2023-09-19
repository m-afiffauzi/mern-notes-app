import CardContent from "./CardContent";
import EditNote from "./EditNote";

const NoteCard = ({ note }) => {
  return (
    <>
      {/* View Modal */}
      <EditNote note={note} content={<CardContent note={note} />} />
    </>
  );
};

export default NoteCard;
