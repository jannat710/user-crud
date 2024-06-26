import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";


const SignUp = () => {
    const { createUser,updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const axiosOpen = useAxios();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const url = form.url.value;
        const email = form.email.value;
        const password = form.password.value;
    
        try {
        
            const result = await createUser(email, password);
            const loggedUser = result.user;
    
      
            await updateUserProfile(name, url);
    
          
            const userInfo = {
                name: name,
                email: email,
                photo: url
            };
            const res = await axiosOpen.post('/users', userInfo);
            if (res.data.insertedId) {
          
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
    
               
                navigate('/');
            }
        } catch (error) {
            console.log(error);
       
        }
    };
    return (
        <div>
        <div className="hero min-h-screen">
            <div className="flex-col max-w-2xl md:flex-row-reverse">
                <div className="">
                    <div className="w-96 px-8">
                        <h1 className=" text-4xl font-bold">Sign up Now!
                        </h1>
                    </div>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Name</span>
                            </label>
                            <input type="name" name='name' placeholder="Enter your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Photo URL</span>
                            </label>
                            <input type="url" name='url' placeholder="Photo URL" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Enter your password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn rounded-3xl bg-[#0B57D0] text-white" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className='text-center pb-5'><small className="text-sm text-[#6e6d7a]">Already have an account? Please <Link className="underline font-bold" to="/login">Login</Link> </small></p>

                </div>
            </div>

        </div>

    </div>
    );
};

export default SignUp;