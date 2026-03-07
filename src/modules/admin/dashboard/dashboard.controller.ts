import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    async getDashboard() {
        const stats = await this.dashboardService.getDashboardStats();
        return { success: true, data: stats, message: 'Dashboard statistics' };
    }
}
