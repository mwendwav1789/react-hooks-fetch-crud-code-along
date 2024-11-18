import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import ShoppingList from "./ShoppingList"; // adjust the import path

test("adds a new item to the list when the ItemForm is submitted", async () => {
  render(<ShoppingList />);

  // Add a new item
  fireEvent.change(screen.getByLabelText(/Name:/), {
    target: { value: "Ice Cream" },
  });
  fireEvent.change(screen.getByLabelText(/Category:/), {
    target: { value: "Dessert" },
  });
  fireEvent.submit(screen.getByRole("button", { name: /Add Item/i }));

  // Check if the new item appears in the list
  const iceCream = await screen.findByText(/Ice Cream/);
  expect(iceCream).toBeInTheDocument();
});

test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  render(<ShoppingList />);

  // Find the "Add to Cart" button and click it
  const addButton = screen.getByText(/Add to Cart/);
  fireEvent.click(addButton);

  // Wait for the button text to change
  const removeButton = await screen.findByText(/Remove from Cart/i);
  expect(removeButton).toBeInTheDocument();
});

test("removes an item from the list when the delete button is clicked", async () => {
  render(<ShoppingList />);

  // Click the delete button for the first item
  const deleteButtons = screen.getAllByText(/Delete/);
  fireEvent.click(deleteButtons[0]);

  // Wait for the item to be removed
  await waitForElementToBeRemoved(() => screen.queryByText(/Yogurt/));
});
