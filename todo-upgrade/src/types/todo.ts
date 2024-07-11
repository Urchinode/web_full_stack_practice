export interface Todo{
    readonly id: number;
    title: string;
    content: string;
    isDone: boolean;
    createdAt: Date;
  }