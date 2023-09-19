import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import EditNote from "./EditNote";

const NoteCard = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* View Modal */}
      <EditNote note={note} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Card */}
      <div
        onClick={handleModal}
        className="card w-64 xs:w-80 sm:w-[450px] md:w-72 lg:w-96 xl:w-80 h-32 lg:h-60 bg-base-100 shadow-md hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition duration-300"
      >
        {/* Card Container */}
        <div className="card-body flex flex-col justify-between p-4 lg:p-8">
          {/* Card Title */}
          <h2 className="card-title text-lg lg:text-2xl text-primary">
            {note.title}
          </h2>
          {/* Card Body */}
          <div className="h-10 lg:h-20 text-sm lg:text-lg overflow-hidden">
            <p>{note.body}</p>
          </div>
          {/* Card Date */}
          <div className="card-actions justify-end">
            <p className="text-sm text-end text-primary-focus">
              {formatDistanceToNow(new Date(note?.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteCard;
