from playwright.sync_api import sync_playwright

def verify_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # Check Title
        print(f"Page title: {page.title()}")
        assert "Modern Art Impostor - Game Assistant" in page.title()

        # Check Heading
        heading = page.query_selector("h1")
        print(f"Heading: {heading.inner_text()}")
        assert "Impostor Game Assistant" in heading.inner_text()

        # Check Buttons
        add_player_btn = page.locator("#addPlayerButton")
        print(f"Add Player Button: {add_player_btn.inner_text()}")
        assert "Add New Player" in add_player_btn.inner_text()

        random_topic_btn = page.locator("#randomTopicButton")
        print(f"Random Topic Button: {random_topic_btn.inner_text()}")
        assert "Pick Random Topic" in random_topic_btn.inner_text()

        set_topic_btn = page.locator("#setTopicButton")
        print(f"Set Topic Button: {set_topic_btn.inner_text()}")
        assert "Set Custom Topic" in set_topic_btn.inner_text()

        # Check Category Display
        category_display = page.locator("#categoryDisplay")
        print(f"Category Display: {category_display.inner_text()}")
        assert "No category selected" in category_display.inner_text()

        # Take Screenshot
        page.screenshot(path="verification_screenshot.png")
        print("Screenshot saved to verification_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_changes()
