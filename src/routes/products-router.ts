import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
  // const foundProducts = productsRepository.findProducts(req.query.title?.toString())
  const foundProducts = productsRepository.findProducts(
    req.query.title
      ? String(req?.query?.title ?? '')
      : null
  )
  res.send(foundProducts)
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  let product = productsRepository.findProductsById(+req.params.id);
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
});

productsRouter.post('/', (req: Request, res: Response) => {
  const newProduct = productsRepository.createProduct(req.body.title);
  res.status(201).send(newProduct)
});

productsRouter.put('/:id', (req: Request, res: Response) => {
  const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title);
  if (isUpdated) {
    const product = productsRepository.findProductsById(+req.params.id);
    res.send(product)
  } else {
    res.send(404)
  }
});

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
});