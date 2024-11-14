import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Menu(props) {
  const router = useRouter();

  useEffect(() => {
    router.push('https://heyzine.com/flip-book/c68e020b9c.html');
  }, []);

  return (
    <></>
  )
}
