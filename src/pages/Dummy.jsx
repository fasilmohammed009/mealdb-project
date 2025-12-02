import { useCallback, useEffect, useState } from "react";


export default function Dummy (){
 
const [name , setName] = useState ([]);
const [loading, setLoading]= useState (true);
const [error, setError ] = useState ("");

const fetchUserName = useCallback (async () => {
    try{
        setLoading (true);
        setError ("");
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        console.log(response);
        if(!response.ok){
            throw new Error ("Failed to fetch user data");
        }
        const data = await response.json ();
        setName (data);
        console.log(data);
    } catch (err){
        setError (err.message || "something went wrong");
    } finally {
        setLoading (false)
    }   
},[]);

    useEffect (() => {
        fetchUserName ();
    },[fetchUserName]);

    if (loading) return <h1 className="text-center ">Loading...</h1>
    if(error)
        return (
    <div className="text-center">
        <h1>{error}</h1>
        <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded" onClick={fetchUserName}>
            Retry
        </button>
    </div>
    );

    return (
     <div className="grid grid-cols-1 gap-4 p-5">
        {name.map ((user) => (
            <div key={user.id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition">
                <h1 className="text-xl font-semibold">{user.name}</h1>
                <p className="text-gray-500">@{user.username}</p>
                <a href={`https://${user.website}`} target="_blank" className="text-blue-600 underline">
                {user.website}
                </a>
            </div>
        ))}
     </div>
    )
}