import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-product.component.html',
  styleUrl: './register-product.component.css'
})
export class RegisterProductComponent {
// Modelo para los campos de texto
  producto: {
    nombre?: string;
    descripcion?: string;
    categoria?: string;
    precio?: number;
    cantidad?: number;
    origen?: string;
    certificaciones?: string;
  } = {};

  // Archivos seleccionados
  imagenes: File[] = [];

  // Mensaje de feedback
  mensaje = '';

  constructor(private productsSvc: ProductsService) {}

  /** Captura los archivos del input */
  onFilesChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.imagenes = Array.from(input.files);
    }
  }

  /** Envía el formulario como FormData al backend */
  submit() {
    this.mensaje = 'Registrando producto…';

    const form = new FormData();
    // Campos de texto
    for (const [key, value] of Object.entries(this.producto)) {
      if (value !== undefined) {
        form.append(key, value.toString());
      }
    }
    // Archivos
    this.imagenes.forEach(file => form.append('imagenes', file));

    this.productsSvc.registerProduct(form).subscribe({
      next: (nuevo: any) => {
        this.mensaje = '✅ Producto registrado con éxito';
        console.log('Creado:', nuevo);
      },
      error: err => {
        console.error(err);
        this.mensaje = '❌ Error al registrar producto';
      }
    });
  }
}