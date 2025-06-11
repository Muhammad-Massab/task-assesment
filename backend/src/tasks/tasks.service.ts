import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  create(createTaskInput: CreateTaskInput): Promise<Task> {
    const task = this.tasksRepository.create(createTaskInput);
    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskInput: UpdateTaskInput): Promise<Task> {
    const task = await this.findOne(id);
    return this.tasksRepository.save({ ...task, ...updateTaskInput });
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return true;
  }
}
