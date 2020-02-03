import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

function FormUseImmerFU() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input 수정
  const onChange = useCallback(e => {
    const { name, value } = e.target;
    //   setForm(
    //     produce(form, draft => {
    //       draft[name] = value;
    //     })
    //   );
    // 함수형 업데이트로 변경
    setForm(
      produce(draft => {
        draft[name] = value;
      })
    );
  }, []);

  // form 등록
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      setData(
        // 함수형 업데이트로 변경
        produce(draft => {
          draft.array.push(info);
        })
      );

      // form 초기화
      setForm({
        name: '',
        username: ''
      });
      nextId.current += 1;
    },
    [form.name, form.username]
  );

  // 항목 삭제
  const onRemove = useCallback(id => {
    setData(
      // 함수형 업데이트로 변경
      produce(draft => {
        draft.array.splice(
          draft.array.findIndex(info => info.id === id),
          1
        );
      })
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='username'
          placeholder='ID'
          value={form.username}
          onChange={onChange}
        />
        <input
          name='name'
          placeholder='NAME'
          value={form.name}
          onChange={onChange}
        />
        <button type='submit'>등록</button>
      </form>
      <div>
        <ul>
          {data.array.map(info => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username} ({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FormUseImmerFU;
