import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { User } from './domain/user/entity/user.entity';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'admin',
      password: 'temppassword',
      database: 'simpleTemplate',
      entities: [User],
      synchronize: false, // production에서는 끄기, 데이터가 날아갈 수 있다.
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
