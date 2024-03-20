/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  //Pokemon
  public Pokemon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log(req)
      const  pokemonName  = req.query.pokemonName as string;
      /* const  {pokemonName}  = req.query o "params"; */
      if (!pokemonName) {
        throw new Error('El nombre del Pokémon es obligatorio');
      }
      const pokemonData = await this.auth.PokemonAuthService(pokemonName);
      res.status(200).json(pokemonData); // Devolver solo la información del Pokémon solicitado
    } catch (error) {
      next(error);
    }
  };
  
  
   public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);
 
      res.setHeader('Set-Cookie', ['Authorization=; Max-aFge=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  }; 
}
