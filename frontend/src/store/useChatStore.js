import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";
import axios from "axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  inUsersLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({
      isUserLoading: true,
    });

    try {
      const response = await axiosInstance.get("/messages/users");
      set({
        users: response.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },

  getMessages: async (userId) => {
    set({
      isMessageLoading: true,
    });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({
        messages: response.data,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({
        isMessageLoading: false,
      });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (newMessage) => {
      const isMEssageSendFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMEssageSendFromSelectedUser) {
        return;
      }
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
    }),
}));

export default useChatStore;
