import express from 'express'
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog } from '../controllers/BlogController.js'

const router = express.Router()

router.get('/', getAllBlogs)
router.get('/:id_usuario', getBlog)
router.post('/', createBlog)
router.put('/:id_usuario', updateBlog)
router.delete('/:id_usuario', deleteBlog)

export default router