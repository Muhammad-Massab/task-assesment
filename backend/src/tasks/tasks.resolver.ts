import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  createTask(@Args('input') input: CreateTaskInput): Promise<Task> {
    return this.tasksService.create(input);
  }

  @Mutation(() => Task)
  updateTask(
    @Args('id', { type: () => ID }) id: number,
    @Args('input') input: UpdateTaskInput,
  ): Promise<Task> {
    return this.tasksService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<boolean> {
    return this.tasksService.delete(id);
  }
}
