from playwright.sync_api import sync_playwright
import time

def verify_polish():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()

        # Add console listener
        page.on("console", lambda msg: print(f"BROWSER: {msg.text}"))

        page.goto("http://localhost:8080/index.html")

        # Add Players
        page.locator("#addPlayerButton").click()
        page.locator("#addPlayerButton").click()
        if page.locator("#playerList li").count() < 3:
            page.locator("#addPlayerButton").click()

        # Set Topic
        page.locator("#setTopicButton").click()
        page.locator("#topicInput").fill("Secret Agent")
        page.locator("#categoryInput").fill("Professions")
        page.locator("#saveAndExitTopicInputModalButton").click()

        # Click Distribute
        distribute_btn = page.locator("#distributeTopicButton")
        # Screenshot before click
        page.screenshot(path="verification_distribute_before.png")

        distribute_btn.click(force=True, no_wait_after=True)

        # Wait for text update (Loading state)
        time.sleep(0.1)
        page.screenshot(path="verification_distribute_loading.png")

        page.wait_for_selector("#screenDistributeTopic", state="visible")

        role_buttons = page.locator("#playerListForShowTopic button")

        first_role = role_buttons.first
        first_role_name = first_role.inner_text()
        print(f"Clicking first role: {first_role_name}")
        first_role.click()

        page.wait_for_selector("#showRoleModal", state="visible")
        page.screenshot(path="verification_modal_open.png")

        # Check if button is marked revealed/disabled
        time.sleep(0.1)

        close_btn = page.locator("#showRoleModal button[data-close]").first
        close_btn.click()

        page.wait_for_selector("#showRoleModal", state="hidden")

        # Wait a bit longer to be safe
        time.sleep(1.0)

        # Check if element is gone
        remaining = role_buttons.count()
        print(f"Remaining buttons: {remaining}")

        active_tag = page.evaluate("document.activeElement.tagName")
        active_text = page.evaluate("document.activeElement.innerText")
        print(f"Active element: {active_tag} - {active_text}")

        if remaining == 2 and "Player" in active_text:
             print("✅ Success: Focus moved to next player button.")
        else:
             print("❌ Failure: Focus management incorrect.")

        page.screenshot(path="verification_modal_closed.png")
        browser.close()

if __name__ == "__main__":
    verify_polish()
