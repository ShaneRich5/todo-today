import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import i18n from './i18n';
import { AuthProvider } from '../contexts/AuthContext';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0,
    },
  },
});

type TestProvidersProps = {
  children: React.ReactNode;
};

const TestProviders: React.FC<TestProvidersProps> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  </I18nextProvider>
);

const renderWithTestProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestProviders, ...options });

export { TestProviders, renderWithTestProviders }; // eslint-disable-line react-refresh/only-export-components
