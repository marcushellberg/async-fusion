import "@vaadin/vaadin-button";
import "@vaadin/vaadin-text-field";
import { saveUser } from "Frontend/generated/ServerEndpoint";
import { customElement, html, state } from "lit-element";
import { View } from "../../views/view";

@customElement("hello-world-view")
export class HelloWorldView extends View {
  @state()
  private name = "";
  @state()
  private saved: string[] = [];

  render() {
    return html`
      <vaadin-text-field
        label="Your name"
        @value-changed=${this.nameChanged}
      ></vaadin-text-field>
      <vaadin-button @click="${this.save}">Save</vaadin-button>

      <ul>
        ${this.saved.map((name) => html` <li>${name}</li> `)}
      </ul>
    `;
  }

  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

  async save() {
    this.saved = [...this.saved, await saveUser(this.name)];
    this.name = "";
  }
}
