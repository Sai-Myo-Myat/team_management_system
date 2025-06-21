import { PageProps } from "@/types";
import TeamDetailView from "./team-detail-view";

const TeamDetailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  return (
    <div>
      <TeamDetailView id={id} />
    </div>
  );
};
export default TeamDetailPage;
