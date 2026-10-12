import type { Product } from "./model.ts"

export class ProductsService {
    products: Product[] = [
        {
            id: 1,
            name: "Laptop",
            price: 30000
        },
        {
            id: 2,
            name: "Mouse",
            price: 500
        }
    ]

    getAllProducts(): Product[] {
        return this.products
    }

    createProduct(product: Product) {
        const newProduct = {...product, id: this.products.length + 1}
        this.products.push(newProduct);

        return newProduct;
    }

    getProductById(id: number): Product | undefined {
        const product = this.products.find((product) => product.id === id);

        return product
    }

    updateProduct(id: number, productData: Product): Product | undefined {
        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            const updatedProduct = {...productData, id}
            this.products[productIndex] = updatedProduct;
            return updatedProduct
        }

        return undefined
    }

    deleteProduct(id:number): boolean {
        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1)
            return true
        }

        return false
    }
}