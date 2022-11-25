import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.bookRepository.find();
  }

  async findOne(idValue: number): Promise<Book> {
    const bookfound = await this.bookRepository.findOneBy({ id: idValue });
    if (!bookfound) {
      throw new NotFoundException(`pas de bouquin avec l'id : ${idValue}`);
    }
    return bookfound;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const upBook = await this.findOne(id);
    upBook.dateParution = updateBookDto.dateParution;
    return await this.bookRepository.save(upBook);
  }

  async remove(id: number): Promise<string> {
    const result = await this.bookRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`pas de bouquin avec l'id : ${id}`);
    }
    return `the book with the id #${id} is now burning to hell yeah !`;
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
