import mongoose, { Schema } from "mongoose";

// An interface that describes the properties
// that are required to create a new user
// BURAYI NOT AL TYPESCRIPT 'I KONTROL ASAMASINA DAHIL EDEBILMEK ICIN BUNU YAPIYORUZ

interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a User Model has

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// MONGODB ŞEMASI
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// KULLANICIYI BUILD EDEN FONSKIYON
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
