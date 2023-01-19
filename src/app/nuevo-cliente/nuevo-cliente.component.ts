import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-nuevo-cliente',
  templateUrl: './nuevo-cliente.component.html',
  styleUrls: ['./nuevo-cliente.component.css'],
})
export class NuevoClienteComponent implements OnInit {
  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.cliente = {} as Cliente;
  }

  goBack(): void {
    this.location.back();
  }

  guardar(): void {
    this.clienteService.addCliente(this.cliente).subscribe(() => this.goBack());
  }
}
