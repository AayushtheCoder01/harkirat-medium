import axios from 'axios'
import { SignupInput } from 'medium-common-app'
import { ChangeEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Auth = ({type}: {type: "signup" |  "signin"}) => {
    const [postInput, setPostInput] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })

    const navigate = useNavigate()
    
    async function sendRequest() {
        try {
            const backend_url = import.meta.env.VITE_BACKEND_URL
            const response = await axios.post(`${backend_url}/api/v1/user/${type}`, {
                    name: postInput.name,
                    username: postInput.username,
                    password: postInput.password
            })
            const jwt = response.data.jwt
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (error) {
            alert(`error while ${type}`)
            console.log(error)
        }
        
    }
  return (
    <>
    <div className='h-screen flex justify-center flex-col'>

        <div className='flex justify-center'>

            <div className=''>
                <div className='text-3xl font-extrabold'>
                    <h2>Create an account</h2>
                </div>

                <div className='font-light text-slate-400'>
                    <p > {type === "signin"? "Don't have an account?" : "Already have an account?"}
                        <Link className='underline pl-2' to={type === "signup"? "/signin": "/signup"}>{type === "signup"? "signin": "signup"}</Link>
                    </p>
                </div>
            </div>

        </div>

        <div className='flex flex-col items-center w-full mt-5'>
            {type === "signup"? <LabelledInput label="Name" placeHolder='Harkirat Singh' onChange={(e) => {
                setPostInput(c => ({...c, name: e.target.value}))
            }} />: null}

            <LabelledInput label="Email" placeHolder='kirat123@gmail.com' onChange={(e) => {
                setPostInput(c => ({...c, username: e.target.value}))
            }} />

            <LabelledInput label="Password" type="password" placeHolder='kirat123' onChange={(e) => {
                setPostInput(c => ({...c, password: e.target.value}))
            }} />

            <button onClick={sendRequest} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up": "Sign In"}</button>
        </div>
         
    </div>
    </>
    )
}

interface LabelledInputType {
    label: string, 
    placeHolder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({label, placeHolder, type, onChange}: LabelledInputType) {
    return <div>
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">{label}</label>
            <input placeholder={placeHolder} type={type} onChange={onChange} id="large-input" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[20rem] p-2.5"/>
        </div>
    </div>
} 

export default Auth