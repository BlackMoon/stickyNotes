import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('NoteInput')
@ObjectType()
export class Note {
  @Field()
  noteId!: string;

  @Field()
  noteText!: string;

  @Field({ nullable: true })
  x?: number;

  @Field({ nullable: true })
  y?: number;

  @Field({ nullable: true })
  z?: number;
}

@InputType()
export class AddNoteInput implements Partial<Note> {
  
  @Field()
  noteText!: string;

  @Field({ nullable: true })
  x?: number;

  @Field({ nullable: true })
  y?: number;

  @Field({ nullable: true })
  z?: number;
}
