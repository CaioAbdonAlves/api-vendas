import Product from "../entities/Product";

export type CreateProductDTO = {
  nome: string;
  price: number;
  quantity: number;
};

export type PaginateParams = {
  page: number;
  skip: number;
  take: number;
};

export type ProductPaginateProperties = {
  per_page: number;
  total: number;
  current_page: number;
  data: Product[];
};

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  create({ nome, price, quantity }: CreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<ProductPaginateProperties>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  delete(product: Product): Promise<void>;
}
