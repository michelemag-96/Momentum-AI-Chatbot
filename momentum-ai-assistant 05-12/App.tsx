
import React from 'react';
import Chat from './components/Chat';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-bold text-white">Momentum - Circular Wellness</h1>
          <p className="text-sm text-gray-400">Assistente Virtuale</p>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <Chat />
      </main>
    </div>
  );
};

export default App;
