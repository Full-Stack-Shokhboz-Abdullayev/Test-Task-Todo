import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBasicAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CONTROLLER_ROUTE } from './constants/controller.tokens';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryDto } from './dto/query.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags(CONTROLLER_ROUTE)
@Controller(CONTROLLER_ROUTE)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({ name: 'status', required: false })
  @Get()
  findAll(@Query() queryDto: QueryDto) {
    return this.tasksService.paginatedSort(queryDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }
}
