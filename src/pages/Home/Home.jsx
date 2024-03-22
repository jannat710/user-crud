import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Navbar from "../Navbar/Navbar";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Home = () => {
    const axiosOpen = useAxios();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosOpen.get('/users');
            return res.data;
        }
    })
    //Admin
    const handleMakeAdmin = user => {
        axiosOpen.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    //delete user
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosOpen.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className=" my-4 w-10/12 mx-auto">
                    <div>
                        <h2 className="text-2xl py-5 text-center">Total Users: {users.length}</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead className="bg-[#0B57D0] text-white">
                                <tr>
                                    <th>SN.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? (
                                                <button className="btn btn-sm bg-[#0B57D0] w-32 text-white font-semibold">Admin</button>
                                            ) : (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className="btn btn-sm w-32 border border-[#0B57D0] text-[#0B57D0] font-semibold"
                                                >
                                                    Make Admin
                                                </button>
                                            )}
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteUser(user)}
                                                className="btn btn-ghost btn-sm">
                                                <FaTrashAlt className="text-[#0B57D0] text-xl"></FaTrashAlt>
                                            </button>
                                        </td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;