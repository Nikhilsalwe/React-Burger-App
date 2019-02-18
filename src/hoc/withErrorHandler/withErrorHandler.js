import React, { Component } from 'react';
import Model from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

//this component is created for handling error in asyc 

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }
        render() {
            // modalClosed usein in modal.js backdrop tag to close backdrop
            return (
                <Aux>
                    <Model
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props} />

                </Aux>
            )
        }
    }
}

export default withErrorHandler;