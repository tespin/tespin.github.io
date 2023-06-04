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
  }, []);

  return (
    <>
      {isClient ? (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
          <DialogPrimitive.Trigger asChild>
            <button className='flex flex-col px-6 py-4 mb-4 items-center border border-black group'>
              <ChevronUpIcon className='transition duration-100 md:group-hover:translate-y-[-2px] md:group-hover:animate-chevronUp' />
              <p>Index</p>
            </button>
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal className='xs:w-full xs:flex xs:flex-col'>
            <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-md xs:bg-base/20' />
            <DialogPrimitive.Content
              className={`xs:flex xs:flex-col items-center xs:w-full h-[calc(100%-96)] pt-4 pb-[168px] absolute top-4 bottom-0 overflow-y-scroll ${
                open ? 'animate-listShow' : 'animate-listHide'
              } `}
            >
              {children}
              <div className='fixed bg-base w-full h-[96px] left-0 bottom-0 shadow-top '></div>
              <DialogPrimitive.Close asChild>
                <button className='xs:flex xs:flex-col xs:justify-center items-center xs:fixed left-2/4 -translate-x-2/4 xs:bottom-8 px-6 py-4 bg-black text-white border border-black group'>
                  <ChevronDownIcon className='transition duration-100 translate-y-[-2px] md:group-hover:translate-y-[0px] md:group-hover:animate-chevronDown' />
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
