import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

function FormUseImmer() {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({
    array: [],
    uselessValue: null
  });

  // input 수정
  const onChange = useCallback(
    e => {
      const { name, value } = e.target;
      // 기존 코드 주석 처리
      //   setForm({
      //     ...form,
      //     [name]: [value]
      //   });
      // immer를 적용한 코드
      setForm(
        produce(form, draft => {
          draft[name] = value;
        })
      );
    },
    [form]
  );

  // form 등록
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username
      };

      // array에 새 항목 등록
      // 기존 코드 주석 처리
      //   setData({
      //     ...data,
      //     array: data.array.concat(info)
      //   });
      // immer를 적용한 코드
      setData(
        produce(data, draft => {
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
    [data, form.name, form.username]
  );

  // 항목 삭제
  const onRemove = useCallback(
    id => {
      // 기존 코드 주석 처리
      //   setData({
      //     ...data,
      //     array: data.array.filter(info => info.id !== id)
      //   });
      // immer를 적용한 코드
      setData(
        produce(data, draft => {
          draft.array.splice(
            draft.array.findIndex(info => info.id === id),
            1
          );
        })
      );
    },
    [data]
  );

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

export default FormUseImmer;
