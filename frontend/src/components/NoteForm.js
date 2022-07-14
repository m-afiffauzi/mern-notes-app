import { useState } from "react";
import { useNotesContext } from "../hooks/useNotesContext";

const NoteForm = () => {
    const { dispatch } = useNotesContext()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
 
        const note = { title, body }

        const response = await fetch(`/api/notes`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: { 
                "Content-Type": "application/json" 
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle("")
            setBody("")
            setError(null)
            console.log("Note added", json)
            dispatch({ type: "CREATE_NOTE", payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Note</h3>

            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            
            <label>Description:</label>
            <input
                type="text"
                onChange={(e) => setBody(e.target.value)}
                value={body}
            />
            
            <button>Add Note</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default NoteForm;