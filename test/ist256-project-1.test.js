import { html, fixture, expect } from '@open-wc/testing';
import "../ist256-project-1.js";

describe("ist256Project1 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <ist256-project-1
        title="title"
      ></ist256-project-1>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
