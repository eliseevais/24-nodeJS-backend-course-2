const products = [
  {id: 1, title: 'tomato'},
  {id: 2, title: 'orange'},
  {id: 3, title: 'cucumber'},
];

export type ProductType = {
  id: number
  title: string
}

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    if (title) {
      let filteredProducts = products.filter(p => p.title.indexOf(title) > -1);
      return filteredProducts
    } else {
      return products
    }
  },
  findProductsById(id: number) {
    let product = products.find(p => p.id === +id);
    return product;
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date().getTime().toString(),
      title: title
    }
    products.push(newProduct);
    return newProduct
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    let product = products.find(p => p.id === id)
    if (product) {
      product.title = title
      return true
    } else {
      return false
    }
  },
  deleteProduct(id: number) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false
  }
}