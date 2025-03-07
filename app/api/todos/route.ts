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

async function GET() {
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
    console.error(error);
    return NextResponse.json({ error: "Lỗi khi tải todos" }, { status: 500 });
  }
}

async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Tên không hợp lệ" }, { status: 400 });
    }

    const newTodo = await prisma.todos.create({
      data: {
        name,
        completed: false,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Lỗi khi thêm todo" }, { status: 500 });
  }
}

export { GET, POST };
