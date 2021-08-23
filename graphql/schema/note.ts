import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('NoteInput')
@ObjectType()
export class Note {
  @Field()
  noteId!: string;

  @Field({ nullable: true })
  noteText?: string;

  @Field({ nullable: true })
  x?: number;

  @Field({ nullable: true })
  y?: number;

  @Field({ nullable: true })
  z?: number;
}

