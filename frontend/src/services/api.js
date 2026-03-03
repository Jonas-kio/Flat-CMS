import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

export const getPosts = () => API.get('/posts')
export const getPostsAdmin = () => API.get('/posts/admin')
export const getPost = (slug) => API.get(`/posts/${slug}`)
export const createPost = (data) => API.post('/posts', data)
export const updatePost = (slug, data) => API.put(`/posts/${slug}`, data)
export const deletePost = (slug) => API.delete(`/posts/${slug}`)

export const uploadImage = (file) => {
  const form = new FormData()
  form.append('image', file)
  return API.post('/media/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
export const getMedia = () => API.get('/media')
export const deleteMedia = (filename) => API.delete(`/media/${filename}`)

export const getSettings = () => API.get('/settings')
export const updateSettings = (data) => API.put('/settings', data)
