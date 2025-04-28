import { create } from "zustand";
import { axiosInstance } from "../lib/Axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  isUpdatingProfile: false,
  selectedImage: null,

  setSelectedImage: (file) => set({ selectedImage: file }),


  checkAuth: async () => {
    const token = localStorage.getItem("token")
    if(token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
            const res = await axiosInstance.get('/profile')
            set({ authUser: res.data})
        } catch (error) {
            console.error("Error ketika cek auth", error)
            set({ authUser: null})
        } finally {
            set({ isCheckingAuth: false})
        }
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true})
    try {
        const res = await axiosInstance.post("/registration", data)
        set({ authUser: res.data})
        toast.success(res.data.message);
    } catch (error) {
      console.error(error); // Log the error
      toast.error(error.response?.data?.message || "Terjadi kesalahan");
    } finally {
        set({ isSigningUp: false})
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
        const res = await axiosInstance.post("/login", data)

        const token = res.data.data.token
        console.log("ini tokennya", token)  
        localStorage.setItem("token", token)

        set({ authUser: res.data})
        toast.success(res.data.message);
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        set({ isLoggingIn: false})
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ authUser: null})
    delete axiosInstance.defaults.headers.common["Authorization"]
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/profile/update", data);
      set({ authUser: res.data });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  updateIMGProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/profile/image", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
      set({ authUser: res.data });
      console.log("Profile image successfully");
    } catch (error) {
      console.error("Gagal memperbarui foto profil:", error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

}));
