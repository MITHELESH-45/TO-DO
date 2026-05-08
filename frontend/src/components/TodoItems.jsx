import { useEffect, useState } from "react";
import api from "../services/api";

function TodoItems({ listId }) {

  const [items, setItems] = useState([]);

  const [text, setText] = useState("");

  const fetchItems = async () => {

    try {

      const res = await api.get(
        `/items/${listId}`
      );

      setItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchItems();

  }, []);

  const createItem = async () => {

    try {

      if (!text) return;

      await api.post("/items", {
        text,
        todoList: listId
      });

      setText("");

      fetchItems();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteItem = async (id) => {

    try {

      await api.delete(`/items/${id}`);

      fetchItems();

    } catch (error) {

      console.log(error);

    }

  };

  const toggleComplete = async (id) => {

    try {

      await api.patch(
        `/items/toggle/${id}`
      );

      fetchItems();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <div className="flex gap-2 mb-4">

        <input
          type="text"
          placeholder="Add todo item"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="flex-1 border p-2 rounded-lg"
        />

        <button
          onClick={createItem}
          className="bg-black text-white px-4 rounded-lg"
        >
          Add
        </button>

      </div>

      <div className="space-y-2">

        {
          items.map((item) => (

            <div
              key={item._id}
              className="flex justify-between items-center border p-3 rounded-lg"
            >

              <div className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() =>
                    toggleComplete(item._id)
                  }
                />

                <p
                  className={
                    item.completed
                      ? "line-through text-gray-500"
                      : ""
                  }
                >
                  {item.text}
                </p>

              </div>

              <button
                onClick={() =>
                  deleteItem(item._id)
                }
                className="bg-red-500 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default TodoItems;