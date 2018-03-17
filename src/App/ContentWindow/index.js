import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Viewer from './Viewer'
import Editor from './Editor'

import './styles.css'

class ContentWindow extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isInEditMode: false,
            data: props.docData[props.activeDoc],
        }
    }
    render() {
        return (
            <div className="content-window-outer-div full-width">
                { this.props.activeDoc && !this.state.isInEditMode && (
                    <button
                        onClick={() => {this.setState({ isInEditMode: !this.state.isInEditMode })}}
                    >
                        Edit
                    </button>
                )}
                { this.state.isInEditMode ? (
                    <Editor 
                        switchToViewMode={() => { 
                            this.setState({ isInEditMode: false }) 
                        }}
                    />
                ) : (
                    <Viewer 
                    />
                )}
            </div>
        )
    }
}

ContentWindow.propTypes = {
    
}

ContentWindow.defaultProps = {

}

function mapStateToProps(state, ownProps) {
    return {
        docData: state.docData,
        activeDoc: state.activeDoc,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentWindow)