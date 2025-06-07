import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
}, { timestamps: true });

const toolSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    toolUrl: {
      type: String,
      required: true,
    },
    pricing: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      default: "",
    },
    features: [
      {
        type: String,
      },
    ],
    useCases: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 4.8,
    },
    reviews: [reviewSchema], // ✅ Embedded sub-documents
    alternatives: [
      {
        type: String, // You can change this to ObjectId if referencing other tools
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    hashtags: [
      {
        type: String,
        required: true,
      },
    ],
    keyWords: [
      {
        type: String,
        required: true,
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isEditorsChoice: {
      type: Boolean,
      default: false,
    },
    saves: {
      type: Number,
      default: 0,
    },
    dataSharing: {
      noPersonalData: { type: Boolean, default: true },
      inputsNotStored: { type: Boolean, default: true },
      usedForTraining: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

toolSchema.index({
  title: "text",
  description: "text",
  hashtags: "text",
  keyWords: "text",
});

const Tool = mongoose.model("Tool", toolSchema);
export default Tool;
