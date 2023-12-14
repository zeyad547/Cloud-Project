import { db } from "@libs/prismadb";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {

    const { userId } = auth();
    if(!userId) {
        return new NextResponse("Unauthorized - No User ID", { status: 401 });
    }
    // Fetch all posts from the database
    const posts = await db.post.findMany({
        
        include: {
          user: true,
        },

      });

      console.log(posts);
      
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
