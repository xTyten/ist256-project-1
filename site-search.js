import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import "./large-card.js";
import "./small-card.js";

export class SiteSearch extends LitElement {
  static get properties() {
    return {
      data: { type: Array, }, // array with json info
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
        margin-top: 24px;
        margin-left: auto;
        margin-right: auto;
      }
      .results {
        margin-top: 24px;
        margin-bottom: 24px;
        display: grid;
        grid-template-columns: repeat(3, 1fr); // 3 columns with same width
        width: 80%;
        flex-wrap: wrap;
        flex-direction: row;
        margin-left: auto;
        margin-right: auto;
        gap: 8px;
      }
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.data = [];
  }

  render() {
    // Map: for each item in the array, get item and index
    return html`
    <h3 class="fs-3xl m-0">Input a HAX site</h3>
    <div class="search">
      <input id="input" placeholder="Type in a website URL that uses HAX" />
      <button type="button" @click="${this.buttonPressed}">Analyze Site</button>
    </div>

    <large-card id="largeCard"></large-card>

    <!-- MAKE THIS RUN AFTER THE BUTTON IS CLICKED -->
    <div class="results">
      ${this.items.map((item, index) => html`
        <small-card
          title="${item.title[0]}"
        ></small-card>
      `)}
    </div>
    `;
    
    // ${this.items.map((item, index) => html`
    //   <small-card
    //      title="${item.title[0]}"
    //      lastUpdated="${}"
    //      description="${}"
    //      logo="${}"
    //      slug="${}"
    //      source="${}"
    //   ></small-card>
    // `)}

    // ${this.items.map((item, index) => html`
    //   <nasa-image
    //     source="${item.links[0].href}"
    //     title="${item.data[0].title}"
    //     altText="${item.data[0].description_508}"
    //     secondCreator="${item.data[0].secondary_creator}"
    //   ></nasa-image>
    //   `)}
  }

  buttonPressed() {
    this.value = this.shadowRoot.querySelector('#input').value;

    if (this.value) {
      this.fetchResults();
    }
    else if (!this.value) {
      this.resetLargeCard();
    }

  }

  fetchResults() {
    fetch(this.addSiteJson(this.value)) // fetches the value inside the search bar
    .then(response => { 
      if (!response.ok) { 
        throw new Error('Could not reach website'); 
      } return response.json();})
    .catch(error => {
      this.resetLargeCard();

      const myElement = this.shadowRoot.getElementById('largeCard');
      myElement.setAttribute('title', 'Not valid website');
    })
    .then(data => {
      if (data) {
        this.data = data;
        this.title = this.data.title;
        this.metadata = this.data.metadata;
        this.items = this.data.items;
        
        const myElement = this.shadowRoot.getElementById('largeCard');
        myElement.setAttribute('title', this.title);
        myElement.setAttribute('description', this.data.description);
        // String concatenation. https://haxtheweb.org + / + files/hax (1).png
        myElement.setAttribute('logo', this.removeSlug(this.value)+"/"+this.metadata.site.logo);

        myElement.setAttribute('theme', this.metadata.theme.name);
        myElement.setAttribute('created', this.metadata.site.created);
        myElement.setAttribute('lastUpdated', this.metadata.site.updated);
        
        // var count = 0; // counts matches
        // for (let i = 0; i < this.items.length; i++) {
        //   // find if URL is equal to slug
        //     // Selects the large-card tag
        //   const myElement = this.shadowRoot.getElementById('largeCard');
        //     // Uses regex to find and extract the slug part of the URL
        //   const extractedSlug = this.extractSlug(this.value);

        //   if(extractedSlug == this.items[i].slug) {
        //     count++;
        //     myElement.setAttribute('title', this.items[i].title);
        //     myElement.setAttribute('description', this.items[i].description);
        //     // myElement.setAttribute('logo', this.items[i].logo);
        //     // myElement.setAttribute('theme', this.items[i].title);
        //     myElement.setAttribute('created', this.items[i].metadata.created);
        //     myElement.setAttribute('lastUpdated', this.items[i].metadata.updated);
        //   }
        //   if(count == 0){ // If 0 matches, reset attributes
        //     this.resetLargeCard();
        //   }
        // }
      }
    });
  }
  // extractSlug(url) {
  //   // captures text after "https://haxtheweb.org/"
  //   // matches zero or more characters
  //   const urlPattern = /https:\/\/haxtheweb\.org\/(.*)/;
  //   const match = url.match(urlPattern);
  //   return match && match[1] ? match[1] : null; // Return the slug if it exists
  // }
  resetLargeCard() {
    const myElement = this.shadowRoot.getElementById('largeCard');
    myElement.setAttribute('title', '');
    myElement.setAttribute('description', '');
    myElement.setAttribute('logo', '');
    myElement.setAttribute('theme', '');
    myElement.setAttribute('created', '');
    myElement.setAttribute('lastUpdated', '');
  }
  addSiteJson(url) { // checks if the input website has /site.json. If it doesn't, add it
    return url.replace(/(\/site\.json)?$/, "/site.json");
  }
  removeSlug(url) {
    // regular expression matches websites
    const regex = /^(https?:\/\/[^\/]+)\/?.*/;
    // domain name
    const match = url.match(regex);
    return match ? match[1] : null;
  }


  static get tag() {
    return 'site-search';
  }
}
customElements.define(SiteSearch.tag, SiteSearch);