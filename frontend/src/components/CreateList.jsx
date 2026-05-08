import { useState } from "react";
import api from "../services/api";

function CreateList({ fetchLists }) {

  const [title, setTitle] = useState("");

  const createList = async () => {

    try {

      if (!title) return;

      await api.post("/lists", {
        title
      });

      setTitle("");

      fetchLists();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white p-5 rounded-xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Create Todo List
      </h2>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Enter list title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="flex-1 border p-3 rounded-lg"
        />

        <button
          onClick={createList}
          className="bg-black text-white px-5 rounded-lg"
        >
          Add
        </button>

      </div>

    </div>

  );

}

export default CreateList;