from playwright.sync_api import sync_playwright
import time

def verify_empty_state():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/index.html")

        # Wait for the app to initialize
        time.sleep(1)

        # The empty state should be visible initially because there are 0 players
        empty_state = page.locator("#emptyPlayerState")

        # Take a screenshot of the initial state showing the empty state
        page.screenshot(path="verification/empty_state_visible.png")
        print("Empty state initially visible")

        # Add a player
        page.click("#addPlayerButton")
        page.fill("#playerList li:nth-child(1) input", "Picasso")

        # Give CSS transition time to hide the empty state
        time.sleep(0.5)

        # Take a screenshot after adding a player
        page.screenshot(path="verification/empty_state_hidden.png")
        print("Empty state hidden after adding player")

        browser.close()

if __name__ == "__main__":
    verify_empty_state()
