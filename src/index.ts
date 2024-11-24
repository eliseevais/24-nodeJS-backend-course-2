// 01 lesson
// import express, {Request, Response} from 'express';
//
// const app = express()
// const port = 3000
//
// app.get('/', (req: Request, res: Response) => {
//   let helloMessage = 'Hello Incubator!';
//   res.send(helloMessage)
// })
//
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });


// 03 express and rest api 1080p
import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-router";

// create express app
const app = express();
const port = process.env.PORT || 5000;


const parserMiddleWare = bodyParser({})
app.use(parserMiddleWare)



// для всего, что касается адресов с продуктами, используй productsRouter
app.use('/products', productsRouter);
// для всего, что касается адресов с адресами, используй addressesRouter
app.use('/addresses', addressesRouter)

// start app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
