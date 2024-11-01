import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class SmallCard extends LitElement {

  constructor() {
    super();
    this.title = 'Title';
    this.lastUpdated = 'Last Updated'; 
    this.description = 'Description';
    this.logo = '';
    this.slug = 'Slug'; 
    this.source = 'Source';
    this.domain
  }

  static get properties() {
    return {
      title: { type: String },
      lastUpdated: { type: String },
      description: { type: String },
      logo: { type: String },
      slug: { type: String },
      source: { type: String },
      domain: { type: String },
    };
  }

  static get styles() {
    return [css`
      :host {
        display: flex;
        flex: 1 1 calc(33.33% - 8px);
        max-width: 632px;
        min-width: 200px;
        max-height: 600px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--ddd-spacing-4); //16px;

        box-sizing: border-box;
        border: var(--ddd-border-md);
        border-color: var(--ddd-theme-default-limestoneGray);
        border-radius: var(--ddd-radius-xs);
        box-shadow: var(--ddd-boxShadow-md);

        text-wrap: wrap;
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: var(--ddd-spacing-4); //16px
        width: 100%;
        max-width: 300px;

        display: inline-block;
        overflow-wrap: break-word;
        word-wrap: break-word; //wraps the "one word" links
      }

      h4, p {
        margin-top: 4px;
        margin-bottom: 4px;
        font-size: 16px;
      }

      img {
        width: 100px;
        height: 100px;
        object-fit: cover;
      }

      a {
        text-decoration: inherit;
        color: inherit;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `];
  }

  render() {
    return html`
      <a href="${this.domain}/${this.slug}">
        <img src="${this.logo}"/>
        <div class="text-wrapper">
          <h4>${this.title}</h4>
          <p>${this.lastUpdated}</p>
          <p>${this.description}</p>
          <button onclick="location.href='${this.domain}/${this.slug}';">Link to page</button>
          <p>${this.domain}/${this.slug}</p>
          <button onclick="location.href='${this.domain}/${this.source}';">Link to source</button>
          <p>${this.domain}/${this.source}</p>
          <!-- Nested <a> tags are illegal -->
        </div>
      </a>
    `;
  }
  static get tag() {
    return "small-card";
  }
}
customElements.define(SmallCard.tag, SmallCard);