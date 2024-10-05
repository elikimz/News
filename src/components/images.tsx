import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '87ffefb85832433eb8aaa2a952ab7016'; // Your NewsAPI key

  // Fetch top headlines by default
  const fetchTopHeadlines = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          apiKey: apiKey,
          country: 'us', // You can change this to fetch news from a different country
          pageSize: 9, // Number of articles
        },
      });
      if (response.data.articles.length === 0) {
        throw new Error('No articles found for the selected country.');
      }
      setArticles(response.data.articles);
    } catch (err) {
      handleError(err); // Call handleError function
    } finally {
      setLoading(false);
    }
  };

  // Fetch news based on search term
  const fetchNewsBySearch = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          apiKey: apiKey,
          q: query,
          pageSize: 9, // Number of articles
        },
      });
      if (response.data.articles.length === 0) {
        throw new Error('No articles found for the search term.');
      }
      setArticles(response.data.articles);
    } catch (err) {
      handleError(err); // Call handleError function
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const errorResponse = err.response?.data as { message?: string }; // Define expected structure
      setError(`Failed to fetch news: ${errorResponse?.message || err.message}`);
    } else if (err instanceof Error) {
      setError(err.message); // Handle other types of errors
    } else {
      setError('An unknown error occurred'); // Fallback for unexpected errors
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      fetchNewsBySearch(searchTerm);
    } else {
      fetchTopHeadlines();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">News Updates</h1>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for news..."
            className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading news...</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!loading && !error && articles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <div key={article.url} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.description || 'No description available.'}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && articles.length === 0 && (
          <p className="text-center text-gray-500">No news articles found.</p>
        )}
      </div>

      <footer className="mt-12 text-center text-gray-500">
        <p>Powered by KimTech</p>
        <p>Email: elijahkimani1293@gmail.com | Phone: 0791337188</p>
      </footer>
    </div>
  );
};

export default NewsPage;
