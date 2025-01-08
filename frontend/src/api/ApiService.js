import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
    (response) => response.data
);

export const ApiService = {
    getParents: () => apiClient.get('/parent/getall'),
    getParentsDropdown: () => apiClient.get('/parent/dropdown'),
    getParent: (id) => apiClient.get(`/parent/getbyid/${id}`),
    insertParent: (data) => apiClient.post('/parent/create', data),
    updateParent: (data) => apiClient.post('/parent/update', data),
    deleteParent: (id) => apiClient.delete(`/parent/delete?id=${id}`),

    getStudents: () => apiClient.get('/student/getall'),
    getStudent: (id) => apiClient.get(`/student/getbyid/${id}`),
    insertStudent: (data) => apiClient.post('/student/create', data),
    updateStudent: (data) => apiClient.post('/student/update', data),
    deleteStudent: (id) => apiClient.delete(`/student/delete?id=${id}`),
};
