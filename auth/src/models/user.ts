import mongoose from 'mongoose';
import { Password } from '../services/password';

// an interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// ann interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// an interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // this is a mongoose option that will transform the document
  // before it is returned to the request
  // the doc is the document that is being returned
  // the ret is the object that is being returned
  {
    // here we are telling mongoose to transform the _id to id and delete the password and __v
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// this is a mongoose middleware function that will run before the save function
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
