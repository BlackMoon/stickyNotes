import { rest } from "msw";
import { setupServer } from 'msw/node'
import { INote } from "../models";

export const PATH = '/graphql';

const notes: INote[] = [
  { noteId: 'fakeId1', noteText: 'fakeText1'}, 
  { noteId: 'fakeId2', noteText: 'fakeText2'}
];

export const server = setupServer(
  rest.post(PATH, (req, res, ctx) => {
    return res(ctx.json({ data: { notes } }));
  }),
)