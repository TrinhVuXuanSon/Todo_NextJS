import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { log } from "console";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const todos = await prisma.todo.findMany({
      where: { userId: userId || undefined },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, userId } = await req.json();

    const newTodo = await prisma.todo.create({
      data: {
        name,
        userId,
        completed: false,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, completed, name } = await req.json();

    const updatedTodo = await prisma.todo.update({
      where: { id: id || undefined },
      data: { completed, name },
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await prisma.todo.delete({
      where: { id: id || undefined },
    });

    return NextResponse.json({ message: "Todo deleted" }, { status: 200 });
  } catch (error) {
    log(error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}
