
import { Injectable} from '@angular/core';
import { Book } from 'src/app/models/Book';
import { BookApiService } from './api/book-api.service';

@Injectable()
export class BookService {

  private testData : Book[] = [
    new Book(
      "Sunshine",
      ["Alex Garland"],
      "http://books.google.com/books/content?id=uqhlAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    ),
    new Book(
      "Ex Machina",
      ["Alex Garland"],
      "http://books.google.com/books/content?id=yvFMBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    ),
    new Book(
      "Annihilation",
      ["Alex Garland"],
      "http://books.google.com/books/content?id=pjBHDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    )
  ]

  constructor(private bookApiService : BookApiService) { }


  getBooks(author : string )  : Promise<Book[]> {
    return new Promise((resolve, reject) => {
       this.bookApiService.request(author).subscribe((books : any)=>{

        let results : Book[] = books.items.map((book : any) => {
          return new Book(
            book.volumeInfo.title,
            book.volumeInfo.authors,
            book.volumeInfo.imageLinks.thumbnail
          )
        })
          resolve(books);
       },
       (error)=>{
          console.log(error);
          reject(error);
        }
       )
    });
  }

  /*private getSafe<T> (f: () => T) : T {
    try {
      return f();
    } catch (error) {
      return undefined;
    }
  } */
}
