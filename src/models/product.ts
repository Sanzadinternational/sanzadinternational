import mongoose, { Document, Schema } from 'mongoose';

export interface ProductDoc extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    color: string;
    size: string;
    imagePath: string;
}

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    trim: true
  },
  imagePath: {
    type: String,
    required: true,
    trim: true
  }
});

const Product = mongoose.model<ProductDoc>('Product', productSchema);

export { Product };
