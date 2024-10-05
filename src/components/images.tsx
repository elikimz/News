import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopHeadlines, fetchNewsBySearch } from '../redux/newsSlice';
import { RootState, AppDispatch } from '../redux/store'; // Ensure RootState and AppDispatch are exported correctly

const NewsPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use AppDispatch type
  const { articles, loading, error } = useSelector((state: RootState) => state.news);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchNewsBySearch(searchTerm));
    } else {
      dispatch(fetchTopHeadlines());
    }
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">News Updates</h1>

        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">
          <input
            type="text"
            id="news-search"
            name="newsSearch"
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
            {articles.map((article: { url: string; urlToImage: string; title: string; description?: string }) => (
              <div key={article.url} className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={article.urlToImage}
                  alt={typeof article.title === 'string' ? article.title : 'News Article'}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-600 mb-4">{article.description || 'No description available.'}</p>
                  <a
                    href={typeof article.url === 'string' ? article.url : '#'}
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
