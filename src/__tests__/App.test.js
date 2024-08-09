import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm (your name)`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm \(your name\)/i,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image with the correct alt text", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays a second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum dolor sit amet/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByLabelText(/name/i);
  const emailInput = screen.getByLabelText(/email/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");

  expect(checkboxes).toHaveLength(3);
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const checkboxes = screen.getAllByRole("checkbox");

  checkboxes.forEach((checkbox) => {
    expect(checkbox).not.toBeChecked();
  });
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/name/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");

  expect(screen.getByLabelText(/name/i)).toHaveValue("John Doe");
  expect(screen.getByLabelText(/email/i)).toHaveValue("john.doe@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const technologyCheckbox = screen.getByLabelText(/technology/i);
  const designCheckbox = screen.getByLabelText(/design/i);
  const marketingCheckbox = screen.getByLabelText(/marketing/i);

  userEvent.click(technologyCheckbox);
  expect(technologyCheckbox).toBeChecked();

  userEvent.click(designCheckbox);
  expect(designCheckbox).toBeChecked();

  userEvent.click(marketingCheckbox);
  expect(marketingCheckbox).toBeChecked();

  userEvent.click(technologyCheckbox);
  expect(technologyCheckbox).not.toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  userEvent.type(screen.getByLabelText(/name/i), "John Doe");
  userEvent.type(screen.getByLabelText(/email/i), "john.doe@example.com");
  
  userEvent.click(screen.getByRole("button", { name: /submit/i }));

  expect(screen.getByText(/thank you for signing up, john doe!/i)).toBeInTheDocument();
});
