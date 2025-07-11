import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';
import LandingPage from './components/LandingPage';
import ChatPage from './components/ChatPage';

function App() {
  return (
    <Router>
      <StagewiseToolbar
        config={{
          plugins: [ReactPlugin],
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;