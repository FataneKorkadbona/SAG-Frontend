import axios from "axios";

export const getAdminId = async (email: string): Promise<string | null> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/get-admin-id`, { email });
        return response.data.userId;
    } catch (error) {
        console.error("Error retrieving admin ID:", error);
        return null;
    }
};