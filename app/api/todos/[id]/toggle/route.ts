import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const segments = pathname.split("/");
    const id = segments[segments.length - 2]; // Lấy id trước "toggle"

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const todo = await prisma.todos.findUnique({ where: { id } });

    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: { completed: !todo.completed },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to toggle todo" },
      { status: 500 }
    );
  }
}