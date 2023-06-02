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
        {/* hover:border-transparent hover:shadow-base hover:animate-indexOnHover */}
        <button className='flex flex-col px-6 py-4 items-center rounded-lg transition border border-black group'>
          <ChevronUpIcon className='transition duration-100 group-hover:translate-y-[-2px] group-hover:animate-chevronUp' />
          <p>Index</p>
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal className='xs:w-full xs:flex xs:flex-col xs:justify-center'>
        <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-md xs:bg-white/20' />
        <DialogPrimitive.Content
          className={`xs:flex xs:flex-col items-center xs:w-full h-screen py-4 absolute bottom-0 overflow-y-scroll ${
            open ? 'animate-listShow' : 'animate-listHide'
          } `}
        >
          {children}
          <div className='fixed bg-white w-full h-[80px] bottom-0 shadow-top '></div>
          <DialogPrimitive.Close asChild>
            {/* hover:border-transparent hover:shadow-base hover:animate-indexOnHover */}
            <button className='flex flex-col items-center rounded-lg fixed bottom-4 px-6 py-4 bg-black text-white transition border border-black group'>
              <ChevronDownIcon className='transition duration-100 translate-y-[-2px] group-hover:translate-y-[0px] group-hover:animate-chevronDown' />
              <p>Index</p>
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
