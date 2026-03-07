import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Admin')
@Controller('admin/dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    @ApiOperation({ summary: 'Retrieve dashboard statistics' })
    @ApiResponse({ status: 200, description: 'Dashboard statistics retrieved successfully' })
    async getDashboard() {
        const stats = await this.dashboardService.getDashboardStats();
        return { success: true, data: stats, message: 'Dashboard statistics' };
    }
}
