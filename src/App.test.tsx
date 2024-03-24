import { renderWithTestProviders } from '@/lib/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

const renderApp = () =>
  renderWithTestProviders(
    <MemoryRouter initialEntries={[`/`]} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

describe('App Component', () => {
  it('renders sample text', () => {
    renderApp();
  });
});
