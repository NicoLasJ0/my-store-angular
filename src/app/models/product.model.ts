export interface Category{
    id: number;
    name: string;
    typeImg: string;
}
export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    
}
export interface CreateProductDto extends Omit<Product,'id' | 'category'>{
    categoryId: number;
}

export interface UpdateProductDto extends Partial<CreateProductDto>{}
