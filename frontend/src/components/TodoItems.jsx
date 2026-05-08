import { useEffect, useState } from "react";
import api from "../services/api";

function TodoItems({ listId }) {

  const [items, setItems] = useState([]);

  const [text, setText] = useState("");

  const [tags, setTags] = useState("");

  const [filterTag, setFilterTag] = useState("");

  const fetchItems = async () => {

    try {

      const url = filterTag
        ? `/items/${listId}?tag=${filterTag}`
        : `/items/${listId}`;

      const res = await api.get(url);

      setItems(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchItems();

  }, [filterTag]);

  const createItem = async () => {

    try {

      if (!text) return;

      await api.post("/items", {
        text,
        todoList: listId,
        tags: tags
          .split(",")
          .map(tag => tag.trim())
          .filter(tag => tag !== "")
      });

      setText("");

      setTags("");

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

      <div className="space-y-2 mb-4">

        <input
          type="text"
          placeholder="Add todo item"
          value={text}
          onChange={(e) =>
            setText(e.target.value)
          }
          className="w-full border p-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Tags (urgent,work)"
          value={tags}
          onChange={(e) =>
            setTags(e.target.value)
          }
          className="w-full border p-2 rounded-lg"
        />

        <button
          onClick={createItem}
          className="bg-black text-white px-4 py-2 rounded-lg w-full"
        >
          Add Item
        </button>

      </div>

      <div className="mb-4">

        <select
          value={filterTag}
          onChange={(e) =>
            setFilterTag(e.target.value)
          }
          className="border p-2 rounded-lg w-full"
        >

          <option value="">
            All Tags
          </option>

          <option value="urgent">
            urgent
          </option>

          <option value="work">
            work
          </option>

          <option value="low-priority">
            low-priority
          </option>

        </select>

      </div>

      <div className="space-y-2">

        {
          items.map((item) => (

            <div
              key={item._id}
              className="border p-3 rounded-lg bg-gray-50"
            >

              <div className="flex justify-between items-center">

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
                        : "font-medium"
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

              <div className="flex gap-2 mt-3 flex-wrap">

                {
                  item.tags?.map((tag, index) => (

                    <span
                      key={index}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>

                  ))
                }

              </div>

            </div>

          ))
        }

      </div>

    </div>

  );

}

export default TodoItems;