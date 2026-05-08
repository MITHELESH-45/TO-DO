import api from "../services/api";
import TodoItems from "./TodoItems";

function TodoListCard({
  list,
  fetchLists
}) {

  const deleteList = async () => {

    try {

      await api.delete(
        `/lists/${list._id}`
      );

      fetchLists();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white p-5 rounded-xl shadow">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-2xl font-bold">
          {list.title}
        </h2>

        <button
          onClick={deleteList}
          className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
          Delete
        </button>

      </div>

      <TodoItems listId={list._id} />

    </div>

  );

}

export default TodoListCard;