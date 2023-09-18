'use client';
import { useState } from 'react';
import {useSignupMutation} from '@/app/hooks/use-signup';

const Signup = () => {
  const [, signup] = useSignupMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // サインアップ処理（API呼び出し等）
    const result = await signup({email, password, username: email});
    console.log(result);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
