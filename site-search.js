import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./large-card.js";
// import "./card.js";

export class SiteSearch extends LitElement {
  static get properties() {
    return {
      items: { type: Array, }, // array with json info
      value: { type: String }, // info typed in the search bar
    };
  }

  static get styles() {
    return css`
      :host{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      #input {
        font-size: 20px;
        line-height: 40px;
        width: 70%;
        padding-left: var(--ddd-spacing-2); //8px
      }
      button {
        height: 46px;
        width: 10%;
        background-color: var(--ddd-theme-default-nittanyNavy);
        color: var(--ddd-theme-default-white);
        font-family: 'Roboto';
        font-size: 16px;
        font-weight: bold;
      }
      large-card {
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.items = [];
  }

  render() {
    // Map: for each item in the array, get item and index
    return html`
    <h3 class="fs-3xl m-0">Input a HAX site</h3>
    <div class="search">
      <input id="input" placeholder="https://haxtheweb.org/..." />
      <button type="button" @click="${this.buttonPressed}">Analyze Site</button>
    </div>

    <large-card id="largeCard"></large-card>

    <div class="results">
    </div>
    `;
    
    // ${this.items.map((item, index) => html`
    //   <large-card
    //     title=""
    //     description=""
    //     logo=""
    //     theme=""
    //     created=""
    //     lastUpdated=""
    //   ></large-card>
    // `)}
  }

  buttonPressed() {
    this.value = this.shadowRoot.querySelector('#input').value;
    // console.log("this.value: "+this.value);

    if (this.value) {
      this.fetchResults();
    }
    else if (!this.value) {
      this.resetLargeCard();
    }
  }

  fetchResults() {
    fetch('https://haxtheweb.org/site.json')
    .then(response => { if (!response.ok) { throw new Error('Could not reach website'); } return response.json();})
    .then(data => {
      if (data.items) {
        this.items = data.items;

        var count = 0; // counts matches
        for (let i = 0; i < this.items.length; i++) {
          // find if URL is equal to slug
            // Selects the large-card tag
          const myElement = this.shadowRoot.getElementById('largeCard');
            // Uses regex to find and extract the slug part of the URL
          const extractedSlug = this.extractSlug(this.value);

          if(extractedSlug == this.items[i].slug) {
            count++;
            myElement.setAttribute('title', this.items[i].title);
            myElement.setAttribute('description', this.items[i].description);
            // myElement.setAttribute('logo', this.items[i].logo);
            // myElement.setAttribute('theme', this.items[i].title);
            myElement.setAttribute('created', this.items[i].metadata.created);
            myElement.setAttribute('lastUpdated', this.items[i].metadata.updated);
          }
          if(count == 0){ // If 0 matches, reset attributes
            this.resetLargeCard();
          }
        }
      }
    });
  }
  extractSlug(url) {
    // captures text after "https://haxtheweb.org/"
    // matches zero or more characters
    const urlPattern = /https:\/\/haxtheweb\.org\/(.*)/;
    const match = url.match(urlPattern);
    return match && match[1] ? match[1] : null; // Return the slug if it exists
  }
  resetLargeCard() {
    const myElement = this.shadowRoot.getElementById('largeCard');
    myElement.setAttribute('title', '');
    myElement.setAttribute('description', '');
    // myElement.setAttribute('logo', '');
    // myElement.setAttribute('theme', '');
    myElement.setAttribute('created', '');
    myElement.setAttribute('lastUpdated', '');
  }

  static get tag() {
    return 'site-search';
  }
}
customElements.define(SiteSearch.tag, SiteSearch);