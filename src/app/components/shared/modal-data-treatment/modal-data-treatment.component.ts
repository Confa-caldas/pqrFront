import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-data-treatment',
  templateUrl: './modal-data-treatment.component.html',
  styleUrl: './modal-data-treatment.component.scss',
})
export class ModalDataTreatmentComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() setRta = new EventEmitter<boolean>();
  @Output() setRtaParameter = new EventEmitter<boolean>();
  message = '';
  inputValue: boolean = false;
  expandMessage: boolean = false;
  showDialog() {
    this.visible = true;
  }
  formGroup: FormGroup<any> = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      inputValue: [false, [Validators.requiredTrue]],
    });
  }
  ngOnInit(): void {
    this.formGroup.reset();
    //this.message =
    //  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lobortis mattis aliquam faucibus purus in massa. At tempor commodo ullamcorper a lacus vestibulum. Integer enim neque volutpat ac tincidunt vitae semper quis. Eu consequat ac felis donec et odio pellentesque diam volutpat. Urna cursus eget nunc scelerisque viverra mauris. Sit amet consectetur adipiscing elit duis tristique sollicitudin. Morbi tincidunt augue interdum velit euismod. Feugiat nibh sed pulvinar proin. Faucibus pulvinar elementum integer enim neque volutpat. Blandit massa enim nec dui nunc mattis enim ut tellus. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Neque egestas congue quisque egestas diam in arcu cursus. Scelerisque purus semper eget duis at tellus at urna condimentum. Sed odio morbi quis commodo. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Varius morbi enim nunc faucibus a pellentesque. Fermentum dui faucibus in ornare quam viverra orci sagittis Fermentum et sollicitudin ac orci phasellus egestas. Feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Morbi leo urna molestie at. Quam adipiscing vitae proin sagittis. Nisl purus in mollis nunc sed id. Et egestas quis ipsum suspendisse. Sollicitudin tempor id eu nisl. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Consequat nisl vel pretium lectus quam id. Consequat id porta nibh venenatis cras. Amet purus gravida quis blandit. Id consectetur purus ut faucibus pulvinar elementum integer enim neque. Dolor magna eget est lorem. Ipsum consequat nisl vel pretium lectus quam id leo in. Volutpat sed cras ornare arcu. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit.';
    this.message =
      'Autorizo de manera previa, expresa e inequívoca a la Caja de Compensación Familiar de Caldas–Confa, para que trate mis datos personales y/o sensibles que llegase a recolectar. De igual manera autorizo de manera previa,  expresa e inequívoca para que se traten los datos personales y/o sensibles del menor o de la persona sobre el cual actúo en calidad de representante legal, para que sobre esta información proceda a procesarla, recolectarla, almacenarla, usarla, circularla, suprimirla, compartirla, actualizarla, transmitirla y transferirla de acuerdo a las finalidades incorporadas en la Política de Tratamiento de la Información publicada en www.confa.co, con el fin de hacer posible la prestación de los servicios propios, reportes a autoridades de vigilancia y control, para uso de fines administrativo, comercial, de publicidad y contacto frente a los titulares de los mismos. Declaro estar informado sobre la posibilidad de oponerse al tratamiento de datos sensibles, salvo que sea necesario para el objeto de las relaciones que se establecen y que en mi calidad de titular de la información tengo derecho a consultar, conocer, actualizar y rectificar los datos personales, ser informado sobre el uso que se ha dado a los mismos en el momento que los solicite, presentar quejas, revocar la autorización y/o solicitar la supresión de mis datos en los casos en que sea procedente y acceder en forma gratuita a los mismos a través de las líneas de atención 8783111 ext. 2772 o al correo proteccion.datos@confa.co.';
  }

  toggleExpand() {
    this.expandMessage = !this.expandMessage;
  }

  closeDialog(value: boolean) {
    this.setRta.emit(value);
    this.inputValue = this.formGroup.controls['inputValue'].value;
    this.setRtaParameter.emit(this.inputValue);
    this.visible = false;
  }
}
