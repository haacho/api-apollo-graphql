import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Field, ObjectType } from "type-graphql";
import { Product } from "./Product";

@ObjectType()
@Entity()
export class Brand extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.brand)
  products!: Product[];
}
