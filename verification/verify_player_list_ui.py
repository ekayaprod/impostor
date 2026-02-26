from playwright.sync_api import sync_playwright

def verify_ui():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/index.html")

        # Add players
        page.click("#addPlayerButton")
        page.click("#addPlayerButton")
        page.click("#addPlayerButton")

        # Fill names
        page.fill("#playerList li:nth-child(1) input", "Alice")
        page.fill("#playerList li:nth-child(2) input", "Bob")
        page.fill("#playerList li:nth-child(3) input", "Charlie")

        # Trigger blur to save
        page.click("h1")

        # Wait for potential animations
        page.wait_for_timeout(500)

        # Screenshot
        page.screenshot(path="verification/player_list.png")
        print("Screenshot saved to verification/player_list.png")

        browser.close()

if __name__ == "__main__":
    verify_ui()
