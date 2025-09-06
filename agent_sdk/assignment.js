import 'dotenv/config';
import { Agent, run, tool } from '@openai/agents';
import { z } from 'zod';

import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: false,
  chromiumSandbox: true,
  env: {},
  args: ['--disable-extensions', '--disable-file-system'],
});

const page = await browser.newPage();

const takeScreenShot = tool({
  name: 'take_screenshot',
  // Return base64 image
});

const openBrowser = tool({
  name: 'open_browser',
});

const openURL = tool({
  name: 'open_url',
});

const clickOnScreen = tool({
  name: 'click_screen',
  description: 'Clicks on the screen with specified co-ordinates',
  parameters: z.object({
    x: z.number().describe('x axis on the screen where we need to click'),
    y: z.number().describe('Y axis on the screen where we need to click'),
  }),
  async execute(input) {
    input.x;
    input.y;
    page.mouse.click(input.x, input.y);
  },
});

const sendKeys = tool({
  name: 'send_keys',
});

// Double Click, Scroll

const websiteAutomationAgent = new Agent({
  name: 'WebSite Automation Agent',
  instructions: `
  You are this and that agent

  Rules:
  - Always call the 'take_screenshot' tool after each step to see what is happening on the screen.
  - After taking screenshot, plan the next action what needs to be done.
  `,
});

// Go to piyushgarg.dev and submit the contact form with these details
