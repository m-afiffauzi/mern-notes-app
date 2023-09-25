import { memo } from "react";
import MemoContent from "./CardContent";
import MemoEdit from "./EditNote";

const NoteCard = ({ nTitle, nBody, nId, nCreated, nUpdated }) => {
  return (
    <>
      {/* View Modal */}
      <MemoEdit
        nTitle={nTitle}
        nBody={nBody}
        nId={nId}
        nCreated={nCreated}
        nUpdated={nUpdated}
        content={
          <MemoContent title={nTitle} body={nBody} createdAt={nCreated} />
        }
      />
    </>
  );
};

const MemoNote = memo(NoteCard);

export default MemoNote;
