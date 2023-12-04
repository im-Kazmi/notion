import { Schema, model, models } from "mongoose";
import { CiFileOn } from "react-icons/ci";

export interface IPage extends Document {
  title: string;
  content: string;
  icon: string;
  conver: string;
  childPages: Schema.Types.ObjectId[];
}
const pageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "untitled",
    },
    content: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "/icons/emptydoc.png",
    },
    cover: {
      type: String,
    },
    parentPage: {
      type: Schema.Types.ObjectId,
      ref: "Page",
    },
    childPages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Page",
      },
    ],
    // i should make a connection to user model but i am focusing on actual
    // notion functionlities
    author: String,
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Page = models?.Page || model("Page", pageSchema);

export default Page;
