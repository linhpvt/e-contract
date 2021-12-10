/*
  This hook is used to display title of a page dynamically
*/

import { useEffect } from 'react';
export default function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
