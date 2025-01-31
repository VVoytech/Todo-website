import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoNotfoundException } from '../../exceptions/todo-notfound-exception';
import { EditTodoDto } from './dto/edit-todo.dto';
import { TodoFilterDto } from './dto/todo-filter.dto';
import { TokenGuard } from '../auth/token.guard';
import { UserId } from '../auth/user.decorator';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @UseGuards(TokenGuard)
  listTodo(@Query() filter: TodoFilterDto, @UserId() userid: number) {
    return this.todoService.listTodo(filter, userid);
  }

  @Get('/time')
  @UseGuards(TokenGuard)
  deadlineTodo(@Query() filter: TodoFilterDto, @UserId() userid: number) {
    return this.todoService.deadlineTodo(filter, userid);
  }

  @Get('/completion-rate')
  @UseGuards(TokenGuard)
  async getCompletionRate(@UserId() userid: number) {
    const completionRate = await this.todoService.getCompletionRate(userid);
    return { completionRate };
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  async getTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.get(id);

    if (!todo) throw new TodoNotfoundException();

    return todo;
  }

  @Post()
  @UseGuards(TokenGuard)
  addTodo(@Body() data: CreateTodoDto, @UserId() userid: number) {
    return this.todoService.addTodo(data, userid);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(TokenGuard)
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    const todo = await this.todoService.get(id);
    if (!todo) throw new TodoNotfoundException();

    await this.todoService.deleteTodo(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  async editTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditTodoDto,
  ) {
    const todo = await this.todoService.get(id);
    if (!todo) throw new TodoNotfoundException();

    return this.todoService.editTodo(id, data);
  }
}
