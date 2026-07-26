import { redirect } from "next/navigation";

interface EditRoommatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRoommatePage({
  params,
}: EditRoommatePageProps) {
  const { id } = await params;

  if (!id || Number.isNaN(Number(id))) {
    redirect("/roommates");
  }

  redirect("/roommates/profile/edit");
}