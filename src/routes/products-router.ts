import {Request, Response, Router} from "express";

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}, {id: 3, title: 'cucumber'}];

export const productsRouter = Router({});

productsRouter.get('/', (req: Request, res: Response) => {
  if (typeof req.query.title === 'string') {
    let searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(searchString) > -1))
  } else {
    res.send(products)
  }
});
productsRouter.get('/:id', (req: Request, res: Response) => {
  let product = products.find(p => p.id === +req.params.id)
  if (product) {
    res.send(product)
  } else {
    res.send(404)
  }
});
productsRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.send(204)
      return;
    }
  }
  res.send(404)
});
productsRouter.post('/', (req: Request, res: Response) => {
  const newProduct = {
    id: +new Date().getTime().toString(),
    title: req.body.title
  }
  products.push(newProduct);
  res.status(201).send(newProduct)
});
productsRouter.put('/:id', (req: Request, res: Response) => {
  let product = products.find(p => p.id === +req.params.id)
  if (product) {
    product.title = req.body.title
    res.send(product)
  } else {
    res.send(404)
  }
});