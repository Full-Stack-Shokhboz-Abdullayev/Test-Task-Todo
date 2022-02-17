import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PER_PAGE } from './constants/pagination-options';
import { CreateTaskDto } from './dto/create-task.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './models/task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}
  create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async paginatedSort({ page, ...sortOptions }: QueryDto) {
    const validPage = Math.max(0, page - 1) || 0;

    const queries = [
      this.taskModel
        .find()
        .skip(PER_PAGE * validPage)
        .limit(PER_PAGE)
        .sort(sortOptions),

      this.taskModel.count(),
    ];

    const [tasks, total] = await Promise.all(queries);

    return { tasks, total };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, {
      ...updateTaskDto,
    });
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id);
  }
}
