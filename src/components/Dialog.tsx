import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';

interface DialogProps {
  children: React.ReactNode;
}

const Dialog = ({ children }: DialogProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsClient(true);
    }
  });

  return (
    <>
      {isClient ? (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger asChild>
            <button className='flex flex-col px-6 py-4 items-center transition border border-black group'>
              <ChevronUpIcon className='transition duration-100 group-hover:translate-y-[-2px] sm:group-hover:animate-chevronUp' />
              <p>Index</p>
            </button>
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal className='xs:w-full xs:flex xs:flex-col xs:justify-center'>
            <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-md xs:bg-base/20' />
            <DialogPrimitive.Content
              className={`xs:flex xs:flex-col items-center xs:w-full h-screen pt-4 pb-[120px] absolute bottom-0 overflow-y-scroll ${
                open ? 'animate-listShow' : 'animate-listHide'
              } `}
            >
              {children}
              <div className='fixed bg-base w-full h-[80px] left-0 bottom-0 shadow-top '></div>
              <DialogPrimitive.Close asChild>
                <button className='flex xs:flex-col xs:items-center fixed bottom-4 px-6 py-4 bg-black text-white transition border border-black group'>
                  <ChevronDownIcon className='transition duration-100 translate-y-[-2px] group-hover:translate-y-[0px] sm:group-hover:animate-chevronDown' />
                  <p>Index</p>
                </button>
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      ) : null}
    </>
  );
};

export default Dialog;
