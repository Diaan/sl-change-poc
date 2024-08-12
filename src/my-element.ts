import type { ScopedElementsMap } from '@open-wc/scoped-elements/lit-element.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { Checkbox, CheckboxGroup } from '@sl-design-system/checkbox';
import { Form, FormField } from '@sl-design-system/form';
import { Radio, RadioGroup } from '@sl-design-system/radio-group';
import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

/**
 * An example element.
 */
@customElement('my-element')
export class MyElement extends ScopedElementsMixin(LitElement) {
  static get scopedElements(): ScopedElementsMap {
    return {
      'sl-form': Form,
      'sl-form-field': FormField,
      'sl-radio': Radio,
      'sl-radio-group': RadioGroup,
      'sl-checkbox': Checkbox,
      'sl-checkbox-group': CheckboxGroup
    };
  }

  @state() mayChangeColumnProperties = false;
  @state() showExtraGroup = false;

  @state () visibilityOptions: string[] = ['isVisibleForStudent'];

  render() {
    return html`
    [${this.visibilityOptions}]
      <sl-form>
        <sl-form-field label="Who is allowed to see this column and the results in it?">
            <sl-checkbox-group
              name="visibility"
              .value=${this.visibilityOptions}
              @sl-change=${(event: CustomEvent<string[]>) => {
                this.visibilityOptions = event.detail;
                console.log('checkboxgroup', event, this.visibilityOptions);
              }}
            >
              <sl-checkbox value="isVisibleForStudent">Parents and students</sl-checkbox>
              <sl-checkbox value="isVisibleForTeacher">Teaching staff (OP)</sl-checkbox>
            </sl-checkbox-group>
          </sl-form-field>


          <sl-form-field label=${'Can an OP-er change column properties?'}>
          <sl-radio-group
            name="change-column-properties"
            .value=${this.mayChangeColumnProperties}
            @sl-change=${(event: CustomEvent<boolean>) => {
              console.log('radio group', event);
              // this.mayChangeColumnProperties = event.detail;
            }}
          >
            <sl-radio .value=${false} checked>No</sl-radio>
            <sl-radio .value=${true}>Yes</sl-radio>
          </sl-radio-group>
        </sl-form-field>
        <button @click=${() => (this.showExtraGroup = !this.showExtraGroup)}>toggle</button>

        ${when(
          this.showExtraGroup,
          () => html`
          <div class="edit-options">
            <sl-form-field label="Specify what can be changed:">
              <sl-checkbox-group name="edit-options">
                <sl-checkbox value="isAllowedToChangeHeader">Changing the extended description</sl-checkbox>
                <sl-checkbox value="isAllowedToChangeDescription">Changing the short description (column header)</sl-checkbox>
                <sl-checkbox value="isAllowedToLinkToAssignment">Linking this column to an ELO assignment</sl-checkbox>
              </sl-checkbox-group>
            </sl-form-field>
          </div>
          `
        )}

      </sl-form>
    `
  }

  static styles = css`
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
