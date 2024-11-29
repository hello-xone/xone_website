import { Box, Center, Icon, Img, Input, InputProps } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { IoMdCloseCircle } from 'react-icons/io';

type Props = InputProps & {
  accept: 'image/*' | 'video/*' | 'audio/*' | (string & {});
  onDelete?(): void;
  // onChange(file: File): void;
};

const UploadFile = (props: Props) => {
  const { accept, onDelete, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewSrc(undefined);
      onDelete?.();
    }
    rest?.onChange?.(e);
  };

  return (
    <Center
      boxSize='80px'
      rounded='6px'
      border={previewSrc ? '' : '1px dashed #ccc'}
      cursor='pointer'
      _hover={{
        borderColor: '#9e9d9d'
      }}
      onClick={() => {
        inputRef.current?.click();
      }}
      position='relative'
    >
      {previewSrc ? <Img src={previewSrc} boxSize='full' /> : <Icon as={GoPlus} fontSize='24px' />}
      <Input
        display='none'
        accept={accept}
        type='file'
        ref={inputRef}
        {...rest}
        onChange={onChange}
      />
      {previewSrc && (
        <Img
          as={IoMdCloseCircle}
          boxSize='24px'
          position='absolute'
          top='-12px'
          right='-12px'
          fill='#e15241'
          zIndex='2'
          onClick={(e) => {
            e.stopPropagation();
            if (inputRef.current) {
              inputRef.current!.value = '';
            }
            setPreviewSrc(undefined);
            onDelete?.();
          }}
        />
      )}
    </Center>
  );
};

export default UploadFile;
