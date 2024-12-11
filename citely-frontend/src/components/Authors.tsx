import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Author.module.css';

// Define the type for an author
type Author = {
  id: string;
  name: string;
  bio: string;
  image: string;
  quoteCount: number;
};

// Define the type for the error message
type ErrorMessage = string | null;

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>([]); // Explicitly typing authors as an array of Author objects
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(null); // Updated to handle string | null
  const [selectedSort, setSelectedSort] = useState<'name' | 'quoteCount'>('name');
  const router = useRouter();

  // Declare a mapping for authors and their images
  const authorImages: Record<string, string> = {
    '14th Dalai Lama': '/authors/0.jpg',
    'A. A. Milne': '/authors/AA.jpg',
    'A. P. J. Abdul Kalam': '/authors/K.jpg',
    'A. Powell Davies': '/authors/P.jpg',
    'Abigail Adams': '/authors/Abigail.jpg',
    'Abraham Lincoln': '/authors/L.jpg',
    'Abraham Maslow': '/authors/Abraham.jpg',
    'Adam Smith': '/authors/Smith.jpg',
    'Aeschylus': '/authors/Aeschylus.jpg',
    'Aesop': '/authors/A.jpg',
    'Afrika Bambaataa': '/authors/Afrika.jpg',
    'Agatha Christie': '/authors/Agatha.jpg',
    'Akhenaten': '/authors/Akhenaten.jpg',
    'Alan Cohen': '/authors/Leonard.jpg',
    'Alan Watts': '/authors/Watts.jpg',
    'Albert Camus': '/authors/C.jpg',
    'Albert Einstein': '/authors/ETH.jpg',
    'Albert Schweitzer': '/authors/Schweitzer.jpg',
    'Aldous Huxley': '/authors/Huxley.jpg',
    'Alexander Chalmers': '/authors/Alexander.jpg',
    // Add more mappings as needed
  };

  type AuthorApiResponse = {
    _id: string;
    name: string;
    bio: string;
    quoteCount: number;
  };

  // Fetch authors data from API
  useEffect(() => {
    const fetchAuthors = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch('https://api.quotable.io/authors');
        const data = await response.json();

        if (data && data.results) {
          // Map the API response to your Author type
          setAuthors(
            data.results.map((author: AuthorApiResponse) => ({
              id: author._id,
              name: author.name,
              bio: author.bio,
              image: authorImages[author.name] || '/images/default_author.jpg',
              quoteCount: author.quoteCount,
            }))
          );
          sortAuthors(); // Sort by default option
        } else {
          setErrorMessage('Les données retournées ne sont pas dans le format attendu.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthors();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Sort authors based on the selected criteria
  const sortAuthors = () => {
    if (selectedSort === 'name') {
      setAuthors((prevAuthors) =>
        [...prevAuthors].sort((a, b) => a.name.localeCompare(b.name))
      );
    } else if (selectedSort === 'quoteCount') {
      setAuthors((prevAuthors) =>
        [...prevAuthors].sort((a, b) => b.quoteCount - a.quoteCount)
      );
    }
  };

  const handleSortChange = (sortValue: 'name' | 'quoteCount') => {
    setSelectedSort(sortValue);
    sortAuthors();
  };

  const handleAuthorClick = (authorId: string) => {
    router.push(`/author/${authorId}`); // Navigate to the author's detail page
  };

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <video className={styles.bgVideo} autoPlay muted loop>
          <source src="/videos/2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className={styles.title}>Authors</h1>
      </section>

      <div className={styles.sortContainer}>
        <span className={styles.sortLabel}>Sort By:</span>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="sort-authors"
              value="name"
              checked={selectedSort === 'name'}
              onChange={() => handleSortChange('name')}
            />
            <span className={styles.radioLabel}>Name</span>
          </label>
          <label>
            <input
              type="radio"
              name="sort-authors"
              value="quoteCount"
              checked={selectedSort === 'quoteCount'}
              onChange={() => handleSortChange('quoteCount')}
            />
            <span className={styles.radioLabel}>Quote Count</span>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className={styles.authorsSection}>
          {authors.map((author) => (
            <div
              key={author.id}
              className={styles.authorCard}
              style={{ backgroundImage: `url(${author.image})` }}
              onClick={() => handleAuthorClick(author.id)}
            >
              <div className={styles.authorInfo}>
                <div className={styles.authorName}>{author.name}</div>
                <div className={styles.quoteCount}>Quotes: {author.quoteCount}</div>
                <div className={styles.authorBio}>{author.bio}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Authors;
