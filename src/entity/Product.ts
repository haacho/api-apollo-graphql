import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";

import { Field, Int, ObjectType } from "type-graphql";
import { Brand } from "./Brand";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  quantity!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;

  @Field(() => Brand, { nullable: true })
  @ManyToOne(() => Brand, (brand) => brand.products)
  brand?: Brand;
}
