import Google from '../../assets/google.png'

const Login = () => {
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="flex-col max-w-2xl md:flex-row-reverse">
                    <div className="w-96 px-8">
                        <h1 className="py-8 text-4xl font-bold">Login now!</h1>
                        <div className="form-control">
                            <button className="btn rounded-3xl  border-2 border-[#0B57D0]">
                                <img className="h-8" src={Google} alt="" />
                                Sign in with Google
                            </button>
                            <p className="text-center text-sm pt-5 divider text-[#6e6d7a]">or sign in with email</p>
                        </div>
                    </div>
                    <div className="">
                        <form onSubmit={handleLogin} className="card-body">
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
                                <input className="btn rounded-3xl bg-[#0B57D0] text-white" type="submit" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;