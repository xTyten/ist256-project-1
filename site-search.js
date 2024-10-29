import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
// import "./large-card.js";
// import "./card.js";

export class SiteSearch extends LitElement {
  static get properties() {
    return {
      items: { type: Array, },
      value: { type: String },
    };
  }

  static get styles() {
    return css`
      .siteSearchWrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
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
      }
      ::placeholder {
        padding-left: 8px;
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
    `;
  }

  constructor() {
    super();
    this.value = null;
    this.loading = false;
    this.items = [];
  }

  render() {
    // Map: for each item in the array, get item and index
    return html`
    <div class="siteSearchWrapper">
      <h3>Input a HAX site</h3>
      <div class="search">
        <input id="input" placeholder="https://haxtheweb.org/..." @input="${this.inputChanged}" />
        <button type="button">Analyze Site</button>
      </div>
      <div class="results">

      </div>
    </div>

    `;
  }

  inputChanged(e) {
    this.value = this.shadowRoot.querySelector('#input').value;
  }
  // life cycle will run when anything defined in `properties` is modified
  updated(changedProperties) {
    // see if value changes from user input and is not empty
    if (changedProperties.has('value') && this.value) {
      this.updateResults(this.value);
    }
    else if (changedProperties.has('value') && !this.value) {
      this.items = [];
    }
    // @debugging purposes only IMPORTANT FOR TESTING
    if (changedProperties.has('items') && this.items.length > 0) {
      console.log(this.items);
    }
  }

  updateResults(value) {
    this.loading = true;
    // promise. If response is ok, json.
    fetch(`https://haxtheweb.org/site.json${value}`).then(d => d.ok ? d.json(): {}).then(data => {
      // If has a data collection
      if (data.items) {
        // this.items = [];
        // this.items = data.collection.items;
        // this.loading = false;
      }  
    });
  }

  static get tag() {
    return 'site-search';
  }
}
customElements.define(SiteSearch.tag, SiteSearch);