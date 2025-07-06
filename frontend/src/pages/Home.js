import React ,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home(){
    const [loggedInUser,setLoggedInUser] = useState('');
    const [products,setProducts] =useState('');
    const navigate=useNavigate();
    useEffect (() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])
    const handleLogout=(e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Loggedout');
        setTimeout(() => {
            navigate('/login');
        },1000)
    }
    const fetchProducts = async () => {
  try {
    const url = "http://127.0.0.1:8080/products";
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      mode: 'cors',            // ensures CORS is handled properly
      credentials: 'include'   // optional, useful if your server uses cookies
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    setProducts(result);
    } 
    catch (err) {
        handleError(err);
    }};
    useEffect(() => {
        fetchProducts()
    },[])
    return (
        <div>
            <h1>Welcome {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <div>
                {
                    products && products?.map((item, index) => (
                    <ul key={index}>
                        <span>{item.name} : {item.price}</span>
                    </ul>
                ))
            }
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Home;