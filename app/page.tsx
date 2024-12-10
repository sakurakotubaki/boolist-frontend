'use client';

import { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { getCurrentUser, signOut, User } from './lib/auth';
import { booksApi, Book } from './lib/api';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setLoading(false);
    if (currentUser) {
      fetchBooks();
    }
  };

  const fetchBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    setBooks([]);
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!user) {
    return <AuthForm onSuccess={checkAuth} />;
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user.username}!</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold">{book.title}</h3>
              <p className="text-gray-600">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
