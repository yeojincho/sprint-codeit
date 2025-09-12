"use client";
import {Button} from "@/components/common/Button";
import {Input} from "@/components/common/Input";
import {TodoItem} from "@/components/todos/TodoItem";
import {getTodos, createTodo, updateTodo, Todo} from "@/lib/api";
import React, {useEffect, useState} from "react";

export default function HomePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // ✅ 1. 목록 조회
  useEffect(() => {
    getTodos()
      .then((data) => setTodos(data))
      .catch((err) => console.error("할 일 목록 조회 실패:", err));
  }, []);

  // ✅ 2. 할 일 추가
  const handleAdd = async () => {
    if (!input.trim()) return;
    try {
      const newTodo = await createTodo(input.trim()); // body: { name } 으로 전송해야 함
      setTodos((prev) => [...prev, newTodo]);
      setInput("");
    } catch (err) {
      console.error("할 일 추가 실패:", err);
    }
  };

  // ✅ 3. 완료 상태 토글
  const handleToggle = async (todo: Todo) => {
    try {
      const updated = await updateTodo(todo.id.toString(), {
        isCompleted: !todo.isCompleted,
      });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? {...t, isCompleted: updated.isCompleted} : t)));
    } catch (err) {
      console.error("상태 변경 실패:", err);
    }
  };

  // ✅ 4. 진행중 / 완료된 목록 분리
  const inProgress = todos.filter((t) => !t.isCompleted);
  const completed = todos.filter((t) => t.isCompleted);

  return (
    <div className="">
      <div className="p-4 md:p-6 lg:px-6 lg:py-6 w-full max-w-[1200px] mx-auto space-y-6">
        {/* 입력 영역 */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAdd();
          }}
          className="flex gap-2"
        >
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="할 일을 입력하세요" />
          <Button type="add" iconClassName="">
            <span className="hidden md:inline">추가하기</span>
          </Button>
        </form>

        {/* 목록 영역 */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {/* 진행 중 */}
          <section>
            <h2 className="text-xl font-nanum font-bold mb-3">
              <img src="/images/icon-todo.png" alt="진행중" className="h-[36px]" />
            </h2>
            <ul className="space-y-2">
              {inProgress.length > 0 ? (
                inProgress.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem
                      id={todo.id}
                      name={todo.name}
                      isCompleted={todo.isCompleted}
                      onToggle={() => handleToggle(todo)}
                    />
                  </li>
                ))
              ) : (
                <li className="flex flex-col items-center">
                  <img src="/images/img-todo-empty.png" alt="" className="h-[120px] md:h-[240px] w-auto" />
                  <p className="text-center text-slate-400">
                    할 일이 없어요.
                    <br /> TODO를 새롭게 추가해주세요!
                  </p>
                </li>
              )}
            </ul>
          </section>

          {/* 완료됨 */}
          <section>
            <h2 className="text-xl font-nanum font-bold mb-3">
              <img src="/images/icon-done.png" alt="완료됨" className="h-[36px]" />
            </h2>
            <ul className="space-y-2">
              {completed.length > 0 ? (
                completed.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem
                      id={todo.id}
                      name={todo.name}
                      isCompleted={todo.isCompleted}
                      onToggle={() => handleToggle(todo)}
                    />
                  </li>
                ))
              ) : (
                <li className="flex flex-col items-center">
                  <img src="/images/img-done-empty.png" alt="" className="h-[120px] md:h-[240px] w-auto" />
                  <p className="text-center text-slate-400">
                    아직 다 한 일이 없어요. <br />
                    해야 할 일을 체크해보세요!
                  </p>
                </li>
              )}
            </ul>
          </section>
        </div>

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
            <TodoItem name="비타민 챙겨 먹기" />
          </div>
        </div>
      </div>
    </div>
  );
}
