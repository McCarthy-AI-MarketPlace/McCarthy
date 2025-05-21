import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  toolUrl: {
    type: String,
    required: true
  },
  pricing: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hashtags: [{
    type: String
  }],
  keyWords: [{
    type: String
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  isEditorsChoice: {
    type: Boolean,
    default: false
  },
  saves: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

toolSchema.index({ title: 'text', description: 'text', hashtags: 'text', keyWords: 'text' });

const Tool = mongoose.model('Tool', toolSchema);
export default Tool;