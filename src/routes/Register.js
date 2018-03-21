import React from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
    }

    onSubmit = async () => {
        const response = await this.props.mutate({
            variables: this.state,
        });
        console.log(response)
    }

    onTextChange = e => {
        const { name, value } = e.target;
        // name = "email";
        this.setState({ [name]: value });
    };

    render() {

        const { username, email, password } = this.state

        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input name="username" 
                    onChange={this.onTextChange}
                    placeholder="Username" 
                    value={username}
                    fluid />
                <Input name="email" 
                    onChange={this.onTextChange} 
                    placeholder="Email" 
                    value={email}
                    fluid />
                <Input name="password" 
                    onChange={this.onTextChange} 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    fluid />
                <Button onClick={this.onSubmit} >Submit</Button>
            </Container>
        );
    }
}

const registerMutation = gql `
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password)
    }
`;

export default graphql(registerMutation)(Register);
