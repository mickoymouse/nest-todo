import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import * as schema from '../drizzle/schema';
import { todo } from '../drizzle/schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.db.insert(todo).values(createTodoDto);
  }

  async findAll() {
    return await this.db.select().from(todo);
  }

  async findOne(id: number) {
    return this.db.query.todo.findFirst({
      where: eq(todo.id, id),
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    return await this.db.update(todo).set(updateTodoDto).where(eq(todo.id, id));
  }

  async delete(id: number) {
    return await this.db.delete(todo).where(eq(todo.id, id));
  }
}
