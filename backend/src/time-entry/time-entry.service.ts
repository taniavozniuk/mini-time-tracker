import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTimeEntryDto } from './dto/create-time-entry.dto';

@Injectable()
export class TimeEntryService {
  constructor(private prisma: PrismaService) {}

  async create(createTimeEntryDto: CreateTimeEntryDto) {
    const date = new Date(createTimeEntryDto.date);
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const existingEntries = await this.prisma.timeEntry.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    const totalHoursForDay = existingEntries.reduce(
      (sum, entry) => sum + entry.hours,
      0,
    );

    if (totalHoursForDay + createTimeEntryDto.hours > 24) {
      throw new BadRequestException(
        `Максимальна кількість годин на день - 24. На цю дату вже записано ${totalHoursForDay.toFixed(2)} годин.`,
      );
    }

    return this.prisma.timeEntry.create({
      data: {
        date: date,
        project: createTimeEntryDto.project,
        hours: createTimeEntryDto.hours,
        description: createTimeEntryDto.description,
      },
    });
  }

  async findAll() {
    try {
      return await this.prisma.timeEntry.findMany({
        orderBy: {
          date: 'desc',
        },
      });
    } catch (error) {
      console.error('Error in findAll service:', error);
      throw error;
    }
  }

  async findOne(id: number) {
    const entry = await this.prisma.timeEntry.findUnique({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException(`Запис з ID ${id} не знайдено`);
    }

    return entry;
  }
}
