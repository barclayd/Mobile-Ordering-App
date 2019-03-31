import React, {Component} from 'react';
import {TextInput, TouchableOpacity, Text} from 'react-native';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const CREATE_MESSAGE = gql`
mutation createMessage($text: String!, $author: String) {
  createMessage(text: $text, author: $author) {
    id
  }
}
`;

class NewMessageForm extends Component {

    state = {
        author: 'Author',
        text: 'Hello World'
    };

    render() {
        return (
            <Mutation mutation={CREATE_MESSAGE}>
                {(createMessage) => {
                    const onSubmit = (event) => {
                        event.preventDefault();
                        const text = this.state.text;
                        if (!text) return;
                        const author = this.state.author;
                        createMessage({ variables: { text, author } });
                        this.setState({text: ''});
                        this.setState({author: ''});
                    };
                    return (
                        <TouchableOpacity onPress={onSubmit}>
                            <TextInput style={{color: 'white'}} value={this.state.author} placeholder="Author" onChangeText={(author) => this.setState({author})} />
                            <Text style={{color: 'white'}}>:</Text>
                            <TextInput style={{color: 'white'}} value={this.state.text} placeholder="Text" onChangeText={(text) => this.setState({text})}/>
                            <Text style={{color: 'white'}} >Send</Text>
                        </TouchableOpacity>
                    );
                }}
            </Mutation>
        )
    }
}

export default NewMessageForm;
