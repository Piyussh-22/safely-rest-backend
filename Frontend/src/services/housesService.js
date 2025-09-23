import api, { setAuthToken } from "./api";

// Public endpoints
export const getHouses = async () => {
  try {
    const res = await api.get("/store/houses");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to fetch houses");
  }
};

export const getHouseDetails = async (houseId) => {
  try {
    const res = await api.get(`/store/houses/${houseId}`);
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch house details"
    );
  }
};

// Host-only endpoints
export const getHostHouses = async (token) => {
  try {
    setAuthToken(token);
    const res = await api.get("/host/houses");
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to fetch host houses"
    );
  }
};

export const addHouse = async (formData, token) => {
  try {
    setAuthToken(token);
    const res = await api.post("/host/houses", formData); // FormData handled automatically
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to add house");
  }
};

export const deleteHouse = async (houseId, token) => {
  try {
    setAuthToken(token);
    const res = await api.delete(`/host/houses/${houseId}`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to delete house");
  }
};
