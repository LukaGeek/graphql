import { gql } from "@apollo/client";

export const GET_NOVELS = gql`
  query Novels {
    novels {
      authors {
        id
        name
        novelID
      }
    }
    id
    image
    title
  }
`;
