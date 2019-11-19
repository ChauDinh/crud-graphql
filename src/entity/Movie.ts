import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Movie extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn() // automatically pick id when creating element
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => Int)
  @Column("int", { default: 60, nullable: true })
  minutes: number;
}
