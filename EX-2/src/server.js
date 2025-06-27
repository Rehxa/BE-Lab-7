import sequelize from "./db/database.js";
import Author from "./models/author.js";
import Book from "./models/book.js";

const sequel = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const insertData = async () => {
      try {
        const authors = await Author.bulkCreate([
          { name: "Ronan The Best", birthYear: 1990 },
          { name: "Kim Ang", birthYear: 1995 },
          { name: "Hok Tim", birthYear: 2015 },
        ]);

        const books = await Book.bulkCreate([
          // Ronan The Best
          {
            title: "Harry Potter and the Sorcerer's Stone",
            publicationYear: 1997,
            pages: 309,
            AuthorId: authors[0].id,
          },
          {
            title: "Harry Potter and the Chamber of Secrets",
            publicationYear: 1998,
            pages: 341,
            AuthorId: authors[0].id,
          },

          // Kim Ang
          {
            title: "A Game of Thrones",
            publicationYear: 1996,
            pages: 694,
            AuthorId: authors[1].id,
          },
          {
            title: "A Clash of Kings",
            publicationYear: 1998,
            pages: 768,
            AuthorId: authors[1].id,
          },

          // Hok Tim
          {
            title: "Norwegian Wood",
            publicationYear: 1987,
            pages: 296,
            AuthorId: authors[2].id,
          },
          {
            title: "Kafka on the Shore",
            publicationYear: 2002,
            pages: 505,
            AuthorId: authors[2].id,
          },
        ]);
      } catch (error) {
        console.error("Error inserting Data", error);
      }
    };

    const findBookByAuthor = async (authorId) => {
      try {
        const books = await Book.findAll({ where: { AuthorId: authorId } });
        console.log(
          `Books by Author ID ${authorId}:`,
          books.map((book) => book.toJSON())
        );
      } catch (error) {
        console.error("Error finding books by author", error);
      }
    };

    const createNewBook = async (authorId) => {
      try {
        const findAuthor = await Author.findOne({ where: { id: authorId } });
        if (findAuthor.length == 0) {
          console.log(`Author with ID ${authorId} not found.`);
          return;
        }
        const newBook = await findAuthor.createBook({
          title: "Title",
          publicationYear: 2025,
          pages: 365,
        });
      } catch (error) {
        console.error("Error create new book", error);
      }
    };

    const listAllAuthorsWithBooks = async () => {
      try {
        const findAuthorAndBooks = await Author.findAll({
          include: { model: Book },
        });
        console.log(
          "All Authors with Books:",
          findAuthorAndBooks.map((author) => ({
            id: author.id,
            name: author.name,
            birthYear: author.birthYear,
            books: author.Books.map((book) => book.title),
          }))
        );
      } catch (error) {
        console.error("Error listing authors with books", error);
      }
    };

    //Insert data into the database
    await insertData();
    //Find books by author
    await findBookByAuthor(1);
    await findBookByAuthor(2);
    await findBookByAuthor(3);
    // Create a new book for an existing author
    await createNewBook(1);
    // List all authors with their books
    await listAllAuthorsWithBooks();
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await sequelize.close();
  }
};

sequel();
// TODO - Export the model User;
