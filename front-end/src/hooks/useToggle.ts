/*
  this hook is used to handle the toggle status
*/

import { useState } from 'react';

export default function useToggle(initial: boolean) {
  const [value, setValue] = useState(initial);
  return [value, () => setValue(!value)];
}
