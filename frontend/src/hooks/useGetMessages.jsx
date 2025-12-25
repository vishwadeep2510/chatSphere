import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { REACT_APP_BASE_URL } from "..";

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) {
      dispatch(setMessages([]));
      return;
    }
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_BASE_URL}/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(res.data));
      } catch (error) {
        console.error(error);
        dispatch(setMessages([]));
      }
    };

    fetchMessages();
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
