from playwright.sync_api import sync_playwright

def verify_visual_changes():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:3000/index.html")

        # 1. Capture Empty State
        page.screenshot(path="verification/1_empty_state.png")
        print("Captured empty state.")

        # 2. Add Players and Capture List
        add_btn = page.locator("#addPlayerButton")
        add_btn.click()
        page.fill("#playerList li:nth-child(1) input", "Picasso")

        add_btn.click()
        page.fill("#playerList li:nth-child(2) input", "Dali")

        # Ensure focus is on one of the inputs to show focus state if possible (though screenshot might not capture focus ring perfectly depending on OS/browser)
        page.click("#playerList li:nth-child(1) input")

        page.screenshot(path="verification/2_players_added.png")
        print("Captured player list state.")

        # 3. Hover over delete button (simulated by focusing it)
        # Playwright hover might not persist for screenshot unless we trick it, but focus should work for style check
        delete_btn = page.locator("#playerList li:nth-child(1) .deletePlayer")
        delete_btn.focus()
        page.screenshot(path="verification/3_delete_focus.png")
        print("Captured delete button focus state.")

        browser.close()

if __name__ == "__main__":
    verify_visual_changes()
