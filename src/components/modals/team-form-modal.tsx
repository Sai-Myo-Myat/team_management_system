import { DialogContent, DialogTitle } from "../ui/dialog";
import TeamForm from "../forms/team-form";
import { DialogDescription } from "@radix-ui/react-dialog";

const TeamFormModal = () => {
  return (
    <DialogContent>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
      <TeamForm />
    </DialogContent>
  );
};
export default TeamFormModal;
