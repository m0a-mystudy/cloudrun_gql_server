import { gql, useMutation } from 'urql';
import {SignupDocument, LoginDocument } from '@/gql/graphql';

gql`
mutation signup(
  $email: String!, 
  $password: String!, 
  $username: String!
) {
  signup(email: $email, password: $password, username: $username) {
    token
    user {
      id
      email
      username
    }
  }
}
`;
export const useSignupMutation = () => useMutation(SignupDocument);

gql`
mutation login($email:String!, $password: String! ){
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      username
    }
  }
}
`

export const useLoginMutation = () => useMutation(LoginDocument);