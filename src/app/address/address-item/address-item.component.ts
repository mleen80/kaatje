import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../api/address/address.model';


@Component({
  selector: 'app-address-item[address]',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.css'],
})
export class AddressItemComponent  {

  @Input()
  address!: Address;
  @Input()
  useCheckbox = true;
  @Input()
  checked = false;

  @Output()
  eanCodesSelected = new EventEmitter<{ [key: string]: boolean }>();

  selectedEanCodes: string[] = [];

  toggleEanCode(eanCode: string) {
    if (this.selectedEanCodes.includes(eanCode)) {
      this.selectedEanCodes = this.selectedEanCodes.filter((code) => code !== eanCode);
    } else {
      this.selectedEanCodes = [...this.selectedEanCodes, eanCode];
    }

    const eanCodes = Object.fromEntries(this.address.eans.map(ean => [ean.code, this.selectedEanCodes.includes(ean.code)]));
    // const eanCodes = this.address.eans.reduce((acc, ean) => ({...acc, [ean.code]: this.selectedEanCodes.includes(ean.code) }), {});
    this.eanCodesSelected.emit(eanCodes);
  }

  status = ['Active', 'Future', 'Past'];
  panelOpenState = false;

}
