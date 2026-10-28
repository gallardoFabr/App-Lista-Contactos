import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactDto {
   @IsString()
   @IsNotEmpty()
   @MaxLength(50)
   name: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(50)
   lastName: string;

   @IsString()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(9)
   phone: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(15)
   address: string;
}
