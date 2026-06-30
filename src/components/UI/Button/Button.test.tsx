import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("loads and displays greeting", async () => {
  // ARRANGE
  render(<Button>Hello World</Button>);

  const button = await screen.getByTestId("button");

  // ACT
  await userEvent.click(button);

  // ASSERT
  expect(button).toHaveTextContent("Hello World");
});
