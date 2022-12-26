import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFoo, NewFoo } from '../foo.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFoo for edit and NewFooFormGroupInput for create.
 */
type FooFormGroupInput = IFoo | PartialWithRequiredKeyOf<NewFoo>;

type FooFormDefaults = Pick<NewFoo, 'id'>;

type FooFormGroupContent = {
  id: FormControl<IFoo['id'] | NewFoo['id']>;
  fooName: FormControl<IFoo['fooName']>;
  address: FormControl<IFoo['address']>;
  mobile: FormControl<IFoo['mobile']>;
  fooNo: FormControl<IFoo['fooNo']>;
};

export type FooFormGroup = FormGroup<FooFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FooFormService {
  createFooFormGroup(foo: FooFormGroupInput = { id: null }): FooFormGroup {
    const fooRawValue = {
      ...this.getFormDefaults(),
      ...foo,
    };
    return new FormGroup<FooFormGroupContent>({
      id: new FormControl(
        { value: fooRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fooName: new FormControl(fooRawValue.fooName, {
        validators: [Validators.required],
      }),
      address: new FormControl(fooRawValue.address, {
        validators: [Validators.required],
      }),
      mobile: new FormControl(fooRawValue.mobile, {
        validators: [Validators.required],
      }),
      fooNo: new FormControl(fooRawValue.fooNo, {
        validators: [Validators.required],
      }),
    });
  }

  getFoo(form: FooFormGroup): IFoo | NewFoo {
    return form.getRawValue() as IFoo | NewFoo;
  }

  resetForm(form: FooFormGroup, foo: FooFormGroupInput): void {
    const fooRawValue = { ...this.getFormDefaults(), ...foo };
    form.reset(
      {
        ...fooRawValue,
        id: { value: fooRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FooFormDefaults {
    return {
      id: null,
    };
  }
}
