import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 2];

    if (!id) {
      return NextResponse.json({ error: "Id không hợp lệ" }, { status: 400 });
    }

    const todo = await prisma.todos.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!todo) {
      return NextResponse.json(
        { error: "Không tìm thấy todo" },
        { status: 404 }
      );
    }

    await prisma.todos.updateMany({
      where: {
        id,
        userId: session.user.id,
      },
      data: { completed: !todo.completed },
    });

    const updatedTodo = await prisma.todos.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Không thể toggle todo" },
      { status: 500 }
    );
  }
}

export { PATCH };
