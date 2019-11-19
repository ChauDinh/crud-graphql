import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";

import { Movie } from "./../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie)
  async createMovie(@Arg("input", () => MovieInput) input: MovieInput) {
    console.log(input.title);
    console.log(input.minutes);
    const movie = await Movie.create(input).save();
    return movie;
  }

  @Mutation(() => Boolean)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(@Arg("title") title: string) {
    await Movie.delete({ title });
    return true;
  }

  @Query(() => [Movie])
  getAllMovies() {
    return Movie.find();
  }
}
