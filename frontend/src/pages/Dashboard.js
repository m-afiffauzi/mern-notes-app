import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import NoteCard from "../components/NoteCard";
import AddNote from "../components/AddNote";
import { useNoteStore } from "../store/noteStore";
import NoteSkeleton from "../components/NoteSkeleton";

const Dashboard = () => {
  const [query, setQuery] = useState("");
  const mutate = useNoteStore((state) => state.mutate);
  const notes = useNoteStore((state) => state.notes);
  const setNotes = useNoteStore((state) => state.setNotes);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("/api/notes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setNotes(json);
      }
    };

    if (user) {
      fetchNotes();
    }
  }, [mutate, setNotes, user]);

  let filterNotes = notes?.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.body.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="flex flex-col justify-center items-center">
      {/* Note Top Wrapper */}
      <div className="w-full flex items-center justify-center gap-2 xs:gap-8 sm:gap-36 md:gap-48 lg:gap-[450px] xl:gap-[680px] 2xl:gap-[900px] h-10">
        {/* Search Form */}
        <div className="form-control w-[200px] xs:w-[100] md:w-full md:max-w-xs relative">
          <input
            type="text"
            name="search"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input input-sm h-10 input-bordered w-full max-w-xs rounded-full shadow-md"
          />
          {query !== "" ? (
            <button
              id="delete-search"
              aria-label="delete-search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-[3px] h-8 flex justify-center items-center transition-all duration-300 rounded-2xl text-xl text-neutral-content hover:text-red-500 cursor-pointer"
            >
              &#10005;
            </button>
          ) : (
            <span className="absolute right-3 top-1 h-8 flex justify-center items-center transition-all duration-300 rounded-2xl text-3xl text-neutral-content rotate-45">
              &#9906;
            </span>
          )}
        </div>
        {/* Add Note Modal */}
        <AddNote />
      </div>

      {/* Notes Container */}
      {/* Loading */}
      {!notes ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 my-3 sm:my-5 px-4 sm:px-16 lg:px-24">
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
          <NoteSkeleton />
        </div>
      ) : null}

      {/* No Matching Notes */}
      {filterNotes?.length === 0 ? (
        <div className="w-full px-4 sm:px-16 lg:px-24">
          <div className="py-2 mt-4 bg-base-100 shadow-md rounded-full">
            <p className="text-center text-lg font-bold">No Notes Found</p>
          </div>
        </div>
      ) : null}

      {/* Notes */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 my-3 sm:my-5 px-4 sm:px-16 lg:px-24">
        {filterNotes?.length !== 0
          ? filterNotes?.map((note) => (
              <div key={note._id}>
                <NoteCard note={note} />
              </div>
            ))
          : null}
      </div>
    </section>
  );
};

export default Dashboard;
