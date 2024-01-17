import { SetMetadata } from "@nestjs/common";
//modificar
export const jwtConstants = {
    secret: 'myultramegasecret',
  };

  export const IS_PUBLIC_KEY = 'isPublic';
  export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);