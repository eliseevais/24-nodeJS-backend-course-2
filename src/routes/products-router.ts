import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

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

let titleValidationChain = body('title').trim().isLength({
  min: 3,
  max: 10
}).withMessage('title length should be from 3 to 10 symbols');
productsRouter.post('/',
  titleValidationChain,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct)
  });

productsRouter.put('/:id',
  titleValidationChain,
  inputValidationMiddleware,
  (req: Request, res: Response) => {
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