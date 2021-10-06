import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // updated to resolve test fail
  const linkElement = screen.getByText('ListPage');
  expect(linkElement).toBeInTheDocument();
});
