
from playwright.sync_api import sync_playwright

def verify_logo():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("http://localhost:8080/index.html")

        # Wait for logo to be visible
        logo = page.locator(".app-logo")
        logo.wait_for(state="visible")

        # Take Screenshot
        page.screenshot(path="verification/logo_verification.png")
        print("Screenshot saved to verification/logo_verification.png")

        browser.close()

if __name__ == "__main__":
    verify_logo()
