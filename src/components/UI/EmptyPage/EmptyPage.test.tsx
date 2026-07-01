import { render, screen } from "@testing-library/react";
import EmptyPage from "./EmptyPage";

describe("<EmptyPage />", () => {
  test("component render", async () => {
    const title = "Hello World!";
    const contentParagraph = "This is the content";
    const ContentComponent = () => <p>{contentParagraph}</p>;

    render(<EmptyPage title={title} content={<ContentComponent />} />);

    const emptyPageTitle = await screen.getByTestId("empty_page_title");
    const emptyPageContent = await screen.getByTestId("empty_page_content");

    expect(emptyPageTitle).toHaveTextContent(title);
    expect(emptyPageContent).toHaveTextContent(contentParagraph);
  });
});
