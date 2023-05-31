import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import FlexContainer from './FlexContainer';

interface DialogProps {
  className?: string;
  children: React.ReactNode;
}

const Dialog = ({ className, children }: DialogProps) => {
  // const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button className='flex flex-col px-6 py-2 items-center border border-black hover:drop-shadow-lg '>
          <ChevronUpIcon />
          <p>Index</p>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className='xs:w-full'>
        <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-sm xs:bg-black/20' />
        <DialogPrimitive.Content className='xs:flex xs:flex-col items-center xs:w-full absolute bottom-0 left-2/4 -translate-x-2/4'>
          {children}
          <DialogPrimitive.Close asChild>
            <button className='flex flex-col items-center absolute bottom-4 px-6 py-2 bg-black text-white border-transparent'>
              <ChevronDownIcon />
              <p>Index</p>
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
