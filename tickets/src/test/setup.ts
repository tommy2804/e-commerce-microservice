import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
  var generateId: () => string;
}

// this is the main entry point for the server
// the mongo memory server is used to create a local
// instance of mongo db for testing
// and to connect to the mongo database
// when the server is started

// to get all the tests to work, set just to run the mock connection to nats server
jest.mock('../nats-wrapper.ts');

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'Tommy2';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  // Build a JWT payload . {id, email}
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };
  // Sign the JWT with the secret
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build a session OBject {jwt: MY_JWT}
  const session = {
    jwt: token,
  };
  // Turn the JWT into a string
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
global.generateId = () => {
  return new mongoose.Types.ObjectId().toHexString();
};
