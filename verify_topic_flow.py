from playwright.sync_api import sync_playwright

def verify_topic_flow():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto("http://localhost:8080/index.html")

        print("Navigated to home page.")

        # Open Topic Input Modal
        page.click("#setTopicButton")
        print("Clicked 'Set Custom Topic' button.")

        # Wait for modal to be visible
        page.wait_for_selector("#topicInputModal", state="visible")
        print("Modal is visible.")

        # Attempt to save with empty fields
        page.click("#saveAndExitTopicInputModalButton")
        print("Clicked 'Save' with empty fields.")

        # Check for error state
        error_msg = page.wait_for_selector("#topicErrorMsg", state="visible")
        print(f"Error message visible: {error_msg.inner_text()}")

        # Capture screenshot of error state
        page.screenshot(path="verification/topic_modal_error.png")
        print("Saved screenshot: verification/topic_modal_error.png")

        # Fill in valid topic but empty category
        page.fill("#topicInput", "Secret Topic")
        print("Filled topic input.")
        page.click("#saveAndExitTopicInputModalButton")
        print("Clicked 'Save' with empty category.")

        # Check for error state again (should still be visible or updated)
        # We expect it to still be visible if category is missing
        error_msg = page.wait_for_selector("#topicErrorMsg", state="visible")
        print(f"Error message visible: {error_msg.inner_text()}")

        # Capture screenshot of partial error state
        page.screenshot(path="verification/topic_modal_partial_error.png")
        print("Saved screenshot: verification/topic_modal_partial_error.png")

        # Fill in valid category
        page.fill("#categoryInput", "Hint Category")
        print("Filled category input.")

        # Click save
        page.click("#saveAndExitTopicInputModalButton")
        print("Clicked 'Save' with all valid fields.")

        # Wait for modal to close (or check if it's hidden)
        page.wait_for_selector("#topicInputModal", state="hidden")
        print("Modal is hidden.")

        # Verify category display updated
        category_display = page.inner_text("#categoryDisplay")
        print(f"Category Display: {category_display}")
        assert "Hint Category" in category_display

        # Capture success screenshot
        page.screenshot(path="verification/topic_modal_success.png")
        print("Saved screenshot: verification/topic_modal_success.png")

        browser.close()

if __name__ == "__main__":
    verify_topic_flow()
