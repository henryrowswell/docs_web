import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    updateDoc,
} from '../../actions'
import '../styles.css'

class Editor extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: props.docData[props.activeDoc],
        }

        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onClickView = this.onClickView.bind(this)
    }

    componentWillUnmount() {
        // THIS DOESN'T WORK
        // if (this.hasUnsavedChanges){
        //     if (window.confirm('Save changes before unmounting?')) {
        //         this.onSave()
        //     }
        // }
    }

    hasUnsavedChanges() {
        return (this.state.data != this.props.docData[this.props.activeDoc])
    }

    confirmDiscardChanges() {
        return window.confirm('You have unsaved changes, discard?')
    }

    onChange(newValue) {
        this.setState({
            data: newValue,
        })
    }

    onSave() {
        // update redux
        this.props.updateDoc({
            path: this.props.activeDoc,
            data: this.state.data,
        })
        // send to server (separate command to commit to repo and push - need to keep track of which files have changed?)
        fetch(`/docs?path=${this.props.activeDoc}`, {
            body: this.state.data,
            method: 'POST',
        })
        .then(res => (res.json()))
        .then(res => {console.log(res)})
    }

    onClickView() {
        if (this.hasUnsavedChanges()) {
            if (this.confirmDiscardChanges()) {
                this.props.switchToViewMode()
            }
        } else {
            this.props.switchToViewMode()
        }
    }

    render() {
        return (
            <div>
                 <button
                    onClick={this.onClickView}
                >
                    View
                </button>
                <button
                    onClick={this.onSave}
                >
                    Save
                </button>
                <textarea
                    className="full-width"
                    rows={100}
                    defaultValue={this.state.data}
                    onChange={(e) => this.onChange(e.target.value)}
                />
            </div>
        )
    }
}

Editor.propTypes = {
    data: PropTypes.string,
    switchToViewMode: PropTypes.func.isRequired, // for switching modes in ContentWindow. Another solution may be for the editor and viewer to just be built into the content window
}

Editor.defaultProps = {
    data: '',
}

function mapStateToProps(state, ownProps) {
    return {
        docData: state.docData,
        activeDoc: state.activeDoc,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        updateDoc: document => dispatch(updateDoc(document)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)