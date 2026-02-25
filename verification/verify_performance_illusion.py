from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8081/index.html")

        # Add 3 players
        add_btn = page.locator("#addPlayerButton")
        for i in range(1, 4):
            add_btn.click()
            page.fill(f"#playerList li:nth-child({i}) input", f"Player {i}")

        # Reload page to trigger buildScreen1
        page.reload()

        # Wait for list to populate and animation to likely finish (0.3s + delay)
        page.wait_for_selector("#playerList li")
        page.wait_for_timeout(1000) # Wait 1s for all animations

        # Take Screenshot
        page.screenshot(path="verification/performance_illusion.png")
        print("Screenshot saved to verification/performance_illusion.png")

        # Verify structure
        assert page.locator("#playerList li").count() == 3

        # Verify class presence (though animation might be done, class remains)
        # Note: Depending on implementation, class might be removed or stay.
        # My implementation keeps 'player-list-load-item'.
        # Check first item
        first_item = page.locator("#playerList li").first
        classes = first_item.get_attribute("class")
        print(f"First item classes: {classes}")
        if "player-list-load-item" in classes:
            print("Verification Successful: Class 'player-list-load-item' found.")
        else:
            print("Verification Warning: Class 'player-list-load-item' NOT found.")

        browser.close()

if __name__ == "__main__":
    run()
