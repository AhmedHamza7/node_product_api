import express from 'express';
import { ProductsService } from './products.service.ts';

const app = express();

app.use(express.json())

const productsService = new ProductsService()

app.get('/api/products', (req, res) => {
    res.json(productsService.getAllProducts())
})

app.post('/api/products', (req, res) => {
    const product = productsService.createProduct(req.body);
    return res.status(201).json(product);
})

app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "The product id should be a number"
        })
    }

    const product = productsService.getProductById(id)
    if (product) {
        return res.json(product)
    }
    
    return res.status(404).json({
        message: "Product not found"
    });
})

app.put('/api/products/:id', (req, res) => {

    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "The product id should be a number"
        })
    }

    const product = productsService.updateProduct(id, req.body)
    if (product) {
        return res.json(product)
    }

    return res.status(404).json({
        message: "Product not found"
    });
})

app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "The product id should be a number"
        })
    }

    const productDeleted = productsService.deleteProduct(id);

    if (productDeleted) {
        return res.status(204).end()
    }

    return res.status(404).json({
        message: "Product not found"
    });
})


app.listen(3000, ()=> {
    console.log("Server running on http://localhost:3000");
})