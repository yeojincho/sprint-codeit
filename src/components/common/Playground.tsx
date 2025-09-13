import React from 'react';
import {Button} from "@/components/common/Button";
import {TodoItem} from "@/components/todos/TodoItem";

export const Playground = () => {
  return (
   <div>
      <h1 className="mb-4">화면 공통 컴포넌트</h1>
      <div className="grid grid-cols-2 gap-4">
        <Button type="add" iconClassName="">
          추가하기
        </Button>
        <Button type="add" state="active">
          추가하기
        </Button>
        <Button type="edit" iconClassName="">
          수정완료
        </Button>
        <Button type="edit" state="active" iconClassName="">
          수정하기
        </Button>
        <Button type="delete" state="active" iconClassName="">
          삭제하기
        </Button>
        <Button type="add" state="" iconClassName=""></Button>
        <Button type="add" state="active"></Button>
        <TodoItem name="비타민 챙겨 먹기"/>
      </div>
    </div>
  );
}

export default Playground;