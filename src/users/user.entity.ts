import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from './isUserExists.validator';
import { Exclude, Expose } from 'class-transformer';

export class User {
  //@Exclude -> possibilita informar que um determinado dado  não será exportado(enviado/retornado) para fora da app
  //toPlainOnly:true -> sistema vai excluir essa propriedade da serealização e não vai retornar o dado. (ignora)

  @Exclude({ toPlainOnly: true })
  id: string;

  @Exclude({ toPlainOnly: true })
  createDate: Date;

  @IsNotEmpty({ message: 'password is required' })
  @Exclude({ toPlainOnly: true })
  password: string;

  @IsNotEmpty({ message: 'login is required' })
  @IsString({ message: 'login is nees to be a string' })
  @IsUserAlreadyExist({})
  login: string;

  @IsEmail({})
  email: string;
  // @Expose-> possibilita alterar o nome dos atributos que serão enviados no JSON. Interessante usar para correção de grafia junto com o toClassOnly para serializar e mostrar no JSON no retorno. Cuidado ao usar pq não é interessante ter entrada e saída com nomes diferentes

  @IsNotEmpty({ message: 'fullname is requires' })
  @Expose({
    name: 'full_name',
  })
  fullName: string;

  address: Address;
}

export class Address {
  road: string;
  number: number;
}
