import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import '@haxtheweb/simple-icon/simple-icon.js';

export class LargeCard extends DDDSuper(LitElement) {

  constructor() {
    super();
    this.title = 'Type in a URL';
    this.description = '';
    this.logo = ''; 
    this.theme = '';
    this.created = 'N/A'; 
    this.lastUpdated = 'N/A'; 
    this.icon = '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
      icon: { type: String },
    };
  }

  static get styles() {
    return [css`
      :host {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 80%;
        padding: var(--ddd-spacing-6); //24px;

        border: var(--ddd-border-md);
        border-color: var(--ddd-theme-default-limestoneGray);
        border-radius: var(--ddd-radius-xs);
        box-shadow: var(--ddd-boxShadow-md);
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: var(--ddd-spacing-4); //16px
      }

      img {
        width: 400px;
        height: 400px;
        object-fit: cover;
      }

      .titleIcon {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--ddd-spacing-6);
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
      <img src="${this.logo}" alt="Logo"/>
      <div class="text-wrapper">
        <div class="titleIcon">
          <h3>${this.title}</h3>
          <simple-icon icon="${this.icon}"></simple-icon>
        </div>
        <p>${this.description}</p>
        <p>Theme: ${this.theme}</p>
        <p>Created: ${this.convertUnixToDate(this.created)}</p>
        <p>Last Updated: ${this.convertUnixToDate(this.lastUpdated)}</p>
      </div>
    `;
  }

  static get tag() {
    return "large-card";
  }
}
customElements.define(LargeCard.tag, LargeCard);