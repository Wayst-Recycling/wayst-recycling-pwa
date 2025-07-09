import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

const GenModal = ({
  onClose,
  isOpen,
  children,
  modalTitle,
  titleHidden = true,
  dialogContentClassName,
}: PropsWithChildren & {
  isOpen: boolean;
  onClose: () => void;
  modalTitle: string;
  titleHidden?: boolean;
  dialogContentClassName?: string;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className={dialogContentClassName}>
        <DialogTitle className={cn(titleHidden && 'sr-only')}>
          {modalTitle}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default GenModal;
