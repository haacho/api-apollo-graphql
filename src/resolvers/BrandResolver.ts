import {
  Query,
  Resolver,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { Brand } from "../entity/Brand";

@InputType()
class BrandInput {
  @Field()
  name!: string;
}

@Resolver()
export class BrandResolver {
  @Mutation(() => Brand)
  async createBrand(@Arg("fields", () => BrandInput) fields: BrandInput) {
    const newBrand = Brand.create(fields);
    return await newBrand.save();
  }

  @Mutation(() => Boolean)
  async deleteBrand(@Arg("id", () => Int) id: number) {
    await Brand.delete(id);
    return true;
  }

  @Mutation(() => Brand)
  async updateBrand(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => BrandInput) fields: BrandInput
  ) {
    await Brand.update({ id }, fields);
    return await Brand.findOne(id);
  }

  @Query(() => [Brand!])
  getBrands() {
    return Brand.find({ relations: ["products"] });
  }

  @Query(() => Brand)
  async getBrand(@Arg("id", () => Int) id: number) {
    return await Brand.findOne(id, {
      relations: ["products"],
    });
  }
}
