import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import CreateList from "../components/CreateList";
import TodoListCard from "../components/TodoListCard";

function Dashboard() {

  const [lists,setLists] = useState([]);

  const fetchLists = async () => {

    try {

      const res = await api.get("/lists");

      setLists(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchLists();

  }, []);

  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6">

        <CreateList fetchLists={fetchLists} />

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          {
            lists.map((list) => (

              <TodoListCard
                key={list._id}
                list={list}
                fetchLists={fetchLists}
              />

            ))
          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;