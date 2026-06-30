import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

test("component render", async () => {
  render(<Button>Hello World</Button>);

  const button = await screen.getByTestId("button");

  expect(button).toHaveTextContent("Hello World");
});

test("click event", async () => {
  const onClick = vitest.fn();
  render(<Button onClick={onClick}>Hello World</Button>);

  const button = await screen.getByTestId("button");
  await userEvent.click(button);

  expect(onClick).toHaveBeenCalledOnce();
});
