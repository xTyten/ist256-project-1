import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class LargeCard extends LitElement {

  constructor() {
    super();
    this.title = 'title';
    this.description = 'description';
    this.logo = 'https://placehold.co/400x400'; // ???
    this.theme = 'theme';
    this.created = 'created'; // ???
    this.lastUpdated = 'lastupdated'; // ???
    // ??? Use hexCode from the metadata
    // ??? Use icon by leveraging simple-icon library
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      theme: { type: String },
      created: { type: String },
      lastUpdated: { type: String },
    };
  }

  static get styles() {
    return [css`
      .inner-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border: solid;
        width: 100%;
        // width: calc(100% - 48px); // parents' width - 48px
      }

      .text-wrapper {
        display: flex;
        flex-direction: column;
      }
    `];
  }

  render() {
    return html`
    <div class="inner-wrapper">
        <img src="${this.logo}"/>
        <div class="text-wrapper">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <p>${this.theme}</p>
          <p>${this.created}</p>
          <p>${this.lastUpdated}</p>
        </div>
    </div>
    `;
  }
  static get tag() {
    return "large-card";
  }
}
customElements.define(LargeCard.tag, LargeCard);