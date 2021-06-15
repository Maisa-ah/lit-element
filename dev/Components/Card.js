import {LitElement, html, css} from 'lit-element';


class Card extends LitElement {
  static get styles(){
    return css`
    .card-container{
      box-shadow: 0 4px 8px 0 #625e65;
      width: 15em;
      border-radius: 5%;
      margin: 1em;
      text-align:center;
    }
    .card-container:hover{
      box-shadow: 0 4px 8px 0 #bd9cd7;
    }
    img{
      width: 15em;
      border-radius: 5% 5% 0em 0em ;
    }
    a{
      text-decoration:none;
    }
    `;
  }
  render() {
    return html`
      <div class="card-container">
        <a href="${this.url}">
          <div><img src="${this.img}"/></div>
          <div class="card-text">${this.name}</div>
        </a>
      </div>
    `;
  }
  constructor(){
    super();
    this.name = "Project";
    this.url = "https://google.com";
    this.img = "../Images/placeholder.jpeg"
  }
  static get properties(){
    return{
      name: {type: String},
      url: {type: String},
      img: {type: String}
    };
  }
}

customElements.define('my-card', Card);