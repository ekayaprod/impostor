from playwright.sync_api import sync_playwright

def verify_players():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # Initial state: 0 players
        initial_players = page.locator("#playerList li")
        print(f"Initial player count: {initial_players.count()}")
        assert initial_players.count() == 0

        # Add 3 players
        add_btn = page.locator("#addPlayerButton")
        for i in range(1, 4):
            add_btn.click()
            # Wait for the input to appear and be focused
            page.wait_for_selector(f"#playerList li:nth-child({i}) input")
            page.fill(f"#playerList li:nth-child({i}) input", f"Player {i}")
            # Ensure blur to trigger change event immediately (for debounced inputs)
            page.keyboard.press("Tab")
            print(f"Added Player {i}")

        # Wait for debounce/animation to settle before verifying state persistence
        page.wait_for_timeout(500)

        # Verify count
        players = page.locator("#playerList li")
        print(f"Player count after adding: {players.count()}")
        assert players.count() == 3

        # Verify names
        for i in range(1, 4):
            name_input = page.locator(f"#playerList li:nth-child({i}) input")
            assert name_input.input_value() == f"Player {i}"

        # Verify aria-labels on delete buttons
        for i in range(1, 4):
            delete_btn = page.locator(f"#playerList li:nth-child({i}) .deletePlayer")
            expected_label = f"Remove Player {i}"
            print(f"Checking aria-label for Player {i}: {delete_btn.get_attribute('aria-label')}")
            assert delete_btn.get_attribute("aria-label") == expected_label

        # Reload page to verify persistence (and buildScreen1 logic)
        page.reload()

        # Wait for list to populate (buildScreen1 runs on load)
        page.wait_for_selector("#playerList li")

        reloaded_players = page.locator("#playerList li")
        print(f"Player count after reload: {reloaded_players.count()}")
        assert reloaded_players.count() == 3

        # Verify names again
        for i in range(1, 4):
            # Order might be preserved? localStorage stores array.
            name_input = page.locator(f"#playerList li:nth-child({i}) input")
            print(f"Player {i} name: {name_input.input_value()}")
            assert name_input.input_value() == f"Player {i}"

        print("Player verification passed!")
        browser.close()

if __name__ == "__main__":
    verify_players()
