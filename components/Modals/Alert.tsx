'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { motion, AnimatePresence } from 'framer-motion';

const useAlertModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [{ title, subtitle, type, isClosable, onModalClose }, setModalText] =
    useState<AlertModalTextType>({
      title: '',
      subtitle: '',
      type: null,
      isClosable: true,
      onModalClose: () => {}
    });

  // close modal
  function close() {
    setIsShowing(false);
    if (onModalClose) onModalClose();
  }

  // open modal
  function open() {
    setIsShowing(true);
  }

  // alert service
  function showAlert({
    title,
    subtitle,
    type,
    isClosable,
    onModalClose
  }: AlertModalTextType) {
    // set text

    setModalText({
      title,
      subtitle,
      type,
      isClosable: isClosable !== undefined ? isClosable : true,
      onModalClose: onModalClose ?? (() => {})
    });

    open();
  }

  // modal image variants
  const imagePath = {
    success: '/icon/success.svg',
    error: '/icon/fail.png',
    warning: '/icon/stop-hand.png'
  };

  // frame motion variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    },
    exit: {
      opacity: 0,
      y: -100,
      scale: 0
    }
  };

  // modal component
  // this component need to be used in the root of the component that you're using the service
  function AlertModal() {
    const ref = useRef<Element | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      ref.current = document.querySelector<HTMLElement>('#modal-root');
      setMounted(true);
    }, []);

    return mounted && ref.current
      ? createPortal(
          <AnimatePresence>
            {isShowing && (
              <div
                className='
                  h-screen w-screen overflow-hidden 
                  fixed top-0 left-0 p-6
                  flex justify-center items-center
                '
              >
                <div
                  className='absolute h-screen w-screen bg-black bg-opacity-40 z-[99999] cursor-pointer'
                  onClick={isClosable ? close : undefined}
                />
                <motion.div
                  className='
                    bg-alt-secondary
                    rounded-lg p-6
                    flex flex-col items-center
                    text-center
                    z-[999999]
                    min-w-[300px]
                    overflow-hidden
                  '
                  variants={modalVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 200
                  }}
                >
                  <Image
                    src={imagePath[type ?? 'success']}
                    width={80}
                    height={80}
                    alt='successful icon'
                    className='mb-2'
                  />

                  <div>
                    <h1 className='font-bold text-xl lg:text-2xl text-primary'>
                      {title}
                    </h1>
                    <p className='font-medium text-primary whitespace-pre-line'>
                      {subtitle}
                    </p>
                  </div>

                  {isClosable && (
                    <button
                      className='
                        px-10 py-2 mt-8 rounded-full
                        text-primary font-bold
                        focus:outline outline-2 outline-black  outline-offset-2
                      '
                      onClick={close}
                    >
                      Close
                    </button>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          ref.current
        )
      : null;
  }

  return {
    AlertModal, // modal component
    showAlert, // alert service
    onModalClose: close // close modal
  };
};

// modal types
export enum AlertType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

export type AlertModalTextType = {
  title: string;
  subtitle: string;
  type: AlertType | null;
  isClosable?: boolean;
  onModalClose?: () => void;
};

export default useAlertModal;
