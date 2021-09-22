import mongoose from 'mongoose';
import { Password } from '../services/password';

  interface IUserAttrs {
    email: string;
    password: string;
  }
  
  interface IUserModel extends mongoose.Model<IUserDoc> {
    build(attrs: IUserAttrs): IUserDoc;
  }
  
  interface IUserDoc extends mongoose.Document {
    email: string;
    password: string;
  }
  
  // in js, if there is a function inside object, json.stringify invokes that function instead of returning key value pairs
  // similarly, mongoose allows passing toJSON to control how document gets translated to json which will be returned as response
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
    {
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
  
  userSchema.pre('save', async function (done) {
    // if users just want to update their emails we don't want to rehash password again
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
  });
  
  userSchema.statics.build = (attrs: IUserAttrs) => {
    return new User(attrs);
  };
  
  const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);
  
  export { User };