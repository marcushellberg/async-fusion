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

  @state()
  private loading = false;

  render() {
    return html`
      <vaadin-text-field
        label="Your name"
        .value=${this.name}
        ?disabled=${this.loading}
        @value-changed=${this.nameChanged}
      ></vaadin-text-field>
      <vaadin-button @click=${this.save} ?disabled=${this.loading}>
        ${this.loading ? "Saving..." : "Save"}
      </vaadin-button>

      <ul>
        ${this.saved.map((name) => html` <li>${name}</li> `)}
      </ul>
    `;
  }

  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

  async save() {
    this.loading = true;
    const savedName = await saveUser(this.name);
    this.saved = [...this.saved, savedName];
    this.name = "";
    this.loading = false;
  }
}
