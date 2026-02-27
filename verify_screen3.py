from playwright.sync_api import sync_playwright

def verify_screen3():
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

        # 4. Reveal Roles (simulate clicking through)
        # In Screen 2, there is a list of buttons.
        # We need to click each, then close the modal.

        # We can see the list of players in #playerListForShowTopic
        # Logic:
        # Click first button. Modal opens. Close modal. Button removed/hidden.
        # Repeat until start button appears.

        # Actually, clicking the button opens the modal.
        # Closing the modal (via 'Got it') triggers handleRoleModalClose which removes the li.

        for _ in range(3):
            # Click the first available reveal button
            page.click("#playerListForShowTopic li:first-child a")

            # Wait for modal
            page.wait_for_selector("#showRoleModal", state="visible")

            # Click "Got it" (which has data-close)
            page.click("#showRoleModal button[data-close]")

            # Wait for modal to close
            page.wait_for_selector("#showRoleModal", state="hidden")

            # Wait for animation/removal (handleRoleModalClose has a timeout/animation listener)
            page.wait_for_timeout(500)

        # 5. Start Game
        # Start button should be visible now
        page.wait_for_selector("#startButton", state="visible")
        page.click("#startButton")

        # 6. Verify Screen 3
        page.wait_for_selector("#screenGameInProgress", state="visible")

        players = page.locator("#playerListForGameInProgress li")
        count = players.count()
        print(f"Players in game: {count}")
        assert count == 3

        # Check content
        texts = players.all_inner_texts()
        print(f"Player names: {texts}")
        assert "Player 1" in texts
        assert "Player 2" in texts
        assert "Player 3" in texts

        print("Screen 3 verification passed!")
        browser.close()

if __name__ == "__main__":
    verify_screen3()
