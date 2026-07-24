import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/server/db/prisma";
import type { Teacher } from "@prisma/client";

export async function getCurrentTeacher(): Promise<Teacher | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user?.email) {
    return null;
  }

  const teacher = await prisma.teacher.findUnique({
    where: {
      email: user.email,
    },
  });

  return teacher;
}
