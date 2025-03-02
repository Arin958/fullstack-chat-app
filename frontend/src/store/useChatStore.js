import { create } from "zustand";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axios";

import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false, // Ensure consistency in naming
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
      toast.error(error.response?.data?.message || "Error fetching users");
    } finally {
      set({
        isUserLoading: false,
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
      toast.error(error.response?.data?.message || "Error fetching messages");
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
      toast.error(error.response?.data?.message || "Error sending message");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.error("Socket not initialized!");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      const isMessageSendFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSendFromSelectedUser) {
        return;
      }
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    } else {
      console.error("Socket not initialized!");
    }
  },

  setSelectedUser: (selectedUser) =>
    set({
      selectedUser,
    }),
}));

export default useChatStore;



