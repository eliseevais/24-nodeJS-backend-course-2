import {Request, Response, Router} from "express";

const adresses = [{id: 1, value: 'Mira 12'}, {id: 2, value: 'Tulskaya 7'}, {id: 3, value: 'Lenina 6'}];

export const addressesRouter = Router({});

addressesRouter.get('/', (req: Request, res: Response) => {
  res.send(adresses)
});
addressesRouter.get('/:id', (req: Request, res: Response) => {
  let adress = adresses.find(p => p.id === +req.params.id)
  if (adress) {
    res.send(adress)
  } else {
    res.send(404)
  }
});