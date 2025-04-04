import React from 'react';
import { Layout } from './components/Layout';
import { ChatContainer } from './components/ChatContainer';
import { VisualTimeline } from './components/VisualTimeline';
import { DocumentChecklist } from './components/DocumentChecklist';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto h-[calc(100vh-9rem)] sm:py-6 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
          <ChatContainer />
          <VisualTimeline />
          <DocumentChecklist />
        </div>
      </div>
      <Toaster />
    </Layout>
  );
}

export default App;