import { apiClient } from "./apiClient";

// 타입 정의
export type Todo = {
  id: number;
  name: string;
  isCompleted: boolean;
  imageUrl: string;
  memo?: string;
};

// ✅ 전체 목록 조회
export const getTodos = () => apiClient<Todo[]>(`/items`);

// ✅ 단일 조회
export const getTodo = (itemId: number) => apiClient<Todo>(`/items/${itemId}`);

// ✅ 할 일 추가
export const createTodo = (name: string) =>
  apiClient<Todo>(`/items`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });

// ✅ 할 일 수정
export const updateTodo = (itemId: number, data: Partial<Todo>) =>
  apiClient<Todo>(`/items/${itemId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

// ✅ 할 일 삭제
export const deleteTodo = (itemId: number) =>
  apiClient<void>(`/items/${itemId}`, {
    method: "DELETE",
  });

// ✅ 이미지 업로드 API
export const uploadImage = async (file: File | null): Promise<{ url: string }> => {
  if (!file) return { url: "" };

  const formData = new FormData();
  formData.append("image", file);

  return apiClient<{ url: string }>(`/images/upload`, {
    method: "POST",
    body: formData,
    headers: {},
  });
};
