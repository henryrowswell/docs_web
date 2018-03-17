import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Folder from './Folder'
import {
    FILE,
    FOLDER,
} from '../constants'
import './styles.css'

class FileSystem extends React.Component {
    render() {
        return (
            <div>
                <Folder name="root" contents={this.props.projects} isExpanded={true}/>
            </div>
        )
    }
}

FileSystem.propTypes = {
    
}

FileSystem.defaultProps = {

}

function mapStateToProps(state, ownProps) {
    return {
        projects: state.projects,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSystem)