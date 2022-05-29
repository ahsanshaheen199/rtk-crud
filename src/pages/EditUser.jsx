import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserByID, updateUser} from "../features/userSlice";
import {useNavigate, useParams} from "react-router-dom";

function EditUser(props) {

    const dispatch = useDispatch();

    const { id } = useParams();

    const navigate =  useNavigate();

    const { users, isSuccess, isLoading } = useSelector( state => state.user );

    const [ userData, setUserData ] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const changeUserData = ( event ) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
    }

    const updateUserData = ( event ) => {
        event.preventDefault();

        dispatch(updateUser({...userData,id}))

        navigate('/users');
    }

    useEffect( () => {
        dispatch(fetchUserByID(id))
        if( id && isSuccess ) {
            const userFound = users.find( user => user.id == id )
            if( userFound ) {
                setUserData({...userFound})
            }
        }

    } ,[id, isSuccess] )

    if( isLoading ) {
        return (
            <h2>...loading</h2>
        )
    }

    return (
        <div className={'container mx-auto'}>
            <div className={'flex justify-center'}>
                <div className={'w-1/2'}>
                    <form className={'mt-20'} onSubmit={updateUserData}>
                        <div className="mb-6">
                            <label htmlFor="name"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name={"name"}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="john doe"
                                value={userData.name}
                                onChange={changeUserData}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                                address</label>
                            <input
                                type="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="john.doe@company.com"
                                value={userData.email}
                                onChange={changeUserData}
                                name={"email"}
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="1234567"
                                value={userData.phone}
                                onChange={changeUserData}
                                name={"phone"}
                            />
                        </div>
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;