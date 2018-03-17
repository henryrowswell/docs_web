import React from 'react'
import PropTypes from 'prop-types'
import File from './File'
import {
    FILE,
    FOLDER,
} from '../constants'
import './styles.css'


class Folder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanded: props.isExpanded,
        }
    }

    renderFolder(name, contents) {
        return <Folder key={`folder_${name}`} name={name} contents={contents} />
    }

    renderFile(name, path) {
        return <File key={`file_${name}`} name={name} path={path} />
    }

    renderContent() {
        return Object.entries(this.props.contents).map(([name, value]) => {
            if (value.type === FOLDER) {
                return this.renderFolder(name, value.contents)
            } else if (value.type === FILE) {
                return this.renderFile(name, value.path)
            }
        })
    }

    render() {
        const folderIcon = this.state.isExpanded ? (
            <i className="fa fa-folder-open folder-icon"/>
        ) : (
            <i className="fa fa-folder folder-icon"/>
        )
        return (
            <div className="folder-outer-div">
                <a
                    onClick={() => {this.setState({ isExpanded: !this.state.isExpanded })}
                }>
                    {folderIcon}{this.props.name}
                </a>
                {this.state.isExpanded && (
                    <div className="folder-content-div">
                        {this.renderContent()}
                    </div>
                )}
            </div>
        )
    }
}

Folder.propTypes = {
    name: PropTypes.string.isRequired,
    contents: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool,
}

Folder.defaultProps = {
    isExpanded: false,
}

export default Folder