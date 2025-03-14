import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

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

    return NextResponse.json(todo);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Không thể tải todo" }, { status: 500 });
  }
}

async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

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

    const data = await req.json();
    const updateData: { name?: string; category?: string; completed?: boolean } = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.category !== undefined) updateData.category = data.category; // Hỗ trợ cập nhật category
    if (data.completed !== undefined) updateData.completed = data.completed;

    const updatedTodo = await prisma.todos.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Không cập nhật được todo" },
      { status: 500 }
    );
  }
}

async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

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

    await prisma.todos.deleteMany({
      where: {
        id,
        userId: session.user.id,
      },
    });
    return NextResponse.json({ message: "Đã xóa todo" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Không xóa được todo" }, { status: 500 });
  }
}

export { GET, PATCH, DELETE };