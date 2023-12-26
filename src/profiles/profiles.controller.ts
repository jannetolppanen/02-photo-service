import { Controller, Get } from '@nestjs/common';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  async getAllProfiles() {
    return await this.profilesService.getAllProfiles();
  }
}
