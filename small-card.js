import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class SmallCard extends DDDSuper(LitElement) {

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
        margin-top: var(--ddd-spacing-1);
        margin-bottom: var(--ddd-spacing-1); //4px, 8px, 12px, 16px, 20px, 24px
        font-size: var(--ddd-font-size-4xs);
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
        width: 100%;
        height: 100%;
      }

      button {
        height: 32px;
        background-color: var(--ddd-theme-default-beaverBlue);
        color: var(--ddd-theme-default-white);
        font-weight: var(--ddd-font-weight-bold, 700);
        font-size: var(--ddd-spacing-4); //16px
      }
      button:hover, button:focus {
        background-color: var(--ddd-theme-default-beaver70);
      }
    `];
  }

  convertUnixToDate(unixTimestamp) {
    // Convert to milliseconds
    const date = new Date(unixTimestamp * 1000);
    
    // Format the date to a string
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false // Change to true for 12-hour format
    };
    
    // Format the date and return the string
    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate; // Return the formatted date string
  }


  render() {
    return html`
      <a href="${this.domain}/${this.slug}" target="_blank">
        <img src="${this.logo}" alt="${this.title}"/>
        <div class="text-wrapper">
          <h4>${this.title}</h4>
          <p>Last Updated: ${this.convertUnixToDate(this.lastUpdated)}</p>
          <p>${this.description}</p>
          <!-- <button onclick="location.href='${this.domain}/${this.slug}';">Link to page</button> -->
          <button onclick="event.stopPropagation(); event.preventDefault(); window.open('${this.domain}/${this.slug}', '_blank');">Link to page</button>
          <button onclick="event.stopPropagation(); event.preventDefault(); window.open('${this.domain}/${this.source}', '_blank');">Link to source</button>
          <!-- event.stopPropagation() stops the button from following the a tag. event.preventDefault() prevents the anchor's default action -->
          <!-- Nested <a> tags are illegal -->
        </div>
      </a>
      </div>
    `;
  }
  static get tag() {
    return "small-card";
  }
}
customElements.define(SmallCard.tag, SmallCard);