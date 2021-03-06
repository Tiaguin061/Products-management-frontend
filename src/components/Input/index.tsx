import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';

import { Container, Error } from './styles';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { useField } from '@unform/core';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>
}

const Input: React.FC<IInputProps> = ({name, icon: Icon, ...rest}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [ isFocused, setIsFocused] = useState(false);
  const [ isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <input 
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
        ref={inputRef}
      />
      {error && 
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      }
    </Container>
  );
}

export default Input;