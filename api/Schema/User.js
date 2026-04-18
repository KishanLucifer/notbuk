import mongoose from "mongoose";

const profile_imgs_name_list = [
  "Garfield", "Tinkerbell", "Annie", "Loki", "Cleo",
  "Angel", "Bob", "Mia", "Coco", "Gracie",
  "Bear", "Bella", "Abby", "Harley", "Cali",
  "Leo", "Luna", "Jack", "Felix", "Kiki",
];

const profile_imgs_collections_list = [
  "notionists-neutral",
  "adventurer-neutral",
  "fun-emoji",
];

const userSchema = new mongoose.Schema(
  {
    personal_info: {
      fullname: {
        type: String,
        lowercase: true,
        required: [true, "Fullname is required"],
        minlength: [3, "Fullname must be at least 3 characters"],
        maxlength: [50, "Fullname cannot exceed 50 characters"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      username: {
        type: String,
        minlength: [3, "Username must be at least 3 characters"],
        unique: true,
        trim: true,
      },
      ip_address: String,
      profile_img: {
        type: String,
        default: () => {
          const collection =
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ];
          const name =
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ];
          return `https://api.dicebear.com/6.x/${collection}/svg?seed=${name}`;
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index on email for fast lookups
userSchema.index({ "personal_info.email": 1 });

export default mongoose.model("users", userSchema);
