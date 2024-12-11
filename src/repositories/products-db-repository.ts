import {productsCollection, ProductType} from "./db";

// проблема, не подключается к порту, не происходят запросы на сервер, не работает постман (у димыча был файл для импорта, у меня этого файла нет, создала по аналогии с запросами rest
// я не понимаю на каком порту я могу посмотреть данные продукты
// не могу зайти на 5000 порт

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
    return product
  },
  async createProduct(newProduct: ProductType): Promise<ProductType> {
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