import { rest } from "msw";
import { PATH, server } from "../services/setup-mock-server";
import { NoteStore } from "./NoteStore";

// mock api-endpoint
jest.mock('../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));

describe('NoteStore', () => {
  
  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())
  
  test('load notes', async () => {

    const store = new NoteStore();
    
    await store.loadNotes();
  
    expect(store.ids.length).toEqual(2);
    expect(Object.keys(store.entities).length).toEqual(2);
    
    // try to reload
    await store.loadNotes();
  })

  test('load notes with error', async () => {

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.status(500))
      )
    );
    const store = new NoteStore();
    await store.loadNotes();
    expect(store.error).not.toBeNull();
  })

  test('add note', async () => {

    const noteId = 'fakeId3';

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.json({ data: { addNote: { noteId , noteText: 'fakeText3'} } }))
      )
    );

    const store = new NoteStore();
    
    await store.addNote();
    
    expect(store.ids.length).toEqual(1)
    expect(Object.keys(store.entities).length).toEqual(1);
    expect(store.entities[noteId]).toBeDefined();
    expect(store.error).toBeUndefined();
  })

  test('add note with error', async () => {

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.status(500))
      )
    );

    const store = new NoteStore();
    
    await store.addNote();
    expect(store.error).not.toBeNull();
  })

  test('update note', async () => {

    const store = new NoteStore();
    await store.loadNotes();

    const noteId = 'fakeId2';

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.json({ data: true }))
      )
    );
    
    await store.updateNote({ noteId, x: 20 });
    
    expect(store.ids.length).toEqual(2)
    expect(Object.keys(store.entities).length).toEqual(2);
    expect(store.entities[noteId]).toBeDefined();
    expect(store.entities[noteId]?.x).toEqual(20);
    expect(store.error).toBeUndefined();
  })

  test('update note with error', async () => {

    const store = new NoteStore();
    await store.loadNotes();

    const noteId = 'fakeId2';

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.status(500))
      )
    );
    
    await store.updateNote({ noteId, x: 20 });
    expect(store.error).not.toBeNull();
  })

  test('delete note', async () => {

    const store = new NoteStore();
    await store.loadNotes();

    const noteId = 'fakeId2';

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.json({ data: true }))
      )
    );
    
    await store.removeNote({ noteId, x: 20 });
    
    expect(store.ids.length).toEqual(1)
    expect(Object.keys(store.entities).length).toEqual(1);
    expect(store.entities[noteId]).toBeUndefined();
    expect(store.error).toBeUndefined();

  })

  test('delete note with error', async () => {

    const store = new NoteStore();
    await store.loadNotes();

    const noteId = 'fakeId2';

    server.use(
      rest.post(PATH, (req, res, ctx) => 
        res(ctx.status(500))
      )
    );
    
    await store.removeNote({ noteId, x: 20 });
    
    expect(store.error).not.toBeNull();
  })

  test('setDragginh', () => {
    const store = new NoteStore();
    
    store.setDragging({ tag: 'div'});

    const { draggedEl, offsetX, offsetY } = store;

    expect(draggedEl).toBeDefined();
    expect(draggedEl.tag).toEqual('div');
    expect(offsetX).toEqual(0);
    expect(offsetY).toEqual(0);
  })
})