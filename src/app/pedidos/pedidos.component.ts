import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
interface NSA {
  i: number;
  semilla: number;
  yi: number; 
  xi: number;
  ri: number;
  observacion: string;
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  orderForm: FormGroup;
  numeros: NSA[] = [];
  degenerationIteration: number | string = 'N/A';
  sequencePeriod: number | string = 'N/A';  

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      semilla: [''],
      limite: ['']
    });
  }

  ngOnInit() {}

  clearForm() {
    this.orderForm.reset();
    this.numeros = [];
    this.degenerationIteration = 'N/A';
    this.sequencePeriod = 'N/A';
  }
  
  submitForm() {
    const formValue = this.orderForm.value;
    const semilla = formValue.semilla;
    const limite = formValue.limite;
    let currentSeed = semilla;
    let degenerationFound = false;
    let firstOccurrence: number | null = null;
    let seedsSet = new Set();
    if (!Number.isInteger(semilla) || !Number.isInteger(limite) ) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa solo números enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }

    if (!semilla && !limite) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos.',
        icon: 'error'
      });
      return; // Salir del método
    }
      // Validación: números positivos
      if (semilla <= 0 || limite <= 0) {
        Swal.fire({
          title: 'Error',
          text: 'Solo se permite números positivos > 0.',
          icon: 'error'
        });
        return; // Salir del método
      }
    
      // Validación: semilla con > 3 dígitos
      if (semilla.toString().length <= 3) {
        Swal.fire({
          title: 'Error',
          text: 'La semilla debe tener más de 3 dígitos.',
          icon: 'error'
        });
        return; // Salir del método
      }

    for (let i = 1; i <= limite; i++) {
      let yi = currentSeed * currentSeed;
      let yiStr = yi.toString();
      let length = yiStr.length;
      let xi = parseInt(yiStr.substring((length / 2) - 2, (length / 2) + 2), 10);
      let ri = xi / 10000;
      let observacion = seedsSet.has(xi) ? 'Secuencia degenerada' : '';
      
      if (seedsSet.has(xi) && !degenerationFound) {
        this.degenerationIteration = i;
        firstOccurrence = Array.from(seedsSet).indexOf(xi) + 1;
        degenerationFound = true;
      }

      seedsSet.add(xi);

      this.numeros.push({
        i: i,
        semilla: currentSeed,
        yi: yi,
        xi: xi,
        ri: ri,
        observacion: observacion
      });

      currentSeed = xi;
    }
    if (degenerationFound && firstOccurrence !== null) {
      this.sequencePeriod = this.degenerationIteration as number - firstOccurrence;
    } else {
      this.degenerationIteration = 'N/A';
      this.sequencePeriod = 'N/A';
    }

    Swal.fire({
      title: 'Números Generados',
      text: 'Se han generado los números aleatorios con éxito.',
      icon: 'success'
    });


  }
}
