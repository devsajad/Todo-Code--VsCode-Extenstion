export type TaskType = {
  categoryId: string;
  text: string;
  file?: string;
  line?: number;
  description?: string;
  priority?: number;
  date?: Date;
};

export type CategoryType = {
  id: string;
  color: string;
  icon: string;
  name: string;
};
