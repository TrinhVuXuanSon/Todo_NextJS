import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // Lấy id từ URL

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const todo = await prisma.todos.findUnique({ where: { id } });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // Lấy id từ URL

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const todo = await prisma.todos.findUnique({ where: { id } });
    if (!todo) {
      return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    const data = await req.json();
    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.completed !== undefined) updateData.completed = data.completed;

    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop(); // Lấy id từ URL

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    await prisma.todos.delete({ where: { id } });
    return NextResponse.json({ message: "Todo deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}