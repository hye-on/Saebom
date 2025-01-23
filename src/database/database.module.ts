import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from './mikro-orm.config';

@Module({
  imports: [MikroOrmModule.forRoot(config)],
  exports: [MikroOrmModule],
})
export class DatabaseModule {}
