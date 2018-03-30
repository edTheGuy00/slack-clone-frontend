import gql from 'graphql-tag';

export const allTeamQuery = gql`
{
    allTeams{
    id
    name
    channels {
        id
        name
    }
    }
}
`;
