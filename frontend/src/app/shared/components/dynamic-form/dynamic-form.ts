import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface DynamicField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'month' | 'select';
  required?: boolean;
  options?: { value: string | number; label: string }[];
}

@Component({ selector: 'app-dynamic-form', standalone: true, imports: [CommonModule, ReactiveFormsModule], templateUrl: './dynamic-form.html', styleUrl: './dynamic-form.css' })
export class DynamicForm implements OnChanges {
  private fb = inject(FormBuilder);
  @Input() fields: DynamicField[] = [];
  @Output() formSubmit = new EventEmitter<Record<string, string | number>>();
  form: FormGroup = this.fb.group({});
  ngOnChanges(): void { const group: Record<string, unknown[]> = {}; this.fields.forEach(field => group[field.name] = ['', field.required ? Validators.required : []]); this.form = this.fb.group(group); }
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.formSubmit.emit(this.form.value as Record<string, string | number>); this.form.reset(); }
}
