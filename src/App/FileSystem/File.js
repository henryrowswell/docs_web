import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    loadDocument,
    setActiveDoc,
} from '../actions'
import './styles.css'

class File extends React.Component {
    constructor(props) {
        super(props)
        this.onClickFile = this.onClickFile.bind(this)
    }

    onClickFile() {
        fetch(`/docs?path=${this.props.path}`)
        .then(res => { 
            return res.text()
        })
        .then(data => { 
            this.props.loadDocument({ path: this.props.path, data })
            this.props.setActiveDoc(this.props.path)
        })
        .catch(error => {
            console.log('error:', error)
        })
    }

    render() {
        return (
            <div className="file-outer-div">
                <a
                    onClick={this.onClickFile}
                >
                    {this.props.name}
                </a>
            </div>
        )
    }
}

File.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    loadDocument: PropTypes.func.isRequired,

    // state
    docData: PropTypes.object.isRequired,
}

File.defaultProps = {

}

function mapStateToProps(state, ownProps) {
    return {
        docData: state.docData,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        loadDocument: document => dispatch(loadDocument(document)),
        setActiveDoc: path => dispatch(setActiveDoc(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(File)