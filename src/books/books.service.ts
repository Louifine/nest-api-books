import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookRepository.save(createBookDto);
  }

  async findAll(): Promise<Book[]> {
    return `This action returns all books`;
  }

  findOne(id: number): Promise<Book> {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    return `This action updates a #${id} book`;
  }

  remove(id: number): Promise<string> {
    return `This action removes a #${id} book`;
  }
}

// Les 2 écritures suivantes sont identiques

// class cocorico {
//   private name:string;
//   constructor(paramName:string){
//     this.name = paramName;
//   }
// }

// class cocorico2 {
//   constructor(private name: string){

//   }
// }
