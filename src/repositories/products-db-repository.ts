import {productsCollection, ProductType} from "./db";

// проблема, не подключается к порту, не происходят запросы на сервер, не работает постман (у димыча был файл для импорта, у меня этого файла нет, создала по аналогии с запросами rest

export const productsRepository = {

  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    // if (title) {
    //   return productsCollection.find({title: {$regex: title}}).toArray()
    // } else {
    //   return productsCollection.find().toArray()
    // }

    // refactoring
    const filter: any = {};
    if (title) {
      filter.title = {$regex: title}
    }
    return productsCollection.find(filter).toArray()
  },
  async findProductsById(id: number): Promise<ProductType | null | undefined> {
    let product: ProductType | null = await productsCollection.findOne({id: id});
    if (product) {
      return product
    } else {
      return null
    }
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date().getTime().toString(),
      title: title
    }
    const result = await productsCollection.insertOne(newProduct);
    return newProduct
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productsCollection.updateOne({id: id}, {$set: {title: title}});

    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    const result = await productsCollection.deleteOne({id: id});
    return result.deletedCount === 1;
  }
}