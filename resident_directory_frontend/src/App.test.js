import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the opened book shell", () => {
  render(<App />);
  expect(screen.getByLabelText(/resident directory/i)).toBeInTheDocument();
  expect(screen.getByText(/residents/i)).toBeInTheDocument();
  expect(screen.getByText(/details/i)).toBeInTheDocument();
});
