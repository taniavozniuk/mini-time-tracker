import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';

@Controller('time-entries')
export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Post()
  async create(@Body(ValidationPipe) createTimeEntryDto: CreateTimeEntryDto) {
    return this.timeEntryService.create(createTimeEntryDto);
  }

  @Get()
  async findAll() {
    try {
      return await this.timeEntryService.findAll();
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    }
  }
}
