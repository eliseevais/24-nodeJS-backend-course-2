import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-db-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsService} from "../domain/products-service";
import {ProductType} from "../repositories/db";

export const productsRouter = Router({});

let titleValidationChain = body('title').trim().isLength({
  min: 3,
  max: 10
}).withMessage('title length should be from 3 to 10 symbols');

productsRouter.post('/',
  titleValidationChain,
  inputValidationMiddleware,
  async (req: Request, res: Response) => {
    const newProduct = await productsService.createProduct(req.body.title);
    res.status(201).send(newProduct)
  });

productsRouter.put('/:id',
  titleValidationChain,
  inputValidationMiddleware,
   async (req: Request, res: Response) => {
     const isUpdated = await productsService.updateProduct(+req.params.id, req.body.title);
     if (isUpdated) {
       const product = await productsService.findProductsById(+req.params.id);
       res.send(product)
     } else {
       res.send(404)
     }
   });

productsRouter.get('/',  async (req: Request, res: Response) => {
  // const foundProducts = productsInMemoryRepository.findProducts(req.query.title?.toString())
  const foundProducts: ProductType[] = await productsService.findProducts(
    req.query.title
      ? String(req?.query?.title ?? '')
      : null
  )

  res.send(foundProducts)
});

productsRouter.get('/:id',   async (req: Request, res: Response) => {
  let product = await productsService.findProductsById(+req.params.id);
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
});

productsRouter.delete('/:id',   async (req: Request, res: Response) => {
  const isDeleted = await productsService.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204)
  } else {
    res.send(404)
  }
});