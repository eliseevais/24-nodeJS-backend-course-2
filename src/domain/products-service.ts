import {productsRepository} from "../repositories/products-db-repository";
import {ProductType} from "../repositories/db";

// проблема, не подключается к порту, не происходят запросы на сервер, не работает постман (у димыча был файл для импорта, у меня этого файла нет, создала по аналогии с запросами rest

export const productsService = {

  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    return productsRepository.findProducts(title)
  },
  async findProductsById(id: number): Promise<ProductType | null | undefined> {
    return productsRepository.findProductsById(id)
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date().getTime().toString(),
      title: title
    }
    const createdProduct = await productsRepository.createProduct(newProduct);
    return newProduct
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    return await productsRepository.updateProduct(id, title)
  },
  async deleteProduct(id: number): Promise<boolean> {
    return await productsRepository.deleteProduct(id)
  }
}