import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const Navbar = () => {
    const { user,logOut } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log(user);

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
                <h1>{user?.email}</h1>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    
                        <div className="w-10 rounded-full">
                            <img alt="profile" src={user?.photoURL} />
                            
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3   shadow w-52">
                        <li className="bg-[#0B57D0]"><a>{user?.email ? (<button className=" text-white w-full" onClick={handleLogOut}>Logout</button>) : (<Link to='/login' className="btn text-black">Login</Link>)}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;