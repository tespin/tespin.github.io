import { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import FlexContainer from './FlexContainer';

interface DialogProps {
  className?: string;
  children: React.ReactNode;
}

const Dialog = ({ className, children }: DialogProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        <button className='flex flex-col px-6 py-2 items-center rounded-lg transition border border-black hover:border-transparent hover:shadow-base hover:animate-indexOnHover'>
          <ChevronUpIcon />
          <p>Index</p>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className='xs:w-full xs:flex xs:flex-col xs:justify-center'>
        <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-md xs:bg-white/20' />
        <DialogPrimitive.Content
          className={`xs:flex xs:flex-col justify-center items-center xs:w-full py-4 absolute bottom-0 h-screen overflow-y-scroll ${
            open ? 'animate-listShow' : 'animate-listHide'
          } `}
        >
          {children}
          <DialogPrimitive.Close asChild>
            <button className='flex flex-col items-center rounded-lg fixed bottom-4 px-6 py-2 bg-black text-white transition border border-black hover:border-transparent hover:shadow-base hover:animate-indexOnHover'>
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
