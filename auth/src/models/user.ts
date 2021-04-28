import mongoose from 'mongoose';
import { Password } from '../services/password';

const userSchema = new mongoose.Schema<UserDoc>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Add hooks that intercept "save". middleware function built on mongoose.
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
});

// An interface that describes properties that are required to create a new user
interface UserAttrs {
    email: string;
    password: string
}

// Define type for single user: a single user can have additional properties other than email and password like createdAt
type UserDoc = mongoose.Document & UserAttrs;

// Angle denotes types being provided to functions. mongoose.model takes two types: document & custom type
const UserModel = mongoose.model<UserDoc>('User', userSchema);

class User extends UserModel {
    // this line ensures whatever is passed to User class conforms to UserAttrs interface
    constructor(attrs: UserAttrs) {
        // ensure that the same parameter that was passed to User class gets used to access and call parent class (UserModel's) function
        super(attrs);
    }
};

export { User };