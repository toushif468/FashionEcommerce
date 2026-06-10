// import { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {

//   const [currentState, setCurrentState] = useState('Login');

//   const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [email, setEmail] = useState<string>('');

//   const onSubmitHandler = async (event: React.SyntheticEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       if (currentState === 'Sign Up') {
//         const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });

//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token', response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       } else {
//         const response = await axios.post(backendUrl + '/api/user/login', { email, password });

//         if (response.data.success) {
//           setToken(response.data.token)
//           localStorage.setItem('token', response.data.token)
//         } else {
//           toast.error(response.data.message)
//         }
//       }
//     } catch (error) {
//       console.log(error)
//       if (error instanceof Error) {
//         toast.error(error.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/');
//     }
//   }, [token])


//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>{currentState}</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>
//       {
//         currentState === 'Sign Up' && (
//           <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />
//         )
//       }

//       <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
//       <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

//       <div className='w-full flex justify-between text-sm mt-[-8px]'>
//         <p className='cursor-pointer'>Forgot your password?</p>
//         {
//           currentState === 'Login' ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
//         }
//       </div>

//       <button className='bg-black text-white font-light px-8 py-2'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
//     </form>
//   )
// }

// export default Login


import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react'; // Suggested for the password toggle
import { FaGoogle } from 'react-icons/fa';
import { assets } from '@/assets/assets';


const Login = () => {
  const [currentState, setCurrentState] = useState<'Login' | 'Sign Up'>('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);


  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const onSubmitHandler = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const endpoint = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login';
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password };


      const response = await axios.post(backendUrl + endpoint, payload);


      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };


  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);


  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Side: Form Container */}
      <div className="flex flex-col w-full lg:w-1/2 p-8 md:p-16 lg:p-24 justify-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2 mb-12">
          <img src={assets.logo} className='w-36' alt="" />
        </div>


        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold mb-2">{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</h1>
          <p className="text-gray-500 mb-8">Please fill your detail to access your account.</p>


          <form onSubmit={onSubmitHandler} className="space-y-6">
            {currentState === 'Sign Up' && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Name *</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gray-900"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
            )}


            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Email *</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gray-900"
                placeholder="Enter Email Address"
                required
              />
            </div>


            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold">Password *</label>
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-none focus:outline-none focus:border-gray-900"
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>


            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="accent-[#3D2616]" />
                <label htmlFor="remember" className="cursor-pointer font-medium">Remember me</label>
              </div>
              <p className="cursor-pointer text-gray-800 font-bold underline underline-offset-4">Forgot Password?</p>
            </div>


            <button className="w-full bg-[#3D2616] text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors">
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>


          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
            <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">or {currentState} with</span></div>
          </div>


          <button className="w-full border border-gray-200 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
            <FaGoogle />
            <span className="font-medium">Sign In With Google</span>
          </button>


          <p className="mt-8 text-center text-gray-600">
            {currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}{' '}
            <span
              onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className="text-[#3D2616] font-bold underline cursor-pointer"
            >
              {currentState === 'Login' ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </div>
      </div>


      {/* Right Side: Image with Testimonial */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920"
          alt="Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Testimonial Overlay */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[85%] bg-white/20 backdrop-blur-md p-8 text-white border border-white/30">
          <p className="text-sm italic leading-relaxed mb-4">
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto."
          </p>
          <div className="border-t border-white/30 pt-4">
            <p className="font-bold">Leslie Alexander</p>
            <p className="text-xs opacity-80">Fashion Enthusiast</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;



