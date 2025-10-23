import { render, screen } from '@testing-library/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Card from './Card'

test('renders title prop correctly', () => {
  render(<Card title="Hello World">Content</Card>)
  expect(screen.getByText(/Hello World/i)).toBeInTheDocument()
})

test('renders children correctly', () => {
  render(<Card>Card body content</Card>)
  expect(screen.getByText(/Card body content/i)).toBeInTheDocument()
})

test('renders icon correctly', () => {
  render(<Card title="With Icon" icon={<FontAwesomeIcon icon={faUser} data-testid="user-icon" />}>Icon test</Card>)
  expect(screen.getByTestId('user-icon')).toBeInTheDocument()
})