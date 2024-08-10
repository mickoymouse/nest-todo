import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Res() res: Response) {
    await this.todoService.create(createTodoDto);

    return res.status(HttpStatus.CREATED).json({ message: 'Todo created!' });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const todos = await this.todoService.findAll();

    return res.status(HttpStatus.OK).json(todos);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const todo = await this.todoService.findOne(+id);

    return res.status(HttpStatus.OK).json(todo);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Res() res: Response,
  ) {
    await this.todoService.update(+id, updateTodoDto);

    return res.status(HttpStatus.OK).json({ message: 'Todo updated!' });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    await this.todoService.delete(+id);

    return res.status(HttpStatus.OK).json({ message: 'Todo deleted!' });
  }
}
