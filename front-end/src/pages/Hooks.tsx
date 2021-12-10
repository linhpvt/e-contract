import { useRef } from 'react';
import useDebugComponent from '../hooks/useDebugComponent';
import useEventListener from '../hooks/useEventListener';
import useFormCache, { FieldType } from '../hooks/useFormCache';
import useHover from '../hooks/useHover';
import useNetworkStatus from '../hooks/useNetworkStatus';
import useRenderCount from '../hooks/useRenderCount';
import useTimeout from '../hooks/useTimeout';
import useTitle from '../hooks/useTitle';
import useToggle from '../hooks/useToggle';
const logger = () => console.log('OK, run this after timeout');
export default function Hooks(props: any) {
  const [, clear] = useTimeout(logger, 2000, []);
  const count = useRef(2);
  setTimeout(() => {
    if (count.current > 0) {
      count.current = count.current - 1;
      clear();
    } else {
    }
  }, 1500);

  useDebugComponent('Hooks', props || {});
  const renderNumber = useRenderCount();
  console.log('renderNumber', renderNumber);
  useTitle('linhpvt');
  const refDiv = useRef(null);
  const refDivHover = useRef(null);
  // @ts-ignore
  const hovered = useHover(refDivHover.current);
  useEventListener(
    'click',
    (e) => {
      console.log(e);
    },
    // @ts-ignore
    refDiv.current,
  );
  const [toggleValue, setToggle] = useToggle(true);

  const networkStatus = useNetworkStatus();
  console.log(networkStatus);
  const { formData, onChange } = useFormCache('userForm', {
    name: '',
    age: 10,
    over18: true,
  });
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='name'>Name: </label>
          <input
            onChange={onChange}
            type='text'
            name='name'
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor='age'>Name: </label>
          <input
            onChange={onChange}
            type='text'
            name='age'
            field-type={FieldType.NUMBER}
            value={formData.age}
          />
        </div>

        <div>
          <label htmlFor='age'>Over 18: </label>
          <input
            onChange={onChange}
            type='checkbox'
            name='over18'
            field-type={FieldType.BOOLEAN}
            value={formData.over18}
            checked={formData.over18}
          />
        </div>
        <div>
          <input
            type='submit'
            value={toggleValue + ''}
            // @ts-ignore
            onClick={setToggle}
          />
        </div>
      </form>
      <div
        ref={refDiv}
        style={{ width: 100, height: 200, backgroundColor: 'blue' }}
      ></div>

      <div
        ref={refDivHover}
        style={{
          width: 100,
          height: 200,
          backgroundColor: hovered ? 'red' : 'blue',
        }}
      ></div>
    </>
  );
}
