import produce from 'immer';

const originalState = [
  {
    id: 1,
    todo: 'React 공부하기',
    checked: true
  },
  {
    id: 2,
    todo: 'Blog 포스팅',
    checked: false
  }
];
// produce라는 함수는 두 가지 파라미터를 받는다.
// 첫 번째 파라미터는 수정하고 싶은 상태, 두 번째 파라미터는 상태를 어떻게 업데이트할지 정의하는 함수
// produce 함수가 불변성 유지를 대신해 주면서 새로운 상태를 생성해준다.
const nextState = produce(originalState, draft => {
  // id가 2인 항목의 checkd 값을 true로 변경
  const todo = draft.find(t => t.id === 2);
  todo.checked = true;

  // 새로운 데이터 추가
  draft.push({
    id: 3,
    todo: 'immer 사용해보기',
    checked: true
  });

  // id가 1인 항목 제거
  draft.splice(
    draft.findIndex(t => t.id === 1),
    1
  );
});
