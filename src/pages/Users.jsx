import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, fetchUsers} from "../features/userSlice";
import {Link} from "react-router-dom";

function Users(props) {

    const dispatch = useDispatch();
    const {users, isLoading, isSuccess } = useSelector( state => state.user );

    useEffect( () => {
        dispatch(fetchUsers())
    }, [] )

    const deleteUserData = (id) => {
        dispatch(deleteUser(id));

        dispatch(fetchUsers())
    }


    if( isLoading ) {
        return (
            <h2>...loading</h2>
        )
    }

    return (
        <div className={'container mx-auto'}>
            <div className={'flex justify-center'}>
                <div className={'w-2/3'}>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                isSuccess && users.length > 0 && users.map( user => {
                                    return (
                                        <tr key={user.id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                            <th scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {user.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {user.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link to={`/users/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                <button onClick={() => deleteUserData(user.id)}
                                                   className="font-medium text-red-600 dark:text-blue-500 ml-3">Delete</button>
                                            </td>
                                        </tr>
                                    )
                                } )
                            }
                            {
                                isSuccess && users.length === 0 && (
                                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                        <td colSpan={4} className="px-6 py-4 text-center">
                                            No User found
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Users;