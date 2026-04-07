import axios from 'axios';

const UPLOAD_URL = 'http://localhost:5000/api/upload';

const authHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(UPLOAD_URL, formData, {
    headers: {
      ...authHeader(),
    },
  });

  return response.data;
};

const uploadService = { uploadFile };
export default uploadService;