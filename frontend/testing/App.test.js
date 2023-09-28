/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent,cleanup,waitFor  } from '@testing-library/react';
import App from '../src/App';


//Use a mock function for axios
import axios from 'axios';
jest.mock('axios');

afterEach(cleanup);

test('renders the landing page', async () => {
  render(
    <App />
  )
  const text = screen.getByTestId("app");
  expect(text).toBeInTheDocument();

  const btn = screen.getByTestId("btnUsr");
  expect(btn).toBeInTheDocument();
});

test('test Enter Name Click', async () => {
  var response = { 'data': [{ 'name': 'test' }] }
  axios.get.mockResolvedValue(response);
  render(
    <App />
  )
  const btn = screen.getByTestId("btnUsr");
  fireEvent.click(btn);
  await waitFor(() => {
    const pnl = screen.getByTestId("pnlTopics");
    expect(pnl).toBeInTheDocument();
  })


})

