import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { Header, ProgressBar, Steps } from './components';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="flex-1 py-10 px-4">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
            <ProgressBar />
            <Steps />
          </div>
        </main>
      </div>
    </Provider>
  )
}

export default App;
