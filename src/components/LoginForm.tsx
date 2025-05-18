
import { useState, FormEvent } from 'react';
import { useAuth } from '../firebase/hooks';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-restaurant-black px-4">
      <div className="w-full max-w-md p-8 bg-restaurant-dark rounded-lg shadow-lg animate-zoom-in">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">
            <span className="text-restaurant-yellow">Admin</span> Login
          </h2>
          <p className="text-gray-400 mt-2">
            Access the restaurant management dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-restaurant-gray bg-opacity-50 rounded-lg border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-restaurant-gray bg-opacity-50 rounded-lg border border-gray-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-restaurant-yellow"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-restaurant-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Default credentials for testing:</p>
          <p>Email: subus39@gmail.com</p>
          <p>Password: subus39@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
