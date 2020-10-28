import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { GetUser } from "src/auth/get-user.decorator"
import { User } from "src/auth/user.entity"
import { CreateTaskDto } from "./dto/create-task.dto"
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto"
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe"
import { TaskStatus } from "./task-status.enum"
import { Task } from "./task.entity"
import { TasksService } from "./tasks.service"

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return this.tasksService.getTasks(filterDto)
  }

  @Get(":id")
  getTaskById(@Param("id", ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user)
  }

  @Delete(":id")
  deleteTask(@Param("id", ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteById(id)
  }

  @Patch(":id/status")
  patchStatusById(
    @Param("id", ParseIntPipe) id: number,
    @Body("status", TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.tasksService.patchStatusById(id, status)
  }
}
