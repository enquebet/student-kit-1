import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRoutes from './pages/Routes';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';
import { LoadingState } from './components/common/LoadingState';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <Layout>
            <Suspense fallback={<LoadingState message="Loading page..." subtext="Retrieving application components" />}>
              <AppRoutes />
            </Suspense>
          </Layout>
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}
