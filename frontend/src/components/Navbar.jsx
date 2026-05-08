import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = async () => {

    try {

      await api.post("/auth/logout");

      localStorage.removeItem("user");

      navigate("/");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-white shadow p-4">

      <div className="max-w-5xl mx-auto flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Todo App
        </h1>

        <div className="flex items-center gap-4">

          <p className="font-medium">
            {user?.name}
          </p>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Navbar;