import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
    };
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const todos = await prisma.todos.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error in GET /api/todos:", error);
    return NextResponse.json({ error: "Lỗi khi tải todos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type phải là application/json" }, { status: 400 });
    }

    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Body request không hợp lệ" }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Body không hợp lệ" }, { status: 400 });
    }

    const { name, category } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Tên không hợp lệ" }, { status: 400 });
    }

    const newTodo = await prisma.todos.create({
      data: {
        name,
        category: category || null,
        completed: false,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/todos:", error);
    return NextResponse.json({ error: "Lỗi khi thêm todo" }, { status: 500 });
  }
}