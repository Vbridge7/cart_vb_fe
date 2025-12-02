import { gql } from '@apollo/client';

export const GL_EMPTY_BLOCK_FRAGMENT = gql`
  fragment GLEmptyBlock on GLEmptyBlock {
    fields {
      _name
      emptyBlockSize {
        name
        value
      }
      backgroundColor {
        name
        value
      }
    }
  }
`;
