const Producto = require('../models/producto');
const Joi = require('joi');

// Validación de datos
const schema = Joi.object({
    nombre: Joi.string().required(),
    precio: Joi.number().greater(0).required(),
    cantidad: Joi.number().integer().min(0).required(),
});

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (err) {
        res.status(500).send('Error al crear el producto');
    }
};

// Leer todos los productos
exports.getProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (err) {
        res.status(500).send('Error al obtener productos');
    }
};

// Leer un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).send('Producto no encontrado');
        res.json(producto);
    } catch (err) {
        res.status(500).send('Error al obtener el producto');
    }
};

// Actualizar un producto por ID
exports.updateProducto = async (req, res) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) return res.status(404).send('Producto no encontrado');
        res.json(producto);
    } catch (err) {
        res.status(500).send('Error al actualizar el producto');
    }
};

// Eliminar un producto por ID
exports.deleteProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) return res.status(404).send('Producto no encontrado');
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Error al eliminar el producto');
    }
};
