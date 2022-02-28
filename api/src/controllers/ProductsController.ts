import { Request, Response } from 'express';
import { Product, ProductInterface } from "../database/models/product.model";
import { UpdateOptions, DestroyOptions } from "sequelize";

class ProductsController {

    async hello(req: Request, res: Response) {
        res.status(200).send("RN Challenge 20200807 Running");
    }

    async update(req: Request, res: Response) {
        const ProductId: number = Number(req.params.productId);
        const params: ProductInterface = req.body;

        const options: UpdateOptions = {
            where: { id: ProductId },
            limit: 1,
        };

        Product.update(params, options)
            .then(() => res.status(202).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

    async delete(req: Request, res: Response) {
        const ProductId: number = Number(req.params.productId);
        const options: DestroyOptions = {
            where: { id: ProductId },
            limit: 1,
        };

        Product.destroy(options)
            .then(() => res.status(204).json({ data: "success" }))
            .catch((err: Error) => res.status(500).json(err));
    }

    async show(req: Request, res: Response) {
        const ProductId: number = Number(req.params.productId);

        Product.findByPk<Product>(ProductId)
            .then((Product: Product | null) => {
                if (Product) {
                    res.json(Product);
                } else {
                    res.status(404).json({ errors: ["Product not found"] });
                }
            })
            .catch((err: Error) => res.status(500).json(err));
    }

    async index(req: Request, res: Response) {
        Product.findAll<Product>({})
            .then((Products: Array<Product>) => res.json(Products))
            .catch((err: Error) => res.status(500).json(err));
    }
}

export default ProductsController;