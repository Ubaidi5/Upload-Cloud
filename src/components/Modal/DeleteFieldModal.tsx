import { Button, Modal } from "@/custom";

interface Props {
  open: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteFieldModal: React.FC<Props> = (props) => {
  const { open, onCancel, onDelete } = props;
  return (
    <Modal open={open} onCancel={onCancel} className="py-5" style={{ width: 500 }}>
      <h1 className="text-center fc-danger fs-24">Warning!</h1>
      <h3 className="text-center mt-5 mb-8">
        This action will permanently delete your upload field
      </h3>

      <div className="flex items-center justify-center gap-12">
        <Button onClick={onCancel}>Cancel</Button>
        <Button bgcolor="#f95f53">Delete</Button>
      </div>
    </Modal>
  );
};

export default DeleteFieldModal;
