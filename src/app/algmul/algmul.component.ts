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
  selector: 'app-algmul',
  templateUrl: './algmul.component.html',
  styleUrls: ['./algmul.component.css']
})
export class AlgmulComponent implements OnInit {
  orderForm: FormGroup;
  numeros: NSA[] = [];
  degenerationIteration: number | string = 'N/A';
  sequencePeriod: number | string = 'N/A';
  g: number | string = 'N/A';
  m: number | string = 'N/A';
  c: number | string = 'N/A';
  a: number | string = 'N/A';
  periodReachedCount: number = 0; 

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      semilla: [''],
      k: [''],
      p: [''],
      limite: [''],
      formulaA: ['1'] 
    });
  }

  ngOnInit() {}

  clearForm() {
    this.orderForm.reset();
    this.numeros = [];
    this.degenerationIteration = 'N/A';
    this.sequencePeriod = 'N/A';
    this.g = 'N/A';
    this.m = 'N/A';
    this.c = 'N/A';
    this.a = 'N/A';
  }

  isPrime(num: number): boolean {
    for(let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
      if(num % i === 0) return false;
    return num > 1;
  }

  findClosestPrime(m: number): number {
    let lower = m - 1;
    let upper = m + 1;

    while (true) {
      if (this.isPrime(lower)) return lower;
      if (this.isPrime(upper)) return upper;

      lower--;
      upper++;
    }
  }

  submitForm() {
    const formValue = this.orderForm.value;
    const semilla = formValue.semilla;
    const k = formValue.k;
    const p = formValue.p;
    const limite = formValue.limite;
    let currentSeed = semilla;
    let seedsSet = new Set();
    const formulaA = formValue.formulaA;
    if (!Number.isInteger(semilla) || !Number.isInteger(k) || !Number.isInteger(p) || !Number.isInteger(limite)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingresa solo números enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }
    if (!p || p < 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos con numeros enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }
    if (!semilla  || semilla < 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos con numeros enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }
    if (!k  || k < 0) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos con numeros enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }
    if (!limite || limite < 0 ) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, llena todos los campos con numeros enteros.',
        icon: 'error'
      });
      return; // Salir del método
    }



    // Calculamos g, m, c y a
    this.g = Math.floor(Math.log(p) / Math.log(2) + 2);
    this.m = Math.floor(Math.pow(2, this.g));

    // Calculamos "a" basado en la opción seleccionada
    if (formulaA === '1') {
      this.a = 3 + 8 * k;
    } else {
      this.a = 5 + 8 * k;
    }


    for (let i = 1; i <= limite+1; i++) {
      let yi = (this.a * currentSeed) % this.m;  // Método multiplicativo
      let ri = yi / (this.m - 1);
      let observacion = seedsSet.has(yi) ? 'Secuencia degenerada' : '';

      if (seedsSet.has(yi) && !this.degenerationIteration) {
        this.degenerationIteration = i;
        this.sequencePeriod = i - Array.from(seedsSet).indexOf(yi);
      }

      seedsSet.add(yi);

      this.numeros.push({
        i: i,
        semilla: currentSeed,
        yi: yi,
        xi: yi, // En este caso, xi es igual a yi
        ri: ri,
        observacion: observacion
      });

      currentSeed = yi;
    }

    Swal.fire({
      title: 'Números Generados',
      text: 'Se han generado los números aleatorios con éxito.',
      icon: 'success'
    });

    // resetear el formulario
  }
}