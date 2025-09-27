import axiosClient from "../axios";
import { useEffect, useState } from "react";


export default function UsersPage() {
  const [users, setUsers] = useState([]);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axiosClient.get("/fetchdata/allUserdata"); // replace with your API
     
      setUsers(res.data.alluser);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Promote user to admin
  const makeAdmin = async (phone) => {
    console.log(phone);
    try {
      await axiosClient.post(`/admin/makeadmin`,{phone});
      fetchUsers(); // refresh list
    } catch (err) {
      console.log("Error updating user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 mb-30">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">Users</h1>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {users.map((user,ind) => (
          <div key={ind} className="shadow-lg bg-base-200">
           
              <h2 className="card-title">{user.name}</h2>
              <p>
                <span className="font-semibold">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-semibold">Role:</span>{" "}
                <span
                  className={`badge ${
                    user.role === "admin" ? "badge-success" : "badge-warning"
                  }`}
                >
                  {user.role}
                </span>
              </p>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {user.address || "N/A"}
              </p>
              <div className="mt-4">
                {user.role !== "admin" && (
                  <button
  className="btn btn-sm md:btn-md bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-600 hover:to-blue-600 transition-all  duration-300"
  onClick={() => makeAdmin(user.phone)}
>
  Make Admin
</button>
                )}
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}


