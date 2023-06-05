import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import FlexContainer from './FlexContainer';

interface DialogProps {
  buttonClass?: string;
  children: React.ReactNode;
}

const Dialog = ({ buttonClass, children }: DialogProps) => {
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
            <button
              className={`flex flex-col items-center mx-auto px-6 py-2 border border-black group ${buttonClass}`}
            >
              {/* <ChevronUpIcon className='transition duration-100 md:group-hover:translate-y-[-2px] md:group-hover:animate-chevronUp' /> */}
              <ChevronUpIcon className='' />
              <p>Index</p>
            </button>
          </DialogPrimitive.Trigger>
          <DialogPrimitive.Portal className=''>
            <DialogPrimitive.Overlay className='xs:fixed xs:inset-0 backdrop-blur-md xs:bg-base/20' />
            {/* <DialogPrimitive.Content
              className={`xs:flex xs:flex-col items-center xs:w-full h-screen pt-4 pb-[168px] absolute top-4 bottom-0 overflow-y-scroll ${
                open ? 'animate-listShow' : 'animate-listHide'
              } `}
            > */}
            <DialogPrimitive.Content
              className={`absolute xs:w-full xs:h-full top-0 left-2/4 -translate-x-2/4 ${
                open ? 'animate-listShow' : 'animate-listHide'
              }`}
            >
              {children}
              {/* <div className='fixed bg-base w-full h-[96px] left-0 bottom-0 shadow-top '></div> */}
              {/* <div className='fixed bg-base w-full h-[96px] left-0 bottom-0 shadow-top '></div> */}
              <FlexContainer className='fixed xs:w-full xs:pb-4 xs:bottom-0 bg-base shadow-top'>
                <DialogPrimitive.Close asChild>
                  {/* <button className='xs:flex xs:flex-col xs:justify-center items-center xs:fixed left-2/4 -translate-x-2/4 xs:bottom-8 px-6 py-4 bg-black text-white border border-black group'> */}
                  <button className='flex flex-col items-center mx-auto my-2 px-6 py-2 bg-black text-white border border-black group'>
                    {/* <ChevronDownIcon className='transition duration-100 translate-y-[-2px] md:group-hover:translate-y-[0px] md:group-hover:animate-chevronDown' /> */}
                    <ChevronDownIcon className='' />
                    <p>Index</p>
                  </button>
                </DialogPrimitive.Close>
              </FlexContainer>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      ) : null}
    </>
  );
};

export default Dialog;
