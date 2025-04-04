import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash, Plus } from "lucide-react";

export function StickyNotes() {
  const [notes, setNotes] = useState<string[]>(() => {
    const savedNotes = localStorage.getItem("stickyNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const addNote = () => {
    setNotes([...notes, "New Note"]);
  };

  const updateNote = (index: number, text: string) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = text;
    setNotes(updatedNotes);
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  useEffect(() => {
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-xl font-bold">Sticky Notes</h2> */}
        <button
          onClick={addNote}
          className="p-2 bg-futuristic-purple text-white rounded-md hover:bg-opacity-80"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative p-3 rounded-lg shadow-lg 
            bg-white text-blue-600 
            dark:bg-gray-800 dark:text-futuristic-purple"
          >
            <textarea
              value={note}
              onChange={(e) => updateNote(index, e.target.value)}
              className="w-full h-24 p-2 bg-transparent resize-none focus:outline-none"
            />
            <button
              onClick={() => deleteNote(index)}
              className="absolute top-2 right-2 text-red-600"
            >
              <Trash size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}