import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditTodoDto } from './dto/edit-todo.dto';
import { TodoFilterDto } from './dto/todo-filter.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async listTodo(filter: TodoFilterDto, userid: number) {
    return this.prisma.todo.findMany({
      where: {
        done: filter.isDone,
        userId: userid,
      },
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }

  async deadlineTodo(filter: TodoFilterDto, userid: number) {
    const now = new Date();
    const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return this.prisma.todo.findMany({
      where: {
        userId: userid,
        done: false,
        deadline: { lte: oneDayLater },
      },
      orderBy: {
        [filter.sortBy]: filter.sortOrder,
      },
    });
  }

  async getCompletionRate(userid: number): Promise<number> {
    // Pobierz liczbę wszystkich zadań danego użytkownika
    const totalTodos = await this.prisma.todo.count({
      where: { userId: userid },
    });

    if (totalTodos === 0) return 0; // Unikamy dzielenia przez 0

    // Pobierz liczbę ukończonych zadań danego użytkownika
    const completedTodos = await this.prisma.todo.count({
      where: {
        userId: userid,
        done: true,
      },
    });

    // Oblicz procent ukończonych zadań
    const completionRate = (completedTodos / totalTodos) * 100;
    return Math.round(completionRate); // Zaokrąglamy do pełnych procentów
  }

  async addTodo(data: CreateTodoDto, userid: number) {
    return this.prisma.todo.create({
      data: {
        title: data.title,
        content: data.content,
        done: data.done,
        userId: userid,
        deadline: data.deadline,
      },
    });
  }

  editTodo(id: number, data: EditTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }

  get(id: number) {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }
}
