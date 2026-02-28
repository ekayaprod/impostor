from playwright.sync_api import sync_playwright

def verify_skeleton_delay():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/index.html")

        # 1. Add 3 players
        add_btn = page.locator("#addPlayerButton")
        for i in range(1, 4):
            add_btn.click()
            page.fill(f"#playerList li:nth-child({i}) input", f"Player {i}")

        # 2. Set Topic
        page.click("#setTopicButton")
        page.fill("#topicInput", "Test Topic")
        page.fill("#categoryInput", "Test Category")
        page.click("#saveAndExitTopicInputModalButton")

        # 3. Distribute Roles
        page.click("#distributeTopicButton")

        # 4. Wait for Screen 2 to be visible
        page.wait_for_selector("#screenDistributeTopic", state="visible")

        # 5. IMMEDIATELY take a screenshot to capture the skeleton state
        # The skeletons should be visible for 800ms
        page.screenshot(path="verification/skeleton_state.png")
        print("Captured skeleton state screenshot.")

        # 6. Wait for the real buttons to appear (after the 800ms timeout)
        page.wait_for_selector("#playerListForShowTopic li a.button", state="visible")

        # 7. Take another screenshot to show the final loaded state
        page.screenshot(path="verification/loaded_state.png")
        print("Captured loaded state screenshot.")

        # Verify aria-live announcements are present
        announcers = page.locator(".role-announcer").all_inner_texts()
        print(f"Aria-live announcements: {announcers}")

        browser.close()

if __name__ == "__main__":
    verify_skeleton_delay()
