"use client";
import React, {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {getTodo, updateTodo, deleteTodo, uploadImage, Todo} from "@/lib/api";
import {Button} from "@/components/common/Button";
import {TodoItem} from "@/components/todos/TodoItem";

export default function TodoDetailPage() {
  const {itemId} = useParams();
  const router = useRouter();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [memo, setMemo] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(todo?.imageUrl ?? "");

  // ✅ 상세 조회
  useEffect(() => {
    if (!itemId) return;
    getTodo(Number(itemId)).then((data) => {
      setTodo(data);
      setImageUrl(data.imageUrl);
      setMemo(data.memo ?? ""); // memo가 있으면 불러오기
    });
  }, [itemId]);

  // ✅ 수정 완료
  const handleUpdate = async () => {
    if (!todo) return;

    let imageUrlToSave = todo.imageUrl;

    if (image !== null) {
      const file: File = image;
      const res = await uploadImage(file);
      imageUrlToSave = res.url;
      setImageUrl(res.url);
    }

    await updateTodo(todo.id, {
      name: todo.name,
      isCompleted: todo.isCompleted,
      memo,
      imageUrl: imageUrlToSave,
    });
    router.push("/");
  };

  // ✅ 삭제
  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodo(todo.id);
    router.push("/");
  };

  if (!todo) return <p className="text-center mt-10">로딩 중...</p>;

  return (
    <div className="p-4 md:p-6 lg:px-6 lg:py-6 w-full max-w-[996px] mx-auto space-y-6">
      {/* 1. 상단: TodoItem */}
      <div>
        <TodoItem
          id={todo.id}
          name={todo.name}
          isCompleted={todo.isCompleted}
          onToggle={() => setTodo({...todo, isCompleted: !todo.isCompleted})}
          variant="detail"
          onTextChange={(newName) => setTodo({...todo, name: newName})}
        />
      </div>

      {/* 2. 중간: 이미지 + 메모 */}
      <div className="grid gap-6 md:grid-cols-[385px_1fr]">
        {/* 왼쪽: 이미지 영역 */}
        <div
          className="relative border-2 border-dashed border-[#CBD5E1] rounded-3xl flex flex-col items-center justify-center bg-[--color-gray-50] h-[300px] 
            w-full lg:w-[385px] overflow-hidden"
          style={{
            backgroundImage: "url('/images/icon-image.png')",
            backgroundPosition: "center",
            backgroundSize: "64px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <input
            id="todoImage"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] ?? null;
              if (!file) return;

              // ✅ 파일명 영어만 허용
              if (!/^[a-zA-Z0-9._-]+$/.test(file.name)) {
                alert("이미지 파일 이름은 영어로만 구성되어야 합니다.");
                return;
              }

              // ✅ 용량 5MB 제한
              if (file.size > 5 * 1024 * 1024) {
                alert("이미지 파일 크기는 5MB 이하여야 합니다.");
                return;
              }
              setImage(file);
              setImageUrl("");
            }}
          />
          {/* 이미지 미리보기 */}
          {imageUrl ? (
            <img src={imageUrl} alt="저장된 이미지" className="w-full rounded" />
          ) : image ? (
            <img src={URL.createObjectURL(image)} alt="추가한 이미지" className="w-full rounded" />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backgroundImage: "url('/images/icon-image.png')",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "64px",
              }}
            />
          )}

          <label htmlFor="todoImage" className="absolute bottom-[16px] right-[16px] cursor-pointer">
            <img src={image ? "/images/icon-edit.png" : "/images/icon-add.png"} alt="" className="w-[64px]" />
          </label>
        </div>

        {/* 오른쪽: 메모 영역 */}
        <div
          className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col items-center min-h-[300px]"
          style={{
            backgroundImage: "url('/images/bg-memo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <span className="text-amber-800 font-extrabold mt-6">Memo</span>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요"
            className="flex-1 w-full p-4 bg-transparent resize-none focus:outline-none text-slate-900 placeholder-slate-500 text-center"
          />
        </div>
      </div>

      {/* 3. 하단: 버튼 영역 */}
      <div className="flex justify-end gap-4">
        <Button type="edit" state="active" onClick={handleUpdate} iconClassName="">
          수정 완료
        </Button>
        <Button type="delete" state="active" onClick={handleDelete}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
