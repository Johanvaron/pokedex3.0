import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import axios from 'axios';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  // Pokemon

  public async PokemonAuthService(pokemonName: string): Promise<any> {
    try {
      if (!pokemonName) {
        throw new Error('Nombre obligatorio.');
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      return response.data; // Devolver solo los datos del Pokémon solicitado
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('No se encontró nada relacionado con el Pokémon que buscas');
      } else {
        throw new Error('Error al obtener los datos del Pokémon desde la API de Pokémon');
      }
    }
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.query()
      .select()
      .from('users')
      .where('email', '=', userData.email)
      .andWhere('password', '=', userData.password)
      .first();

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}
