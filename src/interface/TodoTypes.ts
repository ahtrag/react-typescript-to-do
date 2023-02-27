export const enum TodoStatus {
    ACTIVE = 'active',
    DONE = 'done',
    DELETED = 'deleted',
}

export interface TodoList {
    description: string;
    isDone: boolean;
}

export interface TodoTypes {
    userId: string;
    title: string;
    status: string;
    todoList: TodoList[];
}

