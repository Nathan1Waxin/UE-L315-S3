/*utiliser des bout de code du site https://khajehossini.medium.com/nestjs-create-crud-and-mongo-and-softdelete-f6f74008057 
pour faire mon exercice nottament le update et le remove.*/
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>
) { }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findOne(id: string): Promise<Users> {
    return await this.usersModel.findOne({ where: { id: id } });  
   }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const ID = { _id: id };
    await this.usersModel.updateOne(ID, updateUserDto);
  }

  async remove(id: string) {
    const ID  = { _id: id };
    await this.usersModel.deleteOne(ID);
  }

}

