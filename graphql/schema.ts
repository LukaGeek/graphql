export const typeDefs = `#graphql
    type Novel {
        id: ID!
        title: String
        image: String
        authors: [Author]
    }

    type Author {
        id: ID!
        name: String
        novelID: String
    }

    type Query {
        novel(id: ID!): Novel
        novels: [Novel]
    }

    type Mutation {
        addNovel(image: String, title: String): Novel
        updateNovel(id: ID!, title: String, image: String): Novel
        deleteNovel(id: ID!): Novel
        addAuthor(novelID: ID!, name: String): Author
        deleteAuthor(id: ID!): Author
    }
`;
