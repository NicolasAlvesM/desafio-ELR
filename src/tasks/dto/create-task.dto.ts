import { IsInt, IsOptional, IsString, IsEnum, ValidateNested  } from 'class-validator';

export enum TaskStatus {
    PENDING = 'pending',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
}

export class CreateTaskDto {
    @IsInt()
    user_id: number;

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(TaskStatus)
    status: TaskStatus;
}

