import { useModal } from "@/context/modal-context";
import { Dialog } from "@/components/ui/dialog";
import TeamFormModal from "./team-form-modal";

const ModalManager = () => {
  const { state, closeModal } = useModal();

  return (
    <Dialog open={state.isOpen} onOpenChange={closeModal}>
      <TeamFormModal />
    </Dialog>
  );
};
export default ModalManager;
