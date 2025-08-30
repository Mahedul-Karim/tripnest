import { z } from "zod";

const ratingSchema = z.object({
  reviews: z
    .string({
      error: "Review field can not be empty",
    })
    .min(1, "Review field can not be empty"),
});

const loginSchema = z.object({
  email: z.string().min(1, "Email field can not be empty").email({
    message: "Please provide a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be of 8 characters",
  }),
});

const signUpSchema = z
  .object({
    firstName: z.string({
      error: "First Name field can not be empty",
    }),
    lastName: z.string({
      error: "Last Name field can not be empty",
    }),
    email: z
      .email({
        message: "Please provide a valid email",
      })
      .min(1, {
        error: "Email field cannot be empty",
      }),
    password: z.string().min(8, {
      message: "Password must be of 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be of 8 characters",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password and Confirm Passwords need to be same",
    path: ["confirmPassword"],
  });

const createTourSchema = z.object({
  tourName: z.string({
    error: "Tour Name is required!",
  }),
  category: z.string({
    error: "Category is required!",
  }),
  location: z.string({
    error: "Location is required!",
  }),
  highlight: z
    .string({
      error: "Highlights is required",
    })
    .array()
    .min(1, "Atleast 1 highlight is required"),
  duration: z.string({
    error: "Duration is required!",
  }),
  price: z.string({
    error: "Price is required!",
  }),
  groupSize: z.string({
    error: "Group Size is required!",
  }),
  overview: z.string({
    error: "Overview is required!",
  }),
  gallery: z
    .string({
      error: "Gallery is required",
    })
    .array()
    .length(4, "4 images are required!"),

  itinerarys: z
    .object(
      {
        title: z.string({
          error: "Itinerary title is required!",
        }),
        description: z.string({
          error: "Itinerary description is required!",
        }),
      },
      {
        error: "Itinerarys are required!",
      }
    )
    .array(),
  includes: z
    .string({
      error: "Includes is required!",
    })
    .array()
    .min(1, "At least 1 includes is required!"),
});

export { ratingSchema, loginSchema, signUpSchema, createTourSchema };
