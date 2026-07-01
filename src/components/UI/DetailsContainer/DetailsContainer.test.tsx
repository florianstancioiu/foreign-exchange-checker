import { render, screen } from "@testing-library/react";
import DetailsContainer from "./DetailsContainer";

describe("<DateRange />", () => {
  const HeaderContent = () => <h1>Header Content</h1>;
  const DetailsContainerChildren = () => <p>children</p>;

  test("component render", async () => {
    render(
      <DetailsContainer headerContent={<HeaderContent />}>
        <DetailsContainerChildren />
      </DetailsContainer>,
    );

    const headerContent = await screen.getByTestId(
      "details_container_header_content",
    );
    const childrenContent = await screen.getByTestId(
      "details_container_children",
    );

    expect(headerContent).toHaveTextContent("Header Content");
    expect(childrenContent).toHaveTextContent("children");
  });
});
