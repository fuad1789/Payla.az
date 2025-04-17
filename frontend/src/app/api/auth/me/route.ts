import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json(
      { status: "error", message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch("http://localhost:5000/api/users/me", {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { status: "error", message: "Not authenticated" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Server error" },
      { status: 500 }
    );
  }
}
