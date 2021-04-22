import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { Product } from "../entity/Product";

@InputType()
class ProductInput {
  @Field()
  name!: string;
  @Field()
  quantity!: number;
}

@InputType()
class ProductUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => Int, { nullable: true })
  quantity?: number;
}

@Resolver()
export class ProductResolver {
  @Mutation(() => Product)
  async createProduct(@Arg("fields", () => ProductInput) fields: ProductInput) {
    const newProduct = Product.create(fields);
    return await newProduct.save();
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("id", () => Int) id: number) {
    await Product.delete(id);
    return true;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => ProductUpdateInput) fields: ProductUpdateInput
  ) {
    await Product.update({ id }, fields);
    return await Product.findOne(id);
  }

  @Query(() => [Product])
  getProducts() {
    return Product.find({ relations: ["brand"] });
  }

  @Query(() => Product)
  async getProduct(@Arg("id", () => Int) id: number) {
    return await Product.findOne(id, {
      relations: ["brand"],
    });
  }
}
