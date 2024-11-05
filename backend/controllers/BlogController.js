import BlogModel from "../models/BlogModel.js";

//metodos para traer todo
export const getAllBlogs = async (req,resp) => {
    try{
        const blogs = BlogModel.findAll()
        resp.json(Usuario)
    }catch(error){
        resp.json({message: error.message})
    }
}
//metodo para traer uno
export const getBlog = async (req,resp) => {
    try{
        const blogs = BlogModel.findAll({
            where:{id_usuario:req.params.id_usuario}
        })
        resp.json(Usuario)
    }catch(error){
        resp.json({message: error.message})
    }
}

//metodo para crear
export const createBlog = async (req,resp) => {
    try{
        await BlogModel.create(req.body)
        resp.json({
            "message":"Registro logrado exitosamente"
        })
    }catch(error){
        resp.json({message: error.message})
    }
}

//metodo para actualizar
export const updateBlog = async (req,resp) => {
    try{
        await BlogModel.update(req.body, {
            where:{id_usuario: req.params.id_usuario}
        })
        resp.json({
            "message":"Registro actualizazo exitosamente"
        })
    }catch(error){
        resp.json({message: error.message})
    }
}

//eliminar para actualizar
export const deleteBlog = async (req,resp) => {
    try{
        await BlogModel.destroy(req.body, {
            where:{id_usuario: req.params.id_usuario}
        })
        resp.json({
            "message":"Registro actualizazo exitosamente"
        })
    }catch(error){
        resp.json({message: error.message})
    }
}