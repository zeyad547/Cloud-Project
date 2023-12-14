import { db } from "@libs/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth(); // Retrieve Clerk user ID

    // Check if userId is not null
    if (!userId) {
      return new NextResponse("Unauthorized - No User ID", { status: 401 });
    }

    const { content, title } = await req.json();

    // Check if user exists in your database
    let user = await db.user.findUnique({ where: { clerkId: userId } });

    // Create a user if it does not exist
    if (!user) {
      user = await db.user.create({
        data: {
          clerkId: userId,
          // Add other fields as necessary
          name: "User's Name", // Replace with actual name if available
          username: "User's Username", // Replace with actual username if available
        },
      });
    }

    // Create the post and connect it to the user using 'clerkId'
    const post = await db.post.create({
      data: {
        content: content,
        title: title,
        user: {
          connect: {
            clerkId: userId,
          },
        },
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
