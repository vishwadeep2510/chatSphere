import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const {authUser} = useSelector(store=>store.user);
    useEffect(() => {
        if(!authUser)return;
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`${BASE_URL}/api/v1/user`);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log("failed to fetch users", error);
            }
        }
        fetchOtherUsers();
    }, [authUser, dispatch])

}

export default useGetOtherUsers;