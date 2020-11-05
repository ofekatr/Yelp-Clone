import { useState } from 'react';

const useForm = (callback: () => void, initState: any = {}) => {

  const [inputs, setInputs] = useState(initState);

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return {
    onChange,
    onSubmit,
    inputs,
    setInputs
  };
}

const useRedirectToLogin = (callback: () => void, user, props) => {
  const onClick = user ? callback : () => props.history.push('/login');
  return {
    onClick
  };
}

export {
  useForm,
  useRedirectToLogin
}