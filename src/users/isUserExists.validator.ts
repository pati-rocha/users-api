import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UsersService } from './users.service';

@Injectable()
@ValidatorConstraint()
export class IsUserAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private userService: UsersService) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    console.log(value);

    return !!!this.userService.searchByLogin(value);
    //se false retorna true, se true retorna false
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Login is already exists!';
  }
}
// Decorator do class validation
export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserAlreadyExistConstraint,
    });
  };
}

/* 
Decorator - uma função que retornar outra função. 

o decorator do class validation (function IsUserAlreadyExist) recebe as opções de validações (validationOptions) e a função que (function IsUserAlreadyExist) retorna recebe o objeto atual (object: User) e o nome da propriedade (propertyName).

A função (registerDecorator) é a validação para registrar o decorator (function IsUserAlreadyExist) no class-validator que é quem faz a parte das validações. 
O registerDecorator registra o decorator criado através das seguintes informações:

target: object.constructor
Pede pra informar uma function que vai construir esse objeto. mas de forma geral quando vai instaciar um objeto se informa o constructor.

propertyName: propertyName
Se refera a propriedade que se quer validar.

options: validationOptions
são as opções recebidas
O validationOptions é uma interface fornecida pelo class-validator de várias informações que podem ser implementadas. 


constraints: [] - (restrições)
Poderia adicionar outros constraints.
Ex: validar o login pelo tamanho. Na maioria das vezes não se usa mas poderia combinar várias constraints.

validator: IsUserAlreadyExistConstraint
É de fato a função que vai validar se, nesse caso, o usuário existe. 
Deve ser uma função  ou ValidatorConstraintInterface, ou seja, pode-se criar uma class que implementa essa interface(contrato)









*/
