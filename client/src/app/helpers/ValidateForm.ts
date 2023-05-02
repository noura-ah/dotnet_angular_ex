import { FormGroup } from "@angular/forms"

export default class ValidateFrom {
    static validateAllFormFields(formGroup: FormGroup){
        Object.keys(formGroup.controls).forEach(field =>{
          const control = formGroup.get(field)
          control?.markAsDirty({onlySelf:true})  
        })
      }  
}