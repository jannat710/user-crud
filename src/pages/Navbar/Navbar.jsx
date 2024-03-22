import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    //console.log(user.displayName);

    //Logout
    const handleLogOut = () => {
        logOut()
            .then(result => {
                const user = result.user;
                console.log(user);


            })
            .catch(error => {
                const user = error.user;
                console.log(user)
                Swal.fire("Success!", "Successfully logout user", "success")
                navigate('/');
            }

            );
    }


    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">User CRUD</a>
            </div>
            <div className="flex-none">
                <div className="navbar-end flex gap-5 justify-center items-center">
                    <img className="rounded-full w-10 h-10" src={user?.photoURL} alt="" />
                    <div>
                        {user?.email ? (<button className="btn bg-[#0B57D0] text-white" onClick={handleLogOut}>Logout</button>) : (<Link to='/login' className="btn bg-[#0B57D0] text-white">Login</Link>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;