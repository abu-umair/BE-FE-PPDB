import api from './auth-header';

export const fetchData = async (endpoint, token) => {
  try {
    const response = await api.get(endpoint, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postData = async (endpoint, data, token) => {
  try {
    const response = await api.post(endpoint, data, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (endpoint, data, token) => {
  try {
    const response = await api.put(endpoint, data, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (endpoint, token) => {
  try {
    const response = await api.delete(endpoint, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
