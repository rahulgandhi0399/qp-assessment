import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @ApiProperty({
      description: 'The first name of the user',
      example: 'John',
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
    @ApiProperty({
      description: 'The last name of the user',
      example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    @ApiProperty({
      description: 'The email address of the user',
      example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;
  
    @ApiProperty({
      description: 'The password for the user account. Must be at least 6 characters long.',
      example: 'strongpassword123',
    })
    @IsString()
    @MinLength(6)
    password: string;
  
    @ApiProperty({
      description: 'The phone number of the user (optional)',
      example: '+1234567890',
      required: false,
    })
    @IsString()
    phoneNumber?: string;
  
    @ApiProperty({
      description: 'The address of the user (optional)',
      example: '123 Main St, Springfield, USA',
      required: false,
    })
    @IsString()
    address?: string;
  }
  
  export class LoginDto {
    @ApiProperty({
      description: 'The email address of the user',
      example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;
  
    @ApiProperty({
      description: 'The password for the user account',
      example: 'strongpassword123',
    })
    @IsString()
    password: string;
  }

export class UserResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Address of the user',
    example: '123 Main St, Springfield, USA',
  })
  address: string;
}

export class LoginSuccessResponseDto {
    @ApiProperty({
        description: 'true',
        example: true,
      })
    success: boolean;
    
    @ApiProperty({description:"auth token",
    example:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MzUzOTk5MzUsImV4cCI6MTczNTQ4NjMzNX0.zvlM_HQoLRCBSbd7kJ9i0kfPxT6H_dgdN7XxhvxAJcI"})
    token:string

    @ApiProperty({ type: UserResponseDto })
    data:UserResponseDto
    
}
