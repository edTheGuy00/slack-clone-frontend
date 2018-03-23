import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            usernameError: '',
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
        };
    }

    onSubmit = async () => {

        this.setState({
            usernameError: '',
            emailError: '',
            passwordError: '',
        });

        const {username, email, password} = this.state;
        const response = await this.props.mutate({
            variables: { username, email, password },
        });

        const {ok, errors} = response.data.register;

        if (ok) {
            this.props.history.push('/');
        } else {
            const err = {};
            errors.forEach(({path, message}) => {
                err[`${path}Error`] = message 
            });

            this.setState(err);
        }

        console.log(response)
    }

    onTextChange = e => {
        const { name, value } = e.target;
        // name = "email";
        this.setState({ [name]: value });
    };

    render() {

        const { username, email, password, usernameError, emailError, passwordError } = this.state

        const errorList = [];

        if (usernameError) {
            errorList.push(usernameError);
        }
        if (emailError) {
            errorList.push(emailError);
        }
        if (passwordError) {
            errorList.push(passwordError);
        }

        return (
            <Container text>
                <Header as="h2">Register</Header>
                <Input name="username" 
                    error={!!usernameError}
                    onChange={this.onTextChange}
                    placeholder="Username" 
                    value={username}
                    fluid />
                <Input name="email" 
                    error={!!emailError}
                    onChange={this.onTextChange} 
                    placeholder="Email" 
                    value={email}
                    fluid />
                <Input name="password" 
                    error={!!passwordError}
                    onChange={this.onTextChange} 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    fluid />
                <Button onClick={this.onSubmit} >Submit</Button>
                {usernameError || emailError || passwordError ? (
                <Message 
                    error
                    header="There was an error with your submission"
                    list={errorList}
                />) : null}
            </Container>
        );
    }
}

const registerMutation = gql `
    mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password){
            ok
            errors{
                path
                message
            }
        }
    }
`;

export default graphql(registerMutation)(Register);
